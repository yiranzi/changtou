/**
* Created by jun on 2016/12/6.
* 抽奖 未抽中 反馈
*/
<template>
  <div class="graduation-draw-volume-failed" v-touch:tap="onConfirmTap">
    <img src="../../../static/image/graduationDiploma/draw-volume-failed-bg.png">
  </div>
</template>
<script>
  export default {
    methods: {
      onConfirmTap () {
        this.hideMask()
        this.$dispatch('graduationVolumeConfirm')
      }
    }
  }
</script>
<style lang="less">
  .graduation-draw-volume-failed{
    position: relative;
    width: 750/40rem;
    height: 490/40rem;
    img{
      width: 750/40rem;
      height: 490/40rem;
    }
  }
</style>
