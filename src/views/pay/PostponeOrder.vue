/**
 * Created by jun on 2016/11/21.
 *
 */
<template>
  <div>
    <pay-base :bar-right-options="barRightOption"
              :coupons="coupons"
              :toubi="toubi"
              :total="total"
              :sum="sum"
              :btn-options="btnOptions"
              :tip="tip"
              :sheet-show="sheetShow">
      <pay-postpone :postpone-list="postponeList"></pay-postpone>
    </pay-base>
  </div>
</template>
<script>
  import PayPostpone from '../../components/payment/Postpone.vue'
  import PayBase from '../../components/payment/PayBase.vue'
  import {getPostponeOrder, dealType, pay, payChannel, errorType} from '../../util/pay/dealHelper'
  import {userGetters} from '../../vuex/getters'
  import { Device, platformMap } from '../../plugin/device'
    import {statisticsMap} from '../../statistics/statisticsMap'
  export default {
    vuex: {
      getters: {
        isLogin: userGetters.isLogin,
        card: userGetters.card
      }
    },
    data () {
      return {
        barRightOption: {
          text: '延期说明',
          callback: this.goToPostponeExplain.bind(this),
          disabled: false
        },
        price: 0, // 价格
        postponeList: [], //延期列表
        coupons: [],  // 优惠列表
        selectedPostponeIndex: 0, //选择的延期类型的index
        selectedCoupon: null, // 选择的优惠
        currentBalance: 0,  // 投币余额
        misc: '', // 延期的时间
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
      }
    },
    route: {
      data ({to: {path}}) {
          const pathArr = path.split('-')
          const me = this
          this.type = pathArr[1]
          this.subjectId = parseInt(pathArr[2])
        return Promise.all([getPostponeOrder(this.type, this.subjectId)]).then(
            ([order]) => {
            me.arrangeOrder(order)
        }).catch(
            (err) => console.log(err)
        )
      },
      deactivate () {
        this.price = 0// 价格
        this.postponeList = []//延期列表
        this.coupons = [] // 优惠列表
        this.selectedPostponeIndex = 0//选择的延期类型的index
        this.selectedCoupon = null// 选择的优惠
        this.currentBalance = 0 // 投币余额
        this.misc = ''// 延期的时间
        this.sheetShow = false // 显示支付sheet
      }
    },
    events: {
      // 优惠信息 选择
      'couponChange' (couponsIndex) {
        this.selectedCoupon = this.coupons[couponsIndex]
      },
      'payChannelChange' (channel) {
        this.payByChannel(channel)
        this.sheetShow = false
      },
      // 延期时间 选择
      'postponeChange' (postponeIndex) {
        this.selectedPostponeIndex = postponeIndex
        this.price = this.postponeList[postponeIndex].price
        this.misc = this.postponeList[postponeIndex].misc
        // 有长投卡

        if (parseInt(postponeIndex) && this.card) {
          this.coupons = [{
            couponNo: 1,
            name: '长投卡(7折)',
            userBene: Math.ceil(this.postponeList[1].price * 0.3),
            holderBene: 0
          }]
          this.selectedCoupon = this.coupons[0]
        } else {
          this.coupons = []
          this.selectedCoupon = null
        }
      },
      'codeConfirm' () {
        const me = this
        getPostponeOrder(this.type, this.subjectId).then(order => me.arrangeOrder(order))
      },
      'loginTap' () {
        this.$route.router.go('/entry')
      }
    },
    methods: {
      arrangeOrder ({is90DayAvailable, currentBalance}) {
        this.postponeList = [
          {
            name: '延长90天',
            price: 1,
            info: '只可使用一次',
            disabled: is90DayAvailable === 'Y', // 延期过
            misc: '90'
          },
          {
            name: '延长30天',
            price: 50,
            info: '',
            disabled: false,
            misc: '30'
          }
        ]
        this.currentBalance = currentBalance
      },
      onConfirmTap () {
       this.$dispatch(statisticsMap.ORDER_CONFIRM_TAP, {
            '实付': this.sum,
            '商品名称': this.postponeList[this.selectedPostponeIndex].name
        })
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
          body: '长投课程',
          deal: {
            cardUsed: false,
            channel: (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) ? 'APP' : 'MAPP',
            items: [
              {
                coupon: null,
                dealType: dealType.POSTPONE,
                itemId: this.subjectId,
                mchantType: 1,
                misc: this.misc,
                price: this.total
              }
            ]
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
      goToPaySuccess () {
        this.$route.router.go(`/subject/detail/P/${this.subjectId}/0`)
      },
      onPayFail (err) {
        if (err.type === errorType.FAIL) {
          this.showAlert({message: err.reason})
        }
      },
      goToPostponeExplain () {
        this.$route.router.go('/postpone/explain')
      }
    },
    components: {
      PayPostpone,
      PayBase
    }
  }
</script>
<style lang="less">
</style>
