/**
 * Created by jun on 2016/9/28.
 * 微信 应用 支付
 */
 import { postWithinAuth } from '../../frame/ajax'
 import { getUrl } from '../../frame/apiConfig'
 import { errorType } from '../../util/pay/dealHelper'
 let beginPay = false

/**
 * 预支付 下订单
 * @param prepayData
 * @returns {Promise}
 */
const prepay = (prepayData) => {
  return new Promise(
    (resolve, reject) => {
      //window.alert('prepay')
      postWithinAuth(
        {
          url: getUrl('pay_weChat_app'),
          data: prepayData
        }
      ).then(
        prepayResponse => {
          resolve(prepayResponse)
        }
      ).catch(
        err => {
          reject({
            type: errorType.FAIL,
            reason: err.message
          })
        }
      )
    }
  )
}

/**
 * 检测 是否安装微信
 * @param prepayResponse
 * @returns {Promise}
 */
const checkInstall = (prepayResponse) => {
  return new Promise(
    (resolve, reject) => {
      window.Wechat.isInstalled(
        function (installed) {
          if (installed) {
            //window.alert('微信 已安装')
            resolve(prepayResponse)
          } else {
            //window.alert('微信 未安装')
            reject({
              type: errorType.FAIL,
              reason: '未安装微信客户端'
            })
          }
        },
        err => reject({
          type: errorType.FAIL,
          reason: err
        })
      )
    }
  )
}

/**
 * 调用支付控件
 * @param prepayResponse
 * @returns {Promise}
 */
const showPayComponent = (prepayResponse) => {
  return new Promise(
    (resolve, reject) => {
      //window.alert('showPayComponent')
      let params = {
        partnerid: '1358080002',                          // merchant id
        prepayid: prepayResponse.prepayId,                // prepay id
        noncestr: prepayResponse.nonceStr,                // nonce
        timestamp: prepayResponse.timeStamp.toString(),   // timestamp
        sign: prepayResponse.paySign                      // signed string
      }
      beginPay = true
      window.Wechat.sendPaymentRequest(
        params,
        function () {
          //window.alert('购买成功')
          beginPay = false
          resolve()
        },
        function (reason) {
          beginPay = false
          if (reason === '用户点击取消并返回') {
            //window.alert('购买取消')
            reject({
              type: errorType.CANCEL,
              reason: reason
            })
          } else {
            //window.alert('购买失败')
            reject({
              type: errorType.FAIL,
              reason: reason
            })
          }
        }
      )
    }
  )
}

/**
 * 微信 APP 支付
 * @param trade
 * @returns {Promise.<T>|*}
 */
const WeChatAppPay = (trade) => {
  //window.alert('WeChatAppPay')
  let deal = Object.assign({}, trade)
  let promise = Promise.resolve(deal)
  return promise.then(prepay).then(checkInstall).then(showPayComponent)
}

export {
  WeChatAppPay,
  beginPay
}
