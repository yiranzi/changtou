/**
 * Created by jun on 2017/2/23.
 * 分享panel 用于分享页面 在页面底部显示
 */
<template>
  <div class="share-article" v-if="isInApp">
    <div><hr/><span>分享至</span><hr/></div>
    <div v-touch:tap="onPanelTap">
      <div class="share-item">
        <div class="timeline"></div>
        <div class="share-name">朋友圈</div>
      </div>
      <div class="share-item">
        <div class="wechat"></div>
        <div class="share-name">微信好友</div>
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
</template>
<script>
  import {Device, platformMap} from '../../plugin/device'
  export default {
  computed: {
    isInApp () {
      return (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS)
    },
    //ios中 暂不才显示微博分享
    canWeiboShare () {
      return !(Device.platform === platformMap.IOS)
    }
  },
  methods: {
    onPanelTap (e) {
      this.$emit('onPanelTap', e)
    }
  }
}
</script>
<style lang="less" scoped>
  .share-item {
    display: inline-block;
    width: 3.5rem;
    height: 4.3rem;
    margin: 0 0.35rem;
    text-align: center;
  }
  .wechat, .timeline, .qq, .weibo {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
  }
  .wechat {
    background: url("../../../static/image/interview/share-wechat.png") no-repeat center center / 100%;
  }
  .timeline {
    background: url("../../../static/image/interview/share-timeline.png") no-repeat center center / 100%;
  }
  .qq {
    background: url("../../../static/image/interview/share-qq.png") no-repeat center center / 100%;
  }
  .weibo {
    background: url("../../../static/image/interview/share-weibo.png") no-repeat center center / 100%;
  }
  .share-name {
    width: 100%;
    display: inline-block;
    text-align: center;
    margin-top: .5rem;
  }
  .share-article {
    padding-top: 1.5rem;
    font-size: 26/40rem;
    color: #00b0f0;
    text-align: center;
    hr {
      margin: 0.32rem .5rem;
      width: 4.5rem;
      height: 1px;
      background: #aaa;
      border: 0;
      display: inline-block;
    }
    p {
      margin: 0;
    }
    .share-item {
      width: 2.8rem;
      margin-top: 1.5rem;
    }
  }
</style>
