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
        <pay-coupons :coupons="coupons" @pay-coupons-change="onCouponChange"></pay-coupons>
        <pay-total>{{total}}</pay-total>
        <pay-toubi :value="toubi"></pay-toubi>
        <fast-login @login-tap="onLoginTap" @code-confirm="onCodeConfirm"></fast-login>
      </scroller>
      <div class="tip-on-btn" v-el:tip>{{tip}}</div>
      <pay-button :state="btnOptions.state" :left-options="btnOptions.leftOptions" :right-options="btnOptions.rightOptions" v-el:btns v-show="isShowBottomBtn"></pay-button>
      <pay-action-sheet :show.sync="sheetShow" :menus="actionSheet.menus" @pay-way-selected="onPayChannelChange"></pay-action-sheet>
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
    sheetShow: Boolean
  },

  vuex: {
    getters: {
      islogin: userGetters.isLogin
    }
  },
  data () {
    return {
      scrollerHeight: '0px',
      actionSheet: {
        menus: {
          wechat: '微信支付',
          ali: '支付宝支付'
        }
      },
      isShowBottomBtn: true
    }
  },
  computed: {
    rightOptions () {
      return {
        callback: this.barRightOptions.callback,
        disabled: this.barRightOptions.disabled
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
      isKeyboardPop = true
      this.hideBtnWhenKeyboardShow()
    },

    /**
     * input控件失去焦点
     */
    'ictInputBlur': function (inputId) {
      isKeyboardPop = false
      setTimeout(() => {
        if (!isKeyboardPop) {
        this.showBtnWhenKeyboardHide()
        }
      }, 500)
    }
  },

  methods: {
    onCouponChange (newCouponIndex) {
      this.$emit('pay-coupons-change', this.coupons[newCouponIndex])
    },
    onPayChannelChange (payWay) {
      this.$dispatch('payChannelChange', payWay)
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
