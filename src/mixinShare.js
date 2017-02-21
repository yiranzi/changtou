/**
 * Created by jun on 2017/1/24.
 * app中可以分享的页面有: 院生访谈/电子书2/年报
 */
import {eventMap} from './frame/eventConfig'
import {statisticsMap} from './statistics/statisticsMap'

const mixin = {
  data () {
    return {
      showShareFloat: false
    }
  },
  events: {

  },
  methods: {
    /**
     * 显示sharePanel
     */
    showActionSharePanel () {
      this.showShareFloat = true
    },
    /**
     * 隐藏sharePanel
     */
    cancelShare () {
      this.showShareFloat = false
    },
    /**
     * 点击sharePanel
     * @param event
       */
    onActionTap (event) {
      this.showShareFloat = false
      switch (event.target.className) {
        case 'wechat':
          this.shareToFriendInApp() // 分享朋友
          break
        case 'timeline':
          this.shareToTimelineInApp() //分享到朋友圈
          break
        case 'qq':
          this.shareToQQInApp() // 分享朋友
          break
        case 'weibo':
          this.shareToWeiboInApp() //分享到朋友圈
          break
        default:
          break
      }
    },

    //分享 链接 到 微信好友
    shareToFriendInApp () {
      const me = this
      if (window.Wechat) {
        window.Wechat.share({
            message: {
              title: me.shareConfig.title, // 分享标题
              description: me.shareConfig.desc,
              thumb: me.shareConfig.imgUrl, // 分享图标
              media: {
                type: window.Wechat.Type.WEBPAGE,
                webpageUrl: me.shareConfig.link
              }
            },
            scene: window.Wechat.Scene.SESSION
          },
          function () {
            me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
              '分享内容': me.shareConfig.title,
              '分享渠道': '微信-会话'
            })
          },
          function (reason) {
            if (reason === '用户点击取消并返回') {

            } else {
              me.showAlert({title: '分享失败', message: reason})
            }
          }
        )
      } else {
        this.showAlert('请先安装微信客户端')
      }
    },

    //分享 链接 到 微信朋友圈
    shareToTimelineInApp () {
      const me = this
      if (window.Wechat) {
        window.Wechat.share({
            message: {
              title: me.shareConfig.title, // 分享标题
              description: me.shareConfig.desc,
              thumb: me.shareConfig.imgUrl, // 分享图标
              media: {
                type: window.Wechat.Type.WEBPAGE,
                webpageUrl: me.shareConfig.link
              }
            },
            scene: window.Wechat.Scene.TIMELINE // share to Timeline
          },
          function () {
            me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
              '分享内容': me.shareConfig.title,
              '分享渠道': '微信-朋友圈'
            })
          },
          function (reason) {
            if (reason === '用户点击取消并返回') {

            } else {
              me.showAlert({title: '分享失败', message: reason})
            }
          }
        )
      } else {
        this.showAlert('请先安装微信客户端')
      }
    },

    //分享 图片 到 微信好友
    shareToFriendInApp () {
      const me = this
      if (window.Wechat) {
        window.Wechat.share({
            message: {
              title: me.shareConfig.title, // 分享标题
              description: me.shareConfig.desc,
              thumb: me.shareConfig.imgUrl, // 分享图标
              media: {
                type: window.Wechat.Type.IMAGE,
                webpageUrl: me.shareConfig.link
              }
            },
            scene: window.Wechat.Scene.SESSION
          },
          function () {
            me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
              '分享内容': me.shareConfig.title,
              '分享渠道': '微信-会话'
            })
          },
          function (reason) {
            if (reason === '用户点击取消并返回') {

            } else {
              me.showAlert({title: '分享失败', message: reason})
            }
          }
        )
      } else {
        this.showAlert('请先安装微信客户端')
      }
    },

    //分享 图片 到 微信朋友圈
    shareToTimelineInApp () {
      const me = this
      if (window.Wechat) {
        window.Wechat.share({
            message: {
              title: me.shareConfig.title, // 分享标题
              description: me.shareConfig.desc,
              thumb: me.shareConfig.imgUrl, // 分享图标
              media: {
                type: window.Wechat.Type.IMAGE,
                webpageUrl: me.shareConfig.link
              }
            },
            scene: window.Wechat.Scene.TIMELINE // share to Timeline
          },
          function () {
            me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
              '分享内容': me.shareConfig.title,
              '分享渠道': '微信-朋友圈'
            })
          },
          function (reason) {
            if (reason === '用户点击取消并返回') {

            } else {
              me.showAlert({title: '分享失败', message: reason})
            }
          }
        )
      } else {
        this.showAlert('请先安装微信客户端')
      }
    },


    /**
     * 分享到QQ
     */
    shareToQQInApp () {
      if (window.YCQQ) {
        const me = this
        var args = {}
        args.url = me.shareConfig.link
        args.title = me.shareConfig.title
        args.description = me.shareConfig.desc
        args.imageUrl = me.shareConfig.imgUrl
        args.appName = '长投学堂'
        window.YCQQ.shareToQQ(
          function () {
            me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
              '分享内容': me.shareConfig.title,
              '分享渠道': 'QQ'
            })
          },
          function (failReason) {
            if (failReason === 'cancelled by user') {

            } else {
              me.showAlert({title: '分享失败', message: failReason})
            }
          },
          args
        )
      } else {
        this.showAlert('请先安装QQ客户端')
      }
    },
    /**
     * 分享到微博
     */
    shareToWeiboInApp () {
      if (window.YCWeibo) {
        const me = this
        var args = {}
        args.url = me.shareConfig.link
        args.title = me.shareConfig.title
        args.description = '长投学堂' + me.shareConfig.desc
        args.imageUrl = me.shareConfig.imgUrl
        args.defaultText = me.shareConfig.desc
        window.YCWeibo.shareToWeibo(
          function () {
            me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
              '分享内容': me.shareConfig.title,
              '分享渠道': '微博'
            })
          },
          function (failReason) {
            if (failReason === 'cancel by user') {

            } else {
              me.showAlert({title: '分享失败', message: failReason})
            }
          },
          args
        )
      } else {
        this.showAlert('请先安装微博客户端')
      }
    }
  }
}

export default mixin
