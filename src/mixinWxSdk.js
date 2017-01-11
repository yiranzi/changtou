/**
 * Created by jun on 2017/1/11.
 */

import {postWithoutAuth} from './frame/ajax'
import {eventMap} from './frame/eventConfig'
import {getUrl} from './frame/apiConfig'
import {statisticsMap} from './statistics/statisticsMap'

const defaultShareConfig = {
  title: '长投学堂',
  desc: '长投学堂--财富增长的魔法学院',
  link: window.location.href.split('#')[0],
  imgUrl: 'http://h5.ichangtou.com/mapp/resources/image/wx/default.png'
}

const mixin = {
  data () {
    return {

    }
  },
  methods: {
    /**
     * 初始化sdk
     * 从服务器获取签名等内容，然后设置
     */
    initSdkConfig () {
      const me = this
      postWithoutAuth(
        {
          url: getUrl('wx_signature'),
          data: {
            url: window.location.href.split('#')[0]
          }
        }
      ).then(
        function (config) {
          window.wx.config({
            appId: config.wechat_appid,
            timestamp: config.timestamp,
            nonceStr: config.nonceStr,
            signature: config.signature,
            jsApiList: [
              'onMenuShareTimeline', // 分享到朋友圈
              'onMenuShareAppMessage', // 分享给朋友
              'onMenuShareQQ', // 分享到qq
              'onMenuShareWeibo', // 分享到腾讯微博
              'onMenuShareQZone', // 分享到qq空间
              'getNetworkType' // 获取当前网络状态
            ]
          })
          window.wx.ready(function () {
            setTimeout(function () {
              me.onViewChange()
            }, 200)
          })
        }
      ).catch(
        function (err) {
          console.error('设置微信jsSdk失败', err)
        }
      )
    },
    /**
     *  当页面改变时，设置分享
     */
    onViewChange () {
      this.setShareConfigForAll(this.$els.activeView.ShareConfig || defaultShareConfig)
    },

    /**
     * @param config
     */
    setShareConfigForAll (config) {
      this.shareToFriend(config)
      this.shareToTimeline(config)
      this.shareToQQ(config)
      this.shareToQQZone(config)
      this.shareToWeibo(config)
    },

    /**
     * 分享给朋友
     * @param config
     */
    shareToFriend (config) {
      const me = this
      window.wx.onMenuShareAppMessage({
        title: config.title,
        desc: config.desc,
        link: config.link,
        imgUrl: config.imgUrl,

        trigger: function (res) {
          // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
          //alert('用户点击发送给朋友')
          me.onTrigger('friend')
        },

        success: function (res) {
          //alert('已分享')
          me.onSuccess('friend')
        },

        cancel: function (res) {
          //alert('已取消')
          me.onCancel('friend')
        },

        fail: function (res) {
          //alert(JSON.stringify(res))
        }
      })
    },

    /**
     * 分享到朋友圈
     * @param config
     */
    shareToTimeline (config) {
      const me = this
      //注意，这里分享到朋友圈，是没有title的，直接设置desc
      window.wx.onMenuShareTimeline({
        title: config.desc,
        link: config.link,
        imgUrl: config.imgUrl,

        trigger: function (res) {
          // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
          //alert('用户点击分享到朋友圈')
          me.onTrigger('timeline')
        },
        success: function (res) {
          //alert('已分享')
          me.onSuccess('timeline')
        },
        cancel: function (res) {
          me.onCancel('timeline')
          //alert('已取消')
        },
        fail: function (res) {
          //alert(JSON.stringify(res))
        }
      })
    },

    /**
     * 分享到qq
     * @param config
     */
    shareToQQ (config) {
      const me = this
      window.wx.onMenuShareQQ({
        title: config.title,
        desc: config.desc,
        link: config.link,
        imgUrl: config.imgUrl,

        trigger: function (res) {
          //alert('用户点击分享到QQ')
          me.onTrigger('QQ')
        },
        complete: function (res) {
          //alert(JSON.stringify(res))
        },
        success: function (res) {
          //alert('已分享')
          me.onSuccess('QQ')
        },
        cancel: function (res) {
          //alert('已取消')
          me.onCancel('QQ')
        },
        fail: function (res) {
          //alert(JSON.stringify(res))
        }
      })
    },

    /**
     * 分享到qq空间
     * @param config
     */
    shareToQQZone (config) {
      const me = this
      window.wx.onMenuShareQZone({
        title: config.title,
        desc: config.desc,
        link: config.link,
        imgUrl: config.imgUrl,

        trigger: function (res) {
          //alert('用户点击分享到QZone')
          me.onTrigger('QZone')
        },
        complete: function (res) {
          //alert(JSON.stringify(res))
        },
        success: function (res) {
          me.onSuccess('QZone')
          //alert('已分享')
        },
        cancel: function (res) {
          me.onCancel('QZone')
          //alert('已取消')
        },
        fail: function (res) {
          //alert(JSON.stringify(res))
        }
      })
    },

    /**
     * 分享到腾讯微博
     */
    shareToWeibo (config) {
      const me = this
      window.wx.onMenuShareWeibo({
        title: config.title,
        desc: config.desc,
        link: config.link,
        imgUrl: config.imgUrl,

        trigger: function (res) {
          //alert('用户点击分享到微博')
          me.onTrigger('weibo')
        },
        complete: function (res) {
          //alert(JSON.stringify(res))
        },
        success: function (res) {
          me.onSuccess('weibo')
          //alert('已分享')
        },
        cancel: function (res) {
          me.onCancel('weibo')
          //alert('已取消')
        },
        fail: function (res) {
          //alert(JSON.stringify(res))
        }
      })
    },

      /**
       * 触发分享
       * @param target
       */
    onTrigger (target) {
      this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.WX_SHARE, {
        '页面': window.location.hash,
        '分享目标': target
      })
    },

      /**
       * 分享成功
       * @param target
       */
    onSuccess (target) {
      this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.WX_SHARE, {
        '页面': window.location.hash,
        '分享目标': target
      })
    },

      /**
       * 取消分享
       * @param target
       */
    onCancel (target) {
      this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.WX_SHARE, {
        '页面': window.location.hash,
        '分享目标': target
      })
    }
  }
}

export default mixin
