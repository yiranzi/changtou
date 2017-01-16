<template>
    <div class="daily-question">
      <ict-back-btn></ict-back-btn>
      <div class="top">
        <img class="question-img" v-bind:src="dailyQuestion.bgImg">
        <div class="question-title">{{dailyQuestion.content}}</div>
      </div>
      <div class="content" v-for="option in dailyQuestion.options" v-touch:tap="goToDailyQuestionAnswer(option.id)">
        <div class="sequence">
          <span>{{getOptionLetters($index)}}</span>
        </div>
        <div class="desc">{{option.content}}</div>
      </div>
    </div>
</template>
<style lang="less">
  .daily-question{
    .top{
      position: relative;
      margin-bottom: 1rem;
      .question-img{
        width: 100%;
      }
      .question-title{
        width: 100%;
        font-size: 0.65rem;
        color: #fff;
        background-color: #000;
        opacity: 0.7;
        position: absolute;
        bottom: 0;
        padding: 0.5rem 1rem;
        box-sizing: border-box;
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
        padding-top: 1rem;
        height: 2rem;
        line-height: 1rem;
        color: #666;
      }
    }

  }
</style>
<script>
  import IctBackBtn from '../../components/IctCourseBackBtn.vue'
  import {dailyQuestionActions} from '../../vuex/actions'
  import {dailyQuestionGetters, userGetters} from '../../vuex/getters'
  export default {
    vuex: {
      actions: {
        loadDailyQuestion: dailyQuestionActions.loadDailyQuestion,
        submitAnswer: dailyQuestionActions.submitAnswer
      },
      getters: {
        dailyQuestion: dailyQuestionGetters.question,
        isLogin: userGetters.isLogin //是否登录
      }
    },
    data () {
      return {
        isAlert: false
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
      getOptionLetters (index) {
        const arr = ['A', 'B', 'C', 'D', 'E', 'F']
        return arr[index]
      },
      goToDailyQuestionAnswer (selectedOption) {
        let questionid = this.dailyQuestion.id
        this.dailyQuestion.selectedOption = selectedOption.toString()
        if (this.isLogin) {
          const me = this
          me.submitAnswer(questionid, selectedOption).then(
            function () {
              me.$route.router.replace('answer')
            },
            function () {
              me.showAlert({message: '您的答案提交失败,请重试!', btnText: '知道了'})
            }
          )
        } else {
          this.$route.router.replace('answer')
        }
      },
      /**
       * 弹框的显示和隐藏
       */
      onShow () {
        console.log('onShow')
      },
      //点击提示框按钮确认跳转到反馈页
      onHide () {
        this.$route.router.replace('answer')
      }
    },
    components: {
      IctBackBtn
    }
  }
</script>
