/**
 * Created by jun on 2016/9/28.
 * 支付宝 网页支付
 */
import {postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

const aliBrowserPay = (trade) => {
  //添加支付返回提示
  trade.return_url =  location.origin + location.pathname.replace('index.html', 'lib/alipay/AliPayReturn.html');
  trade.show_url =  location.href;

  return  new Promise (
    (resolve, reject) => {
      postWithinAuth(
        {
          url: getUrl('ali_browser_prepay'),
          data: trade
        }
      ).then(
        aliPayView => {

          var html = aliPayView.message;
          window.alipay_html = html;

          localStorage.setItem('ali-web-pay',html)
          location.href = location.origin + location.pathname.replace('index.html', 'lib/alipay/AliPay.html');

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
  aliBrowserPay
}
