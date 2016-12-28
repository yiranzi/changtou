/**
 * Created by ichangtou on 16/10/17.
 */

import 'whatwg-fetch'
import {D_PLUS_ID, ICT_SERVER} from '../frame/serverConfig'
const cacheItem = 'ictSessionProps'

let server = ICT_SERVER
let sessionProps = window.JSON.parse(window.sessionStorage.getItem(cacheItem)) || {} //全局的超级属性, 仅在本次会话内有效

/**
 * 是否支持dplus统计
 * @returns {boolean}
 */
const isDplusSupport = () => {
  return !!window.dplus
}

/**
 * 初始化 设置服务器地址(若需要)
 * @param serverUrl
 */
const init = function (serverUrl) {
    if (serverUrl) {
     server = serverUrl
    }
  if (isDplusSupport()) {
    window.dplus.init(D_PLUS_ID, {
      //"disable_cookie": true,
      //"cross_subdomain_cookie": true,
      localstorage: true,
      track_timeout: 3000, //回调响应时间

      loaded: function () {

      }
    })
  }
}

/**
 * 发送事件
 * @param eventName, properties
 */
const track = function (eventName, properties = {}) {
  if (!(eventName instanceof String) && !(properties instanceof Object)) {
    console.warn('发送到统计数据', properties, '不是一个合法的对象, 忽略')
    return
  }

  //dplus
  if (isDplusSupport()) {
    window.dplus.track(eventName, properties, () => {})
  }

  // ict
  //var trackData = Object.assign({}, {userId: '00'}, sessionProps, properties, {eventName})
  ////console.log('server', server)
  //window.fetch(server + '/event', {
  //  method: 'POST',
  //  headers: {
  //    'Accept': 'application/json',
  //    'Content-Type': 'application/json'
  //  },
  //  body: JSON.stringify(trackData)
  //}).then(function (response) {
  //  return response.json()
  //}).then(function (json) {
  //  //console.log('parsed json', json)
  //}).catch(function (ex) {
  //  console.warn('ictdata parsing failed', ex)
  //})
}

/**
 * 注册用户 (若用户存在,则更新相关属性)
 * @param userProps
 */
const updateUser = function (userProps) {
  if (!(userProps instanceof Object)) {
    console.warn('发送到统计数据', userProps, '不是一个合法的对象, 忽略')
    return
  }

  //ict
  window.fetch(server + '/user/' + userProps['userId'] || '00', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userProps)
  }).then(function (response) {
    return response.json()
  }).then(function (json) {
    //console.log('成功', json)
  }).catch(function (ex) {
    console.warn('ictdata parsing failed', ex)
  })
}

/**
 *  注册超级属性
 * @param props
 */
const register = function (props) {
  if (!(props instanceof Object)) {
    console.warn('设置统计数据register', props, '不是一个合法的对象, 忽略')
    return
  }

  // dPlus
  if (isDplusSupport()) {
    window.dplus.register(props)
  }

  //
  Object.assign(sessionProps, props)
  // 记录到sessionStorage,本次会话有效(窗口不关闭)
  window.sessionStorage.setItem(cacheItem, window.JSON.stringify(sessionProps))
}

/**
 *
 */
export default {
  init,
  track,
  updateUser,
  register
}
