/**
 * Created by zl on 16/11/9.
 *
 * 全局的模态(弹框) 处理
 */

import {eventMap} from './frame/eventConfig'
import Vue from 'vue'
//import Alert from 'vux/alert'

/**
 * 全局混入 模态的调用方法
 */
Vue.mixin({
  methods: {
    showConfirm: function ({title, message, okText, okCallback, cancelText, cancelCallback}) {
      this.$dispatch(eventMap.SHOW_CONFIRM,
        {title, message, okText, okCallback, cancelText, cancelCallback})
    },

    showAlert: function ({message, btnText}) {
      this.$dispatch(eventMap.SHOW_ALERT, {message, btnText})
    },

    showToast: function ({message}) {
      this.$dispatch(eventMap.SHOW_FLOAT, {message})
    }
  }
})

const mixin = {
  events: {
    [eventMap.SHOW_CONFIRM]: function ({title = '', message, okText, okCallback, cancelText, cancelCallback}) {
      this.confirmBox = {
        show: true,
        title: title,
        message: message,
        okText: okText,
        cancelText: cancelText,
        okCallback: okCallback,
        cancelCallback: cancelCallback
      }
    },

    [eventMap.SHOW_ALERT]: function ({message, btnText = '确定'}) {
      this.alertBox = {
        show: true,
        message: message,
        btnText: btnText
      }
    },

    [eventMap.SHOW_FLOAT]: function ({message, type}) {
      this.toast = {
        show: true,
        type: type, // success,text
        message: message
      }
    }
  }
}

export default mixin
