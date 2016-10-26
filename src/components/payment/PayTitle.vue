/**
 * Created by jun on 2016/10/18.
  订单 专题title

  @example

 */
<template>
    <div class="pay-title" v-if="show">
      <slot>{{title}}</slot>
      <span class="price-span">价格：<span>￥{{price}}</span></span>
    </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    price: Number
  }
}
</script>
<style lang="less">
  .pay-title{
    position: relative;
    height: 2.5rem;
    width: 100%;
    font-size: 0.75rem;
    line-height: 2.5rem;
    padding: 0 0.5rem;
    color: #000;
    background: #fff;
    border-bottom: 1px #f0eff5 solid;
    .price-span{
      display: inline-block;
      position: absolute;
      right: 1.5rem;
      span{
        font-size: 1rem;
        color: #ff5b45;
      }
    }
  }
</style>
