/**
 * Created by ichangtou on 16/10/17.
 */

import 'whatwg-fetch'

const caheItem = 'sessionProps'

let server = 'http://121.40.131.112:3000';
let sessionProps = window.JSON.parse(window.sessionStorage.getItem(caheItem)) ; //全局的超级属性, 仅在本次会话内有效

/**
 * 初始化 设置服务器地址(若需要)
 * @param serverUrl
 */
const init = function (serverUrl) {
  server = serverUrl;
};

/**
 * 发送事件
 * @param eventProps
 */
const track = function (eventProps) {
  if (!eventProps instanceof Object) {
    console.warn('发送到统计数据', eventProps, '不是一个合法的对象, 忽略');
    return;
  }

  var trackData = Object.assign({}, {userId: '00'}, sessionProps, eventProps);

  fetch(server + '/event', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trackData)
  }).then(function(response) {
    return response.json()
  }).then(function(json) {
    //console.log('parsed json', json)
  }).catch(function(ex) {
    console.warn('ictdata parsing failed', ex)
  })
};

/**
 * 注册用户 (若用户存在,则更新相关属性)
 * @param userProps
 */
const updateUser = function (userProps) {
  if (!userProps instanceof Object) {
    console.warn('发送到统计数据', userProps, '不是一个合法的对象, 忽略');
    return;
  }

  fetch(server + '/user/' + userProps['userId'] || '00', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userProps)
  }).then(function(response) {
    return response.json()
  }).then(function(json) {
    //console.log('成功', json)
  }).catch(function(ex) {
    console.warn('ictdata parsing failed', ex)
  })
};

/**
 *  注册超级属性
 * @param props
 */
const register = function (props) {
  if (!props instanceof Object) {
    console.warn('设置统计数据register', props, '不是一个合法的对象, 忽略');
    return;
  }

  Object.assign(sessionProps, props);
  //记录到sessionStorage,本次会话有效(窗口不关闭)
  window.sessionStorage.setItem(caheItem, window.JSON.stringify(sessionProps))
};

/**
 *
 */
export default {
  init,
  track,
  updateUser,
  register
}
