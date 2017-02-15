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
  if (event.extras['msgType'] === 'IN_APP') {
    _router.router.go(event.extras['desUrl'])
  }
}

/**
 *  添加  打开通知消息
 */
const addOpenHandler = () => {
  document.addEventListener('jpush.openNotification', onOpenNotification, false)
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
  }
}

export {
  Jpush
}
