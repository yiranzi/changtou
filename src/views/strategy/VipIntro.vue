/**
 * Created by jun on 2016/11/15.
 *
 */
<template>
  <div class="strategy-vip-intro">
    <ict-titlebar v-el:titlebar>长投宝VIP版</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div>
        <img :src="vipIntro.promotionUrl" class="intro-promotion">
        <p class="available-tip">为保证策略有效性，限制VIP总数，当前剩余席位<span>{{vipIntro.availableNum}}</span>个</p>
        <strategy-intro :intro="vipIntro.intro">什么是长投宝VIP版?</strategy-intro>
        <target-user :target-user="vipIntro.targetUser">面向人群</target-user>
        <feature-product :featured-strategy="vipIntro.featuredStrategy">王牌策略</feature-product>
        <purchase-plan :options="vipIntro.purchaseOptionsUrl">灵活的购买方案</purchase-plan>
        <suitable-product :strategy-options="vipIntro.strategyOptions">策略升级</suitable-product>
        <tip></tip>
      </div>
    </scroller>
    <div class="tip-on-btn" v-el:tip>{{tip}}</div>
    <ict-button v-touch:tap="buyNow" v-el:btns>立即购买</ict-button>
  </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import IctButton from '../../components/IctButton.vue'
  import Scroller from 'vux/scroller'
  import StrategyIntro from '../../components/strategy/StrategyIntro.vue'
  import FeatureProduct from '../../components/strategy/StrategyFeatureProduct.vue'
  import PurchasePlan from '../../components/strategy/StrategyPurchasePlan.vue'
  import SuitableProduct from '../../components/strategy/StrategySuitableProduct.vue'
  import TargetUser from '../../components/strategy/StrategyTargetUser.vue'
  import Tip from '../../components/strategy/StrategyTip.vue'
  import PayButton from '../../components/payment/PayButtons.vue'
  import {strategyActions} from '../../vuex/actions'
  import {strategyGetters, userGetters} from '../../vuex/getters'
  export default {
    vuex: {
      getters: {
        isLogin: userGetters.isLogin,
        strategy: userGetters.strategy,
        vipIntro: strategyGetters.vipIntro
      },
      actions: {
        getVipIntro: strategyActions.getVipIntro
      }
    },
    data () {
      return {
        scrollerHeight: '0px'
      }
    },
    computed: {
      // 按钮上方提示语
      tip () {
        return `已购买长投宝VIP版,剩余有效期${this.strategy.strategyLeftDay}天`
      }
    },
    ready () {
      this.getVipIntro()
      this.setScrollerHeight()
    },
    methods: {
      /**
       * 设置 滚动范围高度
       */
      setScrollerHeight () {
        const me = this
        me.scrollerHeight = window.document.body.offsetHeight - me.$els.titlebar.offsetHeight - me.$els.btns.offsetHeight + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 200)
      },
      /**
       * 立即购买
       */
      buyNow () {
        this.$route.router.on(`/pay-VS-0`, {
          component: require('../pay/VipStrategyOrder.vue')
        })
        this.$route.router.go(`/pay-VS-0`)
      }
    },
    components: {
      IctTitlebar,
      IctButton,
      Scroller,
      StrategyIntro,
      FeatureProduct,
      PurchasePlan,
      TargetUser,
      Tip,
      PayButton,
      SuitableProduct
    }
  }
</script>
<style lang="less">
  .strategy-vip-intro{
    position: relative;
    background: #fff;
    .intro-promotion{
      width: 18.75rem;
      height: 10rem;
    }
    .available-tip{
      position: absolute;
      z-index: 2;
      top: 8.5rem;
      width: 100%;
      background: #000;
      opacity: 0.4;
      text-align: center;
      line-height: 1.5rem;
      font-size: 0.6rem;
      color: #fff;
      span{
        font-size: 0.75rem;
        color: red;
      }
    }
    .ict-btn{
      border-radius: 0;
    }
    .strategy-options-subtitle{
      padding-bottom: 1rem;
    }
    .tip-on-btn{
      position: absolute;
      bottom: 2.2rem;
      width: 100%;
      opacity: 0.9;
      background: #ff9800;
      font-size: 0.7rem;
      color: #fff;
      text-align: center;
      line-height: 1.5rem;
    }
  }
</style>
