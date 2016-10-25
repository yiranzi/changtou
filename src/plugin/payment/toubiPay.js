/**
 * Created by jun on 2016/9/28.
 * 投币支付
 */
import { postWithinAuth } from '../../frame/ajax'
import { getUrl } from '../../frame/apiConfig'
import { errorType } from '../../util/pay/daelHelper'

/**
 * 投币支付
 * @param trade
 * @returns {Promise}
 * @constructor
 */
const ToubiPay = (trade) => {
  return new Promise(
    (resolve, reject) => {
    postWithinAuth(
      {
        url: getUrl('pay_toubi'),
        data: trade.deal
      }
    ).then(
      () => {
        resolve()
      }
    ).catch(
      err => {
        reject({
          type: errorType.FAIL,
          reason: err.message
        })
      }
    )
  })
}

export {
  ToubiPay
}
