/**
 * Created by jun on 2016/11/14.
 *
 */
<template>
  <p class="strategy-header"><span>●</span><slot>header</slot><span>●</span></p>
</template>
<script>
export default {
  props: {
    header: {
      type: String,
      require: true
    }
  }
}
</script>
<style lang="less">
  p.strategy-header{
    margin: 2rem 0 1rem;
    text-align: center;
    font-size: 0.8rem;
    color: #00b0f0;
    span{
      display: inline-block;
      margin: 0 0.5rem;
      color: #97ebff;
    }
  }
</style>
