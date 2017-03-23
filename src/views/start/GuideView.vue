<template>
  <div>
    <div class="jump-btn" v-touch:tap="goNavigator"></div>
    <img class="guide-view-pic" src="../../../static/image/guideView.jpg" v-touch:tap="goClassicReading"/>
  </div>
</template>

<script>
//  import {eventMap} from '../../frame/eventConfig'

  export default {
    /*
    *数据加载完成后，隐藏加载动图
    * */
    ready () {
//      this.$dispatch(eventMap.FIRST_SCREEN_LOADED)
    },
    methods: {
      /*
      * 跳转到大咖读经典
      * */
      goClassicReading () {
        this.$route.router.replace('/classic/reading/1')   /*首页classicId，后台要是改变了需要每次都修改这里的代码*/
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

<style style="less" scoped>
  .guide-view-pic {
    width: 100%;
    height: 100%;
  }
  .jump-btn{
    background: url("../../assets/styles/image/jump.png") no-repeat;
    position: absolute;
    background-size: 100% 100%;;
    right: .75rem;
    top: 1.05rem;
    width: 2.8rem;
    height: 1.2rem;
  }
</style>
