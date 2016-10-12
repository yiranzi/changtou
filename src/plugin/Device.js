/**
 * Created by jun on 2016/9/27.
 */

const platformMap = {
  ANDROID: 'android',
  IOS: 'ios',
  WEB: 'web'
}

/**
 * 获取平台名字
 * @returns {*}
 */
const getPlatformName = () => {
  if (window.cordova) {
    return window.cordova.platformId
  } else {
    return 'web'
  }
}

/**
 * 获取平台系统版本
 * @returns {*}
 */
const getPlatformVersion = () => {
  if (window.cordova) {
    return window.cordova.platformVersion
  } else {
    return ''
  }
}

/**
 * 获取设备的uuid
 */
const getUUID = () => {
  return (window.device && window.device.uuid) || null
}

/**
 * 获取设备型号（别名）
 * @returns {*|null|string}
 */
const getModel = () => {
  return (window.device && window.device.model) || null
}

/**
 * 获取设备的厂商
 * @returns {*|string|null}
 */
const getManufacturer = () => {
  return (window.device && window.device.manufacturer) || null
}

/**
 * 当前设备是否微信浏览器
 */
const isWx = () => {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
    return true
  } else {
    return false
  }
}

/**
 * 是否ios内核浏览器
 */
const isIosBrower = () => {
  var u = navigator.userAgent
  //var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
}

export const Device = {
  platformMap,

  /**
   * 平台名字
   * @returns {*}
     */
  get platformName () {
    return getPlatformName()
  },

  /**
   * 系统版本
   * @returns {*}
     */
  get platformVersion () {
    return getPlatformVersion()
  },

  /**
   * 设备uuid
   * @constructor
     */
  get UUID () {
    return getUUID()
  },

  /**
   * 设备型号
   * @returns {*|null|string}
     */
  get model () {
    return getModel()
  },

  /**
   * 设备的厂商
    * @returns {*|string|null}
     */
  get manufacturer () {
    return getManufacturer()
  },

  /**
   * 是否微信浏览器
   */
  get isWx () {
    return isWx()
  },

  /**
   * 是否ios内核浏览器
   * @returns {ios终端}
     */
  get isIosBrower () {
    return isIosBrower()
  }
}
