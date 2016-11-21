/**
 * Created by zl on 16/11/18.
 *
 * 安卓后退键的全局处理
 */

import backHandler from './plugin/backHandler'

let isWantQuit = false

const mixin = {
  ready () {
    //backHandler.setDefaultHandler(this.defaultBackHandler.bind(this))
    backHandler.setDefaultHandler(this.defaultBackHandler.bind(this))
  },

  methods: {
    defaultBackHandler () {
      if (this.isMaskShow) {
        // 模块窗口弹出, do nothing
        return
      }

      //在首页,点击后退退出app
      if (this.route.path === '/main' || this.route.path === '/setting' || this.route.path === '/mycourse') {
        if (isWantQuit) {
          window.navigator.app.exitApp()
        } else {
          this.showToast({message: '再按一次退出长投学堂'})
          isWantQuit = true
          setTimeout(() => { isWantQuit = false }, 2000)
        }
      } else {
        window.history.back()
      }
    }
  }
}

export default mixin
