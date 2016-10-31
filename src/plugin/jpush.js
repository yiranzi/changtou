/**
 * Created by dongdong on 2016/10/27.
 */
import {Device, platformMap} from './device'
import {setLocalCache} from '../util/cache'
import eventBus from '../util/eventBus'
import {eventMap} from '../frame/eventConfig'
import store from '../vuex/store'

const commit = store.commit || store.dispatch
const userId = function () {
  const userId = window.localStorage.get('cache-frame-user').userId
  return userId
}
const newMessageNum = function () {
  const newMessageNum = window.localStorage.get('cache-frame-user').newMessageNum
  return newMessageNum
}

export const constructor = () => {
  /**
   * 监听
   * event bus 的 LOGIN_SUCCESS 事件  设置设备关联
   */
  eventBus.on(eventMap.LOGIN_SUCCESS, this.bindPushUser, this)

  /**
   * 监听
   * event bus 的 LOGOUT_SUCCESS 事件  解除设备关联
   */
  eventBus.on(eventMap.LOGOUT_SUCCESS, this.unwrapPushUser, this)
}
/**
 * 设置设备关联
 */
export const bindPushUser = () => {
  this.setAlias(userId() || 'unloginuser')
}

/**
 * 解除设备关联
 */
export const unwrapPushUser = () => {
  this.setAlias('unloginuser')
}

/**
 * 推送消息
 */
export const init = () => {
  try {
    let onGetRegistradionID = function (data) {
      try {
        console.log('JPushPlugin:registrationID is ' + data)
      } catch (exception) {
        console.log('JPushPlugin:onGetRegistradionID' + exception)
      }
    }
    window.plugins.jPushPlugin.init()
    window.plugins.jPushPlugin.getRegistrationID(onGetRegistradionID)
    /**
     * 监听打开消息
     */
    const onOpenNotification = function (event) {
      try {
        //跳转到消息页
        if (this.$route.path !== '/system/message') {
          if (Device.platform === platformMap.IOS) {
            //取消红点
            setLocalCache('cache-frame-user', {newMessageNum: 0})
          }
          this.$route.router.go('')
        }
        if (Device.platform === platformMap.ANDROID) {
          //取消红点
          setLocalCache('cache-frame-user', {newMessageNum: 0})
        }
        const me = this
        setTimeout(function () {
          me.setIconBadgeNumber(0)
        }, 1000)
      } catch (exception) {
        console.log('JPushPlugin:onOpenNotification' + exception)
      }
    }
    /**
     * 监听接收消息
     */
    const onReceiveNotification = function (event) {
      try {
        //设置红点
        let num = newMessageNum() + 1
        commit('USER_ADD_NEW_MESSAGE_NUM')
        setLocalCache('cache-frame-user', {newMessageNum: num})

        //ios设置角标
        if (Device.platform === platformMap.IOS) {
          //if (isLogin()) {
            let badgeNum = this.newMessageNum
            this.setIconBadgeNumber(badgeNum)
          //} else {
          //  this.setIconBadgeNumber(1)
          //}
        }
      } catch (exception) {
        console.log('JPushPlugin:onReceiveNotification' + exception)
      }
    }

    document.addEventListener('jpush.openNotification', onOpenNotification, false)
    document.addEventListener('jpush.receiveNotification', onReceiveNotification, false)
  } catch (exception) {
    console.log('JPUSH init exception', exception)
  }
}

/**
 * 设置别名
 */
export const setAlias = (alias) => {
  window.plugins.jPushPlugin.setAlias(alias)
}

/**
 * 设置标签
 */
export const setTags = (tags) => {
  window.plugins.jPushPlugin.setTags(tags)
}

/**
 * 设置数字角标,number为0时不显示
 * @param value
 */
export const setIconBadgeNumber = (number) => {
    if (Device.platform === platformMap.IOS) {
      window.plugins.jPushPlugin.setBadge(number)
    }
}

/**
 * 关闭推送消息
 */
export const stopPush = () => {
  window.plugins.jPushPlugin.stopPush()
}

/**
 * 恢复消息推送
 */
export const resumePush = () => {
  window.plugins.jPushPlugin.resumePush()
}
