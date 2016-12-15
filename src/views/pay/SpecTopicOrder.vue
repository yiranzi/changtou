/**
 * Created by jun on 2016/11/21.
 *
 */
<template>
  <div class="spec-topic-order">
    <pay-base :coupons="coupons" :toubi="toubi"
              :total="total" :sum="sum"
              :btn-options="btnOptions" :tip="tip"
              :sheet-show="sheetShow">
      <pay-title :price="price">{{title}}</pay-title>
      <pay-subject :course-list="courseList"></pay-subject>
    </pay-base>
  </div>
</template>
<script>
  import PayTitle from '../../components/payment/PayTitle.vue'
  import PaySubject from '../../components/payment/PaySubject.vue'
  import PayBase from '../../components/payment/PayBase.vue'
  import {getOrder, dealType, pay, payChannel, errorType} from '../../util/pay/dealHelper'
  import {userGetters, courseRecordsGetters} from '../../vuex/getters'
  import { Device, platformMap } from '../../plugin/device'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  import {getLocalCache} from '../../util/cache'
  export default {
    vuex: {
      getters: {
        isLogin: userGetters.isLogin,
        expenseRecords: courseRecordsGetters.expenseRecords
      }
    },
    data () {
      return {
        title: '', // 专题名词
        price: 0, // 价格
        courseList: [], //课程列表
        coupons: [],  // 优惠列表
        selectedCoupon: null, // 选择的优惠
        selectedCouponIndex: 0,
        currentBalance: 0,  // 投币余额
        sheetShow: false, // 显示支付sheet
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
        return this.price - this.selectedCouponUserBene
      },
      tip () {
        return ''
      },
      // 使用的投币金额
      toubi () {
        return this.total > this.currentBalance ? this.currentBalance : this.total
      },
      // 实付金额
      sum () {
        return this.total - this.toubi
      },
      canUserBuy () {
        let subjectIds = this.courseList.map(
          function (course) {
            return course.subjectId
          }
        )
        for (let i = 0, length = subjectIds.length; i < length; i++) {
          let subjectIndex = this.expenseRecords.findIndex(function (records) {
            if (subjectIds[i] === records.subjectId) {
              return true
            }
          })
          if (subjectIndex >= 0) {
            return false
          }
        }
        return true
      },
      // 支付按钮 信息
      btnOptions () {
        return {
          state: this.isLogin ? this.canUserBuy ? '' : 'exception' : '',
          leftOptions: {
            text: this.isLogin ? this.canUserBuy ? '' : '已购买过专题中任意一课，不再享受打包购买优惠价' : '',
            price: this.sum
          },
          rightOptions: {
            text: this.isLogin ? this.canUserBuy ? '' : '重新选课' : '',
            disabled: !this.isLogin,
            callback: this.isLogin ? this.canUserBuy ? this.onConfirmTap : this.goBack : this.onConfirmTap
          }
        }
      }
    },
    route: {
      data ({to: {path}}) {
        const pathArr = path.split('-')
        const me = this
        this.type = pathArr[1]
        this.stpId = parseInt(pathArr[2])
        return Promise.all([getOrder(this.type, this.stpId)]).then(
            ([order]) => {
            me.arrangeOrder(order)
        }).catch(
            (err) => console.log(err)
        )
      },
      deactivate () {
        this.title = '' // 专题名词
        this.price = 0 // 价格
        this.courseList = [] //课程列表
        this.coupons = []  // 优惠列表
        this.selectedCoupon = null // 选择的优惠
        this.selectedCouponIndex = 0
        this.currentBalance = 0  // 投币余额
        this.sheetShow = false // 显示支付sheet
        this.statisticData = null //统计数据
      }
    },
    events: {
      // 优惠信息 选择
      'couponChange' (couponsIndex) {
        this.selectedCouponIndex = couponsIndex
        this.selectedCoupon = this.coupons[ couponsIndex ]
      },
      'payChannelChange' (channel) {
        this.payByChannel(channel)
        this.sheetShow = false
      },
      'codeConfirm' () {
        const me = this
        getOrder(this.type, this.stpId).then(order => me.arrangeOrder(order))
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
        this.title = order.stpTitle
        this.price = order.courseItems.reduce(
          (former, latter) => {
            return { price: former.price + latter.price }
          }, { price: 0 }
        ).price
        this.courseList = order.courseItems
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
            userBene: Math.floor(this.price * 0.3)
          })
        }
        return coupons
      },
      /**
       * 点击确认订单
       */
      onConfirmTap () {
        this.statisticData = {
          '实付': this.sum,
          '商品名称': this.title
        }
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.ORDER_CONFIRM_TAP, this.statisticData)
        if (this.sum > 0) {
          this.sheetShow = true
        } else {
          this.payByChannel(payChannel.TOUBI)
        }
      },
      /**
       * 生成 交易的items
       */
      getDealItems (courseList) {
        let items = []
        let priceSum = 0
        for (let i = 0, length = courseList.length; i < length; i++) {
          items.push({
            coupon: null,
            dealType: dealType.BUY,
            itemId: courseList[i].subjectId,
            mchantType: 1,
            misc: '',
            // items.price 为优惠后的价格
            // 在有长投卡的情况下, 前N-1门课的价格为 原价*0.7, 第N门课的价格为 总价-前N门课的items.price的和
            price: this.selectedCoupon ? (i === length - 1) ? (Math.ceil(this.price * 0.7) - priceSum) : Math.floor(courseList[i].price * 0.7) : courseList[i].price
          })
          priceSum += this.selectedCoupon ? Math.floor(courseList[i].price * 0.7) : courseList[i].price
        }
        return items
      },
      /**
       * 支付
       * @param channel
       */
      payByChannel (channel) {
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
            stpId: this.stpId,
            cardUsed: !!(this.selectedCoupon && !this.selectedCoupon.couponNo),
            channel: (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) ? 'APP' : 'MAPP',
            items: this.getDealItems(this.courseList)
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
       * 跳转到 支付成功页
       */
      goToPaySuccess () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.PAY_SUCCESSFUL, this.statisticData)
        this.$route.router.go(`/pay/success/ST/${this.stpId}`)
      },

      /**
       * 跳转到 全部课程列表
       */
      goBack () {
        window.history.go(-2)
      },
      onPayFail (err) {
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
      PayTitle,
      PaySubject,
      PayBase
    }
  }
</script>
<style lang="less">
  .spec-topic-order{
    .pay-button{
      .left-exception{
        line-height: 1rem;
      }
    }
  }
</style>
