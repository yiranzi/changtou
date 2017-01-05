<template>
  <div class="coupon-messages">
    <ict-titlebar v-el:titlebar>优惠信息</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y :bounce="true" v-ref:scroller :height="scrollerHeight">
      <div class="coupon-item-container">
        <div :class="couponItem.isUsed === 'N'?'coupon-item':'coupon-item coupon-item-gray'" v-for="couponItem in couponList">
          <a class="coupon-specify">APP 专享</a>
          <h1 class="coupon-mark">{{couponItem.integral}}</h1>
          <p>
             <span>积分</span>
             <span class="coupon-title">{{couponItem.ticketName}}</span>
          </p>
          <div class="inner"></div>
          <div class="coupon-explain">
            <span>购买付费课程(策略类除外)可用</span>
            <span class="coupon-expire"><span>有效期至</span> {{couponItem.endTime.substring(0,10)}}</span>
          </div>
          <!-- 已使用-->
          <div :class="couponItem.isUsed === 'Y' ? 'rotate-tip':'coupon-not-show'">已使用</div>
          <!-- 已过期-->
          <div :class="couponItem.isUsed === 'E' ? 'rotate-tip':'coupon-not-show'">已过期</div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .coupon-messages{
    background: #f0eff5 !important;
    .coupon-item-container{
      background: #f0eff5;
      padding-top: 1rem;
      width: 100%;
      height: 100%;
      .coupon-item-gray{
        h1,p,span{
          color: #ddd !important;
        }
      }
      .coupon-item{
        background: white;
        width: 16.5rem;
        height: 6.25rem;
        border: 1px solid #ddd;
        margin-bottom: .55rem;
        padding-left: .5rem;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        .coupon-specify{
          display: block;
          text-align: right;
          color: #ddd;
          font-size: .7rem;
          margin-right: .5rem;
          margin-top: .5rem;
        }
        .coupon-mark{
          color: #ff5055;
          font-size: 2.25rem;
          font-weight: bold;
          display: inline-block;
          margin: 0;
          padding: 0;
          margin-left: .5rem;
        }
        p{
          display: inline-block;
          margin: 0;
        }
        p span:first-child{
          color:#ffc833;
          font-size: .75rem;
          display: block;
          margin-bottom: -.2rem;
        }
        .coupon-title{
          color: #666;
          font-size: .75rem;
        }
        .inner{
          background: #f0eff5;
          height: 1px;
          width: 15.5rem;
          margin-bottom: .47rem;
        }
        .coupon-explain{
          color: #aaa;
          font-size: .55rem;
          .coupon-expire{
            display: inline-block;
            margin-left: 1.2rem;
          }
        }
        .rotate-tip{
          content: ' ';
          font-weight: bold;
          color: #999;
          width: 4.15rem;
          height: 2rem;
          position: absolute;
          left: 11.8rem;
          text-align: center;
          bottom: 2.3rem;
          border: .2rem solid #999;
          line-height: 2rem;
          -webkit-transform: rotate(-9deg);
        }
        .coupon-not-show{
          display: none;
        }
      }
    }
  }
</style>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import {giftGetters} from '../../vuex/getters'
  import moment from 'moment'
  moment().format()     // 引入 moment.js 对时间格式化
  export default {
    vuex: {
      getters: {
        couponList: giftGetters.couponList
      }
    },
    data () {
      return {
        scrollerHeight: '590px'
      }
    },
    route: {
      data (transition) {
        const me = this
        const {titlebar} = this.$els
        me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight) + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
           //   top: 0
            })
          })
        }, 1500)
            transition.next()
      }
    },
    components: {
      IctTitlebar,
      Scroller
    }
  }
</script>

