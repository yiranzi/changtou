/**
 * Created by jun on 2016/11/16.
 *
 */
<template>
    <div class="featured-strategy">
      <suitable-product :strategy-options="featuredStrategy.product"><slot></slot></suitable-product>
      <div class="benefit">
        <p>2016.6.16上线至今收益</p>
        <p>{{featuredStrategy.strategyBenefit}}%</p>
        <p>同期沪深300收益率：{{featuredStrategy.csi300Benefit}}%</p>
        <img class="historic-profits" v-bind:src="featuredStrategy.historicProfitsUrl">
      </div>
    </div>
</template>
<script>
  import SuitableProduct from './StrategySuitableProduct.vue'
export default {
  props: {
    featuredStrategy: {
      type: Object,
      default: function () {
        return {
          product: [],
          strategyBenefit: '',
          csi300Benefit: '',
          historicProfitsUrl: ''
        }
      }
    }
  },
  components: {
    SuitableProduct
  }
}
</script>
<style lang="less">
  .featured-strategy{
    .strategy-suitable-product .strategy-options{
      .strategy-header{
        color:#fcbd00;
        span{
          color: #fdd766;
        }
      }
      .strategy-up-item {
        background: #ffab6d;
        .strategy-options-subtitle{
          padding-bottom: 0;
        }
      }
      .strategy-options-labels {
         color: #ffab6d;
      }
      .strategy-options-intro {
        background: #ffeee2;
      }
      .strategy-options-related-item {
        background: #ffab6d;
        &:nth-of-type(2){
          background: #ffcda7;
          .play-icon{
            display: none;
          }
        }
      }
    }

    .benefit{
      padding: 1rem 2rem 0.5rem;
      text-align: left;
      p{
        margin-bottom: 0.5rem;
        font-size: 0.65rem;
        color: #aaa;
      }
      p:nth-child(2){
        margin: 1rem 0 0.75rem;
        font-size: 2.25rem;
        color: #ff994e;
      }
      img{
        width: 14.75rem;
        height: 4.9rem;
      }
    }
  }
</style>
