/**
* Created by zyr on 2017/03/01.
*
*/
<template>
  <div class="beg-give-encouragement">
    <span class="close-icon" v-touch:tap="onCloseTap"></span>
    <ict-button class="beg-give-encouragement-btn" v-touch:tap="onBegGiveEncouragementTap" v-el:suggestion>跪求给点鼓励</ict-button>
  </div>
</template>
<script>
  import IctButton from '../IctButton.vue'
  export default {
    data () {
      return {

      }
    },
    methods: {
      /**
       * 跪求给点鼓励
       */
      onBegGiveEncouragementTap () {

      },
      /**
       * 右上角关闭窗口
       */
      onCloseTap () {
        this.$dispatch('hideMask')
      }
    },
    components: {
      IctButton
    }
  }
</script>
<style lang="less">
  .beg-give-encouragement {
    width: 12.5rem;
    height: 16rem;
    background: #e8f5f0 url("../../../static/image/give-encouragement.png") center 4.5rem no-repeat / 7.25rem 5.2rem;
    border-radius: .5rem;
    position: relative;
    text-align: center;
    overflow: hidden;
    .close-icon{
      position: absolute;
      display: inline-block;
      top: .75rem;
      right: .75rem;
      line-height: .75rem;
    &:before{
       line-height: .75rem;
       font-family: 'myicon';
       content: '\e90d';
       font-size: .75rem !important;
       color: #aaa;
     }
    }
    .beg-give-encouragement-btn {
      width: 8rem;
      height: 1.7rem;
      background: #49a385;
      border-radius: .85rem;
      margin-top: 12.25rem;
      text-align: center;
      font-size: .8rem;
    }
  }
</style>
