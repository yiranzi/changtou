/**
 * Created by zl on 16/10/16.
 *
 * 浏览器相关
 */

/**
 * 判断是否为微信内置浏览器
 * @returns {boolean}
 */
const getIsWx = () => {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
    return true
  } else {
    return false
  }
}

/**
 *
 */
export default {
  get isWx () {
    return getIsWx()
  },

  get userAgent () {
    return window.navigator.userAgent
  }
}
