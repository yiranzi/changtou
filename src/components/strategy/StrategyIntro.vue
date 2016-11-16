/**
 * Created by jun on 2016/11/14.
 *
 */
<template>
    <div class="strategy-intro">
      <strategy-header><slot></slot></strategy-header>
      <p v-for="item in intro" class="intro-item">{{item}}</p>
    </div>
</template>
<script>
  import strategyHeader from './StrategyHeader.vue'
export default {
  props: {
    intro: Array
  },
  components: {
    strategyHeader
  }
}
</script>
<style lang="less">
  .strategy-intro{
    padding: 0 2rem 0.5rem;
    text-align: left;
    .intro-item {
      padding-bottom: 1rem;
      font-size: 0.65rem;
      color: #898989;
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
</style>
