<template>
  <div class="app-first-screen-view">
    <div v-touch:tap="goNavigator" class="jump-btn">
      <img src="../../assets/styles/image/jump.png">
    </div>
    <img class="guide-view-pic" src="../../../static/image/guideView.jpg" v-touch:tap="goToStart"/>
  </div>
</template>

<script>
  import {eventMap} from '../../frame/eventConfig'
  export default {
    ready () {
      this.$dispatch(eventMap.FIRST_SCREEN_LOADED)
      setTimeout(this.goNavigator, 3000)
    },
    methods: {
      /*
      * 跳转到指定页面
      * */
      goToStart () {
        //2.6.0 跳转到大咖读经典  '/classic/reading/1'
        //2.8.0 跳转到头条精选 '/headline'
        this.$route.router.replace('/headline')   /*首页classicId，后台要是改变了需要每次都修改这里的代码*/
      },
      /*
      * 跳转到首页
      * */
      goNavigator () {
        this.$route.router.replace('/main')
      }
    }
  }

</script>

<style lang="less">
  .app-first-screen-view{
    background: red;
    .guide-view-pic{
      width: 100%;
      height: 100%;
    }
    .jump-btn{
      position: absolute;
      display: block;
      right: .75rem;
      top: 1.05rem;
      padding: 0.5rem;
      img{
        width: 2.8rem;
        height: 1.2rem;
      }
    }
  }
</style>
