/**
 * Created by Administrator on 2016/11/23.
 */

/**
* 获取当前手机版本号
* @returns {*|null|string}
*/
//const version = null

import { platformMap } from './device'

let versionNum = '0'                             //  返回值必须是一个 string

const initVerNum = function () {
  if (platformMap.WEB === 'web') {     // 如果当前为网页直接返回设置版本号
    return versionNum
  }
  window.cordova.getAppVersion.getVersionNumber().then(function (number) {
    versionNum = number
  })
}

export {
  initVerNum,
  versionNum
}
