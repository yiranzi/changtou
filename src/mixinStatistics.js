
/**
 * Created by jun on 2016/12/14.
 */
import {eventMap} from './frame/eventConfig'
import {userId, userName} from './vuex/user/getters'
import ictData from './statistics/ictData'
import {Device} from './plugin/device'
import {statisticsMap} from './statistics/statisticsMap'

const mixin = {
  data () {
    return {
      preView: null // 上一张页面
    }
  },
  vuex: {
    actions: {

    },
    getters: {
      userId,
      userName
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
      this.login()
    },

    /**
     * 同步用户信息
     */
    [eventMap.SYNC_USER]: function () {
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
    },

    /**
     * 页面切换事件
     */
    [eventMap.VIEW_CHANGE]: function (viewPath) {
      this.viewChange(viewPath)
    },

    /**
     * 触发统计事件
     */
    [eventMap.STATISTIC_EVENT]: function (eventName, properties) {
      ictData.track(eventName, properties)
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
      ictData.register({
        'userName': this.userName || ''
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
    viewChange: function (eventName, viewPath) {
      // 上一张页面停留
      if (this.preView) {
        let time = ((new Date().valueOf() - this.preView.startTime) / 1000).toFixed(0)
        ictData.track(statisticsMap.PAGE_TIME, {'页面': viewPath, '时长': time})
      }

      // 当前页面
      this.preView = {
        startTime: new Date().valueOf(),
        url: viewPath
      }

      ictData.track(statisticsMap.PAGE_VIEW, {'受访页面': window.location.href, 访问页面: '#' + window.location.href.split('!')[1]})
    }
  }
}

export default mixin
