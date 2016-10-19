/**
 * Created by jun on 2016/9/28.
 * 支付宝 应用 支付
 */
import { postWithinAuth } from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
// 支付中
let beginPay = false
//错误码
let failCode = {
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
      postWithinAuth(
        {
          url: getUrl('ali_app_prepay'),
          data: {
            prepayData
          }
        }
      ).then(
        prepayResponse => {
          if (typeof (prepayResponse.message) === 'string') {
            resolve(JSON.parse(prepayResponse.message))
          }
          else{
            //console.warn('获取tradeNo信息；后台返回格式有误');
            //reject({
            //  reason: '获取订单号失败,后台返回格式有误',
            //  type: Dict.payRejectType.FAIL
            //});
          }
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
        tradeNo: prepayResponse.out_trade_no,
        subject: prepayResponse.subject,
        body: prepayResponse.body,
        price: prepayResponse.total_fee,
        notifyUrl: prepayResponse.notify_url
      }
      window.alipay.pay(
        params,
        results => {
          resolve(results)
        },
        err => {
          if (err.resultStatus === failCode.CANCEL_BY_USER) {
            //取消
            //reject({
            //  reason: errorResults.memo,
            //  type: Dict.payRejectType.CANCEL
            //});
          } else {
            //失败
            //reject({
            //  reason: errorResults.memo,
            //  type: Dict.payRejectType.FAIL
            //});
          }
        }
      )
    }
  )
}

/**
 * 微信支付
 * @param trade
 * @returns {Promise.<T>|*}
 */
const AliAppPay = (trade) => {
  var deal = Object.assign(trade)
  delete deal.openId
  var promise = Promise.resolve(deal)
  return promise.then(prepay).then(showPayComponent)
}

export {
  AliAppPay,
  beginPay
}
