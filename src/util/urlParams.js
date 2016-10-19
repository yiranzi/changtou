/**
 * Created by jun on 2016/10/19.
 */

/**
 * 获取指定url或当前url上的参数Object
 * @param url
 * @returns {{}}
 */
const getParamsObjectFromUrl = (url) => {
  let paramsStr = url ? url.split('?')[1].split('#')[0] : window.location.search.substr(1)
  let paramsArr = paramsStr.split('&')
  let params = {}
  for (var i = 0, length = paramsArr.length; i < length; i++) {
    params[paramsArr[i].split('=')[0]] = paramsArr[i].split('=')[1]
  }
  return params
}

/**
 * 获取指定url或当前url上的指定参数
 * @param param
 * @param url
 * @returns {*}
 */
const getParamFromUrl = (param, url) => {
  let paramsStr = url ? url.split('?')[1].split('#')[0] : window.location.search.substr(1)
  let paramsArr = paramsStr.split('&')
  let params = {}
  for (var i = 0, length = paramsArr.length; i < length; i++) {
    params[paramsArr[i].split('=')[0]] = paramsArr[i].split('=')[1]
  }
  return params[param] || null
}

export {
  getParamsObjectFromUrl,
  getParamFromUrl
}
