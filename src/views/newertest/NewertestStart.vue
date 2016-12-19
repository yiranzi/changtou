<template>
    <div class="newertest-start">
      <div class="cancel" v-touch:tap="onCancel"></div>
      <div class="title"></div>
      <div class="introduce-img">
        <img src="../../assets/styles/image/newertest/introduceImg.png">
      </div>
      <div class="start-btn" v-touch:tap="goToNewertestQuestion">
        <img class="start-btn" src="../../assets/styles/image/newertest/btn.png">
      </div>
    </div>
</template>
<style lang="less">
  .newertest-start{
    width: 100%;
    height: 100%;
    background-color: #f6cf3f;
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
    .title{
      position: absolute;
      top: 2.1rem;
      width: 157/20rem;
      height: 1.8rem;
      margin: 0 1.75rem;
      background-image: url("../../assets/styles/image/newertest/title.png");
      background-size: 100%;
    }
    .introduce-img{
      position: absolute;
      top: 4.9rem;
      width: 100%;
      height: 385/20rem;
      text-align: center;
      img{
        width:325/20rem;
        height: 385/20rem;
      }
    }
    .start-btn{
      position: absolute;
      bottom: 1.2rem;
      width: 185/20rem;
      height: 53/20rem;
      text-align: center;
      img{
        width: 185/20rem;
        height: 53/20rem;
      }
    }
    @media all and (max-width: 320px) {
      .introduce-img{
        position: absolute;
        top: 4.5rem;
        width: 100%;
        height: 365/20rem;
        text-align: center;
        img{
          width:295/20rem;
          height: 365/20rem;
        }
      }
      .start-btn{
        position: absolute;
        bottom: 0.7rem;
        width: 165/20rem;
        height: 53/20rem;
        text-align: center;
        img{
          width: 165/20rem;
          height: 53/20rem;
        }
      }
    }
  }
</style>
<script>
  export default {
    route: {
      data () {
        this.forbidBackAction()
      },

      deactivate () {
        this.resumeBackAction()
      }
    },

    methods: {
      onCancel () {
        window.history.back()
      },
      goToNewertestQuestion () {
        this.$route.router.go('/newertest/question')
      }
    }
  }
</script>
