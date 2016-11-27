/**
 * Created by Administrator on 2016/11/25.
 */

/*
 *   QQ module
 */
let _isInstalled = false
/**
 *   检测是否安装QQ客户端，若安装即进行授权操作
 */
// const setInstalledWxIf = () => {
// }

const checkQQInstalled = () => {
  return new Promise(
    (resolve, reject) => {
    window.YCQQ.checkClientInstalled(
      () => {
        _isInstalled = true
        resolve()
    },
    () => {
      // 如果安装的QQ客户端版本太低，不支持SSO登录也会返回没有安装客户端的错误
      reject()
    })
  })
}

/**
 *   授权操作并向后台发送标识数据，若成功则进行登录操作
 */
const QQAuth = () => {
  // let checkClientIsInstalled = 1   //默认值是 0,仅仅针对 iOS平台有效!
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
