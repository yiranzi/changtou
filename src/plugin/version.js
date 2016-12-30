/**
 * Created by Administrator on 2016/11/23.
 */
import { platformMap, Device } from './device'

/**
 * 获取院生版本号 (web 为 0 | 出错误为 -1)
 * @returns {Promise}
 */
const getNativeVersion = () => {
  return new Promise((resolve, reject) => {
    if (Device.platform === platformMap.WEB || !window.cordova.getAppVersion) {     // 如果当前为网页直接返回设置版本号
      resolve('0')
    } else {
      window.cordova.getAppVersion.getVersionNumber()
        .then(number => { resolve(number) })
        .catch(() => { resolve('-1') })
    }
  })
}

export {
  getNativeVersion
}
