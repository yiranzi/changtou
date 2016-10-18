/**
 * Created by jun on 2016/9/28.
 * 微信 应用 支付
 */
 import { postWithinAuth } from '../../frame/ajax'
 import {getUrl} from '../../frame/apiConfig'
 let beginPay = false

/**
 * 预支付 下订单
 * @param prepayData
 * @returns {Promise}
 */
const prepay = (prepayData) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth(
        {
          url: getUrl('principal_login'),
          data: {
            prepayData
          }
        }
      ).then(
        prepayResponse => {
          resolve(prepayResponse)
        }
      ).catch(
        err => {
          console.warn(err)
          reject(err)
        }
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
      let params = {
        partnerid: '1358080002',                          // merchant id
        prepayid: prepayResponse.prepayId,                // prepay id
        noncestr: prepayResponse.nonceStr,                // nonce
        timestamp: prepayResponse.timeStamp.toString(),   // timestamp
        sign: prepayResponse.paySign                      // signed string
      }
      window.Wechat.isInstalled(
        function (installed) {
          if (installed) {
            //alert('微信 已安装')
            beginPay = true
            window.Wechat.sendPaymentRequest(
              params,
              function () {
                //alert('购买成功')
                beginPay = false
                resolve()
              },
              function (reason) {
                beginPay = false
                if (reason === '用户点击取消并返回') {
                  //alert('购买取消')
                  console.warn(err)
                  reject(err)
                } else {
                  //alert('购买失败')
                  console.warn(err)
                  reject(err)
                }
              }
            )
          } else {
            //alert('微信 未安装')
            console.warn(err)
            reject(err)
          }
        },
        () => {}
      )
    }
  )
}

/**
 * 微信支付
 * @param trade
 * @returns {Promise.<T>|*}
 */
const weChatAppPay = (trade) => {
  var deal = Object.assign(trade)
  delete deal.openId
  var promise = Promise.resolve(deal)
  return promise.then(prepay).then(showPayComponent)
}

export {
  weChatAppPay,
  beginPay
}
