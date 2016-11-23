/**
* Created by jun on 2016/11/14.
*
*/
<template>
    <div class="strategy-professional-intro">
      <ict-titlebar v-el:titlebar>长投宝专业版</ict-titlebar>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
        <div>
          <img :src="professionalIntro.promotionUrl" class="intro-promotion">
          <strategy-intro :intro="professionalIntro.intro">什么是长投宝专业版?</strategy-intro>
          <strategy-feature :feature="professionalIntro.feature">长投宝专业版的魅力</strategy-feature>
          <target-user :target-user="professionalIntro.targetUser">面向人群</target-user>
          <purchase-plan :options="professionalIntro.purchaseOptionsUrl">灵活的购买方案</purchase-plan>
          <suitable-product :strategy-options="professionalIntro.strategyOptions">我适合什么策略?</suitable-product>
          <tip></tip>
        </div>
      </scroller>
      <div class="tip-on-btn" v-el:tip>{{tip}}</div>
      <div class="pay-button" v-el:btns>
        <div class="left" v-touch:tap="goToVip">了解VIP</div>
        <ict-button class="right" v-touch:tap="buyNow" :disabled="disabled">立即购买</ict-button>
      </div>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import IctButton from '../../components/IctButton.vue'
  import Scroller from 'vux/scroller'
  import StrategyIntro from '../../components/strategy/StrategyIntro.vue'
  import StrategyFeature from '../../components/strategy/StrategyFeature.vue'
  import PurchasePlan from '../../components/strategy/StrategyPurchasePlan.vue'
  import TargetUser from '../../components/strategy/StrategyTargetUser.vue'
  import SuitableProduct from '../../components/strategy/StrategySuitableProduct.vue'
  import Tip from '../../components/strategy/StrategyTip.vue'
  import PayButton from '../../components/payment/PayButtons.vue'
  import {strategyIntroActions} from '../../vuex/actions'
  import {strategyIntroGetters, userGetters} from '../../vuex/getters'
  export default {
    vuex: {
      getters: {
        isLogin: userGetters.isLogin,
        strategy: userGetters.strategy,
        professionalIntro: strategyIntroGetters.professionalIntro
      },
      actions: {
        getProfessionalIntro: strategyIntroActions.getProfessionalIntro
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
        return (this.isLogin && this.strategy.strategyLevel === 'B') ? `已购买长投宝专业版,剩余有效期${this.strategy.strategyLeftDay}天` : (this.isLogin && this.strategy.strategyLevel === 'A') ? `已购买长投宝VIP版,剩余有效期${this.strategy.strategyLeftDay}天` : ''
      },
      // 支付按钮 信息
      disabled () {
        return (this.isLogin && this.strategy.strategyLevel === 'A')
      }
    },
    route: {
      data () {
        this.getProfessionalIntro()
      }
    },
    ready () {
      this.setScrollerHeight()
    },
    methods: {
      /**
       * 设置滚动框高度
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
       * 跳转到vip宣传
       */
      goToVip () {
        this.$route.router.replace('/strategy/vip/intro')
      },

      onAgreeTap () {
        this.$route.router.on(`/pay-PS-0`, {
          component: require('../pay/ProStrategyOrder.vue')
        })
        this.$route.router.go(`/pay-PS-0`)
      },
      /**
       * 立即购买
       */
      buyNow () {
        if (!this.disabled) {
          this.showMask({
            component: 'strategy/StrategyAgreement.vue',
            hideOnMaskTap: true,
            callbackName: 'onAgreeTap',
            callbackFn: this.onAgreeTap.bind(this) //组件上的
          })
        }
      }
    },
    components: {
      IctTitlebar,
      IctButton,
      Scroller,
      StrategyIntro,
      StrategyFeature,
      PurchasePlan,
      TargetUser,
      SuitableProduct,
      Tip,
      PayButton
    }
  }
</script>
<style lang="less">
  .strategy-professional-intro{
    position: relative;
    background: #fff;
    .intro-promotion{
      width: 18.75rem;
      height: 10rem;
    }
    .pay-button{
      position: relative;
      display: flex;
      .left{
        flex: 240;
        border-top: 1px solid #f0eff5;
        color: #00b0f0;
        font-size: 34/40rem;
        text-align: center;
      }
      .right{
        flex: 750-240;
      }
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
