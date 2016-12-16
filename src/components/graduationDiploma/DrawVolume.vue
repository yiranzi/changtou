/**
 * Created by jun on 2016/12/6.
 * 抽奖 反馈
 */
<template>
    <div class="graduation-draw-volume">
      <img src="../../../static/image/graduationDiploma/draw-volume-bg.png">
      <p class="graduation-tip">获得 <span>+<slot name="data"></slot></span> 积分</p>
      <div class="confirm-btn" v-touch:tap="onConfirmTap"></div>
    </div>
</template>
<script>
export default {
  methods: {
    onConfirmTap () {
      this.hideMask()
    }
  }
}
</script>
<style lang="less">
  .graduation-draw-volume{
    position: relative;
    width: 750/40rem;
    height: 1100/40rem;
    img{
      width: 750/40rem;
      height: 1100/40rem;
    }
    .graduation-tip{
      position: absolute;
      z-index: 2;
      top: 460/40rem;
      width: 100%;
      text-align: center;
      font-size: 42/40rem;
      font-weight: bold;
      color: #ff9800;
      span{
        font-size: 60/40rem;
        font-weight: bold;
        color: #ff5357;
      }
    }
    .confirm-btn{
      position: absolute;
      z-index: 2;
      top: 840/40rem;
      left: 195/40rem;
      width: 360/40rem;
      height: 76/40rem;
      background: url('../../assets/styles/image/graduationDiploma/draw-volume-btn.png') 50% 50% no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
