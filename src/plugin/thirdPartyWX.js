/**
 * Created by Administrator on 2016/11/25.
 */
/*
 *    微信第三方登录模块
 *
 * */
let _isInstalled = false                //  如果值为 1, 则已安装

/**
 * 检测是否安装微信客户端
 * @returns {Promise}
 */
const checkWxInstalled = () => {
  return new Promise(
    (resolve, reject) => {
    window.Wechat.isInstalled(
      (installed) => {
        if (installed) {
          _isInstalled = true
          resolve(installed)
        } else {
          reject()
        }
      },
      (reason) => {
        reject(reason)
      })
  })
}

/**
 * 授权操作并登录操作
 * @returns {Promise}
 * @constructor
 */
const WxAuth = () => {
  let scope = 'snsapi_userinfo'
  let state = '_' + (+new Date())
  return new Promise(
    (resolve, reject) => {
      if (_isInstalled) {
        window.Wechat.auth(scope, state,
          (response) => {
          resolve(response)
        },
          (reason) => {
            reject(reason)
        })
      } else {
        reject()
      }
    }
  )
}

export default {
  checkWxInstalled,
  WxAuth
}

