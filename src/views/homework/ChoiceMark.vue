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
        <rater :value.sync="score" slot="value" active-color="#04BE02" :font-size="40" disabled></rater>
        <p class="tip-up">知识点掌握度</p>
        <p class="tip-down">{{{choiceScoreTip}}}</p>
      </div>
      <div class="point-score">
        <p class="knowledge-tip">此次作业小测试设计知识点{{pointNum}}个</p>
        <div v-for="point in report.kpScore" class="item">
          <cell :title="pointContent($index)">
            <rater :class="point-score" :value="pointScore($index)" slot="value" active-color="#04BE02" :font-size="20" disabled></rater>
          </cell>
        </div>
        <hr>
        <div class="score-summary">
          <p class="defeat-num">同期战胜{{defeatNum}}%的人</p>
          <p class="correct-rate">小测试共{{report.totalNum}}道 正确率{{score * 20}}%</p>
          <p class="right-num">答对{{report.rightNum}}道 答错{{report.totalNum-report.rightNum}}道</p>
          <span class="retest-btn" v-touch:tap="reTest">重测</span>
        </div>
      </div>
      <div class="choice-mark-mask" v-touch:tap="onMaskTap" v-show="isFloatShow"></div>
      <div class="choice-mark-float" v-show="isFloatShow">
        <div class="title">{{100 - score * 20}}%错误</div>
        <img class="rate" src="../../assets/styles/image/homework/notPassed/failRate.png">
        <img class="backImg" src="../../assets/styles/image/homework/notPassed/failBg.png">
        <img class="btn" src="../../assets/styles/image/homework/notPassed/reTestBtn.png" v-touch:tap="reTest">
      </div>
    </div>
</template>
<script>
  import Cell from 'vux/cell'
  import Rater from 'vux/rater'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import { choiceGetters, userGetters } from '../../vuex/getters'
  export default {
  vuex: {
    getters: {
      isLogin: userGetters.isLogin,
      lessonId: choiceGetters.lessonId,
      report: choiceGetters.report,
      knowledgeMap: choiceGetters.knowledgeMap
    }
  },
  data () {
    return {
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
  watch: {
    score (newScore) {
      if (newScore >= 0 && newScore < 3) {
        this.isFloatShow = true
      } else {
        this.isFloatShow = false
      }
    }
  },
  methods: {
    /**
     * 完成
     */
    onFinish () {
      window.history.back()
    },
    /**
     * 重测
     */
    reTest () {
    //  this.$route.router.replace('/homework/choice/answer/lessonId')
      this.$route.router.go('/homework/choice/answer/lessonId')
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
      return this.report.kpScore[index].score * 0.5
    }
  },
  components: {
    Rater,
    Cell,
    IctTitlebar
  }
}
</script>
<style lang="less">
  .choice-mark{
    position: relative;
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
  }
  .choice-mark-mask{
    /*display: none;*/
    position: absolute;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.6);
  }
  .choice-mark-float{
    /*display: none;*/
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 1001;
    width: 14rem;
    height: 17.5rem;
    .title{
      position: absolute;
      top: -2.5rem;
      z-index: 8;
      width: 100%;
      color: #ffcc00;
      text-align: center;
    }
    .rate{
      width: 14rem;
      position: absolute;
      display: block;
      top: -3.5rem;
    }
    .backImg{
      width: 14rem;
      height: 17.5rem;
    }
    .btn{
      position: absolute;
      display: block;
      width: 7rem;
      height: 2.5rem;
      bottom: 1rem;
      transform: translate3d(50%, 0, 0);
      -moz-transform: translate3d(50%, 0, 0);
      -webkit-transform: translate3d(50%, 0, 0);
    }
  }
</style>
