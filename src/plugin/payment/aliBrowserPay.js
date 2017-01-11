/**
 * Created by jun on 2016/9/28.
 * 支付宝 网页 支付
 */
import { postWithinAuth } from '../../frame/ajax'
import { getUrl } from '../../frame/apiConfig'
import { errorType } from '../../util/pay/dealHelper'

/**
 * 支付宝 browser 支付
 * @param trade
 * @returns {Promise}
 * @constructor
 */
const AliBrowserPay = (trade) => {
  //window.alert('AliBrowserPay')
  let deal = Object.assign({}, trade)
  delete deal['openId']
  //添加支付返回提示
  deal.return_url = window.location.origin + window.location.pathname.replace('index.html', 'extra/aliBrowserPay/AliPayReturn.html')
  deal.show_url = window.location.href

  // 缓存 支付宝 网页 支付后返回的页面
  window.sessionStorage.setItem('ali-browser-pay-return-url', window.location.href)

  return new Promise(
    (resolve, reject) => {
      postWithinAuth(
        {
          url: getUrl('pay_ali_browser'),
          data: deal
        }
      ).then(
        aliPayView => {
          const html = aliPayView.message
          // 缓存支付宝 支付页面 供AliPay.html调用
          window.localStorage.setItem('ali-browser-pay-html', html)
          // 跳转到AliPay.html
          window.location.href = window.location.origin + window.location.pathname.replace('index.html', 'extra/aliBrowserPay/AliPay.html')
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
  AliBrowserPay
}
