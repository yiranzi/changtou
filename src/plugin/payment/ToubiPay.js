/**
 * Created by jun on 2016/9/28.
 * 投币支付
 */
import {postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

const toubiPay = (trade) => {
  return  new Promise (
    (resolve, reject) => {
    postWithinAuth(
      {
        url: getUrl('toubi_pay'),
        data: trade.deal
      }
    ).then(
      response => {
        resolve(response)
      }
    ).catch(
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}

export {
  toubiPay
}
