/**
  * Created by jun on 2017/1/22.
  * 新手村初始页面
  */
<template>
  <div class="village-home-page" v-touch:tap="goFreshVillageHomePageTap"></div>
</template>

<script>
  export default {
    methods: {
      /*
      * 跳转到新手村答题主页面
      * */
      goFreshVillageHomePageTap () {
        //进入新手村的首页
        this.$route.router.replace('/village/map')
      }
    }
  }
</script>

<style style="less">
  .village-home-page {
    width: 100%;
    height: 100%;
    background: url('../../../static/image/freshVillage/fresh-village-initial-page.png') center center no-repeat / contain;
  }
</style>
