/**
* Created by zyr on 2017/03/01.
* 新手村-给鼓励浮层
*/
<template>
  <div class="village-encouragement">
    <span class="close-icon" v-touch:tap="onCloseTap"></span>
    <div class="village-encouragement-btn" v-touch:tap="onEncouragementTap" v-el:suggestion>跪求鼓励吐槽</div>
  </div>
</template>
<script>
  export default {
    methods: {
      /**
       * 跪求鼓励吐槽
       */
      onEncouragementTap () {
        this.$dispatch('showAdviceEditor')
      },
      /**
       * 右上角关闭窗口
       */
      onCloseTap () {
        this.$dispatch('hideMask')
      }
    }
  }
</script>
<style lang="less">
  .village-encouragement {
    width: 12.5rem;
    height: 16rem;
    background: #e8f5f0 url("../../../static/image/give-encouragement.png") center 4.5rem no-repeat / 7.25rem 5.2rem;
    border-radius: .5rem;
    position: relative;
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
    .village-encouragement-btn {
      width: 8rem;
      height: 1.7rem;
      line-height: 1.7rem;
      background: #49a385;
      border-radius: .85rem;
      margin: 12.25rem auto 0;
      text-align: center;
      font-size: .8rem;
      color: #fff;
    }
  }
</style>
