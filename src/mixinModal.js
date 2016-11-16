/**
 * Created by ichangtou on 16/11/9.
 *
 * 全局的模态(弹框) 处理
 */
import {eventMap} from './frame/eventConfig'
//import Vue from 'vue'
//import Alert from 'vux/alert'
const mixin = {
  events: {
    [eventMap.SHOW_CONFIRM]: function (confirmObj) {
      this.showConfirm(confirmObj)
    },

    [eventMap.SHOW_ALERT]: function (alertObj) {
      this.showAlert(alertObj)
    },

    [eventMap.SHOW_FLOAT]: function (message) {
      this.showToast(message)
    }
  },
  methods: {
    showConfirm: function ({title = '', message, okText, okCallback, cancelText, cancelCallback}) {
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
    showAlert: function (message, btnText) {
      this.alertBox = {
        show: true,
        message: message,
        btnText: btnText
      }
    },
    showToast: function (message, type) {
      this.toast = {
        show: true,
        type: type, // success,text
        message: message
      }
    }
  }
}

export default mixin
