/**
 * Created by dongdong on 2016/10/27.
 */
import {Device, platformMap} from './device'

/**
 * 推送消息
 */
export const pushNotification = () => {
  window.plugins.jPushPlugin.init()
  window.plugins.jPushPlugin.getRegistrationID(onGetRegistradionID)
  var onGetRegistradionID = function (data) {
    try {
      console.log('JPushPlugin:registrationID is ' + data)
    } catch (exception) {
      console.log('JPushPlugin:onGetRegistradionID' + exception)
    }
  }
}

/**
 * 监听打开消息
 */

/**
 * 监听接收消息
 */

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
export const setBadge = (number) => {
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

export const addReceiveListener = (event) => {
  document.addEventListener('jpush.receiveNotification', event, false)
}
