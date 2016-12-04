/**
 * Created by jun on 2016/9/29.
  订单 下方 确认支付按钮

  @example
  <!--<pay-button :state="normal"-->
              <!--:left-options="leftOptions"-->
              <!--:right-options="rightOptions"></pay-button>-->
  leftOptions: {
    price: 100
  },
  rightOptions: {
    callback: this.callback
  },

  <!--<pay-button :state="exception"-->
              <!--:left-options="leftOptions"-->
              <!--:right-options="rightOptions"></pay-button>-->
  leftOptions: {
    text: '您已经购买过长投2016年会，XXXXXXXXX'
  },
  rightOptions: {
    callback: this.callback
  }

 */
<template>
    <div class="pay-button">
      <div class="left" :class="{'left-exception' : (state === 'exception')}">
        <span>{{{leftText}}}</span>
      </div>
      <ict-button class="right"
                  :class="{'right-exception' : (state === 'exception')}"
                  v-touch:tap="onRightTap"
                  :disabled="rightOptions.disabled">{{rightText}}</ict-button>
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
      disabled: Boolean,
      callback: {
        type: Function,
        required: true
      }
    }
  },
  computed: {
    leftText () {
      return this.state === 'exception' ? this.leftOptions.text : ('实付金额<span class="price">￥' + this.leftOptions.price + '</span>')
    },
    rightText () {
      return this.state === 'exception' ? this.rightOptions.text : '确认订单'
    }
  },
  methods: {
    onRightTap () {
      if (!this.rightOptions.disabled) {
        this.rightOptions.callback()
      }
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
    height: 88/40rem;
    line-height: 88/40rem;
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
        line-height: 2rem;
        text-align: center;
        vertical-align: middle;
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
