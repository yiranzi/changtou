/**
* Created by zyr on 2017/03/01.
* 新手村-给鼓励浮层
*/
<template>
  <div class="village-encouragement">
    <span class="close-icon" v-touch:tap="onCloseTap"></span>
      <img class="encourage-img" :src="imgSrc"/>
      <div class="encourage-btn" v-touch:tap="onEncouragementTap" v-el:suggestion>跪求鼓励吐槽</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        imgSrc: './static/image/give-encouragement.png'
      }
    },
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
    background-color: #e8f5f0;
    border-radius: 20px;
    .encourage-img {
      position: relative;
      margin: 0 auto;
      display: block;
      top: 3.5rem;
      width: 9rem;
    }
    .encourage-btn{
      position: relative;
      width: 8rem;
      height: 1.7rem;
      line-height: 1.7rem;
      background: #49a385;
      border-radius: .85rem;
      text-align: center;
      font-size: .8rem;
      color: #fff;
      margin: 0 auto;
      top: 6rem;
    }
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
  }
</style>
