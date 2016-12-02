/**
 * Created by jun on 2016/12/1.
 *
 */
<template>
  <div class="changtou-card-tip">
    <div class="changtou-card-tip-content">
      <div class="changtou-card-tip-title">长投卡说明<span class="close-icon"></span></div>
      <div class="changtou-card-tip-explain">
        <p>1.长投卡是专为长投用户提供的VIP优惠卡，在有效期内使用，全场付费商品均可7折；</p>
        <p>2.超过有效期后，长投卡将无法继续使用，需要再次购买；</p>
        <p>3.长投卡一年仅售两次，年初售卖一年卡、年中售卖半年卡；</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
  .changtou-card-tip{
    width: 16rem;
    height: 6rem;
    p{
      margin: 0;
    }
    &-content{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1001;
      margin: auto;
      background: #fff;
    }
    &-title{
      position: relative;
      padding: 0 0.75rem;
      line-height: 2.5rem;
      font-size: 0.8rem;
      color: #222;
      text-align: center;
      border-bottom: 1px solid #f0eff5;
      background: #fff;
    }
    &-explain{
      padding: 1rem 1.25rem 1.5rem;
      font-size: 0.7rem;
      color: #666;
      background: #fff;
    }
  }
</style>
