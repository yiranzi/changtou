/**
 * Created by jun on 2017/2/21.
 * 分享浮层 用于分享页面链接
 */
<template>
  <div class="in-app-page-share-float">
    <ict-sheet title="" :show.sync="show" btn-text="取消" @confirm="onConfirmTap">
      <div>
        <div class="share-box">
          <div class="share-item">
            <div class="wechat"></div>
            <div class="share-name">好友</div>
          </div>
          <div class="share-item">
            <div class="timeline"></div>
            <div class="share-name">朋友圈</div>
          </div>
          <div class="share-item">
            <div class="qq"></div>
            <div class="share-name">QQ</div>
          </div>
          <div class="share-item" v-if="canWeiboShare">
            <div class="weibo"></div>
            <div class="share-name">微博</div>
          </div>
        </div>
      </div>
    </ict-sheet>
  </div>
</template>
<script>
  import {Device, platformMap} from '../../plugin/device'
  import IctSheet from '../../components/IctActionSheet.vue'
  import {nativeVersion} from '../../plugin/version'
  export default {
    props: {
      show: Boolean
    },
    computed: {
      //android > 2.6.1 才能显示 微博分享
      canWeiboShare () {
        return (Device.platform === platformMap.ANDROID) && (nativeVersion >= 20601)
      }
    },
    methods: {
      onConfirmTap (e) {
        this.show = false
        this.$emit('confirm', e)
      }
    },
    components: {
      IctSheet
    }
  }
</script>
<style lang="less">
  .in-app-page-share-float{
    background: #f0eff5;
    .ict_actionsheet_title {
      height: 0;
      .close-icon:before{
        content: '';
      }
    }
    .ict_actionsheet_confirm{
      position: relative;
      font-size: 0.8rem;
      background: #ccc;
      color: #000;
    }
    .share-box{
      width: 100%;
      padding: 1.2rem 0;
      font-size: 0.6rem;
      text-align: center;
      .share-item{
        display: inline-block;
        width: 3.5rem;
        height: 4.3rem;
        margin: 0 0.35rem;
        text-align: center;
      }
      .wechat,.timeline, .qq, .weibo{
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
      }
      .wechat{
        background: url("../../../static/image/interview/share-wechat.png") no-repeat center center / 100%;
      }
      .timeline{
        background: url("../../../static/image/interview/share-timeline.png") no-repeat center center / 100%;
      }
      .qq{
        background: url("../../../static/image/interview/share-qq.png") no-repeat center center / 100%;
      }
      .weibo{
        background: url("../../../static/image/interview/share-weibo.png") no-repeat center center / 100%;
      }
      .share-name{
        width: 100%;
        display: inline-block;
        text-align: center;
        margin-top: .5rem;
      }
    }
  }
</style>
