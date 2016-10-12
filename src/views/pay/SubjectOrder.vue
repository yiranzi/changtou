<template>
  <div>
    <ict-titlebar v-el:titlebar >确认订单</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <pay-subject :course-list="courseList"></pay-subject>
      <pay-coupons :coupons="coupons" @on-change="change"></pay-coupons>
      <pay-total>100</pay-total>
      <pay-toubi :value="100"></pay-toubi>
    </scroller>
    <pay-button state="exception" :left-options="leftOptions" :right-options="rightOptions"></pay-button>
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

  export default{
    data () {
      return {
        scrollerHeight: '0px',
        leftOptions: {
          price: 100,
          text: '您已经购买过'
        },
        rightOptions: {
          callback: this.callback
        },
        courseList: [
          {
            img: '图片',
            title: '主标题',
            description: '副标题',
            price: 100
          },
          {
            img: '图片',
            title: '主标题',
            description: '副标题',
            price: 0
          }
        ],
        coupons: [
          {
            name: '长投卡'
          },
          {
            name: '50元优惠券'
          }
        ]
      }
    },
    ready () {
      const me = this
      me.setScrollerHeight()
//      this.loadData().then(
//        function () {
//          // 设置滚动条高度
//          me.setScrollerHeight()
//        },
//        function () {
//
//        }
//      )
    },
    components: {
      Scroller,
      IctTitlebar,
      IctButton,
      PayCoupons,
      PayTotal,
      PayToubi,
      PayButton,
      PaySubject
    },
    methods: {
      change (val) {
        console.log('change', val)
      },
      callback () {
        console.log('callback')
      },
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
      }
    }
  }
</script>

<style>

</style>
