/**
* Created by jun on 2016/11/17.
* 支付 订单页 专业版 长投宝
*/
<template>
  <div>
    <pay-base :coupons="coupons"
              :toubi="toubi"
              :total="total"
              :sum="sum"
              :btn-options="btnOptions"
              :tip="tip"
              :sheet-show="sheetShow">
      <pay-pic :pic="pic"></pay-pic>
      <pay-period :periods="periods"></pay-period>
    </pay-base>
  </div>
</template>
<script>
  import PayPeriod from '../../components/payment/PayPeriod.vue'
  import PayPic from '../../components/payment/PayPic.vue'
  import PayBase from '../../components/payment/PayBase.vue'
  import {getStrategyOrder, goodsType, dealType, pay, payChannel, errorType} from '../../util/pay/dealHelper'
  import {userGetters} from '../../vuex/getters'
  import { Device, platformMap } from '../../plugin/device'
  import {strategyLevel} from '../../frame/userLevelConfig'
  export default {
    vuex: {
      getters: {
        isLogin: userGetters.isLogin,
        strategy: userGetters.strategy
      }
    },
    data () {
      return {
        pic: '', // 图片
        price: 0, // 价格
        periods: [],  // 服务期限列表
        coupons: [],  // 优惠列表
        selectedCoupon: null, // 选择的优惠
        selectedPeriod: null, // 选择的服务期限
        itemId: 1, // 交易 id
        currentBalance: 0,  // 投币余额
        sheetShow: false // 显示支付sheet
      }
    },
    computed: {
      // 选择的优惠 优惠金额
      selectedCouponUserBene () {
        return this.selectedCoupon ? this.selectedCoupon.userBene : 0
      },
      // 合计 = price-deduction-coupon.userBene
      total () {
        return this.price - this.selectedCouponUserBene
      },
      // 使用的投币金额
      toubi () {
        return this.total > this.currentBalance ? this.currentBalance : this.total
      },
      // 按钮上方提示语
      tip () {
        return (this.isLogin && this.strategy.strategyLevel === strategyLevel.PRO) ? `已购买长投宝专业版,剩余有效期${this.strategy.strategyLeftDay}天` : (this.isLogin && this.strategy.strategyLevel === strategyLevel.VIP) ? `已购买长投宝VIP版,剩余有效期${this.strategy.strategyLeftDay}天` : ''
      },
      // 实付金额
      sum () {
        return this.total - this.toubi
      },
      // 支付按钮 信息
      btnOptions () {
        return {
          leftOptions: {
            price: this.sum
          },
          rightOptions: {
            disabled: !this.isLogin || (this.isLogin && this.strategy.strategyLevel === strategyLevel.VIP),
            callback: this.onConfirmTap
          }
        }
      }
    },
    route: {
      data () {
        const me = this
        return Promise.all([getStrategyOrder(goodsType.PRO_STRATEGY)]).then(
          ([order]) => {
            me.arrangeOrder(order)
      }).catch(
          (err) => console.log(err)
      ) }
    },
    events: {
      // 服务期限 更改
      'periodChange' (periodIndex) {
        this.itemId = periodIndex ? 2 : 1 // 交易用到的itemId //1 一年专业版 2 两年专业版
        this.price = this.periods[ periodIndex ].price
        if (this.coupons.length > 0 && !this.coupons[ this.coupons.length - 1 ].couponNo) {
          this.coupons[ this.coupons.length - 1 ].userBene = Math.floor(this.periods[ periodIndex ].price * 0.3)
        }
      },
      // 优惠信息 选择
      'couponChange' (couponsIndex) {
        this.selectedCoupon = this.coupons[ couponsIndex ]
      },
      'payChannelChange' (channel) {
        this.payByChannel(channel)
        this.sheetShow = false
      },
      'codeConfirm' () {
        const me = this
        getStrategyOrder(goodsType.PRO_STRATEGY).then(order => me.arrangeOrder(order))
      },
      'loginTap' () {
        this.$route.router.go('/entry')
      }
    },
    methods: {
      /**
       * 整理显示数据
       */
      arrangeOrder (order) {
        this.pic = order.pic
        this.periods = [
          {
            name: '长投卡专业版一年服务费',
            price: order.price
          },
          {
            name: '长投卡专业版两年服务费',
            price: order.price * 2 * order.discount,
            discount: order.discount
          }
        ]
        this.proLeftDays = order.proLeftDays
        this.coupons = this.getCoupons(order)
        this.currentBalance = order.currentBalance
      },
      /**
       *  生成 优惠列表
       */
      getCoupons (order) {
        let coupons = []
        if (order.coupons) {
          coupons = order.coupons
        }
        if (order.card) {
          coupons.push({
            name: '长投卡(7折)',
            userBene: 0
          })
        }
        return coupons
      },
      /**
       * 点击确认订单
       */
      onConfirmTap () {
        if (this.sum > 0) {
          this.sheetShow = true
        } else {
          this.payByChannel(payChannel.TOUBI)
        }
      },
      /**
       * 支付
       * @param channel
       */
      payByChannel (channel) {
        const me = this
        const trade = {
          sum: this.sum,
          body: this.selectedPeriod,
          deal: {
            cardUsed: !!(this.selectedCoupon && !this.selectedCoupon.couponNo),
            channel: (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) ? 'APP' : 'MAPP',
            items: [{
              coupon: null,
              dealType: this.strategy.strategyLevel === strategyLevel.COMMON ? dealType.BUY : dealType.POSTPONE,
              itemId: this.itemId,
              mchantType: 6,
              misc: (this.selectedCoupon && !this.selectedCoupon.couponNo) ? this.selectedCoupon.userBene : 0,
              price: this.total
            }]
          }
        }

        pay({
          channel: channel,
          isSubscriber: me.$route.query.subscriber,
          trade: trade
        }).then(
          result => {
          if (result && result.type === dealType.WX_CODE) {
          // 扫码支付
          me.showCodePanel(result.url)
        } else {
          // 其他支付 （不包括支付宝网页支付）
          me.goToPaySuccess()
        }
      },
        (err) => me.onPayFail(err)
      )
      },
      /**
       * 跳转到 支付成功
       */
      goToPaySuccess () {
        this.$route.router.go(`/pay/success/PS/0`)
      },
      onPayFail (err) {
        if (err.type === errorType.FAIL) {
          this.showAlert({message: err.reason})
        }
      }
    },
    components: {
      PayPic,
      PayPeriod,
      PayBase
    }
  }
</script>
<style lang="less">
</style>
