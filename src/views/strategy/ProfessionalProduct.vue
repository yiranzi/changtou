/**
* Created by jun on 2016/11/16.
*
*/
<template>
  <div class="strategy-vip-product">
    <ict-titlebar v-el:titlebar>长投宝专业版</ict-titlebar>
    <scroll-text :text="notice"></scroll-text>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div>
        <group-number :group-number="groupNumber"></group-number>
        <zhi-shubao :zhishubao="professionalProduct.zhiShuBao"></zhi-shubao>
        <ding-toubao :dingtoubao="professionalProduct.dingTouBao"></ding-toubao>
        <fen-jibao :fenjibao="professionalProduct.fenJiBao"></fen-jibao>
      </div>
    </scroller>
  </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import DuoYinzi from '../../components/strategy/StrategyDuoYinZi.vue'
  import ZhiShubao from '../../components/strategy/StrategyZhiShuBao.vue'
  import DingToubao from '../../components/strategy/StrategyDingTouBao.vue'
  import FenJibao from '../../components/strategy/StrategyFenJiBao.vue'
  import ScrollText from '../../components/strategy/StrategyScroll.vue'
  import {strategyProductActions, strategyNoticeActions} from '../../vuex/actions'
  import {strategyProductGetters, strategyNoticeGetters} from '../../vuex/getters'
  import GroupNumber from '../../components/strategy/StrategyQQGroup.vue'
  export default {
    vuex: {
      getters: {
        professionalProduct: strategyProductGetters.professionalProduct,
        notice: strategyNoticeGetters.strategyNotice,
        groupNumber: strategyProductGetters.groupNumber
      },
      actions: {
        getProfessionalProduct: strategyProductActions.getProfessionalProduct,
        getProfessionalNotice: strategyNoticeActions.getProfessionalNotice,
        downLoadGroupData: strategyProductActions.getProfessionalGroupNumber
      }
    },
    data () {
      return {
        scrollerHeight: '0px'
      }
    },
    route: {
        data () {
            return Promise.all([this.getProfessionalProduct(), this.getProfessionalNotice(), this.downLoadGroupData()]).then(
              this.setScrollerHeight()
            )
        }
    },
    methods: {
      /**
       * 设置 滚动范围高度
       */
      setScrollerHeight () {
        const me = this
        setTimeout(function () {
          me.scrollerHeight = window.document.body.offsetHeight - me.$els.titlebar.clientHeight - (me.notice ? 35 : 0) + 'px'
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 500)
      }
    },
    components: {
      IctTitlebar,
      Scroller,
      DuoYinzi,
      ZhiShubao,
      DingToubao,
      FenJibao,
      ScrollText,
      GroupNumber
    }
  }
</script>
<style lang="less">
.strategy-vip-product{
  width: 100%;
  height: 100%;
  .strategy-zhishubao .product-flag-container{
    height: 0;
  }
}
</style>
