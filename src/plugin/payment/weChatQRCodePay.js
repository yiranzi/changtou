/**
 * Created by jun on 2016/9/28.
 * 微信 扫描 支付
 */
import { postWithinAuth } from '../../frame/ajax'
import { getUrl } from '../../frame/apiConfig'
import { errorType, dealType } from '../../util/pay/daelHelper'
/**
 * 微信 扫码支付
 * @param prepayData
 * @returns {Promise}
 */
const WeChatQRCodePay = (prepayData) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth(
        {
          url: getUrl('weChat_code_prepay'),
          data: prepayData
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
          console.warn(err)
          reject({
            type: errorType.FAIL,
            reason: err.message
          })
        }
      )
    }
  )
}

export {
  WeChatQRCodePay
}
