/**
 * Created by Administrator on 2016/11/25.
 */

/*
 *   QQ 第三方登录模块
 */
let _isInstalled = false

/**
 * 检测是否安装QQ客户端，若安装即进行授权操作
 * @returns {Promise}
 */
const checkQQInstalled = () => {
  return new Promise(
    (resolve, reject) => {
    window.YCQQ.checkClientInstalled(
      () => {
        _isInstalled = true
        resolve(true)
    },
    () => {
      // 如果安装的QQ客户端版本太低，不支持SSO登录也会返回没有安装客户端的错误
      resolve(false)
    })
  })
}

/**
 * 授权操作并向后台发送标识数据，若成功则进行登录操作
 * @returns {Promise}
 * @constructor
 */
const QQAuth = () => {
  return new Promise(
      (resolve, reject) => {
        if (_isInstalled) {
          window.YCQQ.ssoLogin(
            (args) => {
              resolve(args)
            },
            (failReason) => {
              reject(failReason)
            },
            1
          )
        } else {
          reject()
        }
      }
    )
}

export default {
  checkQQInstalled,
  QQAuth
}
