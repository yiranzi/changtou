/**
* Created by jun on 2016/11/14.
*
*/
<template>
  <div class="target-user">
    <strategy-header><slot></slot></strategy-header>
    <div v-for="item in targetUser" class="target-user-item">
      <img class="target-user-img" v-bind:src="item.imgUrl">
      <p class="target-user-content">{{item.content}}</p>
    </div>
  </div>
</template>
<script>
  import strategyHeader from './StrategyHeader.vue'
  export default {
    props: {
      targetUser: Array
    },
    components: {
      strategyHeader
    }
  }
</script>
<style lang="less">
  .target-user{
    text-align: center;
    .target-user-item{
      display: inline-block;
      width: 30%;
      padding-bottom: 0.5rem;
      text-align: center;
      .target-user-img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
      .target-user-content {
        display: inline-block;
        margin-top: 0.5rem;
        font-size: 0.6rem;
        color: #898989;
      }
    }
  }
</style>
