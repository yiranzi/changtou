/**
 * Created by jun on 2016/11/16.
 *
 */
<template>
    <div class="strategy-tip">
      <strategy-header>温馨提示</strategy-header>
      <div class="content">跟随策略存在亏损的可能，建议根据自身风险承受能力和投资目标选择合适的投资策略。</div>
    </div>
</template>
<script>
  import StrategyHeader from './StrategyHeader.vue'
export default {
  components: {
    StrategyHeader
  }
}
</script>
<style lang="less">
  .strategy-tip{
    .strategy-header{
      p{
        margin: 0;
      }
      color:#fcbd00;
      span{
        color: #fdd766;
      }
    }
    .content{
      padding: 0 2rem 2rem;
      font-size: 0.65rem;
      color: #bbb;
    }
  }
</style>
