<template>
  <div class="newertest-question" v-bind:class="{'layout-card' : isFloat}">
    <div class="top">
      <div class="cancel" v-touch:tap="onCancel"></div>
    </div>
    <div class="title-box">
      <div class="title">{{currQuestion.title}}</div>
      <div class="subtitle">{{currQuestion.subtitle}}</div>
    </div>
    <div class="question">
      <div class="option" v-for="optionArr in currQuestion.options">
        <div class="content" v-touch:tap="isSelected($index)" v-bind:class="{'selected' : isClick}">{{optionArr.content}}</div>
      </div>
      <div class="question-tip" v-bind:class="{'btn-disabled': !isClick, 'btn-enable': isClick}" v-touch:tap="updateCurrQuIndex(this.currQuIndex)" >
        <div class="box">
          <span>{{btnObj.first}}</span>
          <span>{{btnObj.second}}</span>
          <span>{{btnObj.third}}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="question-floating" v-show="isFloat">
    <div class="feedback-img"></div>
    <div class="feedback-content">{{currQuestion.feedback}}</div>
    <div class="feedback-btn" v-touch:tap="toHiddenFloating">原来如此，下一题</div>
  </div>
</template>
<style lang="less">
  .newertest-question{
    width: 100%;
    height: 100%;
    background-color: #f6cf3f;
    .top{
      width: 100%;
      height: 2.2rem;
      position: relative;
      .cancel:before{
        position: absolute;
        top: 0.6rem;
        right: 1.3rem;
        line-height: 1.5rem;
        font-family: 'myicon';
        content: '\e90d';
        font-size: 0.8rem;
        color: #aaa;
      }
    }
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
      padding: 1.25rem 1.75rem;
      position: relative;
      .option{
        display: inline-block;
        vertical-align: top;
        margin-right: 0.7rem;
        .content{
          width: 6.7rem;
          height: 2rem;
          margin-bottom: 0.5rem;
          padding:0.6rem 1.5rem;
          font-size: 0.8rem;
          font-weight: bold;
          text-align: center;
          color: #e2af04;
          background-image: url("../../assets/styles/image/newertest/option.png");
          background-size: 100%;
        }
        .selected{
          color: #333;
          background-image: url("../../assets/styles/image/newertest/selected.png");
          background-size: 100%;
        }
      }
      .question-tip{
        position: absolute;
        top: 1.25rem;
        right: 1.75rem;
        width: 4.3em;
        height: 10.675rem;
        background-image: url("../../assets/styles/image/newertest/answerButton.png");
        background-size: 100%;
        line-height: 10.675rem;
        .box{
          display: inline-block;
          width: 100%;
          height: 4.5rem;
          vertical-align: middle;
          span{
            display: block;
            font-size: 1.3rem;
            font-weight: bold;
            line-height: 1.5rem;
            text-align: center;
          }
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
  .question-floating{
    width: 90%;
    height: 18.7rem;
    margin: -9.35rem -8.43rem;
    background-image: url("../../assets/styles/image/newertest/feedbackBg.png");
    background-size: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
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
  import {newertestGetters} from '../../vuex/getters'
  export default {
    vuex: {
      actions: {
        loadQuestion: newertestActions.loadQuestion
      },
      getters: {
        question: newertestGetters.question
      }
    },
    data () {
      return {
        currQuIndex: 0, //当前题目序号
        currOpsIndex: 0, //当前选项
        maxQuIndex: 7, //最大的题目序号
        isClick: false, // 是否可点击
        isFloat: false // 是否显示浮层
      }
    },
    computed: {
      //当前问题
      currQuestion () {
        if (this.question) {
          let currQuestion = this.question[this.currQuIndex]
          console.log('currQuestion', currQuestion)
          return currQuestion
        }
      },
      //按钮显示字
      btnObj () {
        let feedback = this.currQuestion.feedback
        let btnWord = {first: '下', second: '一', third: '题'}
        if (feedback) {
          btnWord = {first: '小', second: '秘', third: '密'}
        } else if (this.currQuIndex === this.maxQuIndex) {
          btnWord = {first: '大', second: '揭', third: '密'}
        }
        return btnWord
      }
    },
    watch: {
      'currQuIndex': function (newIndex) {
        this.currQuIndex = newIndex
        this.isClick = false
      }
    },
    route: {
      data (transition) {
        this.loadQuestion().then(
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
      onCancel () {
        this.$route.router.go('/main')
      },
      /**
       * 点击按钮，更新当前题目进度
       * 若到最后一题直接跳转到结果页
       */
      updateCurrQuIndex (currQuIndex) {
        if (!this.isClick) {
          return
        } else {
          if (currQuIndex > -1 && currQuIndex < this.maxQuIndex) {
            this.currQuIndex = currQuIndex + 1
            console.log('currQuIndex', this.currQuIndex)
          } else if (currQuIndex === this.maxQuIndex) {
            this.$route.router.replace('/newertest/ending')
          }
          if (this.currQuestion.feedback) {
            this.isFloat = true
          }
        }
      },
      //选中选项
      isSelected (index) {
        this.isClick = true
        this.currOpsIndex = index
      },
      //隐藏浮层
      toHiddenFloating () {
        this.isFloat = false
        console.log('currQuIndex', this.currQuIndex)
      }
    },
    components: {

    }
  }
</script>
