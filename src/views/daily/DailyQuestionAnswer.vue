<template>
    <div class="question-answer">
      <div class="top-back-btn" v-touch:tap="back"></div>
      <div class="title-box" v-bind:class="{ 'right-tilte': result, 'wrong-title': !result }">
        <img src="../../assets/styles/image/daily/right.png" v-show="result">
        <img src="../../assets/styles/image/daily/wrong.png" v-show="!result">

        <div class="result" v-show="result">Bingo,答对啦！</div>
        <div class="result" v-show="!result">OOPS,答错啦！</div>

        <div class="percentage">{{percentage}}%的人和你选择同一个答案</div>
        <div class="encourage">哎呦，不错嘛！明天继续哦</div>
      </div>
      <div class="answer-box" v-bind:class="{ 'right-answer': result, 'wrong-answer': !result }">
        <hr v-bind:class="{ 'right-tilte': result, 'wrong-title': !result }">
        <div>{{rightAnswer}}</div>
        <hr v-bind:class="{ 'right-tilte': result, 'wrong-title': !result }">
        <img class="icon" src="../../assets/styles/image/daily/rightSeal.png" v-show="result">
        <img class="icon" src="../../assets/styles/image/daily/wrongSeal.png" v-show="!result">
      </div>
      <div class="tip">
        <div><img src="../../assets/styles/image/daily/tip.png">答案提示</div>
        <div>{{dailyQuestion.explanation}}</div>
      </div>
    </div>
</template>
<style lang="less">
  .question-answer{
    width: 100%;
    height: 100%;
    background-color: #fff;
    .top-back-btn {
      position: absolute;
      height: 2rem;
      width: 2rem;
      top: 0.3rem;
      left: 1rem;
      z-index: 20;
    }
    .top-back-btn:before {
      position: absolute;
      display: inline-block;
      font-family: 'myicon';
      content: '\e91b';
      font-size: 1.6rem !important;
      line-height: 2rem;
      width: 2rem;
      color: #999;
    }
    .title-box{
      width: 100%;
      height: 11rem;
      padding-top: 4rem;
      text-align: center;
      color: #fff;
      img{
        display: inline-block;
        width: 6rem;
        height: 5.24rem;
      }
      .result{
        width: 100%;
        height: 1.1rem;
        margin: 1rem 0 0.75rem 0;
      }
      .percentage{
        font-size: 0.65rem;
      }
      .encourage{
        font-size: 0.65rem;
        font-weight: bold;
      }
    }
    .wrong-title{
      background-color: #fe6536;
    }
    .right-tilte{
      background-color: #00b0f0;
    }
    .answer-box{
      padding: 1.5rem 0;
      text-align: center;
      font-size: 0.75rem;
      font-weight: bold;
      position: relative;
      color: #fe6536;
      background-color: #f0eff5;
      hr{
        width: 70%;
        height: 2px;
        border: 0;
      }
      .icon{
        width: 3.6rem;
        height: 3.1rem;
        display: block;
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
      }
    }
    .wrong-answer{
      color: #fe6536;
    }
    .right-answer{
      color: #00b0f0;
    }
    .tip{
      padding: 2rem 1.25rem;
      img{
        width: 11/20rem;
      }
      div:nth-child(1){
        color: #898989;
        font-size: 0.7rem;
      }
      div:nth-child(2){
        color: #aaa;
        font-size: 0.65rem;
      }
    }
  }
</style>
<script>
  import {dailyQuestionGetters} from '../../vuex/getters'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  export default {
    vuex: {
      getters: {
        dailyQuestion: dailyQuestionGetters.question
      }
    },
    computed: {
      percentage () {
        const options = this.dailyQuestion.options
        for (let i = 0; i < options.length; i++) {
          if ((options[i].id + '') === this.dailyQuestion.selectedOption) {
            return options[i].selectedRate
          }
        }
      },
      rightAnswer () {
        const options = this.dailyQuestion.options
        for (let i = 0; i < options.length; i++) {
          if ((options[i].id + '') === this.dailyQuestion.correctOption) {
            return options[i].content
          }
        }
      },
      result () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.DAILY_QUIZ, {
          '题号': this.dailyQuestion.id,
          '用户选择': this.dailyQuestion.selectedOption === this.dailyQuestion.correctOption ? '正确' : '错误'
        })
        return this.dailyQuestion.selectedOption === this.dailyQuestion.correctOption
      }
    },
    methods: {
      back () {
        this.$route.router.go('/main')
      }
    }
  }
</script>
