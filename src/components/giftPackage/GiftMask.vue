<template>
  <div>
    <swiper auto height="100px" :auto='false' class="gift-mask-swiper" dots-class="dots-class">
      <swiper-item class="item-white">
        <p>拒绝独自学习</p>
        <p>有趣的读物伴你入门</p>
        <img src="../../assets/styles/image/giftPackage/1.png" width="230" height="138" alt="" v-bind:style="imgStyle">
      </swiper-item>
      <swiper-item class="item-white">
        <p>拒绝默默无闻</p>
        <p>诸多成就等你达成</p>
        <img src="../../assets/styles/image/giftPackage/2.png" width="230" height="138" alt="" v-bind:style="imgStyle">
      </swiper-item>
      <swiper-item class="item-white">
        <p>拒绝形单影只</p>
        <p>专属抵用券助你一程</p>
        <img src="../../assets/styles/image/giftPackage/3.png" width="230" height="138" alt="" v-bind:style="imgStyle">
      </swiper-item>
      <p v-touch:tap="gotoReceiveGift" class="receive-gift-btn">领取伴学礼包</p>
    </swiper>
  </div>
</template>

<script>
  import Swiper from 'vux/swiper'
  import SwiperItem from 'vux/swiper-item'

  export default {
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    gotoReceiveGift () {
      this.$dispatch('gotoGiftPackageDetails')
    }
  }
}
</script>
<style lang="less">
    .gift-mask-swiper{
      height: 18rem !important;
      width: 14.5rem;
      border-radius: .5rem;
      .vux-swiper{
        height: 16rem !important;
      }
      .dots-class{
        left: 5.5rem !important;
      }
      .vux-icon-dot {
        background-color: #fff!important;
        opacity: 0.5;
        width: .5rem !important;
        height: .5rem !important;
        border-radius: .25rem !important;
        margin-right: .6rem;
      }
      .vux-icon-dot.active{
        background-color: orange !important;
        opacity: 1;
      }
      .item-white{
        background: white;
        text-align: center;
        border-radius: 3%;
        width: 14.5rem;
        p{
          font-family: initial;
          font-size: 1.5rem;
          color: #444;
        }
        p:first-child{
          margin-bottom: .1rem;
          font-weight: bold;
          font-size: 1.2rem;
          margin-top: .5rem;
        }
        p:nth-child(2){
          margin-top: 0;
          font-size: .7rem;
          margin-bottom: 1.5rem;
        }
      }
      .receive-gift-btn{
        border: 2px solid #FF3C3C;
        border-radius: 2rem;
        width: 65%;
        margin-left: 17%;
        height: 1.5rem;
        font-size: .8rem !important;
        line-height: 1.5rem;
        color: #ff3c3c;
        top: 12.5rem;
        text-align: center;
        position: absolute !important;
      }
    }
</style>



