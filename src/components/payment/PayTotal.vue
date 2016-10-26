
/**
 * Created by jun on 2016/9/29.
 *  订单 合计

  @example
  <!--<pay-total>100</pay-total>-->

 */
<template>
    <div class="pay-total">
      <span class="label">合计:</span>
      ￥<slot>{{total}}</slot>
    </div>
</template>
<script>
export default {
  props: {
    total: Number
  }
}
</script>
<style lang="less">
  .pay-total{
    position: relative;
    height: 88/40rem;
    line-height: 88/40rem;
    padding: 0 36/40rem 0 24/40rem;
    text-align: right;
    font-size: 34/40rem;
    color: #ff5b45;
    background: #fff;
    .label{
      font-size: 30/40rem;
      color: #000;
    }
  }
</style>
