/**
 * Created by jun on 2016/9/29.

  @example
  <pay-button :state="normal"
              :left-options="leftOptions"
              :right-options="rightOptions"></pay-button>
  leftOptions: {
    price: 100
  },
  rightOptions: {
    callback: this.callback
  },

  <pay-button :state="exception"
              :left-options="leftOptions"
              :right-options="rightOptions"></pay-button>
  leftOptions: {
    text: '您已经购买过长投2016年会，XXXXXXXXX'
  },
  rightOptions: {
    callback: this.callback
  },

 */
<template>
    <div class="pay-button">
      <div class="left" :class="{'left-exception' : (state === 'exception')}">
        {{{leftText}}}
      </div>
      <ict-button class="right"
                  :class="{'right-exception' : (state === 'exception')}"
                  v-touch:tap="rightOptions.callback">立即购买</ict-button>
    </div>
</template>
<script>
import IctButton from '../IctButton.vue'
export default {
  props: {
    state: String,
    leftOptions: {
      type: Object,
      text: String,
      price: Number
    },
    rightOptions: {
      type: Object,
      text: String,
      callback: {
        type: Function,
        required: true
      }
    }
  },
  computed: {
    leftText () {
      console.log(this.state)
      return this.state === 'exception' ? this.leftOptions.text : ('实付金额<span class="price">￥' + this.leftOptions.price + '</span>')
    }
  },
  components: {
    IctButton
  }
}
</script>
<style lang="less">
  .pay-button{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 98/40rem;
    line-height: 98/40rem;
    display: flex;
    .left{
      padding: 0 30/40rem;
      font-size: 30/40rem;
      color: #000;
      text-align: right;
      background: #fff;
      flex: 750-280;
      .price{
        font-size: 34/40rem;
        color: #ff5b45;
      }
      &-exception{
        text-align: center;
        color: #007aff;
      }
    }
    .right{
      flex: 280;
      height: 100%;
      border-radius: 0;
      font-size: 34/40rem;
      &-exception{
        background: #ff9800;
      }
    }
  }
</style>
