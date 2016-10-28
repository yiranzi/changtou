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
      <pay-title :price="price" :show="titleShow">{{title}}</pay-title>
      <pay-subject :course-list="courseList"></pay-subject>
      <pay-pic :pic="pic" :show="picShow"></pay-pic>
      <pay-postpone :postpone-list="postponeList" @postpone-change="onPostponeChange"></pay-postpone>
      <pay-coupons :coupons="couponList" @pay-coupons-change="onCouponChange"></pay-coupons>
      <pay-total>{{total}}</pay-total>
      <pay-toubi :value="deduction"></pay-toubi>
    </scroller>
    <pay-button :state="btn.state" :left-options="btn.leftOptions" :right-options="btn.rightOptions"></pay-button>
    <pay-action-sheet :show.sync="actionSheet.show" :menus="actionSheet.menus" @pay-way-selected="payByChannel"></pay-action-sheet>
    <code-panel :show="qrCode.show" :url="qrCode.url" @code-pressed="onCodePressed"></code-panel>
    <alert :show.sync="alert.show" button-text="知道了" class="ict-alert">{{alert.msg}}</alert>
    <confirm :show.sync="confirm.show" title=" "
             :confirm-text="confirm.finish.text" :cancel-text="confirm.cancel.text"
             @on-confirm="confirm.finish.callback" @on-cancel="confirm.cancel.callback">
      <p style="text-align:center;">{{confirm.msg}}</p>
    </confirm>
  </div>
</template>

<script>
  import Scroller from 'vux/scroller'
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import IctButton from '../../components/IctButton.vue'
  import PayTitle from '../../components/payment/PayTitle.vue'
  import PayPostpone from '../../components/payment/Postpone.vue'
  import PayCoupons from '../../components/payment/PayCoupons.vue'
  import PayPic from '../../components/payment/PayPic.vue'
  import PayTotal from '../../components/payment/PayTotal.vue'
  import PayToubi from '../../components/payment/PayToubi.vue'
  import PayButton from '../../components/payment/PayButtons.vue'
  import PaySubject from '../../components/payment/PaySubject.vue'
  import PayActionSheet from '../../components/payment/PayActionSheet.vue'
  import CodePanel from '../../components/payment/CodePanel.vue'
  import Alert from 'vux/alert'
  import Confirm from 'vux/confirm'
  import { payChannel, goodsType, dealType, getOrder, pay } from '../../util/pay/dealHelper'

  export default{
    data () {
      return {
        // 页面滚动
        scrollerHeight: '0px',
        // 商品信息
        type: null, // 商品类型
        id: null, // 商品Id
        // 组件是否显示
        picShow: false,
        titleShow: false,
        // 选择的信息
        currPostponeIndex: 0,
        currCouponIndex: 0,
        // 订单信息
        courseList: [], // 课程列表
        couponList: [], // 优惠列表
        currentBalance: 0, // 投币余额
        deduction: 0, // 投币抵扣
        pic: '', //专题 图片
        postponeList: [], //延期列表
        price: 0, // 价格
        title: '', // 标题
        total: 0, // 共计
        trade: {}, // 交易订单 发往后台
        // 确认按钮
        btn: {
          state: '', // 确认订单按钮 状态
          leftOptions: { // 确认订单按钮 左边
            price: 0, // 实付
            text: '您已经购买过' + this.title // 不可购买提示
          },
          rightOptions: { // 确认订单按钮 右边
            callback: this.onConfirmOrder,
            text: '回首页'
          }
        },
        // 选择支付方式
        actionSheet: {
          show: false,
          menus: {
            wechat: '微信支付',
            ali: '支付宝支付'
          }
        },
        // 微信 二维码
        qrCode: {
          show: false,
          url: ''
        },
        // 警告 提示框
        alert: {
          show: false,
          msg: null
        },
        // 扫码提示框
        confirm: {
          show: false,
          finish: {
            text: '',
            callback: null
          },
          cancel: {
            text: '',
            callback: null
          },
          msg: ''
        }
      }
    },
    watch: {
      price (newPrice) {
        this.calculate()
      },
      currCouponIndex (newIndex) {
        this.calculate()
      }
    },
    route: {
      data ({to: {path}}) {
        const pathArr = path.split('-')
        const me = this
        this.type = pathArr[1]
        this.id = parseInt(pathArr[2])
        this.checkAliBrowserPayState()
        return Promise.all([getOrder(this.type, this.id)]).then(
            ([order]) => {
              return order
            }
        ).catch(
          err => me.showAlert(err.message)
        )
      },
      deactivate () {
        this.resumeView()
      }
    },
    ready () {
      this.setScrollerHeight()
      this.refreshView()
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
       * 刷新页面组件
       */
      refreshView () {
          if (this.type === goodsType.SPEC_TOPIC) {
            // 打包课专题 显示title
            this.titleShow = true
          }

          if (this.type === goodsType.COMMON_TOPIC) {
            // 图片专题 显示title 和 宣传图
            this.titleShow = true
            this.picShow = true
          }
      },

      resumeView () {
        this.type = null
        this.id = null
        this.picShow = false
        this.titleShow = false
        this.currPostponeIndex = 0
        this.currCouponIndex = 0
        this.courseList = []
        this.couponList = []
        this.currentBalance = 0
        this.deduction = 0
        this.pic = ''
        this.postponeList = []
        this.price = 0
        this.title = ''
        this.total = 0
        this.trade = {}

        this.btn = {
          state: '',
          leftOptions: {
            price: 0,
            text: '您已经购买过' + this.title
          },
          rightOptions: {
            callback: this.onConfirmOrder,
            text: '回首页'
          }
        }
        this.actionSheet = {
          show: false,
          menus: {
            wechat: '微信支付',
            ali: '支付宝支付'
          }
        }
        this.qrCode = {
          show: false,
          url: ''
        }
        this.alert = {
          show: false,
          msg: null
        }
        this.confirm = {
          show: false,
          finish: {
            text: '',
            callback: null
          },
          cancel: {
            text: '',
            callback: null
          },
          msg: ''
        }
      },

      /**
       * 检查是否为支付宝网页支付状态
       * 成功 跳转到成功提示页
       */
      checkAliBrowserPayState () {
        if (window.sessionStorage.getItem('ali-browser-pay-state') === 'success') {
          window.sessionStorage.removeItem('ali-browser-pay-state')
          this.gotoPaySuccess()
        }
      },

      /**
       * 点击 切换优惠信息
       * @param couponIndex
         */
      onCouponChange (couponIndex) {
        this.currCouponIndex = couponIndex
      },

      /**
       * 点击 更换延期类型
       * @param PostponeIndex
       */
      onPostponeChange (PostponeIndex) {
        let postpone = this.postponeList[PostponeIndex]
        this.price = postpone.price
        this.trade.deal.items[0].misc = postpone.misc
        this.currPostponeIndex = PostponeIndex
      },

      /**
       * 点击确认订单
       */
      onConfirmOrder () {
        if (this.trade.sum > 0) {
          this.actionSheet.show = true
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
        pay(
          { trade: me.trade,
            channel: channel,
            isSubscriber: me.$route.query.subscriber
          }
        ).then(
          result => {
            if (result && result.type === dealType.WX_CODE) {
              // 扫码支付
              me.showCodePanel(result.url)
            } else {
              // 其他支付 （不包括支付宝网页支付）
              me.gotoPaySuccess()
            }
          },
          err => me.showAlert(err.reason)
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
       * 长按二维码后
       */
      onCodePressed () {
        this.resumeCodePanel()
        this.showCodeConfirm()
      },

      /**
       * 二维码支付后 提示框
       */
      showCodeConfirm () {
        this.confirm = {
          show: true,
            finish: {
            text: '已支付',
              callback: this.gotoPaySuccess
          },
          cancel: {
            text: '未支付',
              callback: this.resumeConfirm
          },
          msg: '是否已完成扫码支付'
        }
      },

      showAlert (msg) {
        this.alert = {
          show: true,
          msg: msg
        }
      },

      /**
       * 清除二维码信息
       */
      resumeCodePanel () {
        this.qrCode = {
          url: '',
          isShow: false
        }
      },

      /**
       * 清除提示框信息
       */
      resumeConfirm () {
        this.confirm = {
          show: false,
          finish: {
            text: '',
            callback: null
          },
          cancel: {
            text: '',
            callback: null
          },
          msg: ''
        }
      },

      /**
       * 支付成功
       */
      gotoPaySuccess () {
        if (this.type === goodsType.POSTPONE) {
          this.$route.router.go(`/subject/detail/P/${this.id}/0`)
        } else {
          this.$route.router.replace(`/pay/success/${this.type}/${this.id}`)
        }
      },

      /**
       * 计算页面 数据
       */
      calculate () {
        if (!this.type || !this.id) {
          // 清空数据时 不执行
          return
        }
        let coupon = {
          couponNo: '',
          name: '',
          userBene: 0,
          holderBene: 0
        }
        if (this.couponList.length > 0) {
          if (this.type === goodsType.POSTPONE) {
            if (this.currPostponeIndex === 1) {
              coupon = this.couponList[this.currCouponIndex]
            }
          } else {
            coupon = this.couponList[this.currCouponIndex]
          }
        }

        const total = this.price - coupon.userBene
        const deduction = this.currentBalance >= total ? total : this.currentBalance >= 0 ? this.currentBalance : 0
        const sum = total - deduction

        this.total = total
        this.deduction = deduction
        this.btn.leftOptions.price = sum
        this.trade.sum = sum

        if (coupon.couponNo === 1) { // 长投卡
          this.trade.deal.cardUsed = true
        } else {
          this.trade.deal.cardUsed = false
        }

        switch (this.type) {
          case goodsType.SUBJECT:
            // 课程
            this.trade.deal.items[0].price = total
            if (coupon.couponNo && coupon.couponNo !== 1) { // 优惠券
              this.trade.deal.items[0].coupon = coupon
            }
            break

          case goodsType.COMMON_TOPIC:
            // 图片专题
            this.trade.deal.items[0].price = total
            if (coupon.couponNo && coupon.couponNo !== 1) { // 优惠券
              this.trade.deal.items[0].coupon = coupon
            }
            break

          case goodsType.SPEC_TOPIC:
            // 打包课专题
            if (coupon.couponNo === 1) { // 长投卡
              let items = this.trade.deal.items
              let tempSum = 0
              for (let i = 0, length = items.length; i < length; i++) {
                if (i !== items.length - 1) {
                  items[i].price = Math.ceil(items[i].price * 0.7)
                  tempSum += items[i].price
                } else {
                  items[i].price = sum - tempSum
                }
              }
            }
            break

          case goodsType.POSTPONE:
            // 延期
            if (coupon.couponNo === 1) { // 长投卡
              this.trade.deal.items[0].price = total
            }
            break
          default:
            break
        }
//        console.log(this.type, '订单信息', JSON.stringify(this.trade))
      }
    },
    components: {
      Scroller,
      IctTitlebar,
      IctButton,
      PayTitle,
      PayPostpone,
      PayCoupons,
      PayPic,
      PayTotal,
      PayToubi,
      PayButton,
      PaySubject,
      PayActionSheet,
      CodePanel,
      Confirm,
      Alert
    }
  }
</script>

<style>

</style>
