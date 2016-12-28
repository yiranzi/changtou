/**
* Created by jun on 2016/11/17.
* 支付 订单页 专业版 长投宝
*/
<template>
  <div class="order-vip-strategy">
    <pay-base v-ref:pay-base :coupons="coupons" :toubi="toubi" :total="total" :sum="sum" :btn-options="btnOptions" :tip="tip" :sheet-show="sheetShow">
      <pay-pic :pic="pic"></pay-pic>
      <pay-period :periods="periods"></pay-period>
      <div v-if="proLeftDays && selectedDeduction" class="deduction">长投宝专业版剩余{{proLeftDays}}天,返还￥{{selectedDeduction}}</div>
    </pay-base>
  </div>
</template>
<script>
  import PayPeriod from '../../components/payment/PayPeriod.vue'
  import PayPic from '../../components/payment/PayPic.vue'
  import PayBase from '../../components/payment/PayBase.vue'
  import {getStrategyOrder, goodsType, dealType, pay, payChannel, errorType} from '../../util/pay/dealHelper'
  import {userGetters} from '../../vuex/getters'
  import {userActions} from '../../vuex/actions'
  import { Device, platformMap } from '../../plugin/device'
  import {strategyLevel} from '../../frame/userLevelConfig'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  import {getLocalCache, setLocalCache} from '../../util/cache'
  export default {
    vuex: {
      actions: {
        syncUser: userActions.syncUser
      },
      getters: {
        isLogin: userGetters.isLogin,
        strategy: userGetters.strategy
      }
    },
    data () {
      return {
        order: null, //订单信息
        pic: '', // 图片
        price: 0, // 价格
        periods: [],  // 服务期限列表
        selectedCoupon: null, // 选择的优惠
        selectedCouponIndex: 0,
        selectedPeriod: null, // 选择的服务期限
        selectedPeriodIndex: 0, //  选择的服务期限 的index
        itemId: 1, // 交易 id
        currentBalance: 0,  // 投币余额
        sheetShow: false, // 显示支付sheet
        deductions: [0], // pro 抵扣列表
        selectedDeduction: 0, // 选择的 抵扣金额
        proLeftDays: 0, // pro 剩余时间
        statisticData: null //统计数据
      }
    },
    computed: {
      // 选择的优惠 优惠金额
      selectedCouponUserBene () {
        return this.coupons.length > 0 ? this.coupons[this.selectedCouponIndex].userBene : 0
      },
      // 合计 = price-deduction-coupon.userBene
      total () {
        return this.price - this.selectedDeduction - this.selectedCouponUserBene
      },
      // 使用的投币金额
      toubi () {
        return this.total > this.currentBalance ? this.currentBalance : this.total
      },
      // 按钮上方提示语
      tip () {
        return ''
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
            disabled: !this.isLogin,
            callback: this.onConfirmTap
          }
        }
      },
      coupons () {
        if (this.order && this.price) {
          let coupons = []
          if (this.order.coupons) {
            coupons = this.order.coupons
          }
          if (this.order.card) {
            coupons.push({
              name: '长投卡(7折)',
              userBene: Math.floor((this.price - this.selectedDeduction) * 0.3)
            })
          }
          return coupons
        } else {
          return []
        }
      },
      itemId () {
        return this.selectedPeriodIndex === '1' ? 4 : 3 // 交易用到的itemId //3 一年VIP版 4 两年VIP版
      },
      price () {
        return this.periods.length > 0 ? this.periods[this.selectedPeriodIndex].price : 0
      },
      selectedDeduction () {
        return this.deductions.length > 0 ? this.deductions[ this.selectedPeriodIndex ] ? this.deductions[ this.selectedPeriodIndex ] : this.deductions[0] : 0
      }
    },
    route: {
      data () {
        const me = this

        // 设置监听事件,处理键盘弹出后页面按钮的显示问题
        const {payBase} = this.$refs
        payBase.startListenToHeightChange()

        return Promise.all([getStrategyOrder(goodsType.VIP_STRATEGY)]).then(
            ([order]) => {
            me.order = order
            me.arrangeOrder(order)
        }).catch(
            (err) => console.log(err)
        )
      },

      deactivate () {
        this.order = null //订单信息
        this.pic = '' // 图片
        this.price = 0 // 价格
        this.periods = []  // 服务期限列表
        this.selectedCoupon = null // 选择的优惠
        this.selectedCouponIndex = 0
        this.selectedPeriod = null // 选择的服务期限
        this.selectedPeriodIndex = 0 //  选择的服务期限 的index
        this.itemId = 1 // 交易 id
        this.currentBalance = 0  // 投币余额
        this.sheetShow = false // 显示支付sheet
        this.deductions = [0] // pro 抵扣列表
        this.selectedDeduction = 0 // 选择的 抵扣金额
        this.proLeftDays = 0 // pro 剩余时间
        this.statisticData = null //统计数据

        // 关闭监听事件
        const {payBase} = this.$refs
        payBase.stopListenToHeightChange()

        this.$broadcast('pay-page-deactive')
      }
    },
    events: {
      // 服务期限 更改
      'periodChange' (periodIndex) {
        setLocalCache('strategy-period', {period: parseInt(periodIndex) ? '两年' : '一年'})
        this.selectedPeriodIndex = periodIndex
        this.selectedPeriod = this.periods[periodIndex]
      },
      // 优惠信息 选择
      'couponChange' (couponsIndex) {
        this.selectedCouponIndex = couponsIndex
        this.selectedCoupon = this.coupons[ couponsIndex ]
      },
      'payChannelChange' (channel) {
        this.payByChannel(channel)
        this.sheetShow = false
      },
      'payChannelClose' () {
        this.sheetShow = false
      },
      'codeConfirm' () {
        const me = this
        getStrategyOrder(goodsType.VIP_STRATEGY).then(
          order => {
            me.order = order
            me.arrangeOrder(order)
          }
        )
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
            name: '长投卡VIP版一年服务费',
            price: order.price
          },
          {
            name: '长投卡VIP版两年服务费',
            price: order.price * 2 * order.discount,
            discount: order.discount
          }
        ]
        this.proLeftDays = order.proLeftDays
        this.deductions = [order.oneYearPaid ? order.oneYearPaid : 0, order.twoYearsPaid ? order.twoYearsPaid : 0]
        this.currentBalance = order.currentBalance
      },
      /**
       * 点击确认订单
       */
      onConfirmTap () {
        this.statisticData = {
          '实付': this.sum,
          '商品名称': this.periods[this.selectedPeriodIndex].name
        }
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.ORDER_CONFIRM_TAP, this.statisticData)
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
        this.showLoading()
        Object.assign(this.statisticData, {
          '支付方式': channel === 'wechat' ? '微信-app' : '支付宝-app',
          '入口页': getLocalCache('statistics-entry-page') && getLocalCache('statistics-entry-page').entryPage
        })
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.PAY_CONFIRM_TAP, this.statisticData)
        const me = this
        const trade = {
          sum: this.sum,
          body: '长投课程',
          deal: {
            cardUsed: !!(this.selectedCoupon && !this.selectedCoupon.couponNo),
            channel: (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) ? 'APP' : 'MAPP',
            items: [{
              coupon: null,
              dealType: this.strategy.strategyLevel === strategyLevel.COMMON ? dealType.BUY : this.strategy.strategyLevel === strategyLevel.PRO ? dealType.UPDATE : dealType.POSTPONE,
              itemId: this.itemId,
              mchantType: 6,
              misc: (this.selectedCoupon && !this.selectedCoupon.couponNo) ? this.selectedCoupon.userBene + '' : '',
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
        this.hideLoading()
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.PAY_SUCCESSFUL, this.statisticData)
        this.$route.router.replace(`/pay/success/VS/0`)
        this.syncUser().then(
          user => {
            this.$dispatch(eventMap.SYNC_USER, user)
          }
        )
      },
      onPayFail (err) {
        this.hideLoading()
        Object.assign(this.statisticData, {
          '原因': err.reason
        })
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.PAY_CANCEL, this.statisticData)
        if (err.type === errorType.FAIL) {
          this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.PAY_FAIL, this.statisticData)
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
  .order-vip-strategy{
    .deduction {
      margin: 0.5rem 0;
      height: 2.2rem;
      padding: 0 4%;
      font-size: 0.75rem;
      line-height: 2.2rem;
      border-bottom: #f0eff5 1px solid;
      color: #000;
      background: #fff;
    }
  }
</style>
