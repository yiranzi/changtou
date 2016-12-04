/**
* Created by jun on 2016/11/17.
* 订单 策略产品 服务期
*/
<template>
  <div class="order-coupons">
    <label v-for="period in periods" for="coupons_{{$index}}" class="coupon-item">
      <span>{{period.name}}</span>
      <span class="price">￥{{period.price}}</span>
      <span v-if="period.discount">({{period.discount}}折)</span>
      <input class="coupon-item-check" type="radio" value="{{$index}}" checked="{{!$index}}" v-model="value" id="coupons_{{$index}}">
      <span class="coupon-item-checked"></span>
    </label>
  </div>
</template>
<script>
  export default {
    props: {
      periods: Array,
      value: {
        type: Array,
        default: null
      }
    },
    watch: {
      value (newVal) {
        this.$dispatch('periodChange', newVal)
      }
    }
  }
</script>
<style lang="less">
</style>
