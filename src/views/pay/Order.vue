/**
* 支付 订单页
     this.$route.router.go('/pay-:type-:id')
     type: 'S' 课程 | 'CT' 通用专题 |'ST' 打包课专题 |'P' 延期
     id: subjectId | ctpId | stpId | subjectId
**/

<template>
  <div>
    <ict-titlebar v-el:titlebar >确认订单</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <pay-subject :course-list="courseList"></pay-subject>
      <pay-coupons :is-show="isCouponsShow()"
                   :coupons="couponList"
                   @pay-coupons-change="onCouponChange"></pay-coupons>
      <pay-total>{{total}}</pay-total>
      <pay-toubi :value="deduction"></pay-toubi>
    </scroller>
    <pay-button :state="state"
                :left-options="leftOptions"
                :right-options="rightOptions"></pay-button>
    <pay-action-sheet :show.sync="isActionSheetShow"
                      :menus="menus"
                      @pay-way-selected="payByChannel"></pay-action-sheet>
    <code-panel :is-show="qrCode.isShow"
                :url="qrCode.url"
                @code-pressed="showCodeConfirm"></code-panel>
    <alert :show.sync="isAlert" button-text="知道了" class="ict-alert">{{alertMsg}}</alert>
    <confirm :show.sync="isConfirmShow"
             title=" "
             :confirm-text="confirmText"
             :cancel-text="cancelText"
             @on-confirm="goSuccess"
             @on-cancel="onCodeCancel">
      <p style="text-align:center;">{{{confirmMsg}}}</p>
    </confirm>
  </div>
</template>

<script>
  import Scroller from 'vux/scroller'
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import IctButton from '../../components/IctButton.vue'
  import PayCoupons from '../../components/payment/PayCoupons.vue'
  import PayTotal from '../../components/payment/PayTotal.vue'
  import PayToubi from '../../components/payment/PayToubi.vue'
  import PayButton from '../../components/payment/PayButtons.vue'
  import PaySubject from '../../components/payment/PaySubject.vue'
  import PayActionSheet from '../../components/payment/PayActionSheet.vue'
  import CodePanel from '../../components/payment/CodePanel.vue'
  import Alert from 'vux/alert'
  import Confirm from 'vux/confirm'
  import { payChannel, goodsType, dealType, getOrder, pay } from '../../util/pay/daelHelper'

  export default{
    data () {
      return {
        type: null, // 商品类型
        id: null, // 商品Id
        scrollerHeight: '0px',
        state: '', // 确认订单按钮 状态
        leftOptions: { // 确认订单按钮 左边
          price: 0, // 实付
          text: '您已经购买过' // 不可购买提示
        },
        rightOptions: { // 确认订单按钮 右边
          text: '回首页',
          callback: this.callback
        },
        courseList: [], // 课程列表
        couponList: [], // 优惠列表
        title: '', // 专题标题 或 课程专题
        price: 0, // 价格
        total: 0, // 共计
        deduction: 0, // 投币抵扣
        currentBalance: 0, // 投币余额
        isActionSheetShow: false, // 支付方式 actionsheet 显示
        menus: {  //  支付方式 actionsheet 显示的内容
          wechat: '微信支付',
          ali: '支付宝支付'
        },
        trade: {}, // 交易订单 发往后台
        qrCode: { // 微信 二维码
          isShow: false,
          url: '' // 付款二维码
        },
        isAlert: false, // alert 显示
        alertMsg: null, // alert message
        isConfirmShow: false, // 扫码提示框
        confirmText: '已支付', // 扫码提示框
        cancelText: '未支付', // 扫码提示框
        confirmMsg: null // 扫码提示框 message
      }
    },
    ready () {
      this.setScrollerHeight()
    },
    components: {
      Scroller,
      IctTitlebar,
      IctButton,
      PayCoupons,
      PayTotal,
      PayToubi,
      PayButton,
      PaySubject,
      PayActionSheet,
      CodePanel,
      Confirm,
      Alert
    },
    route: {
      data ({to: {path}}) {
        let pathArr = path.split('-')
        this.type = pathArr[1]
        this.id = pathArr[2]
        this.getOrderData()
        this.checkAliBrowserPayState()
      }
    },
    methods: {
      /**
       * 设置滚动条高度
       */
      setScrollerHeight () {
        // 设置滚动条高度为 页面高度-titlebar高度-tabbar高度
        const me = this
        const {titlebar} = this.$els
        me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight) + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 150)
      },
      /**
       * 获取订单信息
       */
      getOrderData () {
        var me = this
        getOrder(this.type, this.id).then(
          order => {
            me.courseList = order.courseList
            me.couponList = order.couponList
            me.price = order.price
            me.currentBalance = order.currentBalance
            me.trade = order.trade
          }
        )
      },
      /**
       * 检查是否为支付宝网页支付状态
       * 成功 跳转到成功提示页
       */
      checkAliBrowserPayState () {
        if (window.localStorage.getItem('ali-browser-pay-state') === 'success') {
          window.localStorage.removeItem('ali-browser-pay-state')
          this.goSuccess()
        }
      },

      /**
       * 是否显示优惠列表
       */
      isCouponsShow () {
        //todo 有的不能显示优惠列表
        return true
      },

      /**
       * 更换优惠
       * @param val
         */
      onCouponChange (val) {
        //页面数据 更新

        let total = this.price - this.couponList[val].userBene ? (this.price - this.couponList[val].userBene) : 0
        this.total = total
        this.deduction = this.currentBalance >= this.total ? this.total : this.currentBalance >= 0 ? this.currentBalance : 0

        let sum = total - this.deduction
        this.leftOptions.price = sum

        //交易数据 更新
        if (!this.couponList[val].couponNo) {
          this.trade.deal.cardUsed = true
        } else {
          this.trade.deal.items[0].coupon = this.couponList[val]
        }
        if (this.type === goodsType.POSTPONE) {
          this.trade.deal.items[0].dealType = 3
        }

        if (this.type === goodsType.SUBJECT) {
          this.trade.deal.items[0].price = total
        }

        this.trade.sum = sum
      },

      /**
       * 点击按钮的回调
       */
      callback () {
        if (this.trade.sum > 0) {
          this.isActionSheetShow = true
        } else {
          this.payByChannel(payChannel.TOUBI)
        }
      },

        /**
         * 支付
         * @param channel
         */
      payByChannel (channel) {
//        window.alert('payByChannel')
        pay(this.trade, channel).then(
          result => {
            if (result && result.type === dealType.WX_CODE) {
              // 扫码支付
              this.showCodePanel(result.url)
            } else {
              // 其他支付 （不包括支付宝网页支付）
              this.goSuccess()
            }
          },
          err => {
            this.alertMsg = err.reason
            this.isAlert = true
          }
        )
      },
      /**
       * 显示二维码
       *
       */
      showCodePanel (url) {
        this.qrCode = {
          url: url,
          isShow: true
        }
      },
      /**
       * 二维码支付后 提示框
       */
      showCodeConfirm () {
        this.qrCode = {
          url: '',
          isShow: false
        }
        this.confirmMsg = '是否已完成扫码支付'
        this.isConfirmShow = true
      },
      /**
       * 二维码取消支付
       */
      onCodeCancel () {
        this.isConfirmShow = false
      },
      /**
       * 支付成功
       */
      goSuccess () {
        this.$route.router.go('/pay/success/' + this.type)
      }
    }
  }
</script>

<style>

</style>
