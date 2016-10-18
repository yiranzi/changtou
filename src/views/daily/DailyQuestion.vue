<template>
    <div class="daily-question">
      <div class="top-back-btn" v-touch:tap="back"></div>
      <div class="top">
        <img class="question-img" v-bind:src="dailyQuestion.bgImg">
        <div class="question-title">{{dailyQuestion.content}}</div>
      </div>
      <div class="content" v-for="option in dailyQuestion.options" v-touch:tap="goToDailyQuestionAnswer(option.id)">
        <div class="sequence">
          <span>{{optionLetters($index)}}</span>
        </div>
        <div class="desc">{{option.content}}</div>
      </div>
    </div>
</template>
<style lang="less">
  .daily-question{
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
    .top{
      position: relative;
      margin-bottom: 1rem;
      .question-img{
        width: 100%;
      }
      .question-title{
        width: 335/375;
        font-size: 0.65rem;
        color: #fff;
        background-color: #000;
        opacity: 0.7;
        position: absolute;
        bottom: 0;
        padding: 0.5rem 1rem;
      }
    }
    .content{
      height: 3rem;
      margin: 0.4rem 1rem;
      border: 2px solid #fe6536;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      .sequence{
        display: inline-block;
        vertical-align: top;
        width: 3rem;
        height: 3rem;
        background: url("../../assets/styles/image/daily/sequence.png");
        background-size: 100% 100%;
        line-height: 1.5rem;
        color: #fff;
        border-top-left-radius: 0.3rem;
        border-bottom-left-radius: 0.2rem;
        span{
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          text-align: center;
        }
      }
      .desc{
        display: inline-block;
        vertical-align: top;
        padding: 0.5rem;
        height: 2rem;
        line-height: 1rem;
        color: #666;
      }
    }

  }
</style>
<script>
  import {dailyQuestionActions} from '../../vuex/actions'
  import {dailyQuestionGetters} from '../../vuex/getters'
  export default {
    vuex: {
      actions: {
        loadDailyQuestion: dailyQuestionActions.loadDailyQuestion,
        submitAnswer: dailyQuestionActions.submitAnswer
      },
      getters: {
        dailyQuestion: dailyQuestionGetters.dailyQuestion
      }
    },
    route: {
      data (transition) {
        this.loadDailyQuestion().then(
          function () {
            transition.next()
          },
          function (err) {
            console.log('err', err)
          }
        )
      }
    },
    methods: {
      back () {
        window.history.back()
      },
      optionLetters (index) {
        let arr = ['A', 'B', 'C', 'D', 'E', 'F']
        return arr[index]
      },
      goToDailyQuestionAnswer (selectedOption) {
        let questionid = this.dailyQuestion.id
        this.submitAnswer(questionid, selectedOption).then(
          function () {

          },
          function (err) {
            console.log('err', err)
          }
        )
        this.$route.router.go('quiz/solve')
      }
    },
    components: {
    }
  }
</script>
