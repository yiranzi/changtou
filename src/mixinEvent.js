/**
 * Created by zl on 16/10/30.
 *
 * 全局的事件监听器
 */
import {eventMap} from './frame/eventConfig'
import {loadAllFreeRecords, loadAllExpenseRecords, resetRecords} from './vuex/courseRecords/actions'
import {jpushInit, jpushSetAlias, jpushAddReceiveHandler} from './vuex/jpush/actions'
import {syncUser} from './vuex/user/actions'
import {isLogin, userId} from './vuex/user/getters'
import {platformMap, Device} from './plugin/device'
import {backHandlerInit} from './plugin/backHandler'
const mixin = {
  vuex: {
    actions: {
      loadAllFreeRecords,
      loadAllExpenseRecords,
      resetRecords,
      jpushInit,
      jpushSetAlias,
      jpushAddReceiveHandler,
      syncUser
    },
    getters: {
      isLogin,
      userId
    }
  },

  watch: {
    //'isLogin': function (currLoginStatus, preloginStatus) {
    //  if (currLoginStatus) {
    //    this.setAlias(this.userId)
    //  } else {
    //    this.setAlias('00')
    //  }
    //}
  },

  events: {
    /**
     * app 启动的全局事件
     */
    [eventMap.APP_START]: function () {
      console.log('APP_START')

      // 设置推送配置
      this.jpushInit()
      // 默认用户 设置成'00'
      this.jpushSetAlias('00')
      // 增加推送消息接收处理
      this.jpushAddReceiveHandler(this.onReceiveNotification)

      // 同步用户信息
      this.syncUser().then(this.doWhenUserValid).catch(() => console.log('没有账户, 不做处理'))

      backHandlerInit()

      this.hideSplashscreen()
    },

    /**
     * 登录成功事件
     */
    [eventMap.LOGIN_SUCCESS]: function (user) {
      console.info('LOGIN_SUCCESS', user)
      this.doWhenUserValid(user)
    },

    /**
     * 注册成功事件
     */
    [eventMap.REGISTER_SUCCESS]: function (user) {
      console.info('REGISTER_SUCCESS', user)
      this.doWhenUserValid(user)
    },

    /**
     * 退出账号事件
     */
    [eventMap.LOGOUT]: function (user) {
      console.info('LOGOUT', user)
      this.doWhenUserNotValid(user)
    }
  },

  methods: {
    /**
     * 用户信息合法并且成功进入系统
     * @param user
     */
    doWhenUserValid: function (user) {
      let tasks = []
      // 获取课程进度
      tasks.push(this.loadAllFreeRecords)
      tasks.push(this.loadAllExpenseRecords)
      // 设置jpush用户关联
      tasks.push(Promise.resolve(user.userId).then(this.jpushSetAlias))

      return Promise.all(tasks).then(
        () => {}
      ).catch(
        () => {}
      )
    },

    /**
     * 如果没有合法的用户
     * （未登录，账户退出）
     */
    doWhenUserNotValid: function () {
      // 清理课程进度
      this.resetRecords()
      // 设置推送关联
      this.jpushSetAlias('00')
    },

    /**
     * 隐藏启动图片
     */
    hideSplashscreen: function () {
      if (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) {
         window.navigator.splashscreen.hide()
      }
    }
  }
}

export default mixin
