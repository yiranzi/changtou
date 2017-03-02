/**
  * Created by jun on 2017/1/22.
  * 新增加的新手村初始页面
  */
<template>
  <div class="go-fresh-village-home-page" v-touch:tap="goFreshVillageHomePageTap"></div>
</template>

<script>
  export default {
    methods: {
      /*
      * 跳转到新手村答题主页面
      * */
      goFreshVillageHomePageTap () {
        //进入新手村的首页

      }
    }
  }
</script>

<style style="less">
  .go-fresh-village-home-page {
    width: 100%;
    height: 100%;
    background: url('../../../static/image/freshVillage/freshVillageInitialPage.png') center center no-repeat / contain;
  }
</style>
