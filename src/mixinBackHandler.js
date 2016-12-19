/**
 * Created by zl on 16/11/18.
 *
 * 安卓后退键的全局处理
 */
import Vue from 'vue'
import backHandler from './plugin/backHandler'

// 是否想退出 (标识)
let _isWantQuit = false

// 当前back操作是否激活 (标识)
let _isBackHandlerActive = true

Vue.mixin({
  methods: {
    /**
     * 禁止back键操作
     */
    forbidBackAction () {
      _isBackHandlerActive = false
    },

    /**
     * 回复back键操作
     */
    resumeBackAction () {
      _isBackHandlerActive = true
    }
  }
})

const mixin = {
  ready () {
    //backHandler.setDefaultHandler(this.defaultBackHandler.bind(this))
    backHandler.setDefaultHandler(this.defaultBackHandler.bind(this))
  },

  methods: {
    defaultBackHandler () {
      // 如果不影响,
      if (!_isBackHandlerActive) {
        return
      }

      //在首页,点击后退退出app
      if (this.route.path === '/main' || this.route.path === '/setting' || this.route.path === '/mycourse') {
        if (_isWantQuit) {
          window.navigator.app.exitApp()
        } else {
          this.showToast({message: '再按一次退出长投学堂'})

          _isWantQuit = true
          setTimeout(() => { _isWantQuit = false }, 2000)
        }
      } else {
        // 如果不是首页
        if (this.isMaskShow) {
          // 模块窗口弹出, 隐藏
          return
        } else {
          window.history.back()
        }
      }
    }
  }
}

export default mixin
