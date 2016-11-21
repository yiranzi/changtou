/**
 * Created by jun on 2016/11/16.
 *
 */
<template>
    <div class="strategy-dingtoubao">
      <div class="product-flag-container"></div>
      <div class="product-title-container">定投宝策略</div>
      <div class="content">
        <div class="tip-time">更新时间{{dingtoubao && dingtoubao.updateDate}}</div>
        <div class="table">
          <div class="row">
            <span class="col-name">指数</span>
            <span class="col-yield">盈利收益率</span>
            <span class="col-code">基金代码</span>
            <span class="col-status">状态</span>
          </div>
            <div class="row lowFundsList" v-for="lowItem in dingtoubao.lowFundsList">
              <span class="col-name">{{lowItem.name}}</span>
              <span class="col-yield">{{lowItem.yield}}</span>
              <span class="col-code">{{lowItem.code}}</span>
              <span class="col-status">{{lowItem.status}}</span>
            </div>
            <div class="row middleFundsList" v-for="middleItem in dingtoubao.middleFundsList">
              <span class="col-name">{{middleItem.name}}</span>
              <span class="col-yield">{{middleItem.yield}}</span>
              <span class="col-code">{{middleItem.code}}</span>
              <span class="col-status">{{middleItem.status}}</span>
            </div>
            <div class="row highFundsList" v-for="highItem in dingtoubao.highFundsList">
              <span class="col-name">{{highItem.name}}</span>
              <span class="col-yield">{{highItem.yield}}</span>
              <span class="col-code">{{highItem.code}}</span>
              <span class="col-status">{{highItem.status}}</span>
            </div>
        </div>
        <div>
          <p class="tip-title">温馨提示</p>
          <p class="tip-paragraph" v-for="tip in dingtoubao.tips">{{{tip}}}</p>
        </div>
      </div>
    </div>
</template>
<script>
export default {
 props: {
   dingtoubao: {
     type: Object,
     default: function () {
       return {
         priority: 0,
         tips: '',
         updateDate: '',
         indexFundsList: []
       }
     }
   }
 }
}
</script>
<style lang="less">
  .strategy-dingtoubao{
    background: #fff;
    .product-title-container {
      background-color: #94d4de;
    }
    .space {
      height: 0.1rem;
    }
    .lowFundsList {
      background-color: #bfe5eb;
    }
    .middleFundsList {
      background-color: #d7eff3;
    }
    .highFundsList {
      background-color: #eff9fa;
    }
    .table {
      margin-top: 1.25rem;
      .row {
        height: 1.4rem;
        line-height: 1.4rem;
        font-size: 0;
        color: #898989;
        span {
          display: inline-block;
          text-align: center;
          font-size: .6rem;
          &:nth-child(1) {
            width: 25%;
          }
          &:nth-child(2) {
            width: 20%;
          }
          &:nth-child(3) {
            width: 40%;
          }
          &:nth-child(4) {
            width: 15%;
          }
        }
      }
      .row:nth-child(1) {
        background-color: #f2f2f2;
        color: #aaa;
      }
    }
  }
</style>
