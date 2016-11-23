/**
 * Created by jun on 2016/11/16.
 *
 */
<template>
    <div class="strategy-duoyizi">
      <div>
        <div class="product-flag-container"></div>
        <div class="product-title-container">多因子策略</div>
        <div class="content">
          <p class="benefit-des">2016.6.16上线至今收益</p>
          <div class="benefit-data">{{duoyizi && duoyizi.totalBenefit}}</div>
          <p class="benefit-compare">同期沪深300收益率：<span>{{duoyizi && duoyizi.csi300Benefit}}</span></p>
          <p class="benefit-analyse">风险宝多空分析：<span class="strong">{{duoyizi && duoyizi.purchaseTip}}</span></p>
          <div class="table-box">
            <p class="table-title">本周排名前十</p>
            <p class="table-subtitle">(排名不分先后，从中独立选择5-10家公司投资)</p>
            <div class="line"><div class="in"></div></div>
            <div class="table">
              <span v-for="name in duoyizi.top10">{{name}}</span>
            </div>
          </div>
          <div class="tip-time">更新时间{{duoyizi && duoyizi.updateDate}}</div>
          <div class="tip-title">温馨提示</div>
          <p class="tip-paragraph" v-for="tip in duoyizi.tips">{{{tip}}}</p>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    duoyizi: {
      type: Object,
      default: function () {
        return {
          priority: 0,
          tips: '',
          updateDate: '',
          csi300Benefit: '',
          purchaseTip: '',
          totalBenefit: '',
          top10: []
        }
      }
    }
  }
}
</script>
<style lang="less">
  .strategy-duoyizi {
    background: #fff;
    .product-title-container {
      background-color: #ffbc8a;
    }
    .benefit-des {
      margin-top: 1rem;
      font-size: .65rem;
      color: #aaa;
    }
    .benefit-data {
      margin-top: 1.5rem;
      font-size: 1.8rem;
      color: #ff994a;
    }
    .benefit-compare {
      margin-top: .75rem;
      font-size: .65rem;
      color: #bbb;
    }
    .benefit-analyse {
      height: 1.5rem;
      margin-top: 0.75rem;
      line-height: 1.5rem;
      font-size: .65rem;
      text-align: center;
      background-color: #ffeee2;
      color: #aaa;
      .strong {
        color: #ff994e;
        font-weight: bold;
      }
    }
    .table-box {
      border: 1px solid #eee;
      text-align: center;
      padding-bottom: 1rem;
      margin-top: 0.5rem;
      .table-title {
        margin-top: .5rem;
        color: #666;
        font-size: .65rem;
      }
      .table-subtitle {
        margin-top: .25rem;
        color: #aaa;
        font-size: .6rem;
      }
      .line {
        margin-top: .75rem;
        padding-left: .625rem;
        padding-right: .625rem;
        .in {
          height: 1px;
          border-top: 1px solid #eee;
        }
      }
      .table {
        display: flex;
        display: -webkit-flex;
        flex-flow: row wrap;
        //flex-wrap: wrap;

        span {
          display: block;
          flex: 0 0 25%;
          margin-top: 1rem;
          font-size: .65rem;
          color: #ff994e;
          font-weight: bold;
        }
      }
    }
  }
</style>
