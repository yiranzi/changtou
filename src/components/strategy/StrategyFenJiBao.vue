
/**
 * Created by jun on 2016/11/16.
 *
 */
<template>
    <div class="strategy-fenjibao">
      <div>
        <div class="product-flag-container"></div>
        <div class="product-title-container">分级宝策略</div>
        <div class="content">
          <div class="tip-time">{{fenjibao && fenjibao.updateDate}}</div>
            <p class="tip-des" v-if="fenjibao.isShowTip">今日无推荐</p>
            <p class="tip-detail" style="text-align: center" v-if="fenjibao.isShowTip">{{fenjibao && fenjibao.tips}}</p>
            <p class="tip-detail" style="text-align: center" v-if="fenjibao.isShowTip">前往www.ichangtou.com查看更多VIP版投资机会</p>
            <p class="tip-des" v-else>建议操作</p>
            <p class="tip-detail" v-for="recommond in fenjibao.recommondList" v-else>名称：{{recommond.name}}，代码：{{recommond.code}}， 折价率：{{recommond.discountRate}}</p>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    fenjibao: {
      type: Object,
      default: function () {
        return {
          isShowTip: false,
          priority: 0,
          tips: '',
          updateDate: '',
          recommondList: []
        }
      }
    }
  }
}
</script>
<style lang="less">
  .strategy-fenjibao{
    background: #fff;
    .product-title-container {
      background-color: #9fcbf3;
    }
    .tip-des {
      text-align: center;
      margin-top: 1.25rem;
      font-size: 0.75rem;
      color: #9fcbf3;
    }
    .tip-detail {
      margin-top: .75rem;
      font-size: .65rem;
      color: #aaa;
    }
  }
</style>
