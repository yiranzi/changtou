/**
 * Created by jun on 2016/11/16.
 *
 */
<template>
    <div class="strategy-zhishubao">
      <div>
        <div class="product-title-container">指数宝策略</div>
        <div class="content">
          <div class="recommend-product">
            <div class="item">
              <p class="title">重仓买入（指数宝仓位的{{zhishubao && zhishubao.recommondMajor.ratio}}）</p>
              <div class="row">
                <span>{{zhishubao && zhishubao.recommondMajor.code}}</span>
                <span >{{zhishubao && zhishubao.recommondMajor.name}}
                  <img class="new-img" src="../../../static/image/strategy/newTip.png" :v-if="zhishubao.recommondMajor.isNew">
                </span>
                <span>{{zhishubao && zhishubao.recommondMajor.recommondDate}}</span>
              </div>
              <div class="row">
                <span>代码</span>
                <span>名称</span>
                <span>起始推荐日期</span>
              </div>
            </div>
            <hr class="line-hr"/>
            <div class="item">
              <p class="title">轻仓买入（指数宝仓位的{{zhishubao && zhishubao.recommondMinor.ratio}}）</p>
              <div class="row">
                <span>{{zhishubao && zhishubao.recommondMinor.code}}</span>
                <span>{{zhishubao && zhishubao.recommondMinor.name}}
                  <img class="new-img" src="../../../static/image/strategy/newTip.png" v-if="zhishubao && zhishubao.recommondMinor.isNew">
                </span>
                <span>{{zhishubao && zhishubao.recommondMinor.recommondDate}}</span>
              </div>
              <div class="row">
                <span>代码</span>
                <span>名称</span>
                <span>起始推荐日期</span>
              </div>
            </div>
            <hr class="line-hr"/>
          </div>
          <div class="tip-time">更新时间{{zhishubao && zhishubao.updateDate}}</div>
          <p class="tip-title">温馨提示</p>
          <p class="tip-paragraph" v-for="tip in zhishubao.tips">{{{tip}}}</p>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    zhishubao: {
      type: Object,
      default: function () {
        return {
          priority: 5,
          tips: '',
          updateDate: '',
          recommondMajor: {
            code: '',
            name: '',
            ratio: '',
            recommondDate: ''
          },
          recommondMinor: {
            code: '',
            name: '',
            ratio: '',
            recommondDate: ''
          }
        }
      }
    }
  }
}
</script>
<style lang="less">
  .strategy-zhishubao{
    background: #fff;
    .product-title-container {
      background-color: #abbce6;
    }

    .item {
      margin-top: 1.25rem;
      .title {
        font-size: .65rem;
        color: #aaa;
      }

      .new-img {
        height: 0.4rem;
        width: 1.35rem;
        position: relative;
        bottom: 0.4rem;
      }

      .row {
        display: flex;
        display: -webkit-flex;
        span {
          display: inline-block;
          text-align: center;
        }
        span:nth-child(1) {
            width: 2.5rem;
        }
        span:nth-child(2) {
              flex: auto;
        }
        span:nth-child(3) {
                width: 4rem;
        }
      }

      .row:nth-child(2) {
        margin-top: 1rem;
        span {
          font-size: 0.7rem;
          color: #444;
        }
      }
      .row:nth-child(3) {
        margin-top: 0.4rem;
        span {
          font-size: 0.6rem;
          color: #aaa;
        }
      }
    }
  }
</style>
