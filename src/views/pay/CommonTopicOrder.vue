/**
 * Created by jun on 2016/11/21.
 *
 */
<template>
  <div>
    <pay-base v-ref:pay-base
              :coupons="coupons" :toubi="toubi"
              :total="total" :sum="sum"
              :btn-options="btnOptions" :tip="tip"
              :sheet-show="sheetShow">
      <pay-title :price="price">{{title}}</pay-title>
      <pay-pic :pic="pic"></pay-pic>
    </pay-base>
  </div>
</template>
<script>
  import PayTitle from '../../components/payment/PayTitle.vue'
  import PayPic from '../../components/payment/PayPic.vue'
  import PayBase from '../../components/payment/PayBase.vue'
  import {getOrder, dealType, pay, payChannel, transactionChannel, errorType} from '../../util/pay/dealHelper'
  import {commonTopicActions, userActions} from '../../vuex/actions'
  import {commonTopicGetters, userGetters} from '../../vuex/getters'
  import {Device, platformMap} from '../../plugin/device'
  import {Agent} from '../../plugin/agent'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  import {getLocalCache} from '../../util/cache'
  export default {
    vuex: {
      actions: {
        isCommonTopicBuy: commonTopicActions.isCommonTopicBuy,
        syncUser: userActions.syncUser
      },
      getters: {
        isLogin: userGetters.isLogin,
        isBuyTopic: commonTopicGetters.isBuyTopic
      }
    },
    data () {
      return {
        pic: '', // 图片
        title: '', // 标题
        price: 0, // 价格
        itemId: 0, // 交易项目标识
        mchantType: 0, // 商品类型
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
      selectedCoupon () {
        return this.coupons[this.selectedCouponIndex]
      },
      // 支付按钮 信息
      btnOptions () {
        return {
          state: '', //因长投卡去掉购买限制  state: this.isLogin && this.isBuyTopic ? 'exception' : '',
          leftOptions: {
            price: this.sum,
            text: '' //因长投卡去掉购买限制 text: '你已成功购买过,不可重复购买'
          },
          rightOptions: {
            text: '回首页',
            disabled: !this.isLogin,
            callback: this.onConfirmTap //因长投卡去掉购买限制 callback: this.isBuyTopic ? this.goToHome : this.onConfirmTap
          }
        }
      }
    },
    route: {
      data ({to: {path}}) {
        const pathArr = path.split('-')
        const me = this
        this.type = pathArr[1]
        this.ctpId = parseInt(pathArr[2])

        // 设置监听事件,处理键盘弹出后页面按钮的显示问题
        const {payBase} = this.$refs
        payBase.startListenToHeightChange()

        let promiseArr = []
        promiseArr.push(getOrder(this.type, this.ctpId))

        if (this.isLogin) {
          promiseArr.push(this.isCommonTopicBuy(this.ctpId))
        }

        return Promise.all(promiseArr).then(
          ([order, isBuy]) => {
            me.arrangeOrder(order)
        }).catch(
            (err) => console.log(err)
        )
      },
      deactivate () {
        this.pic = '' // 图片
        this.title = '' // 标题
        this.price = 0 // 价格
        this.itemId = 0 // 交易项目标识
        this.mchantType = 0 // 商品类型
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
        const me = this
        getOrder(this.type, this.ctpId).then(order => me.arrangeOrder(order))
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
        this.title = order.title
        this.price = order.price
        this.itemId = order.itemId
        this.mchantType = order.mchantType
        this.coupons = this.getCoupons(order)
        this.currentBalance = order.currentBalance
      },
      /**
       *  生成 优惠列表
       */
      getCoupons (order) {
        let coupons = []
//
//        if (order.coupons) {
//          coupons = order.coupons
//        }
//        if (order.card) {
//          coupons.push({
//            name: '长投卡(7折)',
//            userBene: Math.floor(this.price * 0.3)
//          })
//        }
        return coupons
      },
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
       * 回到首页
       */
      goToHome () {
        window.history.go(-2)
      },
      /**
       * 支付
       * @param channel
       */
      payByChannel (channel) {
        this.showLoading()
        Object.assign(this.statisticData, {
          '支付方式': Device.platform === platformMap.WEB ? channel === 'wechat' ? '微信-web' : '支付宝-web' : channel === 'wechat' ? '微信-app' : '支付宝-app',
          '入口页': getLocalCache('statistics-entry-page') && getLocalCache('statistics-entry-page').entryPage
        })
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.PAY_CONFIRM_TAP, this.statisticData)
        const me = this
        const trade = {
          sum: this.sum,
          body: '长投课程',
          openId: Device.platform === platformMap.WEB && Agent.isWx ? JSON.parse(window.sessionStorage.getItem('wxOauth2')).openId : null,
          deal: {
            cardUsed: !!(this.selectedCoupon && !this.selectedCoupon.couponNo),
            channel: (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) ? 'APP' : 'MAPP',
            items: [{
              coupon: null,
              dealType: dealType.BUY,
              itemId: this.itemId,
              mchantType: this.mchantType,
              misc: '',
              price: this.total
            }]
          }
        }

        pay({
          channel: channel,
          trade: trade
        }).then(
          result => {
            if (result && result.type && (result.type === transactionChannel.WX_CODE)) {
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
        if (parseInt(this.itemId) === 0 && parseInt(this.mchantType) === 3) {
          //长投卡
          this.syncUser().then(
            this.goToPaySuccess
          )
        } else {
          this.goToPaySuccess()
        }
      },

      /**
       * 支付成功
       */
      goToPaySuccess () {
        this.hideLoading()
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.PAY_SUCCESSFUL, this.statisticData)
        this.$route.router.replace(`/pay/success/CT/${this.ctpId}`)
      },
      /**
       * 支付失败
       */
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
      },

      /**
       * 显示支付二维码
       * @param url
         */
      showCodePanel (url) {
        this.showMask({
          component: 'payment/WxQrCode.vue',
          hideOnMaskTap: true,
          callbackName: 'qrCodePress',
          componentData: url,
          callbackFn: this.onQrCodePress.bind(this) //组件上的
        })
      },

      /**
       * 长按二维码
       */
      onQrCodePress () {
        setTimeout(
          () => {
            this.showConfirm({
              title: '',
              message: '是否完成支付?',
              okText: '已完成',
              okCallback: this.onPayFinish.bind(this),
              cancelText: '未完成',
              cancelCallback: this.hideLoading
            })
          },
          2000
        )
      }
    },
    components: {
      PayTitle,
      PayPic,
      PayBase
    }
  }
</script>
<style lang="less">
</style>
