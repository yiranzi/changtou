/**
 * Created by jun on 2016/12/28.
 *
 */
<template>
  <div class="choice-answer-failed">
    <div class="title">{{100 - componentData * 20}}%错误</div>
    <img class="rate" src="../../assets/styles/image/homework/notPassed/failRate.png">
    <img class="backImg" src="../../assets/styles/image/homework/notPassed/failBg.png">
    <img class="btn" src="../../assets/styles/image/homework/notPassed/reTestBtn.png" v-touch:tap="reTest">
  </div>
</template>
<script>
export default {
  props: {
    componentData: Number
  },
  methods: {
    reTest () {
      this.$dispatch('onChoiceReTestTap')
    }
  }
}
</script>
<style lang="less">
  .choice-answer-failed{
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
