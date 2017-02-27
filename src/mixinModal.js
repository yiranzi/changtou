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

    /**
     * 显示 alert
     * @param args
       */
    showAlert: function (args) {
      if (typeof args === 'string') {
        this.$dispatch(eventMap.SHOW_ALERT, {message: args, btnText: '确定'})
      } else if (typeof args === 'object') {
        const {message = '', btnText = '确定'} = args
        this.$dispatch(eventMap.SHOW_ALERT, {message, btnText})
      }
    },

    /**
     * 隐藏 alert时
     */
    hideAlert: function () {
      this.$dispatch(eventMap.HIDE_ALERT)
    },

    /**
     * 显示 toast
     * @param args
       */
    showToast: function (args) {
      if (typeof args === 'string') {
        this.$dispatch(eventMap.SHOW_TOAST, {message: args, type: 'text'})
      } else if (typeof args === 'object') {
        const {message = '', type = 'text'} = args
        this.$dispatch(eventMap.SHOW_TOAST, {message, type})
      }
    },

    /**
     * 显示 带mask的浮层
     * @param component
     * @param hideOnMaskTap
     * @param data
     * @param callbackName
       * @param callbackFn
       */
    showMask: function ({component, hideOnMaskTap = true, componentData, callbackName, callbackFn}) {
      this.$dispatch(eventMap.SHOW_MASK, {component, hideOnMaskTap, componentData, callbackName, callbackFn})
    },

    /**
     * 隐藏 mask
     */
    hideMask: function () {
      this.$dispatch(eventMap.HIDE_MASK)
    },

    /**
     * 显示loading
     * @param message
       */
    showLoading: function (message = '努力加载中..') {
      let MyComponent = Vue.extend({
        template: `<div>
                    <div class="ict-loading-mask" ></div>
                    <div class="ict-loading-content">
                      <img src="./static/image/loading.gif" class="ict-loading-img">
                      <p>${message}</p>
                    </div>
                  </div>`
      })
      new MyComponent({ el: '#mask' })
      this.isMaskShow = true
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
      //hide时 为false 的逻辑在app.vue里
      this.alertBox = {
        show: true,
        message: message,
        btnText: btnText
      }
    },

    [eventMap.HIDE_ALERT]: function () {
      this.isMaskShow = false
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
          this.isMaskShow = false
          this.toast.show = false
        }, timeout
      )
    },

    [eventMap.SHOW_MASK]: function ({component, hideOnMaskTap, componentData, callbackName, callbackFn}) {
      const me = this
      me.isMaskShow = true

      // 执行完毕后, 重置标识
      const realCallBack = () => {
        callbackFn()
        me.hideMask()
      }

      const MyComponent = Vue.extend({
        template: `<div>
                    <div class="ict-float-mask" v-touch:tap="onFloatMaskTap"></div>
                    <div class="ict-float-component"><mask-component :component-data="componentData"><a slot="data">${componentData}</a></mask-component></div>
                  </div>`,
        components: {
          'mask-component': require('./components/' + component)
        },
        events: {
          hideMask: me.hideMask,
          [callbackName]: realCallBack
        },
        methods: {
          onFloatMaskTap: function (e) {
            if (e.preventDefault) {
              e.preventDefault()
            }

            if (e.stopPropagation) {
              e.stopPropagation()
            }

            if (hideOnMaskTap) {
              me.hideMask()
            }
          }
        }
      })
      new MyComponent({
          el: '#mask',
          data: {
            componentData: componentData
          }
        })
    },

    [eventMap.HIDE_MASK]: function () {
      setTimeout(
        () => {
          let MyComponent = Vue.extend({
            template: `<div></div>`
          })
          new MyComponent({ el: '#mask' })
          this.isMaskShow = false
        },
        100
      )
    }
  }
}

export default mixin
