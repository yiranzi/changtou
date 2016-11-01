/**
 * Created by dongdong on 2016/10/27.
 */
import {Device, platformMap} from './device'
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
 * 监听接收消息
 * @param handler
 */
const addReceiveHandler = function (handler) {
  document.addEventListener('jpush.receiveNotification', handler, false)
}

/**
 *监听打开消息
 * @param handler
 */
const addOpenHandler = function (handler) {
  document.addEventListener('jpush.openNotification', handler, false)
}

/**
 * 设置应用显示的数字
 */
export const setIconBadgeNumber = (num) => {
  if (Device.platform === platformMap.IOS) {
    if (window.plugins) {
      window.plugins.jPushPlugin.setBadge(num)
    }
  }
}

export default {
  init,
  setAlias,
  addReceiveHandler,
  addOpenHandler
}
