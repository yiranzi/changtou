/**
 * Created by dongdong on 2016/10/27.
 */
import {Device, platformMap} from './device'

let _router = {}

/**
 *初始化
 */
const init = function () {
  if (window.plugins) {
    window.plugins.jPushPlugin.init()
  }
}

/**
 * 设置别名
 */
const setAlias = (alias) => {
  if (window.plugins) {
    window.plugins.jPushPlugin.setAlias(alias)
  }
}

/**
 * 设置路由
 * @param router
 */
const setRouter = (router) => {
  _router = router
}

/**
 * 设置应用显示的数字
 */
const setIconBadgeNumber = (num) => {
  if (window.plugins && Device.platform === platformMap.IOS) {
    window.plugins.jPushPlugin.setApplicationIconBadgeNumber(num)
  }
}

/**
 * 接收消息 回调
 * @param event
 */
const onReceiveNotification = (event) => {
  setIconBadgeNumber(0)
  //if (event.extras['msgType'] === 'IN_APP') {
  //  _router.router.go(event.extras['desUrl'])
  //}
}

/**
 * 添加 监听接收消息
 */
const addReceiveHandler = () => {
  document.addEventListener('jpush.receiveNotification', onReceiveNotification, false)
}

/**
 * 收到消息 回调
 * @param event
 */
const onOpenNotification = (event) => {
  setIconBadgeNumber(0)
  if (Device.platform === platformMap.IOS) {
    if (event['msgType'] === 'IN_APP') {
      _router.router.go(event['desUrl'])
    }
  } else if (Device.platform === platformMap.ANDROID) {
    if (event.extras['msgType'] === 'IN_APP') {
      _router.router.go(event.extras['desUrl'])
    }
  }
}

/**
 *  添加  打开通知消息
 */
const addOpenHandler = () => {
  document.addEventListener('jpush.openNotification', onOpenNotification, false)
}
/**
 * Ios添加本地通知
 * @param delayTime   本地推送延迟多长时间后显示，数值类型或纯数字的字符型均可。
 * @param content    本地推送需要显示的内容。
 * @param badge       角标的数字。如果不需要改变角标传-1。数值类型或纯数字的字符型均可。
 * @param notificationID    本地推送标识符,字符串。
 * @param extras    自定义参数，可以用来标识推送和增加附加信息。字典类型。
 */
const addLocalNotificationForIOS = (delayTime, content, badge, notificationID, extras) => {
  if (window.plugins) {
    window.plugins.jPushPlugin.prototype.addLocalNotificationForIOS(delayTime, content, badge, notificationID, extras)
  }
}
/**
 * Ios删除本地通知
 * @param identifierKey  本地推送标识符
 */
const deleteLocalNotificationWithIdentifierKeyInIOS = (identifierKey) => {
  if (window.plugins) {
    window.plugins.jPushPlugin.prototype.deleteLocalNotificationWithIdentifierKeyInIOS(identifierKey)
  }
}
/**
 * 安卓添加本地通知
 * @param builderId  设置本地通知样式。
 * @param content 设置本地通知的 content。
 * @param title    设置本地通知的 title。
 * @param notificaitonID  设置本地通知的 ID。
 * @param broadcastTime 设置本地通知触发时间，为距离当前时间的数值，单位是毫秒。
 * @param extras  设置额外的数据信息 extras 为 json 字符串。
 */
const addLocalNotificationForANDROID = (builderId, content, title,
                                        notificaitonID, broadcastTime, extras) => {
  if (window.plugins) {
    window.plugins.jPushPlugin.addLocalNotification(builderId, content, title,
      notificaitonID, broadcastTime, extras)
  }
}
/**
 * 安卓移除本地推送
 * @param notificationID
 */
const removeLocalNotificationForANDROID = (notificationID) => {
  if (window.plugins) {
    window.plugins.jPushPlugin.removeLocalNotification(notificationID)
  }
}
const clearLocalNotifications = () => {
  if (window.plugins) {
    window.plugins.jPushPlugin.clearLocalNotifications()
  }
}
const Jpush = {
  get init () {
    return init
  },
  get setAlias () {
    return setAlias
  },

  get addReceiveHandler () {
    return addReceiveHandler
  },

  get setIconBadgeNumber () {
    return setIconBadgeNumber
  },

  get addOpenHandler () {
    return addOpenHandler
  },

  get setRouter () {
    return setRouter
  },
  get setLocalNotificationIOS () {
    return addLocalNotificationForIOS
  },
  get deleteLocalNotificationIOS () {
    return deleteLocalNotificationWithIdentifierKeyInIOS
  },
  get setLocalNotificationANDROID () {
    return addLocalNotificationForANDROID
  },
  get removeLocalNotificationANDROID () {
    return removeLocalNotificationForANDROID
  },
  get clearLocalNotifications () {
    return clearLocalNotifications
  }
}

export {
  Jpush
}
