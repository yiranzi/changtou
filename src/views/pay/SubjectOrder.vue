\/**
 * Created by jun on 2016/11/21.
 *
 */
<template>
  <div>
    <pay-base :coupons="coupons" :toubi="toubi" :total="total" :sum="sum" :btn-options="btnOptions" :tip="tip" :sheet-show="sheetShow">
      <pay-subject :course-list="courseList"></pay-subject>
    </pay-base>
  </div>
</template>
<script>
  import PaySubject from '../../components/payment/PaySubject.vue'
  import PayPeriod from '../../components/payment/PayPeriod.vue'
  import PayPic from '../../components/payment/PayPic.vue'
  import PayBase from '../../components/payment/PayBase.vue'
  import {getOrder, getIntegral, dealType, pay, payChannel, errorType} from '../../util/pay/dealHelper'
  import {userGetters, courseRecordsGetters} from '../../vuex/getters'
  import { Device, platformMap } from '../../plugin/device'
  export default {
    vuex: {
      getters: {
        isLogin: userGetters.isLogin,
        expenseRecords: courseRecordsGetters.expenseRecords
      }
    },
    data () {
      return {
        tyep: '',
        subjectId: 0,
        courseList: [], //课程列表
        price: 0, // 价格
        coupons: [],  // 优惠列表
        selectedCoupon: null, // 选择的优惠
        currentBalance: 0,  // 投币余额
        sheetShow: false // 显示支付sheet
      }
    },
    computed: {
      // 选择的优惠 优惠金额
      selectedCouponUserBene () {
        return this.selectedCoupon ? this.selectedCoupon.userBene : 0
      },
      // 合计 = price-coupon.userBene
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
      canUserBuy () {
        const me = this
        const subjectIndex = this.expenseRecords.findIndex(function (record) {
            return me.subjectId === record.subjectId
        })
        return !(me.isLogin && (subjectIndex >= 0))
      },
      // 支付按钮 信息
      btnOptions () {
        return {
          state: this.isLogin ? this.canUserBuy ? '' : 'exception' : '',
          leftOptions: {
            text: this.isLogin ? this.canUserBuy ? '' : '此前您已购买过该课程' : '',
            price: this.sum
          },
          rightOptions: {
            text: this.isLogin ? this.canUserBuy ? '' : '去听课' : '',
            disabled: !this.isLogin,
            callback: this.isLogin ? this.canUserBuy ? this.onConfirmBuy : this.goBack : this.onConfirmBuy
          }
        }
      }
    },
    route: {
      data ({to: {path}}) {
        const pathArr = path.split('-')
        this.type = pathArr[1]
        this.subjectId = parseInt(pathArr[2])
        return this.getSubjectOrder()
      },
      deactivate () {
        this.tyep = ''
        this.subjectId = 0
        this.courseList = [] //课程列表
        this.price = 0 // 价格
        this.coupons = []  // 优惠列表
        this.selectedCoupon = null // 选择的优惠
        this.currentBalance = 0  // 投币余额
        this.sheetShow = false // 显示支付sheet
      }

    },
    events: {
      // 优惠信息 选择
      'couponChange' (couponsIndex) {
        this.selectedCoupon = this.coupons[ couponsIndex ]
      },
      'payChannelChange' (channel) {
        this.payByChannel(channel)
        this.sheetShow = false
      },
      'codeConfirm' () {
        this.getSubjectOrder()
      },
      'loginTap' () {
        this.$route.router.go('/entry')
      }
    },
    methods: {
      /**
       * 获取课程订单
       */
      getSubjectOrder () {
        const me = this
        Promise.all([getOrder(this.type, this.subjectId), getIntegral()]).then(
          ([order, integral]) => {
          me.arrangeOrder(order, integral)
        }).catch(
            (err) => console.log(err)
        )
      },

      /**
       * 整理显示数据
       */
      arrangeOrder (order, integral) {
        this.courseList = [{
          pic: order.pic,
          title: order.title,
          subtitle: order.subtitle,
          price: order.price
        }]
        this.price = order.price
        this.coupons = this.getCoupons(order, integral)
        this.currentBalance = order.currentBalance
      },
      /**
       *  生成 优惠列表
       */
      getCoupons (order, integral) {
        let coupons = []
        if (this.subjectId !== 21) { // 21长投打新课
          let availableCoupons = integral.filter(
            (item) => {
              return item.isUsed === 'N'
            }
          )
          coupons = availableCoupons.map(
            (item) => {
              return {
                name: `积分${item.integral}抵¥${item.integral / 100}`,
                userBene: item.integral / 100,
                ticketNo: item.ticketNo
              }
            }
          )
        }
        if (order.card) {
          coupons.push({
            name: '长投卡(7折)',
            userBene: Math.floor(order.price * 0.3)
          })
        }
        return coupons
      },
      /**
       * 点击确认订单
       */
      onConfirmBuy () {
        if (this.sum > 0) {
          this.sheetShow = true
        } else {
          this.payByChannel(payChannel.TOUBI)
        }
      },

      /**
       * 跳转去课程
       */
      goBack () {
        window.history.go(-1)
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
            cardUsed: !!(this.selectedCoupon && !this.selectedCoupon.ticketNo),
            channel: (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) ? 'APP' : 'MAPP',
            items: [{
              integralTicketNo: this.selectedCoupon && this.selectedCoupon.ticketNo,
              coupon: null,
              dealType: dealType.BUY,
              itemId: this.subjectId,
              mchantType: 1,
              misc: '',
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
        this.$route.router.go(`/pay/success/S/${this.subjectId}`)
      },
      onPayFail (err) {
        if (err.type === errorType.FAIL) {
          this.showAlert({message: err.reason})
        }
      }
    },
    components: {
      PaySubject,
      PayPic,
      PayPeriod,
      PayBase
    }
  }
</script>
<style lang="less">
</style>
