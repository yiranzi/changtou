/**
 * Created by jun on 2016/11/16.
 *
 */
<template>
  <div class="strategy-vip-product">
    <ict-titlebar v-el:titlebar>长投宝VIP版</ict-titlebar>
    <scroll-text :text="notice"></scroll-text>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div>
        <duo-yinzi :duoyizi="vipProduct.duoYinZi"></duo-yinzi>
        <zhi-shubao :zhishubao="vipProduct.zhiShuBao"></zhi-shubao>
        <ding-toubao :dingtoubao="vipProduct.dingTouBao"></ding-toubao>
        <fen-jibao :fenjibao="vipProduct.fenJiBao"></fen-jibao>
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
  import {strategyProductGetters, strategyNoticeGetters} from '../../vuex/getters'
  import {strategyProductActions, strategyNoticeActions} from '../../vuex/actions'
export default {
  vuex: {
    getters: {
      vipProduct: strategyProductGetters.vipProduct,
      notice: strategyNoticeGetters.strategyNotice
    },
    actions: {
      getVipProduct: strategyProductActions.getVipProduct,
      getVipNotice: strategyNoticeActions.getVipNotice
    }
  },
  data () {
    return {
      scrollerHeight: '0px'
    }
  },
  route: {
      data () {
        // 每一次进入页面都能获取实时的通知文本
        return Promise.all([this.getVipProduct(), this.getVipNotice()]).then(
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
    ScrollText
  }
}
</script>
<style lang="less">
  .strategy-vip-product{
    width: 100%;
    height: 100%;
    p{
      margin: 0;
    }
    .product-flag-container {
      height: 0.5rem;
      width: 100%;
      background-color: #f0eff5;
    }

    .strategy-duoyizi .product-flag-container{
      height: 0;
    }

    .product-title-container {
      height: 3rem;
      line-height: 3rem;
      vertical-align: middle;
      text-align: center;
      font-size: 0.75rem;
      color: #fff;
    }

    .content {
      padding: 0 1.25rem 1.25rem;
    }

    .tip-time {
      padding-top: 0.5rem;
      text-align: center;
      font-size: 0.6rem;
      color: #aaa;
    }

    .tip-title {
      margin-top: 1.5rem;
      margin-bottom: .75rem;
      font-size: .65rem;
      color: #898989;
    }

    .tip-paragraph {
      font-size: .6rem;
      color: #aaa;

      .strong {
        color: #007aff;
      }
    }

    .line-hr {
      margin-top: 0.75rem;
      border-color: #f0eff5;
      /* height: 38px; */
      opacity: 0.3;
    }
  }
</style>
