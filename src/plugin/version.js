/**
 * Created by Administrator on 2016/11/23.
 */

/**
* 获取当前手机版本号
* @returns {*|null|string}
*/
//const version = null

import { platformMap } from './device'

let versionNum = '0'

const initVersonNum = function () {
  if (platformMap.WEB === 'web') {     // 如果当前为网页直接返回设置版本号
    versionNum = -2
    return versionNum
  }
  window.cordova.getAppVersion.getVersionNumber().then(function (number) {
    versionNum = number
  })
}

export {
  initVersonNum,
  versionNum
}
