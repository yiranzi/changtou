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
      <pay-coupons :is-show="isCouponsShow()" :coupons="couponList" @on-change="change"></pay-coupons>
      <pay-total>{{total}}</pay-total>
      <pay-toubi :value="deduction"></pay-toubi>
    </scroller>
    <pay-button :state="state" :left-options="leftOptions" :right-options="rightOptions"></pay-button>
    <pay-action-sheet :show.sync="isActionSheetShow" :menus="menus"></pay-action-sheet>
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
  import { getOrder, payStart } from '../../util/pay/daelHelper'

  export default{
    data () {
      return {
        type: this.$route.params.type,
        id: this.$route.params.id,
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
        trade: {}//交易订单
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
      PayActionSheet
    },
    route: {
      data () {
        var me = this
        getOrder(this.type, this.id).then(
          order => {
            me.courseList = order.courseList
            me.couponList = order.couponList
            me.price = order.price
            me.trade = order.trade
          }
        )
        // todo 是否购买过
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
       * 是否显示课程列表
       */
      isSubjectShow () {
        if (this.type === 'S' || this.type === 'CT') {
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
      change (val) {
        let total = this.price - this.couponList[val].userBene ? (this.price - this.couponList[val].userBene) : 0
        let sum = total - this.deduction

        //页面数据 更新
        this.total = total
        this.deduction = this.currentBalance >= this.total ? this.total : this.currentBalance >= 0 ? this.currentBalance : 0
        this.leftOptions.price = sum

        //交易数据 更新
        if (!this.couponList[val].couponNo) {
          this.trade.deal.cardUsed = true
        } else {
          this.trade.deal.items[0].coupon = this.couponList[val]
        }

        if (this.type === 'P') {
          this.trade.deal.items[0].dealType = 3
        }

        if (this.type === 'S') {
          this.trade.deal.items[0].price = total
        }

        this.trade.sum = sum
      },

      /**
       * 点击按钮的回调
       */
      callback () {
        if(this.trade.sum > 0){
          this.isActionSheetShow = true
        }else{
          payStart(trade, 'toubi')
        }
      },

      click (key) {
        console.log('click', key)
      }
    }
  }
</script>

<style>

</style>
