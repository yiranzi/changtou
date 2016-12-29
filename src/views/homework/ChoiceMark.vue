/**
 * Created by jun on 2016/10/27.
 *
 */
<template>
    <div class="choice-mark">
      <ict-titlebar :left-options="{showBack: false}" :right-options="rightOptions">
        我的作业
        <a slot="right">完成</a>
      </ict-titlebar>
      <div class="choice-score">
        <ict-star :value="score" slot="value" :font-size="1.5"></ict-star>
        <p class="tip-up">知识点掌握度</p>
        <p class="tip-down">{{{choiceScoreTip}}}</p>
      </div>
      <div class="point-score">
        <p class="knowledge-tip">此次作业小测试设计知识点 <span class="blue-number">{{pointNum}}</span>个</p>
        <div v-for="point in report.kpScore" class="item">
          <cell :title="pointContent($index)">
            <ict-star :value="pointScore($index)" slot="value" :font-size="0.7"></ict-star>
          </cell>
        </div>
        <hr>
        <div class="score-summary">
          <p class="defeat-num">同期战胜<span class="yellow-text">{{defeatNum}}%</span>的人</p>
          <p class="correct-rate">小测试共<span class="blue-number">{{report.totalNum}}</span>道 正确率<span class="blue-number">{{score * 20}}%</span></p>
          <p class="right-num">答对<span class="blue-number">{{report.rightNum}}</span>道 答错<span class="blue-number">{{report.totalNum-report.rightNum}}</span>道</p>
          <span class="retest-btn" v-touch:tap="reTest">重测</span>
        </div>
      </div>
    </div>
</template>
<script>
  import Cell from 'vux/cell'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import IctStar from '../../components/IctStar.vue'
  import {choiceGetters, userGetters} from '../../vuex/getters'
  import {graduationDiplomaActions} from '../../vuex/actions'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  export default {
  vuex: {
    getters: {
      isLogin: userGetters.isLogin,
      report: choiceGetters.report,
      knowledgeMap: choiceGetters.knowledgeMap
    },
    actions: {
      getDiplomaList: graduationDiplomaActions.getDiplomaList
    }
  },
  data () {
    return {
      subjectId: 0,
      lessonId: 0,
      rightOptions: {
        callback: this.onFinish,
        disabled: false
      },
      isFloatShow: false
    }
  },
  computed: {
    //知识点个数
    pointNum () {
      return this.report.kpScore ? this.report.kpScore.length : 0
    },
    // 通过 | 未通过 提示
    choiceScoreTip () {
      if (this.score >= 3) {
        return `恭喜您本课<span class="passed">已通过</span>`
      } else {
        return `本课<span class="not-passed">未通过</span>`
      }
    },
    // 总分数
    score () {
      return parseInt(this.report.rightNum / this.report.totalNum * 10) * 0.5
    },
    // 打败人数
    defeatNum () {
      if (this.score < 3) {
        return 0
      } else if (this.score <= 4) {
        return 70 + parseInt(Math.random() * 10)
      } else if (this.score <= 4.5) {
        return 80 + parseInt(Math.random() * 10)
      } else if (this.score <= 5) {
        return 90 + parseInt(Math.random() * 10)
      }
    }
  },
  route: {
    data ({to: {params}}) {
      this.lessonId = params.lessonId
      this.subjectId = params.subjectId
      if (!(parseInt(this.report.rightNum / this.report.totalNum * 10) * 0.5 >= 3)) {
        this.showMask({
          component: 'homework/ChoiceAnswerFailed.vue',
          hideOnMaskTap: true,
          componentData: parseInt(this.report.rightNum / this.report.totalNum * 10) * 0.5,
          callbackName: 'onChoiceReTestTap',
          callbackFn: this.reTest.bind(this) //组件上的
        })
      }
    }
  },
  methods: {
    /**
     * 完成
     */
    onFinish () {
      window.history.back()
      const me = this
      //做完课程最后一课选择题 拉取毕业奖状列表
      me.getDiplomaList().then(
        (newDiploma) => {
          const subjectDiploma = newDiploma.find(
            function (diploma) {
              return diploma.subjectId === parseInt(me.subjectId)
            }
          )
          if (subjectDiploma && !subjectDiploma.show) {
            me.$dispatch(eventMap.SUBJECT_GRADUATION, subjectDiploma)
          }
        }
      )
    },
    /**
     * 重测
     */
    reTest () {
      this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.CHOICE_QUESTION_RETEST, {
        lessonid: this.lessonId
      })
      this.$route.router.replace(`/homework/choice/answer/${this.subjectId}/${this.lessonId}`)
    },
    /**
     * 点击浮层
     */
    onMaskTap () {
      this.isFloatShow = false
    },
    /**
     * 知识点名称
     * @param index
     * @returns {*}
       */
    pointContent (index) {
      return this.knowledgeMap[this.report.kpScore[index].kpId]
    },
    /**
     * 知识点得分
     * @param index
     * @returns {number}
       */
    pointScore (index) {
      if (this.report && this.report.kpScore.length > 0) {
        return this.report.kpScore[index].score * 0.5
      } else {
        return 0
      }
    }
  },
  components: {
    Cell,
    IctTitlebar,
    IctStar
  }
}
</script>
<style lang="less">
  .choice-mark{
    width: 100%;
    height: 100%;
    p{
      margin: 0;
    }
    .choice-score{
      margin: 0.75rem 0.6rem 0.5rem;
      padding: 1.5rem 0 1rem;
      background: #fff;
      text-align: center;
      font-size: 1.5rem;
      .tip-up{
        font-size: 0.6rem;
        color: #bbb;
        text-align: center;
      }
      .tip-down{
        margin: 1.5rem 0 0;
        font-size: 0.75rem;
        color: #aaa;
        .passed{
          color: #fbc02d;
        }
        .not-passed{
          color: #007aff;
        }
      }
    }
    .point-score{
      position: relative;
      margin: 0 0.6rem;
      padding: 1rem 0.65rem 1.5rem;
      background: #fff;
      text-align: left;
      .knowledge-tip{
        margin-bottom: 1rem;
        font-size: 0.6rem;
        color: #aaa;
      }
      .item{
        .weui_cell{
          padding: 0;
          font-size: 0.7rem;
          color: #898989;
        }
        .weui_cell_bd > p{
          font-size: 0.7rem;
          color: #898989;
        }
      }
    }
    hr{
      margin: 1.5rem auto;
      width: 100%;
      color: #f0eff5;
    }
    .score-summary{
      background: #fff;
      text-align: left;
      .defeat-num{
        margin-bottom: 1.5rem;
        font-size: 0.75rem;
        text-align: center;
        color: #aaa;
      }
      .correct-rate{
        margin-bottom: 0.75rem;
        font-size: 0.7rem;
        color: #aaa;
      }
      .right-num{
        font-size: 0.65rem;
        color: #aaa;
      }
      .retest-btn{
        display: inline-block;
        width: 3rem;
        position: absolute;
        right: 0;
        bottom: 1.5rem;
        font-size: 0.75rem;
        color: #007aff;
      }
    }
    .blue-number{
      color: #007aff;
    }
    .yellow-text{
      color: #fbc02d;
    }
  }
</style>
