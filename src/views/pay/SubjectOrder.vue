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
  import {getOrder, dealType, pay, payChannel, errorType} from '../../util/pay/dealHelper'
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
        let subjectIndex = this.expenseRecords.findIndex(function (record) {
           if (this.subjectId === record.subjectId) {
            return true
            }
        })
        return !(this.isLogin && (subjectIndex >= 0))
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
        const me = this
        this.type = pathArr[1]
        this.subjectId = parseInt(pathArr[2])
        return Promise.all([getOrder(this.type, this.subjectId)]).then(
            ([order]) => {
            me.arrangeOrder(order)
      }).catch(
          (err) => console.log(err)
      ) }
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
        const me = this
        getOrder(this.type, this.subjectId).then(order => me.arrangeOrder(order))
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
        this.courseList = [{
          pic: order.pic,
          title: order.title,
          subtitle: order.subtitle,
          price: order.price
        }]
        this.price = order.price
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
            cardUsed: !!(this.selectedCoupon && !this.selectedCoupon.couponNo),
            channel: (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) ? 'APP' : 'MAPP',
            items: [{
              coupon: (this.selectedCoupon && this.selectedCoupon.couponNo) ? this.selectedCoupon : null,
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
