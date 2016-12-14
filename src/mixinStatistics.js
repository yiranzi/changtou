
/**
 * Created by jun on 2016/12/14.
 */
import {eventMap} from './frame/eventConfig'
import {userId} from './vuex/user/getters'
import ictData from './statistics/ictData'
import {Device} from './plugin/device'

const mixin = {
  vuex: {
    actions: {

    },
    getters: {
      userId
    }
  },
  events: {
    /**
     * app 启动
     */
    [eventMap.APP_START]: function () {
      this.registerStatistics()
    },

    /**
     * 登录成功事件
     */
    [eventMap.LOGIN_SUCCESS]: function () {
      console.log('login')
      this.login()
    },

    /**
     * 同步用户信息
     */
    [eventMap.SYNC_USER]: function () {
      console.log('SYNC_USER')
      this.login()
    },

    /**
     * 注册成功事件
     */
    [eventMap.REGISTER_SUCCESS]: function () {
      this.register()
    },

    /**
     * 退出账号事件
     */
    [eventMap.LOGOUT]: function () {
      this.logout()
    }
  },
  methods: {
    /**
     * 设置超级属性
     */
    registerStatistics: function () {
      ictData.register({
        'platform': Device.platform
      })
      ictData.register({
        'userId': this.userId || '00'
      })
    },

    /**
     * 超级属性 更新 用户信息
     */
    updateUser: function () {
      ictData.register({
        'userId': this.userId || '00'
      })
    },

    /**
     * 数据统计 登录
     */
    login: function () {
      this.updateUser()
      ictData.track('登录')
    },

    /**
     * 数据统计 注册
     */
    register: function () {
      this.updateUser()
      ictData.track('注册')
    },

    /**
     * 数据统计 退出登录
     */
    logout: function () {
      ictData.register({
        'userId': '00'
      })
    },

    /**
     * 数据统计 页面跳转
     */
    viewChange: function () {

    }
  }
}

export default mixin
