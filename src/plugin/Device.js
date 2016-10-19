/**
 * Created by zl on 2016/10/27.
 */

/*
/!**
 * 获取设备型号（别名）
 * @returns {*|null|string}
 *!/
const getModel = () => {
  return (window.device && window.device.model) || null
}

/!**
 * 是否ios内核浏览器
 *!/
const isIosBrower = () => {
  var u = navigator.userAgent
  //var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
}
*/

const platformMap = {
  ANDROID: 'Android',
  IOS: 'ios',
  BROWSER: 'browser',
  WEB: 'web'
  //unKnown: 'unKnown'
}

/**
 * 获取平台
 * @returns {*}
 */
const getPlatform = function () {
  if (window.cordova && window.device) {
    return window.device.platform
  } else {
    return platformMap.WEB
  }
}

/**
 * 获取UUID, 设备唯一标识
 * @returns {*}
 */
const getUUID = () => {
  if (window.cordova && window.device &&
      (window.device.platform === platformMap.ANDROID || window.device.platform === platformMap.IOS)) {
    return window.device.uuid
  } else {
    return 'unKnown'
  }
}

/**
 * 设备系统的版本号 (2.2|6.0.0.6000 .ect)
 * @returns {*}
 */
const getDeveiceVersion = () => {
  if (window.cordova && window.device) {
    return window.device.version
  } else {
    return 'unKnown'
  }
}

/**
 * 设备制造商 ( .ect)
 * @returns {*}
 */
const getManufacturer = () => {
  if (window.cordova && window.device &&
      (window.device.platform === platformMap.ANDROID || window.device.platform === platformMap.IOS)) {
    return window.device.manufacturer
  } else {
    return 'unKnown'
  }
}

/**
 * 是否是虚拟机
 */
const getIsVirtual = function () {
  if (window.cordova && window.device &&
    (window.device.platform === platformMap.ANDROID || window.device.platform === platformMap.IOS)) {
    return window.device.isVirtual
  } else {
    return false
  }
}

/**
 *
 */
const Device = {
  get platform () {
    return getPlatform()
  },

  get UUID () {
    return getUUID()
  },

  get deviceVersion () {
    return getDeveiceVersion()
  },

  get manufacturer () {
    return getManufacturer()
  },

  get isVirtual () {
    return getIsVirtual()
  }

}

export {
  Device,
  platformMap
}
