<template>
  <div>
    <div class="jump-btn" v-touch:tap="goNavigator">跳过</div>
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
    background: url("../../static/image/guideView.jpg");
    background-size: contain
  }
  .jump-btn{
    text-align: center;
    position: absolute;
    right: .75rem;
    top: 1.05rem;
    width: 2.7rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: .65rem;
    color: #666;
    background-color: #fff;
    opacity: .5;
  }
</style>
