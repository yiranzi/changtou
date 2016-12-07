/**
 * Created by jun on 2016/12/6.
 *
 */
<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
    <div class="graduation-congratulation">
      <p>付出就有收获</p>
      <p>学习的荣耀属于自己</p>
      <img src="../../assets/styles/image/graduationDiploma/congratulation.png">
      <div class="confirm-btn" v-touch:tap="onConfirmTap">
        领取毕业礼包
      </div>
    </div>
</template>
<script>
export default {
  methods: {
    onConfirmTap () {
      this.hideMask()
      this.$dispatch('graduationCongratulationConfirm')
    }
  }
}
</script>
<style lang="less">
  .graduation-congratulation{
    position: relative;
    width: 580/40rem;
    height: 720/40rem;
    background: #fff;
    padding: 70/40rem 0;
    box-sizing: border-box;
    border-radius: 20px;
    text-align: center;
    color: #444;

    p{
      margin: 0;
    }
    p:nth-of-type(1){
      font-size: 48/40rem;
      margin-bottom: 20/40rem;
    }
    p:nth-of-type(2){
      font-size: 28/40rem;
      margin-bottom: 80/40rem;
    }
    img{
      width: 460/40rem;
      height: 276/40rem;
      margin-bottom: 40/40rem;
    }
    .confirm-btn{
      display: inline-block;
      width: 400/40rem;
      height: 80/40rem;
      line-height: 80/40rem;
      border: 2px solid #ff3c3c;
      border-radius: 40/40rem;
      font-size: 32/40rem;
      color: #ff3c3c;
    }
  }
</style>
