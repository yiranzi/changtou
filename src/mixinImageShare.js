/**
 * Created by jun on 2017/1/24.
 * 图像 分享功能
 */

import {eventMap} from './frame/eventConfig'
import {statisticsMap} from './statistics/statisticsMap'
import {userGetters} from './vuex/getters'
import html2canvas from 'html2canvas'
//import {API_TOKEN, SEVER_URL} from './frame/serverConfig'

const mixin = {
  vuex: {
    getters: {
      isLogin: userGetters.isLogin,
      userId: userGetters.userId,
      sessionId: userGetters.sessionId
    }
  },
  data () {
    return {
      showShareFloat: false,
      shareImageWidth: 0,
      shareImageHeight: 0
    }
  },
  methods: {
    /**
     * 设置分享图片的url
     * @param element
       */
    setShareImageUrl ({element, height, width}) {
      this.renderHtml({element, height, width}).then(this.convertHtmlToBase64).then(
        (base64) => {
          console.log(base64)
          this.shareConfig.imgUrl = base64
        }
      )
    },

    /**
     * 将html转换成base64
     * @param element
     * @returns {Promise}
       */
    convertHtmlToBase64 (element) {
      this.shareImageWidth = element.offsetWidth
      this.shareImageHeight = element.offsetHeight

      return new Promise(
        (resolve, reject) => {
          html2canvas(element, {
            height: this.shareImageHeight,
            width: this.shareImageWidth
          }).then(
            (originCanvas) => {
              originCanvas.style.height = this.shareImageHeight + 'px'
              originCanvas.style.width = this.shareImageWidth + 'px'
              originCanvas.style.display = 'none'

              let base64 = this.convertCanvasToBase64(originCanvas)
              resolve(base64)
            }
          )
        }
      )
    },

    /**
     *
     * @param origin
     * @returns {Promise.<Node>}
     */
    renderHtml ({element, height, width}) {
      this.shareImageWidth = width
      this.shareImageHeight = height

      const ratio = (650 / this.shareImageHeight).toFixed(2)
      const ShareContentStyle = `width: ${width};height: ${height};transform: scale3d(${ratio}, ${ratio}, 1);transform-origin: 50% 0 0;`

      const eleHtml =
        `<div class="in-app-image-share-panel">
            <div class="in-app-image-share-content-box">
              <div class="in-app-image-share-content" id="in-app-image-share-content" style="${ShareContentStyle}"></div>
            </div>
            <div class="qrcode-panel">
              <div class="download-qrcode"></div>
              <div class="app-info">
                <p class="title">长投学堂APP</p>
                <p class="sub-title">长按识别二维码下载</p>
              </div>
            </div>
        <div/>`
      const node = window.document.createElement('div')
      node.style.position = 'absolute'
      node.style.left = '100%'
      node.style.top = 0
      node.innerHTML = eleHtml

      const result = window.document.body.appendChild(node)
      const shareContent = window.document.getElementById('in-app-image-share-content')
      shareContent.appendChild(element)
      return Promise.resolve(result)
    },

    /**
     * 将canvas转成base64
     * @param originCanvas
     * @returns {*|String|string}
       */
    convertCanvasToBase64 (originCanvas) {
      let canvas = window.document.body.appendChild(originCanvas)
      const base64 = canvas.toDataURL()
      window.document.body.removeChild(canvas)
      return Promise.resolve(base64)
    },

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
                type: window.Wechat.Type.IMAGE,
                image: me.shareConfig.imgUrl
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
                type: window.Wechat.Type.IMAGE,
                image: me.shareConfig.imgUrl
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
    }
  }
}

export default mixin
