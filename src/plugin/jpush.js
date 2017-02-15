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
 * 监听接收消息
 * @param handler
 */
const addReceiveHandler = (handler) => {
  document.addEventListener('jpush.receiveNotification', handler, false)
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
 *  打开通知消息
 */

//- 在你需要接收通知的的 js 文件中加入:
export const openNotification = () => {
  document.addEventListener('jpush.openNotification', onOpenNotification, false)
}

/**
 * 设置路由
 * @param router
 */
const setRouter = (router) => {
  _router = router
}

const onOpenNotification = (event) => {
  setIconBadgeNumber(0)
  window.alert(JSON.stringify(event))
  if (event.extras['type'] === 'IN_APP') {
    let desurl = event.extras['desurl']
    _router.router.go(desurl)
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

  get openNotification () {
    return openNotification
  },

  get setRouter () {
    return setRouter
  }
}

export {
  Jpush
}
