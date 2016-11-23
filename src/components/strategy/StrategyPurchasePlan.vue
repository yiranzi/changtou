/**
* Created by jun on 2016/11/14.
*
*/
<template>
  <div class="strategy-options">
    <strategy-header><slot></slot></strategy-header>
    <img v-bind:src="options">
  </div>
</template>
<script>
  import strategyHeader from './StrategyHeader.vue'
  export default {
    props: {
      options: String
    },
    components: {
      strategyHeader
    }
  }
</script>
<style lang="less">
  .strategy-options{
    text-align: center;
    img{
      margin: 0 auto;
      padding-bottom: 0.5rem;
      width: 14.25rem;
      height: 16rem;
    }
  }
</style>
