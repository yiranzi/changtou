/**
* 支付 订单页
*     this.$route.router.go('/pay-:type-:id')
*     type: 'S' 课程 | 'CT' 通用专题 |'ST' 打包课专题 |'P' 延期
*     id: subjectId | ctpId | stpId | subjectId
**/

<template>
  <div>
    <ict-titlebar v-el:titlebar >确认订单</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <pay-subject :course-list="courseList"></pay-subject>
      <pay-coupons :is-show="isCouponsShow()" :coupons="couponList" @pay-coupons-change="couponsChange"></pay-coupons>
      <pay-total>{{total}}</pay-total>
      <pay-toubi :value="deduction"></pay-toubi>
    </scroller>
    <pay-button :state="state" :left-options="leftOptions" :right-options="rightOptions"></pay-button>
    <pay-action-sheet :show.sync="isActionSheetShow" :menus="menus" @pay-way-selected="payWaySelected"></pay-action-sheet>
    <code-panel :is-show="qrCode.isShow" :url="qrCode.url" @code-pressed="showCodeConfirm"></code-panel>
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
  import Confirm from 'vux/confirm'
  import { payChannel, goodsType, dealType, getOrder, pay } from '../../util/pay/daelHelper'

  export default{
    data () {
      return {
        type: this.$route.params.type.split('-')[0],
        id: this.$route.params.type.split('-')[1],
        scrollerHeight: '0px',
        state: '',
        leftOptions: {
          price: 0, // 实付
          text: '您已经购买过' // 不可购买提示
        },
        rightOptions: {
          text: '回首页',
          callback: this.callback
        },
        courseList: [],
        couponList: [],
        title: '', // 专题标题 或 课程专题
        price: 0, // 价格
        total: 0, // 共计
        deduction: 0, // 投币抵扣
        currentBalance: 0, // 投币余额
        isActionSheetShow: false,
        menus: {
          wechat: '微信支付',
          ali: '支付宝支付'
        },
        trade: {}, //交易订单
        qrCode: {
          isShow: false,
          url: ''
        },
        isConfirmShow: false,
        confirmText: '已支付',
        cancelText: '未支付',
        confirmMsg: null
      }
    },
    ready () {
      const me = this
      me.setScrollerHeight()
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
      Confirm
    },
    route: {
      data () {
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
       * 是否显示课程列表
       */
      isSubjectShow () {
        if (this.type === goodsType.SUBJECT || this.type === goodsType.COMMON_TOPIC) {
          return true
        } else {
          return false
        }
      },

      /**
       * 是否显示优惠列表
       */
      isCouponsShow () {
        return true
      },

      /**
       * 更换优惠
       * @param val
         */
      couponsChange (val) {
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
       * 选择 支付方式
       */
      payWaySelected (payWay) {
        this.payByChannel(payWay)
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
            if (result.type === dealType.WX_CODE) {
              this.showCodePanel(result.url)
            } else if (result.type === dealType.ALI_BROWSER) {

            } else {
              this.goSuccess()
            }
          },
          err => {
            window.alert(err.reason)
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
