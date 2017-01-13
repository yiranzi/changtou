/**
 * Created by jun on 2016/9/28.
 * 支付宝 应用 支付
 */
import { postWithinAuth } from '../../frame/ajax'
import { getUrl } from '../../frame/apiConfig'
import { errorType } from '../../util/pay/dealHelper'
// 支付中
let beginPay = false

//错误码
const failCode = {
  CANCEL_BY_USER: '6001',
  NETWORK_ERROR: '6002',
  PAY_FAIL: '4000'
}

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
          url: getUrl('pay_ali_app'),
          data: prepayData
        }
      ).then(
        prepayResponse => {
          if (typeof (prepayResponse.message) === 'string') {
            resolve(JSON.parse(prepayResponse.message))
          } else {
            reject({
              reason: '获取订单号失败,后台返回格式有误',
              type: errorType.FAIL
            })
          }
        }
      ).catch(
        err => {
          reject({
            reason: err.message,
            type: errorType.FAIL
          })
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
      //window.alert('showPayComponent')
      const params = {
        tradeNo: prepayResponse.out_trade_no,
        subject: prepayResponse.subject,
        body: prepayResponse.body,
        price: prepayResponse.total_fee,
        notifyUrl: prepayResponse.notify_url
      }
      beginPay = true
      window.alipay.pay(
        params,
        results => {
          beginPay = false
          resolve(results)
        },
        err => {
          beginPay = false
          if (err.resultStatus === failCode.CANCEL_BY_USER) {
            //取消
            reject({
              reason: err.memo,
              type: errorType.CANCEL
            })
          } else {
            //失败
            reject({
              reason: err.memo,
              type: errorType.FAIL
            })
          }
        }
      )
    }
  )
}

/**
 * 支付宝 app 支付
 * @param trade
 * @returns {Promise.<T>|*}
 */
const AliAppPay = (trade) => {
  //window.alert('AliAppPay')
  let deal = Object.assign({}, trade)
  delete deal['openId']
  let promise = Promise.resolve(deal)
  return promise.then(prepay).then(showPayComponent)
}

export {
  AliAppPay,
  beginPay
}
