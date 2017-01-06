<template>
  <div style="height: 100%; width: 100%; background-color: #f6cf3f;">
    <div class="newertest-question" v-bind:class="{'layout-card' : isFloat}">
      <ict-close-btn @close="onCancel"></ict-close-btn>
      <div class="title-box">
        <div class="title">{{currQuestion ? currQuestion.title : ''}}</div>
        <div class="subtitle">{{currQuestion ? currQuestion.subtitle : ''}}</div>
      </div>
      <div class="question">
        <div class="option" v-for="optionArr in options" v-touch:tap="isSelected($index)" v-bind:class="{'selected' : $index === currOpsIndex}">
          <div class="content" >{{optionArr.content}}</div>
        </div>
        <div class="question-tip" :class="isClicked ? 'btn-enable': 'btn-disabled'" v-touch:tap="updateCurrQuIndex(this.currQuIndex)">
          <div class="box">{{btnObj}}</div>
        </div>
      </div>
    </div>
    <div class="question-floating-container" v-show="isFloatShow" :style="floatingStyleObject">
      <div class="question-floating">
        <div class="feedback-img"></div>
        <div class="feedback-content">{{questionArr[this.currQuIndex-1] ? questionArr[this.currQuIndex-1].feedback : ''}}</div>
        <div class="feedback-btn" v-touch:tap="hideAnswerPop">原来如此，下一题</div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  .newertest-question{
    width: 100%;
    background-color: inherit;
    padding-top: 2rem;
    .title-box{
      width: 15.25rem;
      height: 12.35rem;
      background-image: url("../../assets/styles/image/newertest/questionBgImg.png");
      background-size: 100% 100%;
      margin: 0 auto;
      padding: 3.5rem 0.5rem 0 0.5rem;
      position: relative;
      .title{
        font-size: 1.1rem;
        font-weight: bold;
        color: #333;
      }
      .subtitle{
        width: 8rem;
        position: absolute;
        top: 9rem;
        right: 0.5rem;
        font-size: 0.8rem;
        font-weight: bold;
        color: #333;
      }
    }
    .question{
      height: 222/20rem;
      padding: 1.25rem 1.75rem;
      position: relative;

      .option{
        display: inline-block;
        vertical-align: top;
        margin-right: 0.7rem;
        width: 9.7rem;
        height: 3.2rem;
        margin-bottom: 0.5rem;
        font-size: 0.8rem;
        font-weight: bold;
        color: #e2af04;
        line-height: 3.2rem;
        text-align: center;
        background-size: 100% 100%;
        background-image: url("../../assets/styles/image/newertest/option.png");
        .content{
          display: inline-block;
          padding: 0 1.5rem;
          vertical-align: middle;
          line-height: 1rem;
        }
      }
      .selected{
        color: #333;
        background: url("../../assets/styles/image/newertest/selected.png") center center no-repeat;
        background-size: 100%;
      }
      .question-tip{
        position: absolute;
        top: 1.25rem;
        right: 1.75rem;
        width: 4.3em;
        height: 10.675rem;
        background-image: url("../../assets/styles/image/newertest/answerButton.png");
        background-size: 100%;
      /*  line-height: 10.675rem;  */
        text-align: center;
        .box{
          font-size: 1.3rem;
          font-weight: bold;
          /* -webkit-writing-mode: vertical-rl; */
          position: absolute;
          left: 28%;
          top: 30%;
          width: 47%;
        }
      }
      .btn-disabled{
        color: #ddd;
      }
      .btn-enable{
        color: #e2af04;
      }
    }
  }
  .layout-card{
    overflow: hidden;
    position: relative;
  }
  .question-floating-container {
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
  }
  .question-floating{
    width: 90%;
    height: 18.7rem;
    margin: auto auto;
    margin-top: 40%;
    background-image: url("../../assets/styles/image/newertest/feedbackBg.png");
    background-size: 100%;
    padding-top: 1px;
    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    .feedback-img{
      width: 100%;
      height: 3.5rem;
      margin: 3.5rem 0 1.25rem 0;
      background: url("../../assets/styles/image/newertest/feedbackImg.png")center center no-repeat;
      background-size: contain;
    }
    .feedback-content{
      width: 70%;
      padding: 0 2.5rem;
      font-size: 0.75rem;
      color: #333;
      font-weight: bold;
    }
    .feedback-btn{
      margin: 2rem;
      line-height: 3rem;
      font-size: 1rem;
      color: #e2af04;
      font-weight: bold;
      text-align: center;
      background-image: url("../../assets/styles/image/newertest/feedbackBtn.png");
      background-size: 100% 100%;
    }
  }
</style>
<script>
  import {newertestActions} from '../../vuex/actions'
  import IctCloseBtn from '../../components/IctCloseBtn.vue'
//  import {newertestGetters} from '../../vuex/getters'

  export default {
    vuex: {
      actions: {
        loadQuestion: newertestActions.loadQuestion,
        postReport: newertestActions.postReport
      },
      getters: {
//        questionArr: newertestGetters.questionArr
      }
    },

    data () {
      return {
        currQuIndex: 0, //当前题目序号
        currOpsIndex: -1, //当前选项
        maxQuIndex: 7, //最大的题目序号
        isClicked: false, // 是否点击选项
        isFloatShow: false, // 是否显示浮层
        answer: [], //答案
        comboId: 0, //模板id
        level: 0, //等级
        questionArr: [],
        floatingStyleObject: {
          height: window.document.body.offsetHeight + 'px',
          width: window.document.body.offsetWidth + 'px'
        }
      }
    },

    computed: {
      currQuestion () {
        return this.questionArr[this.currQuIndex]
      },

      //当前问题
      options () {
        return this.currQuestion ? this.currQuestion.options : []
      },

      //按钮显示
      btnObj () {
        const feedback = this.currQuestion ? this.currQuestion.feedback : ''
        let btnWord = '下一题'
        if (feedback) {
          btnWord = '小秘密'
        } else if (this.currQuIndex === this.maxQuIndex) {
          btnWord = '大揭秘'
        }
        return btnWord
      }
    },

    watch: {
      'currQuIndex': function (newIndex) {
        this.isClicked = false
      }
    },

    route: {
      data (transition) {
        // 此页面禁止back回退
        this.forbidBackAction()

        const me = this
        this.loadQuestion().then(
          function (question) {
            transition.next({questionArr: question})
          },
          function () {
            me.showAlert('加载信息失败，请重新加载')
          }
        )
      },

      deactivate () {
        // 回复back回退
        this.resumeBackAction()
      }
    },
    methods: {
      onCancel () {
        this.$route.router.go('/main')
      },
      /**
       * 点击按钮，更新当前题目进度
       * 若到最后一题直接跳转到结果页
       */
      updateCurrQuIndex (currQuIndex) {
        if (!this.isClicked) {
          return
        } else {
          if (this.currQuestion.feedback) {
            this.isFloatShow = true
          }
          this.answer.push(this.currOpsIndex)
          this.currOpsIndex = -1
          if (currQuIndex > -1 && currQuIndex < this.maxQuIndex) {
            this.currQuIndex = currQuIndex + 1
          } else if (currQuIndex === this.maxQuIndex) {
            this.computeLevelId()
            const me = this
            this.postReport(this.comboId, this.level).then(
              function () {
                me.$route.router.replace('/newertest/ending')
                me.reset()
              },
              function (err) {
                console.log('err', err)
              }
            )
          }
        }
      },
      //选中选项
      isSelected (index) {
        this.isClicked = true
        this.currOpsIndex = index
      },
      //隐藏浮层
      hideAnswerPop () {
        this.isFloatShow = false
      },
      //计算等级，模板id
      computeLevelId () {
        let secondSelected = this.answer[1]
        const eighthSelected = this.answer[7]
        this.level = Number(secondSelected) + 1
        if (secondSelected < 2) {
          secondSelected = 0
        }
        const sum = Number(secondSelected) + Number(eighthSelected)
        this.comboId = sum + 1
      },
      //刷新页面
      reset () {
        this.currQuIndex = 0
        this.currOpsIndex = -1
      }
    },
    components: {
      IctCloseBtn
    }
  }
</script>
