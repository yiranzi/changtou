<template>
  <div class="app-update" v-touch:tap="appUpdateClose">
    <div class="app-update-up">
      <span class="app-update-version">V{{componentData.appUpdateVersion}}</span>
    </div>
    <div class="app-update-down">
      <ul class="app-update-explain">
        <li v-for="item in componentData.appUpdateExplain">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<style lang="less">
  .app-update{
    width: 375/20rem;
    height: 667/20rem;
    background: url("../../static/image/app-update.png") no-repeat center center / 610/40rem 810/40rem;
    .app-update-up{
      width: 326/20rem;
      height: 342/20rem;
      position: relative;
      .app-update-version{
        width: 90/40rem;
        height: 30/40rem;
        background: #00b0f0;
        border-radius: 15px;
        font-size: 22/40rem;
        color: #fff;
        text-align: center;
        line-height: 30/40rem;
        position: absolute;
        bottom: 8/40rem;
        right: 100/40rem;
      }
    }
    .app-update-down{
      height: 325/20rem;
      margin-left: 36/20rem;
      position: relative;
      .app-update-explain{
        margin: 0;
        padding: 0;
        list-style: none;
        color: #5c5c5c;
        font-size: 26/40rem;
        position: absolute;
        top: 60/40rem;
        left: 40/40rem;
        li{
          margin-bottom: .2rem;
        }
      }
    }
  }
</style>
<script>
  export default{
    props: {
      componentData: Object
    },

    methods: {
      appUpdateClose () {
        this.$dispatch('hideMask')
      }
    }
  }
</script>
