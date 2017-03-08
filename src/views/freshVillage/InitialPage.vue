/**
  * Created by jun on 2017/1/22.
  * 新手村初始页面
  */
<template>
  <img style="width:100%;height:100%;" :src="bgSrc" v-touch:tap="goFreshVillageHomePageTap"/>
</template>

<script>
  export default {
    data () {
      return {
        bgSrc: './static/image/freshVillage/fresh-village-initial-page.png'
      }
    },
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
</style>
