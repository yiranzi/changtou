/**
 * Created by jun on 2016/9/28.
 * 微信 浏览器 支付
 */
import { postWithinAuth } from '../../frame/ajax'
import { getUrl } from '../../frame/apiConfig'
import { errorType } from '../../util/pay/dealHelper'
import { WX_APPID } from '../../frame/serverConfig'
import store from '../../vuex/store'

const user = store.state.user
/**
 * 预支付 下订单
 * @param prepayData
 * @returns {Promise}
 */
const prepay = (prepayData) => {
  return new Promise(
    (resolve, reject) => {
      if (!prepayData.openId) {
        reject({
          type: errorType.FAIL,
          reason: '用户信息获取失败，请重新登录后重试'
        })
      } else {
        postWithinAuth(
          {
            url: getUrl('pay_weChat_browser'),
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
        appId: WX_APPID,
        timeStamp: prepayResponse.timeStamp.toString(),
        nonceStr: prepayResponse.nonceStr,
        package: 'prepay_id=' + prepayResponse.prepayId.toString(),
        signType: 'MD5',
        paySign: prepayResponse.paySign
      }
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        params,
        function (res) {
          //console.log(res)
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            //微信支付成功
            resolve()
          } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
            //支付失败
            reject({
              type: errorType.FAIL,
              reason: res.err_desc || '支付失败'
            })
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            //取消微信支付
            reject({
              type: errorType.CANCEL,
              reason: res.err_desc || '用户取消微信支付'
            })
          }
        }
      )
    }
  )
}

/**
 * 微信 browser 支付
 * @param trade
 * @returns {Promise.<T>|*}
 */
const WeChatBrowserPay = (trade) => {
  let deal = Object.assign({}, trade)
  deal.openId = user.openId
  var promise = Promise.resolve(deal)
  return promise.then(prepay).then(showPayComponent)
}

export {
  WeChatBrowserPay
}
