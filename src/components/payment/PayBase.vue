/**
 * Created by jun on 2016/11/17.
 *
 */
<template>
    <div class="order-base">
      <ict-titlebar v-el:titlebar :right-options="rightOptions">确认订单
        <a slot="right" v-if="barRightOptions && barRightOptions.text">{{barRightOptions && barRightOptions.text}}</a>
      </ict-titlebar>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
        <slot></slot>
        <pay-coupons :coupons="coupons" @pay-coupons-change="onCouponChange" :value.sync="couponsValue"></pay-coupons>
        <pay-total>{{total}}</pay-total>
        <pay-toubi :value="toubi"></pay-toubi>
        <fast-login @login-tap="onLoginTap" @code-confirm="onCodeConfirm"></fast-login>
      </scroller>
      <div class="tip-on-btn" v-el:tip>{{tip}}</div>
      <pay-button :state="btnOptions.state" :left-options="btnOptions.leftOptions" :right-options="btnOptions.rightOptions" v-el:btns v-show="isShowBottomBtn"></pay-button>
      <pay-action-sheet :show.sync="sheetShow" :menus="actionSheet.menus" @pay-way-close="onPayWayClose" @pay-way-selected="onPayChannelChange" :sum="sum"></pay-action-sheet>
    </div>
</template>
<script>
  import Scroller from 'vux/scroller'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import PayCoupons from '../../components/payment/PayCoupons.vue'
  import PayTotal from '../../components/payment/PayTotal.vue'
  import PayToubi from '../../components/payment/PayToubi.vue'
  import PayButton from '../../components/payment/PayButtons.vue'
  import FastLogin from '../../components/payment/PayFastLogin.vue'
  import PayActionSheet from '../../components/payment/PayActionSheet.vue'
  import {userGetters} from '../../vuex/getters'
  import {Device, platformMap} from '../../plugin/device'
  import {Agent} from '../../plugin/agent'
  // 页面原有高度, 用来处理键盘弹出事件
  const _originHtmlHeight = window.document.body.offsetHeight
  let isKeyboardPop = false

export default {
  props: {
    coupons: {
      type: Array,
      default: function () {
        return []
      }
    },
    tip: String,
    total: Number,
    toubi: Number,
    barRightOptions: {
      type: Object,
      default: function () {
        return {
          disabled: true,
          callback: null
        }
      }
    },
    btnOptions: {
      type: Object,
      default: function () {
        return {
          show: false,
          state: '',
          leftOptions: {},
          rightOptions: {}
        }
      }
    },
    sheetShow: Boolean,
    sum: Number
  },

  vuex: {
    getters: {
      islogin: userGetters.isLogin
    }
  },
  data () {
    return {
      scrollerHeight: '0px',
      isShowBottomBtn: true,
      timer: 0
    }
  },
  computed: {
    rightOptions () {
      return {
        callback: this.barRightOptions.callback,
        disabled: this.barRightOptions.disabled
      }
    },
    couponsValue () {
      return '0'
    },
    actionSheet () {
      if (Device.platform === platformMap.WEB && Agent.isWx) {
        return {
          menus: {
            wechat: '微信支付'
          }
        }
      } else {
        return {
          menus: {
            ali: '支付宝支付',
            wechat: '微信支付'
          }
        }
      }
    }
  },

  watch: {
    'islogin': function (val) {
      this.isShowBottomBtn = true
    }
  },

  ready () {
    // 设置滚动条高度为 页面高度-titlebar高度-tabbar高度
    const me = this
    me.scrollerHeight = (window.document.body.offsetHeight - this.$els.titlebar.offsetHeight - this.$els.btns.offsetHeight - this.$els.tip.offsetHeight) + 'px'
    setTimeout(function () {
      me.$nextTick(() => {
          me.$refs.scroller.reset({
          top: 0
        })
      })
    }, 150)
  },

  events: {
    /**
     * input控件被选中
     */
    'ictInputFocus': function (inputId) {
      this.stopListenToHeightChange()

      isKeyboardPop = true
      this.hideBtnWhenKeyboardShow()

      this.startListenToHeightChange()
    },

    /**
     * input控件失去焦点
     */
    'ictInputBlur': function (inputId) {
//      isKeyboardPop = false
//      setTimeout(() => {
//        if (!isKeyboardPop) {
//        this.showBtnWhenKeyboardHide()
//        }
//      }, 500)
    }
  },

  methods: {
    onCouponChange (newCouponIndex) {
      this.$emit('pay-coupons-change', this.coupons[newCouponIndex])
    },
    onPayChannelChange (payWay) {
      this.$dispatch('payChannelChange', payWay)
    },
    onPayWayClose () {
      this.$dispatch('payChannelClose')
    },
    onCodeConfirm () {
      this.$dispatch('codeConfirm')
    },
    onLoginTap () {
      this.$dispatch('loginTap')
    },

    /**
     * 键盘弹出
     * 隐藏 下方确认订单
     */
    hideBtnWhenKeyboardShow () {
      this.isShowBottomBtn = false
    },

    /**
     * 键盘隐藏
     * 显示 下方确认订单
     */
    showBtnWhenKeyboardHide () {
      this.isShowBottomBtn = true
    },

    /**
     * 开始监听页面高度改变事件
     */
    startListenToHeightChange () {
      this.timer = setInterval(() => {
          // 键盘弹出并且页面高度没改变 (说明键盘已经隐藏)
          if (isKeyboardPop && _originHtmlHeight === window.document.body.offsetHeight) {
            this.showBtnWhenKeyboardHide()
          }
          isKeyboardPop = _originHtmlHeight !== window.document.body.offsetHeight
      }, 500)
    },

    /**
     * 停止监听页面高度改变事件
     */
    stopListenToHeightChange () {
      clearInterval(this.timer)
    }
  },
  components: {
    Scroller,
    IctTitlebar,
    PayCoupons,
    PayTotal,
    PayToubi,
    PayButton,
    PayActionSheet,
    FastLogin
  }
}
</script>
<style lang="less">
  .order-base{
    .tip-on-btn{
      position: absolute;
      bottom: 2.2rem;
      width: 100%;
      opacity: 0.9;
      background: #ff9800;
      font-size: 0.7rem;
      color: #fff;
      text-align: center;
      line-height: 1.5rem;
    }
  }
</style>
