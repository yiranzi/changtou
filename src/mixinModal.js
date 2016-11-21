/**
 * Created by zl on 16/11/9.
 *
 * 全局的模态(弹框) 处理
 */

import {eventMap} from './frame/eventConfig'
import Vue from 'vue'
//import Alert from 'vux/alert'

const emptyFn = () => {}
/**
 * 全局混入 模态的调用方法
 */
Vue.mixin({
  methods: {
    showConfirm: function ({title = '', message = '', okText = '确定', okCallback = emptyFn,
      cancelText = '取消', cancelCallback = emptyFn}) {
      this.$dispatch(eventMap.SHOW_CONFIRM,
        {title, message, okText, okCallback, cancelText, cancelCallback})
    },

    showAlert: function ({message = '', btnText = ''}) {
      this.$dispatch(eventMap.SHOW_ALERT, {message, btnText})
    },

    showToast: function ({message = ''}) {
      this.$dispatch(eventMap.SHOW_FLOAT, {message})
    }
  }
})

const mixin = {
  data () {
    return {
      isMaskShow: false,
      alertBox: {},
      toast: {},
      confirmBox: {
        title: ''
      }
    }
  },

  events: {
    [eventMap.SHOW_CONFIRM]: function ({title = '', message, okText, okCallback, cancelText, cancelCallback}) {
      //
      const me = this
      me.isMaskShow = true
      const okAction = function () {
        okCallback()
        me.isMaskShow = false
      }

      const cancelAction = function () {
        cancelCallback()
        me.isMaskShow = false
      }

      // 这里加入延迟是防止出现被点透无法响应的情况
      setTimeout(function () {
        me.confirmBox = {
          show: true,
          title: title,
          message: message,
          okText: okText,
          cancelText: cancelText,
          okCallback: okAction,
          cancelCallback: cancelAction
        }
      }, 150)
    },

    [eventMap.SHOW_ALERT]: function ({message, btnText = '确定'}) {
      // todo  这里缺少全局的 设置 isMaskShow
      this.alertBox = {
        show: true,
        message: message,
        btnText: btnText
      }
    },

    [eventMap.SHOW_FLOAT]: function ({message, type}) {
      // todo  这里也是
      this.toast = {
        show: true,
        type: type, // success,text
        message: message
      }
    }
  }
}

export default mixin
