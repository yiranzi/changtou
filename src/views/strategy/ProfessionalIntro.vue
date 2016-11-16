/**
* Created by jun on 2016/11/14.
*
*/
<template>
    <div class="professional-intro">
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
      <div class="pay-button" v-el:btns>
        <div class="left" v-touch:tap="goToVip">了解VIP</div>
        <ict-button class="right" v-touch:tap="buyNow">立即购买</ict-button>
      </div>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import IctButton from '../../components/IctButton.vue'
  import Scroller from 'vux/scroller'
  import StrategyIntro from '../../components/strategy/StrategyIntro.vue'
  import StrategyFeature from '../../components/strategy/StrategyFeature.vue'
  import PurchasePlan from '../../components/strategy/StrategyPurchasePlan.vue'
  import TargetUser from '../../components/strategy/StrategyTargetUser.vue'
  import SuitableProduct from '../../components/strategy/StrategySuitableProduct.vue'
  import Tip from '../../components/strategy/StrategyTip.vue'
  import PayButton from '../../components/payment/PayButtons.vue'
  import {getWithoutAuth} from '../../frame/ajax'
  import {getUrl} from '../../frame/apiConfig'

  export default {
    data () {
      return {
        scrollerHeight: '0px',
        professionalIntro: {
          feature: [],
          intro: [],
          promotionUrl: '',
          purchaseOptionsUrl: '',
          strategyOptions: [],
          targetUser: null
        }
      }
    },
    ready () {
      this.getProfessionalIntro()
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
       * 获取专业版 宣传
       */
      getProfessionalIntro () {
        const me = this
        getWithoutAuth(
          {url: getUrl('strategy_professional_intro')}
        ).then(
          professionalIntro => {
            professionalIntro.intro = professionalIntro.intro.split('#')
            for (let i = 0, length = professionalIntro.strategyOptions.length; i < length; i++) {
              professionalIntro.strategyOptions[i].labels = professionalIntro.strategyOptions[i].labels.split('#')
              professionalIntro.strategyOptions[i].intro = professionalIntro.strategyOptions[i].intro.replace(/#/g, '#●').split('#')
            }

            me.professionalIntro = professionalIntro
        }).catch(
          err => { console.log(err) }
        )
      },
      /**
       * 跳转到vip宣传
       */
      goToVip () {
        this.$route.router.go('/strategy/vip/intro')
      },
      /**
       * 立即购买
       */
      buyNow () {

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
  .professional-intro{
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
  }
</style>
