/**
 * Created by jun on 2016/10/27.
 *
 */
<template>
    <div class="choice-answer">
      <span class="close-icon" v-touch:tap="onCloseTap"></span>
      <div class="choice-title">
        {{questionOrderTip}} <br/>
        {{title}}
      </div>
      <div class="choice-options" v-for="option in currQuestion.content"
           :class="{'select-right': optionTaped && $index === selectedOptionIndex && $index === currQuestion.answer, 'select-wrong': optionTaped && $index === selectedOptionIndex && $index !== currQuestion.answer}"
           v-touch:tap="onOptionsTap($index)">
        {{option}}
      </div>
      <ict-button :disabled="isBtnDisabled" v-touch:tap="onNextTap">{{btnText}}</ict-button>
      <div class="explain" v-show="isExplainShow">
        <span class="close-icon" v-touch:tap="onExplainClose"></span>
        <p class="title">答案提示</p>
        <p class="content">{{explain}}</p>
      </div>
    </div>
</template>
<script>
  import IctButton from '../../components/IctButton.vue'
  import { choiceGetters, userGetters } from '../../vuex/getters'
  import { choiceActions } from '../../vuex/actions'
export default {
  vuex: {
    getters: {
      isLogin: userGetters.isLogin,
      choiceQuestion: choiceGetters.choiceQuestionArr,
      knowledgeMap: choiceGetters.knowledgeMap
    },
    actions: {
      getQuestion: choiceActions.getChoiceQuestion,
      updateReport: choiceActions.updateReport,
      submitReport: choiceActions.submitReport
    }
  },
  data () {
    return {
      lessonId: 0,
      btnText: '下一题', // 按钮文案
      isBtnDisabled: true,  // 按钮是否可用
      isRight: false, // 答对
      isWrong: false, // 答错
      explain: '', // 答案解释
      optionTaped: false, // 当前问题 已回答
      selectedOptionIndex: -1, //当前问题 回答的index
      totalNum: 0, //总题数
      rightNum: 0, //答对的题数
      currIndex: 0, //当前题号
      pointData: null, // 计算时使用的临时报告
      report: null // 选择题 报告
    }
  },
  computed: {
    // 题目
    questionOrderTip () {
      if (this.choiceQuestion && this.choiceQuestion.length > 0) {
        return ` ${this.currIndex + 1}/${this.totalNum}  第${this.currIndex + 1}题
       `
      }
    },
    title () {
      if (this.choiceQuestion && this.choiceQuestion.length > 0) {
        return `${this.currQuestion.title}`
      }
    },
    // 是否显示 错误提示
    isExplainShow () {
      return !!this.explain
    },
    // 按钮文案
    btnText () {
      if (this.currIndex === this.totalNum - 1) {
        return '查看结果'
      } else {
        return '下一题'
      }
    },
    totalNum () {
      return this.choiceQuestion.length
    },
    currQuestion () {
      if (this.choiceQuestion && this.choiceQuestion.length > 0) {
        return this.choiceQuestion[this.currIndex]
      } else {
        return {
          content: []
        }
      }
    }
  },
  route: {
    data ({to: {params}}) {
      this.lessonId = params.lessonId
      this.getQuestion(this.lessonId).then(
        (choiceQuestion) => {
          this.initPointData(choiceQuestion)
        }
      )
    }
  },
  methods: {
    initPointData (choiceQuestion) {
      const idArr = []
      const countArr = []
      const rightNumArr = []
      const contentArr = []
      for (let i = 0, length = choiceQuestion.length; i < length; i++) {
        const index = idArr.indexOf(choiceQuestion[i].kpId)
        if (index < 0) {
          idArr.push(choiceQuestion[i].kpId)
          countArr.push(1)
          rightNumArr.push(0)
          contentArr.push(this.knowledgeMap[choiceQuestion[i].kpId])
        } else {
          countArr[index] ++
        }
      }

        this.pointData = {
          idArr,
          countArr,
          rightNumArr,
          contentArr
        }
    },

    /**
     * 点击右上方关闭按钮
     */
    onCloseTap () {
      window.history.back()
      this.resetView()
    },

    /**
     * 重置页面数据
     */
    resetView () {
      this.btnText = '下一题'
      this.isBtnDisabled = true
      this.isRight = false
      this.isWrong = false
      this.explain = ''
      this.optionTaped = false
      this.selectedOptionIndex = -1
      this.totalNum = 0
      this.rightNum = 0
      this.currIndex = 0
      this.currQuestion = null
      this.pointData = null
      this.report = null
    },

    /**
    * 点击选项
    */
    onOptionsTap (index) {
      if (this.optionTaped) {
        return
      }

      this.optionTaped = true
      this.selectedOptionIndex = index
      this.isBtnDisabled = false

      if (this.currQuestion.answer === index) {
        this.updateAnswer(true)
      } else {
        this.updateAnswer(false)
        this.explain = this.currQuestion.explain
      }
    },
    /**
     * 点击 下一题
     */
    onNextTap () {
      // 未选中任何选项
      if (!this.optionTaped) {
        return
      }

      this.optionTaped = false
      this.selectedOptionIndex = -1
      this.isBtnDisabled = true
      this.explain = ''

      //最后一题
      if (this.currIndex === this.totalNum - 1) {
        this.updateReport(this.report)
        const me = this
        //登录 并且 分数>6
        if (this.isLogin && parseInt(this.rightNum / this.totalNum * 10) >= 6) {
          this.submitReport(this.report).then(
            function () {
              me.goToMark()
            }
          ).catch(
            function (err) {
              console.warn(err.message)
            }
          )
        } else {
          me.goToMark()
        }
      } else {
        this.goToNextQuestion()
      }
    },

    /**
     * 跳转到结果页
     */
    goToMark () {
      this.$route.router.replace('/homework/choice/mark')
      setTimeout(
        () => {
          this.resetView()
        }, 300
      )
    },
    /**
     * 关闭 错误提示
     */
    onExplainClose () {
      this.explain = null
    },

      /**
       * 下一题
       */
    goToNextQuestion () {
      this.currIndex ++
    },

      /**
       * 更新 回答
       * @param answer
       */
    updateAnswer (answer) {
        //答对
      if (answer) {
        this.answerRight()
      }
        // 最后一题 计算报告
      if (this.currIndex === this.totalNum - 1) {
        this.calReport()
      }
    },

      /**
       * 回答正确
       */
    answerRight () {
      let index = this.pointData.idArr.indexOf(this.currQuestion.kpId)
      this.pointData.rightNumArr[index] ++
      this.rightNum ++
    },

    /**
     * 生成报告
     */
    calReport () {
      const postReportKpScore = []
      for (var i = 0, length = this.pointData.idArr.length; i < length; i++) {
        postReportKpScore.push({
          kpId: this.pointData.idArr[i],
          score: parseInt(this.pointData.rightNumArr[i] / this.pointData.countArr[i] * 10)
        })
      }
      this.report = {
        kpScore: postReportKpScore,
        lessonId: this.lessonId,
        rightNum: this.rightNum,
        totalNum: this.totalNum
      }
    }
  },
  components: {
    IctButton
  }
}
</script>
<style lang="less">
  .choice-answer{
    p{
      margin: 0;
    }
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 2.95rem;
    background: #fff;
    .close-icon:before{
      position: absolute;
      display: inline-block;
      top: 0;
      right: 0;
      padding: 1rem;
      font-family: 'myicon';
      content: '\e90d';
      font-size: .8rem!important;
      color: #aaa;
    }
    .choice-title{
      margin: 0 1rem 1rem;
      padding: 1rem;
      border-radius: 10px;
      font-size: .65rem;
      line-height: 1rem;
      background: #00b0f0;
      color: #fff;
    }
    .choice-options{
      position: relative;
      margin: 0 2rem .75rem;
      padding: .75rem 1rem;
      background: #f1f1f1;
      border-radius: 10px;
      font-size: .7rem;
      color: #444;
      line-height: .8rem;
    }
    .select-right{
      border: 2px solid #76cb30;
      &:before{
        position: absolute;
        left: -2px;
        top: -2px;
        line-height: 30px;
        font-family: 'myicon';
        content: '\e91e';
        font-size: 1.5rem !important;
        color: #76cb30;
      }
    }
    .select-wrong{
      border: 2px solid #f43b3b;
      &:before{
        position: absolute;
        left: -2px;
        top: -2px;
        line-height: 30px;
        font-family: 'myicon';
        content: '\e91d';
        font-size: 1.5rem !important;
        color: #f43b3b;
      }
    }
    .ict-btn{
      width: 7rem !important;
      margin: 0 auto 0;
      border-radius: 30px;
      border: none;
    }

    .explain{
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: .5rem 1rem;
      background: #f0eff5;
      .title{
        font-size: .65rem;
        color: #444;
      }
      .content{
        padding-top: .5rem;
        font-size: .6rem;
        color: #898989;
      }
      .close-icon:before{
        position: absolute;
        display: block;
        padding: 0;
        font-family: 'myicon';
        content: '\e90d';
        font-size: .8rem!important;
        color: #aaa;
        right: 0;
        top: 0;
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
      }
    }
  }
</style>
