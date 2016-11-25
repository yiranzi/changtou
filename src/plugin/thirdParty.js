/**
 * Created by Administrator on 2016/11/24.
 */
 import {postWithoutAuth} from '../frame/ajax'
 import {getUrl} from '../frame/apiConfig'

  /*
  *    wechat module
  *
  * */
  let insValWX = null

  const testFun = () => {
     window.alert('ttttttttttttttttttttt watashi')
  }
  const isInstalledWX = () => {
    window.Wechat.isInstalled(function (installed) {
      insValWX = installed       // 1
      authSerWX(insValWX)
    }, function (reason) {
      window.alert('this is Wechat isInstalled fail')
      console.log(reason)
    })
  }

  const authSerWX = (insValWX) => {
      let scope = 'snsapi_userinfo'
      let state = '_' + (+new Date())
      console.log('insval', insValWX)
      if (insValWX === 1) {
        window.Wechat.auth(scope, state, function (response) {
          // you may use response.code to get the access token.
          window.alert(' enteringgg')
          window.alert(JSON.stringify(response))
          loginByWX(response)
        }, function (reason) {
          window.alert('failed' + reason)
        })
      }
  }

  const loginByWX = (response) => {
    postWithoutAuth(
      {
        url: getUrl('wx_app_login'),
        data: {
          code: response.code
        }
      }).then(
      user => {
        window.alert('kk')
        window.alert(JSON.stringify(user))
      },
      err => {
        window.alert(JSON.stringify(err))
        console.warn(err)
      }
    )
  }
/*
*   QQ module
*/
let insValQQ = null
const isInstalledQQ = () => {
  window.YCQQ.checkClientInstalled(function () {
    console.log('client is installed')
    insValQQ = 'installed'
    authSerQQ(insValQQ)
  }, function () {
    // 如果安装的QQ客户端版本太低，不支持SSO登录也会返回没有安装客户端的错误
    console.log('client is not installed')
  })
}

 const authSerQQ = (insValQQ) => {
   let checkClientIsInstalled = 1   //默认值是 0,仅仅针对 iOS平台有效![]()
   if (insValQQ === 'installed') {
     window.YCQQ.ssoLogin(function (args) {
       window.alert(1)
       window.alert(JSON.stringify(args))
       console.log('qq ndargs', args)
       postWithoutAuth(
         {
           url: getUrl('qq_login'),
           data: {
             accessToken: args.access_token,
             openId: args.userid
           }
         }).then(
         user => {
           window.alert(2)
           window.alert(JSON.stringify(user))
         },
         err => {
           window.alert(JSON.stringify(err))
           console.warn(err)
         }
       )
       window.alert('indent')
     }, function (failReason) {
       console.log(failReason)
     }, checkClientIsInstalled)
   }
 }
export {
  testFun,
  isInstalledWX,
     authSerWX,
  isInstalledQQ,
     authSerQQ
}
