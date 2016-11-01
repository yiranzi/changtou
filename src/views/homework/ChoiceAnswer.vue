/**
 * Created by jun on 2016/10/27.
 *
 */
<template>
    <div class="choice-answer">
      <span class="close-icon" v-touch:tap="onCloseTap"></span>
      <div class="choice-title">
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
      currQuestion: choiceGetters.currQuestion,
      totalNum: choiceGetters.totalNum,
      currIndex: choiceGetters.currIndex,
      lessonId: choiceGetters.lessonId,
      postReport: choiceGetters.postReport
    },
    actions: {
      updateAnswer: choiceActions.updateAnswer,
      nextQuestion: choiceActions.goToNextQuestion,
      submitReport: choiceActions.submitReport
    }
  },
  data () {
    return {
      btnText: '下一题', // 按钮文案
      isBtnDisabled: true,  // 按钮是否可用
      isRight: false, // 答对
      isWrong: false, // 答错
      explain: null, // 答案解释
      optionTaped: false, // 当前问题 已回答
      selectedOptionIndex: null //当前问题 回答的index
    }
  },
  computed: {
    // 题目
    title () {
      return `${this.currIndex + 1}/${this.totalNum}${this.currQuestion.title}`
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
    }
  },
  watch: {
    // 生成新报告时 登录提交
    postReport (newReport) {
      if (this.isLogin && newReport.kpScore.length > 0) {
        this.submitReport(newReport)
      }
    }
  },
  methods: {
    /**
     * 点击右上方关闭按钮
     */
    onCloseTap () {
      window.history.back(-1)
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
      this.optionTaped = false
      this.selectedOptionIndex = null
      this.isBtnDisabled = true
      this.explain = null

      if (this.currIndex === this.totalNum - 1) {
        //最后一题
        this.$route.router.replace('/choice/mark')
      } else {
        this.nextQuestion()
      }
    },
    /**
     * 关闭 错误提示
     */
    onExplainClose () {
      this.explain = null
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
