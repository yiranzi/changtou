/**
 * Created by jun on 2016/9/28.
 * 微信 扫描 支付
 */
import { postWithinAuth } from '../../frame/ajax'
import { getUrl } from '../../frame/apiConfig'
import { errorType, dealType } from '../../util/pay/dealHelper'

/**
 * 微信 扫码支付
 * @param prepayData
 * @returns {Promise}
 */
const WeChatQRCodePay = (prepayData) => {
  let deal = Object.assign({}, prepayData)
  return new Promise(
    (resolve, reject) => {
      if (!deal.openId) {
        reject({
          type: errorType.FAIL,
          reason: '用户信息获取失败，请重新登录后重试'
        })
      } else {
        postWithinAuth(
          {
            url: getUrl('pay_weChat_code'),
            data: deal
          }
        ).then(
          res => {
            resolve({
              type: dealType.WX_CODE,
              url: res.codeURL
            })
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

export {
  WeChatQRCodePay
}
