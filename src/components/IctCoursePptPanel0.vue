<template>
  <!--详情页ppt面板-->
  <div class="ict-course-ppt">
    <div class="arrow left-arrow" v-touch:tap="onTapPre" v-show="isLeftArrowShow">&nbsp;&nbsp;&nbsp;</div>
    <div class="arrow right-arrow" v-touch:tap="onTapNext" v-show="isRightArrowShow">>&nbsp;&nbsp;&nbsp;</div>
    <swiper :show-dots="false" :auto="false" :loop="false" :aspect-ratio="0.8" :show-desc-mask="false" style="height: 12rem"
            :index.sync="index">
      <swiper-item v-for="ppt in ppts" class="black" style="height: 12rem" track-by="$index">
        <img :src="ppt" alt="" style="height: 100%; width: 100%">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import Swiper from 'vux/swiper'
  import SwiperItem from 'vux/swiper-item'

  export default{
    props: {
      ppts: {
        default: []
      }
    },

    computed: {
      isLeftArrowShow () {
        return this.index !== 0
      },

      isRightArrowShow () {
        return this.index !== this.ppts.length - 1
      }
    },

    data () {
      return {
        index: 0
      }
    },

    methods: {
      onTapPre () {
        this.index --
      },

      onTapNext () {
        this.index ++
      }
    },

    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style lang="less">
  .ict-course-ppt {
    .arrow {
      width: 1.6rem;
      height: 6rem;
      position: absolute;
      z-index: 100;
      top: 3rem;
    }
    .left-arrow {
      left: 0.2rem;
    }
    .left-arrow:before {
      font-family: 'myicon';
      content: '\e909';
      line-height: 6rem;
      height: 6rem;
      font-size: 6rem;
      color: #ccc;
    }
    .right-arrow {
      right: 0.2rem;
    }
    .right-arrow:before {
      font-family: 'myicon';
      content: '\e908';
      line-height: 6rem;
      height: 6rem;
      font-size: 6rem;
      color: #ccc;
    }
  }
</style>
