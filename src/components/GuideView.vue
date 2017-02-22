<template>
  <div>
    <div class="jump-btn" v-touch:tap="goNavigator"></div>
    <div class="guide-view-pic" v-touch:tap="goClassicReading"></div>
  </div>
</template>

<script>
  export default {
    methods: {
      goClassicReading () {
        this.$route.router.replace('/classic/reading/1')   /*首页classicId，后台要是改变了需要每次都修改这里的代码*/
      },
      goNavigator () {
        this.$route.router.replace('/main')
      }
    }
  }

</script>

<style style="less" scoped>
  .guide-view-pic {
    width: 100%;
    height: 100%;
    background: url("../../static/image/guideView.jpg") no-repeat;
    background-size: 100% 100%;
  }
  .jump-btn{
    background: url("../assets/styles/image/jump.png") no-repeat;
    position: absolute;
    background-size: 100% 100%;;
    right: .75rem;
    top: 1.05rem;
    width: 2.8rem;
    height: 1.2rem;
  }
</style>
