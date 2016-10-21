/**
 * Created by jun on 2016/9/28.
 *  订单 优惠选择

  @example
  <!--<pay-coupons :coupons="coupons" @on-change="change"></pay-coupons>-->
  coupons: [
    {
      name: '长投卡'
    },
    {
      name: '50元优惠券'
    }
  ]

 */
<template>
    <div class="order-coupons" v-if="show">
      <p class="coupons-label">长投卡/优惠券（不可叠加使用）</p>
      <label v-for="coupon in coupons" for="coupons_{{$index}}" class="coupon-item">
        <span>{{coupon.name}}</span>
        <input class="coupon-item-check" type="radio" value="{{$index}}" checked="{{!$index}}" v-model="value" id="coupons_{{$index}}">
        <span class="coupon-item-checked"></span>
      </label>
    </div>
</template>
<script>
export default {
  props: {
    coupons: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: null
    }
  },
  computed: {
    show () {
      if (this.coupons && this.coupons.length > 0) {
        return true
      }
    }
  },
  watch: {
    value (newVal) {
      this.$emit('pay-coupons-change', newVal)
    }
  }
}
</script>
<style lang="less">
  .order-coupons{
    p{
      display: block;
      margin: 0;
    }
    width: 100%;
    background: #fff;
    .coupons-label{
      position: relative;
      height: 72/40rem;
      line-height: 72/40rem;
      padding: 0 4%;
      font-size: 28/40rem;
      color: #898989;
      &:after{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0;
        border-top: 1px solid #f0eff5;
        color: #ccc;
      }
    }
    .coupon-item{
      position: relative;
      display: block;
      height: 88/40rem;
      line-height: 88/40rem;
      padding: 0 4%;
      font-size: 30/40rem;
      color: #656565;
      &:before{
        content: " ";
        position: absolute;
        left: 0;
        top: -1px;
        width: 100%;
        height: 0;
        border-top: 1px solid #f0eff5;
        color: #ccc;
      }
      &:after{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0;
        border-top: 1px solid #f0eff5;
        color: #ccc;
      }
    }
    .coupon-item-checked {
      position: absolute;
      top: 0.6rem;
      right: 0.9rem;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: #ddd 1px solid;
      border-radius: 50%;
    }
    .coupon-item-check{
      position: absolute;
      left: -999em;
        &:checked {
          & + .coupon-item-checked {
            border: 0;
            &:before {
              position: absolute;
              display: block;
              width: 1rem;
              height: 1rem;
              line-height: 1rem;
              font-family: 'myicon';
              content: '\e90c';
              color: #00b0f0;
              font-size: 1rem !important;
            }
          }
        }
    }
  }
</style>
