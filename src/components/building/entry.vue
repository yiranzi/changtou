<template>
    <div class="building-entry">
      <img class="entry" v-touch:tap="goToBuilding" src="../../../static/image/building/building-entry.png">
    </div>
</template>
<style lang="less">
  .building-entry{
    .entry{
      position: fixed;
      right: 1rem;
      bottom: 3rem;
      width: 98/40rem;
      height: 98/40rem;
    }
  }
</style>
<script>
    export default {
        methods: {
          goToBuilding () {
              /*这里需要换上正确的入口.这个入口是测试入口*/
            this.$route.router.go('/building/introduction')
          }
        }
    }
</script>
