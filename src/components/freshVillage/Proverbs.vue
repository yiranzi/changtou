/**
 * Created by zhongyan on 2017/3/1.
 *
 */
<template>
    <div class="fresh-village-proverbs">
      <div class="village-close-icon-container" v-touch:tap="onCloseTap"><span class="close-icon"></span></div>
      <div class="village-proverbs" id="village-proverb">
        <div class="proverbs-top">
          <div class="proverbs-title">投资箴言</div>
          <div class="proverbs-text">积累点滴悦读经典~</div>
        </div>
        <div class="proverbs-content">{{{proverbs}}}</div>
      </div>
      <div class="share-btn" v-touch:tap="shareVillageProverb">分享至·朋友圈</div>
    </div>
</template>
<script>
export default {
  props: {
    componentData: String
  },
  computed: {
    proverbs () {
      return this.componentData.replace(/\$#/g, '<div>').replace(/#\$/g, '</div>').replace(/&\*/g, '<p>').replace(/\*&/g, '</p>').replace(/@\+/g, '<span>').replace(/\+@/g, '</span>')
    }
  },
  methods: {
    shareVillageProverb () {
      this.$dispatch('onVillageProverbTap', 1)
    },
    onCloseTap () {
      this.$dispatch('onVillageProverbTap', 2)
    }
  }
}
</script>
<style lang="less">
  .fresh-village-proverbs {
    min-height: 22rem;
    background-color: #fff;
    border-radius: 20px;
    .share-btn {
      position: absolute;
      left: 4rem;
      bottom: 1.75rem;
      width: 6.5rem;
      height: 1.35rem;
      line-height: 1.35rem;
      color: #05af10;
      text-align: center;
      font-size: .65rem;
      border-radius: 27px;
      border: 1px solid #05af10;
    }
  }
    .village-proverbs {
      min-height: 22rem;
      width:14.5rem;
      background-color: #fff;
      border-radius: 20px;
      text-align: left;
      .proverbs {
        &-top {
          width: 14.5rem;
          height: 6.5rem;
          background: url("../../../static/image/freshVillage/proverbs.png") no-repeat;
          background-size: 100% 100%;
        }
        &-title {
          color: #0099ff;
          font-size: .8rem;
          padding: 1rem 1rem .6rem;
        }
        &-text {
          font-size: .65rem;
          color: #888;
          padding-left: 1rem;
        }
        &-content {
          padding: 1.5rem 1rem;
          p {
            margin: 0;
            padding-bottom: .5rem;
            font-size: .65rem;
            color: #666;
          }
          span {
            display: inline-block;
            position: absolute;
            right: 1rem;
            margin-top: 1rem;
            font-size: .65rem;
            color: #666;
          }
          span:before {
            content: '───'
          }
        }
      }
    }
</style>
