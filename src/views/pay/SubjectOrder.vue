\/**
 * Created by jun on 2016/11/21.
 *
 */
<template>
  <div>
    <pay-base v-ref:pay-base :coupons="coupons" :toubi="toubi" :total="total" :sum="sum" :btn-options="btnOptions" :tip="tip" :sheet-show="sheetShow">
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
  import {courseRecordActions} from '../../vuex/actions'
  import { Device, platformMap } from '../../plugin/device'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  import {getLocalCache} from '../../util/cache'
  export default {
    vuex: {
      getters: {
        isLogin: userGetters.isLogin,
        expenseRecords: courseRecordsGetters.expenseRecords
      },
      actions: {
        loadAllExpenseRecords: courseRecordActions.loadAllExpenseRecords
      }
    },
    data () {
      return {
        tyep: '',
        subjectId: 0,
        courseList: [], //课程列表
        price: 0, // 价格
        coupons: [],  // 优惠列表
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
      // 合计 = price-coupon.userBene
      total () {
        const total = this.price - this.selectedCouponUserBene
        return total >= 0 ? total : 0
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
      // 选择的优惠
      selectedCoupon () {
        return this.coupons[this.selectedCouponIndex]
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

        // 设置监听事件,处理键盘弹出后页面按钮的显示问题
        const {payBase} = this.$refs
        payBase.startListenToHeightChange()

        return this.getSubjectOrder()
      },
      deactivate () {
        this.tyep = ''
        this.subjectId = 0
        this.courseList = [] //课程列表
        this.price = 0 // 价格
        this.coupons = []  // 优惠列表
        this.selectedCouponIndex = 0
        this.currentBalance = 0  // 投币余额
        this.sheetShow = false // 显示支付sheet
        this.statisticData = null //统计数据

        // 关闭监听事件
        const {payBase} = this.$refs
        payBase.stopListenToHeightChange()

        this.$broadcast('pay-page-deactive')
      }

    },
    events: {
      // 优惠信息 选择
      'couponChange' (couponsIndex) {
        this.selectedCouponIndex = couponsIndex
      },
      'payChannelChange' (channel) {
        this.payByChannel(channel)
        this.sheetShow = false
      },
      'payChannelClose' () {
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
        this.statisticData = {
          '实付': this.sum,
          '商品名称': this.courseList[0].title
        }
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.ORDER_CONFIRM_TAP, this.statisticData)
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
              me.onPayFinish()
            }
          }
        ).catch(
          (err) => me.onPayFail(err)
        )
      },

      /**
       * 支付结束
       */
      onPayFinish () {
        const me = this
        me.loadAllExpenseRecords().then(
          function (records) {
            const index = records.findIndex(function (record) {
              return parseInt(record.subjectId) === parseInt(me.subjectId)
            })
            if (index >= 0) {
              me.goToPaySuccess()
            } else {
              setTimeout(
                function () {
                  me.loadAllExpenseRecords().then(
                    function (records) {
                      const index = records.findIndex(function (record) {
                        return parseInt(record.subjectId) === parseInt(me.subjectId)
                      })
                      if (index >= 0) {
                        me.goToPaySuccess()
                      } else {
                        me.onPayFail({
                          type: errorType.FAIL,
                          reason: '暂时未能获取到课程进度，请稍后在“我的课程”页面查看'
                        })
                      }
                    }
                  ).catch(
                    function () {
                      me.onPayFail({
                        type: errorType.FAIL,
                        reason: '暂时未能获取到课程进度，请稍后在“我的课程”页面查看'
                      })
                    }
                  )
                },
                3000
              )
            }
          }
        ).catch(
          function () {
            setTimeout(
              function () {
                me.loadAllExpenseRecords().then(
                  function (records) {
                    const index = records.findIndex(function (record) {
                      return parseInt(record.subjectId) === parseInt(me.subjectId)
                    })
                    if (index >= 0) {
                      me.goToPaySuccess()
                    } else {
                      me.onPayFail({
                        type: errorType.FAIL,
                        reason: '暂时未能获取到课程进度，请稍后在“我的课程”页面查看'
                      })
                    }
                  }
                ).catch(
                  function () {
                    me.onPayFail({
                      type: errorType.FAIL,
                      reason: '暂时未能获取到课程进度，请稍后在“我的课程”页面查看'
                    })
                  }
                )
              },
              3000
            )
          }
        )
      },

      /**
       * 跳转到 支付成功
       */
      goToPaySuccess () {
        this.hideLoading()
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.PAY_SUCCESSFUL, this.statisticData)
        this.$route.router.replace(`/pay/success/S/${this.subjectId}`)
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
      PaySubject,
      PayPic,
      PayPeriod,
      PayBase
    }
  }
</script>
<style lang="less">
</style>
