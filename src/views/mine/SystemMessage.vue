<template>
  <div class="system-messages">
    <ict-titlebar v-el:titlebar>系统消息</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y :bounce="true" v-ref:scroller :height="scrollerHeight">
      <div>
        <div class="ios-tip" v-show="isTipShow">
          <p>想要第一时间收到课程的提醒推送，请确保系统通知处于开启状态。
            若要开启，请在iPhone系统的“设置”-“通知”中，找到“长投学堂”并开启通知</p>
          <p class="tip" v-touch:tap="onTapTip">不再提示</p>
        </div>
        <div class="msg" v-for="msg in msgArr" v-show="msgArr" v-touch:tap="msg.mbUrl && msg.type==='L' && goDetailTap(msg)">
          <p class="msg-content">{{{msg.content}}}</p>
          <p class="msg-date">{{{msg.createTime}}}</p>
          <span class="msg-see-detail" v-if="msg.mbUrl && msg.type==='L'">查看详情</span>
        </div>
        <div class="no-msg" v-show="!msgArr">
          <img src="/static/image/mine/noMessages.png">
        </div>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .system-messages{
    width: 100%;
    .ios-tip{
      width: 100%;
      padding: 0.75rem 0;
      background-color: #f9f9f9;
      font-size: 0.65rem;
      color: #aaa;
      p{
        padding: 0 0.9rem;
        margin: 0;
      }
      .tip{
        margin-top: 0.4rem;
        text-align: center;
        text-decoration: underline;
        color: #00b0f0;
      }
    }
    .msg{
      width: 100%;
      border-bottom: 1px solid #f0eff5;
      background-color: #fff;
      position: relative;
      .msg-content{
        padding: 0.7rem 0.5rem;
        margin: 0;
        font-size: 0.7rem;
      }
      .msg-date{
        padding: 0.5rem;
        margin: 0;
        font-size: 0.65rem;
        color: #aaa;
      }
      .msg-see-detail{
        font-size: .65rem;
        color: #0000f6;
        position: absolute;
        right: .75rem;
        bottom: .75rem;
      }
    }
    .no-msg{
      width: 100%;
      height: 20rem;
      margin: 0 0;
      img{
        width: 6.05rem;
        height: 6.05rem;
        margin: 6.5rem 6.35rem;
      }
    }
  }
</style>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import {messageGetters} from '../../vuex/getters'
  import {messageActions} from '../../vuex/actions'
  import {setLocalCache, getLocalCache} from '../../util/cache'
  import {platformMap, Device} from '../../plugin/device'
  export default {
    vuex: {
      actions: {
        loadMsgArr: messageActions.loadMsgArr
      },
      getters: {
        msgArr: messageGetters.msgArr
      }
    },

    route: {
      data () {
        this.loadMsgArr()
      }
    },

    /**
     *
     * @returns {{isTipShow: boolean}}
     */
    data () {
      let isTipShow = false
      if (Device.platform === platformMap.IOS && !getLocalCache('IS_IOS_MSG_TIP_SHOW')) {
        isTipShow = true
      }

      return {
        isTipShow,
        scrollerHeight: '590px'
      }
    },

    watch: {
      'msgArr': function (newArr) {
        const me = this
        const {titlebar} = this.$els
        me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight) + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
              top: 0
            })
          })
        }, 1500)
      }

    },
    methods: {
      onTapTip () {
        this.isTipShow = false
        setLocalCache('IS_IOS_MSG_TIP_SHOW', {isShow: false})
      },

     /**
      * 有查看详情的消息可以点击跳转
      *
      **/
      goDetailTap (msg) {
        this.$route.router.go(msg.mbUrl)
      }
    },

    components: {
      IctTitlebar,
      Scroller
    }
  }
</script>
