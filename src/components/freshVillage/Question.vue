/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
    <div class="fresh-village-question-page">
      <div class="question-pic">
        <span class="question-title">思考一下</span>
        <div class="village-close-icon-container" v-touch:tap="onCloseTap"><span class="close-icon"></span></div>
      </div>
      <div class="question-content">
        <p>{{question[0]}}</p>
        <p>{{question[1]}}</p>
      </div>
      <div class="choice-item" v-for="option in componentData.options" v-touch:tap="onOptionTap($index +1)">{{$index + 1}}. {{option}}</div>
    </div>
</template>
<script>
  export default {
    props: {
      componentData: Object
    },
    computed: {
      question () {
        return this.componentData.questionText.split('#')
      }
    },
    methods: {
      onCloseTap () {
        this.$dispatch('hideMask')
      },
      onOptionTap (answer) {
        this.$dispatch('villageAnswerQuestion', answer === this.componentData.answer)
      }
    }
  }
</script>
<style lang="less">
  .fresh-village-question-page {
    width: 14.5rem;
    min-height: 22rem;
    border-radius: 20px;
    background-color: #fff;
    .question-pic {
      width: 100%;
      height: 6.5rem;
      background: url("../../../static/image/freshVillage/chapter1-question.png") no-repeat;
      background-size: 100% 100%;
    }
    .question-title {
      display: inline-block;
      font-size: .8rem;
      font-weight: bold;
      color: #444;
      margin: 1rem 0 0 1rem;
    }
    .question-content {
      padding: 1rem;
      font-size: .65rem;
      color: #888;
      line-height: 1rem;
      border-bottom: 1px solid #f0eff5;
      p {
        margin: 0;
      }
    }
    .choice-item {
      padding: .5rem 1rem;
      font-size: .65rem;
      color: #666;
      border-bottom: 1px solid #f0eff5;
      span {
        vertical-align: middle;
      }
    }
  }
  .village-close-icon-container {  /*问题，结果，弹框，箴言，突发事件，鼓励弹框，可用统一关闭按钮样式*/
    display: inline-block;
    position: absolute;
    right: .5rem;
    top: .5rem;
    width: 2rem;
    height: 2rem;
    .close-icon:after {
      position: absolute;
      right: .6rem;
      top: .6rem;
      font-family: 'myicon';
      content: '\e90d';
      color: #aaa;
      font-size: .8rem;
    }
  }
</style>
