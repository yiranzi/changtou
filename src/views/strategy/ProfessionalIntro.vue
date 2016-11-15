/**
* Created by jun on 2016/11/14.
*
*/
<template>
    <div class="professional-intro">
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
        <div>
          <ict-titlebar v-el:titlebar>长投宝专业版</ict-titlebar>
          <img :src="professionalIntro.promotionUrl" class="intro-promotion">
          <strategy-intro :intro="professionalIntro.intro">什么是长投宝专业版?</strategy-intro>
          <strategy-feature :feature="professionalIntro.feature">长投宝专业版的魅力</strategy-feature>
          <target-user :target-user="professionalIntro.targetUser">面向人群</target-user>
          <purchase-plan :options="professionalIntro.purchaseOptionsUrl">灵活的购买方案</purchase-plan>
          <suitable-product :strategy-options="professionalIntro.strategyOptions">我适合什么策略?</suitable-product>
        </div>
      </scroller>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import Scroller from 'vux/scroller'
  import StrategyIntro from '../../components/strategy/StrategyIntro.vue'
  import StrategyFeature from '../../components/strategy/StrategyFeature.vue'
  import PurchasePlan from '../../components/strategy/StrategyPurchasePlan.vue'
  import TargetUser from '../../components/strategy/StrategyTargetUser.vue'
  import SuitableProduct from '../../components/strategy/StrategySuitableProduct.vue'
  import {strategyGetters} from '../../vuex/getters'
  import {strategyActions} from '../../vuex/actions'

  export default {
    vuex: {
      getters: {
        professionalIntro: strategyGetters.professionalIntro
      },
      actions: {
        getProfessionalIntro: strategyActions.getProfessionalIntro
      }
    },
    data () {
      return {
        scrollerHeight: '0px'
      }
    },
    computed: {

    },
    watch: {

    },
    route: {

    },
    ready () {
      this.getProfessionalIntro()
      this.setScrollerHeight()
    },
    methods: {
      setScrollerHeight () {
        const me = this
        me.scrollerHeight = window.document.body.offsetHeight + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 150)
      }
    },
    components: {
      IctTitlebar,
      Scroller,
      StrategyIntro,
      StrategyFeature,
      PurchasePlan,
      TargetUser,
      SuitableProduct
    }
  }
</script>
<style lang="less">
  .professional-intro{
    background: #fff;
    .intro-promotion{
      width: 18.75rem;
      height: 10rem;
    }
  }
</style>
