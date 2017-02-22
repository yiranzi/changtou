/**
 * Created by jun on 2017/1/24.
 * 图像 分享功能
 */
import {eventMap} from './frame/eventConfig'
import {statisticsMap} from './statistics/statisticsMap'
import html2canvas from 'html2canvas'
import {shareActions} from './vuex/actions'
import {userGetters} from './vuex/getters'
const mixin = {
  vuex: {
    actions: {
      uploadImage: shareActions.uploadFile
    },
    getters: {
      userId: userGetters.userId
    }
  },
  data () {
    return {
      shareConfig: null,
      showShareFloat: false,
      shareImageWidth: 0,
      shareImageHeight: 0
    }
  },
  methods: {
    setShareImageUrl (element) {
      this.convertHtmlToBase64(element).then(this.renderShareHtml).then(this.convertHtmlToBase64).then(this.convertBase64ToBlob).then(this.uploadShareImage).then(
        (url) => {
          this.shareConfig.imgUrl = url
        }
      )
    },

    uploadShareImage (blob) {
      let formData = new window.FormData()
      let imageName = `app-diploma-${this.userId}.png`
      formData.append('image', blob, imageName)
      return new Promise(
        (resolve, reject) => {
          this.uploadImage(formData).then(
            url => { resolve(url) }
          ).catch(
            err => { reject(err) }
          )
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
     * 绘制分享的图片
     * @param base64
       * @returns {*}
       */
    renderShareHtml (base64) {
      const panelStyle = `width: ${this.shareImageWidth}px;`
      const imgStyle = `width: ${this.shareImageWidth}px;height: ${this.shareImageHeight}px`
      const eleHtml =
        `<div class="in-app-image-share-panel" id="in-app-image-share-panel" style="${panelStyle}" v-el:image-share-panel>
            <img src="${base64}" style="${imgStyle}">
            <div class="qrcode-panel">
              <div class="qr-code"></div>
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
      const element = window.document.body.appendChild(node)
      return Promise.resolve(element)
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
     * 将base64转成blob
     * @param base64
     * @returns {*}
       */
    convertBase64ToBlob (base64) {
      const arr = base64.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      let bstr = window.atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const blob = new window.Blob([u8arr], {type: mime})
      return Promise.resolve(blob)
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
