/**
 * Created by jun on 2016/9/28.
 * 微信 扫描 支付
 */
import { postWithinAuth } from '../../frame/ajax'
import { getUrl } from '../../frame/apiConfig'

/**
 * 预支付 下订单
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
        codeUrl => {
          // todo 显示二维码弹窗
          resolve()
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

export {
  WeChatQRCodePay
}
