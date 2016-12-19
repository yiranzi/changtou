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

    showAlert: function (args) {
      if (typeof args === 'string') {
        this.$dispatch(eventMap.SHOW_ALERT, {message: args, btnText: '确定'})
      } else if (typeof args === 'object') {
        const {message = '', btnText = '确定'} = args
        this.$dispatch(eventMap.SHOW_ALERT, {message, btnText})
      }
    },

    showToast: function (args) {
      if (typeof args === 'string') {
        this.$dispatch(eventMap.SHOW_TOAST, {message: args, type: 'text'})
      } else if (typeof args === 'object') {
        const {message = '', type = 'text'} = args
        this.$dispatch(eventMap.SHOW_TOAST, {message, type})
      }
    },

    showMask: function ({component, hideOnMaskTap = true, data, callbackName, callbackFn}) {
      this.$dispatch(eventMap.SHOW_MASK, {component, hideOnMaskTap, data, callbackName, callbackFn})
    },
    /**
     * 隐藏 mask
     */
    hideMask: function () {
      let MyComponent = Vue.extend({
        template: `<div></div>`
      })
      new MyComponent({ el: '#mask' })
      this.isMaskShow = false
    },

    /**
     * 显示loading
     * @param message
       */
    showLoading: function (message = 'loading...') {
      let MyComponent = Vue.extend({
        template: `<div>
                    <div class="ict-loading-mask" ></div>
                    <div class="ict-loading-content">
                      <img src="../static/image/hourglass.svg" class="ict-loading-img">
                      <p>${message}</p>
                    </div>
                  </div>`
      })
      new MyComponent({ el: '#mask' })
      this.isMaskShow = false
    },

    /**
     * 隐藏loading
     */
    hideLoading: function () {
      let MyComponent = Vue.extend({
        template: `<div></div>`
      })
      new MyComponent({ el: '#mask' })
      this.isMaskShow = false
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
      },
      floatBox: {
        component: '',
        hideOnMaskTap: true
      },
      onFloatMaskTap: null
    }
  },

  events: {
    [eventMap.SHOW_CONFIRM]: function ({title = '', message, okText, okCallback, cancelText, cancelCallback}) {
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

    [eventMap.SHOW_ALERT]: function ({message, btnText}) {
      this.isMaskShow = true
      this.alertBox = {
        show: true,
        message: message,
        btnText: btnText
      }
    },

    [eventMap.SHOW_TOAST]: function ({message, type, timeout = 2000}) {
      this.isMaskShow = true
      this.toast = {
        show: true,
        type: type, // success,text
        message: message
      }
      setTimeout(
        () => {
          this.toast.show = false
        }, timeout
      )
    },

    [eventMap.SHOW_MASK]: function ({component, hideOnMaskTap, data, callbackName, callbackFn}) {
      const me = this
      me.isMaskShow = true
      const MyComponent = Vue.extend({
        template: `<div>
                    <div class="ict-float-mask" v-touch:tap="onFloatMaskTap"></div>
                    <div class="ict-float-component"><mask-component><a slot="data">${data}</a></mask-component></div>
                  </div>`,
        components: {
          'mask-component': require('./components/' + component)
        },
        events: {
          [callbackName]: callbackFn
        },
        methods: {
          onFloatMaskTap: function () {
            if (hideOnMaskTap) {
              const me = this
              let EmptyComponent = Vue.extend({
                template: `<div></div>`
              })
              new EmptyComponent({ el: '#mask' })
              me.isMaskShow = false
            }
          }
        }
      })
      new MyComponent({ el: '#mask' })
    }
  }
}

export default mixin
