/**
 * Created by jun on 2016/9/30.
    支付模块 数据操作

 */
import { AliAppPay } from '../../plugin/payment/aliAppPay'
import { AliBrowserPay } from '../../plugin/payment/aliBrowserPay'
import { ToubiPay } from '../../plugin/payment/toubiPay'
import { WeChatAppPay } from '../../plugin/payment/weChatAppPay'
import { WeChatBrowserPay } from '../../plugin/payment/weChatBrowserPay'
import { WeChatQRCodePay } from '../../plugin/payment/weChatQRCodePay'
import { Device, platformMap } from '../../plugin/device'
import { Agent } from '../../plugin/agent'
import { getWithoutAuth, getWithinAuth, postWithinAuth } from '../../frame/ajax'
import { getUrl } from '../../frame/apiConfig'
import store from '../../vuex/store'

const user = store.state.user

/**
 * 交易类型
 * @type {{WX_CODE: string, ALI_BROWSER: string}}
 */
const transactionChannel = {
  WX_CODE: 'wx_code',
  ALI_BROWSER: 'ali_browser'
}

const dealType = {
  BUY: 1,
  POSTPONE: 2,
  UPDATE: 3
}

/**
 * 错误类型
 * @type {{CANCEL: string, FAIL: string}}
 */
const errorType = {
  CANCEL: 'cancel',
  FAIL: 'fail'
}

/**
 * 商品类型
 * @type {{SUBJECT: string, COMMON_TOPIC: string, SPEC_TOPIC: string, POSTPONE: string}}
 */
const goodsType = {
  PRO_STRATEGY: 'PS',  //专业版长投宝
  VIP_STRATEGY: 'VS',   //vip长投宝
  SUBJECT: 'S',       // 课程
  COMMON_TOPIC: 'CT',  // 通用专题
  SPEC_TOPIC: 'ST',    // 打包课专题
  POSTPONE: 'P'       // 延期
}

/**
 * 支付渠道
 * @type {{ALI: string, WECHAT: string, TOUBI: string}}
 */
const payChannel = {
  ALI: 'ali',
  WECHAT: 'wechat',
  TOUBI: 'toubi'
}

/**
 * 订单的url
 * @type {{S: string, CT: string, ST: string}}
 */
const orderUrl = {
  'S': 'order_subject',
  'CT': 'order_common_topic',
  'ST': 'order_spec_topic',
  'PS': 'order_pro_strategy',
  'VS': 'order_vip_strategy'
}

/**
 * 获取积分券
 * @returns {Promise}
 */
const getIntegral = () => {
    return new Promise(
      (resolve, reject) => {
        if (user.isLogin) {
          getWithinAuth(
            {
              url: getUrl('integral_list')
            }
          ).then(
            integralList => {
              resolve(integralList)
            }
          ).catch(
            err => {
              reject(err)
            }
          )
        } else {
          resolve([])
        }
      }
    )
}

/**
 * 获取 课程/专题 订单
 * @returns {Promise}
 */
const getOrder = (type, id) => {
  const orderGet = user.isLogin ? getWithinAuth : getWithoutAuth
  return new Promise(
    (resolve, reject) => {
      orderGet(
        {
          url: getUrl(orderUrl[type]).replace(':id', id)
        }
      ).then(
        order => {
          resolve(order)
        }
      ).catch(
        err => {
          reject({
            type: errorType.FAIL,
            reason: err
          })
        }
      )
    }
  )
}

/**
 * 获取策略订单
 * @param type
 * @returns {Promise}
 */
const getStrategyOrder = (type) => {
  const orderGet = user.isLogin ? getWithinAuth : getWithoutAuth
  return new Promise(
    (resolve, reject) => {
      orderGet(
        {
          url: getUrl(orderUrl[type])
        }
      ).then(
        order => {
          resolve(order)
        }
      ).catch(
        err => {
          reject({
            type: errorType.FAIL,
            reason: err
          })
        }
      )
    }
  )
}

/**
 * 下载 课程信息
 * @param id
 * @returns {Promise}
 */
const loadSubjectProgress = (id) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth(
        {
          url: getUrl('expense_records'),
          data: {
            subjectId: id.toString()
          }
        }
      ).then(
        subject => {
          resolve(subject[0].lessonSet.postponeType)
        }
      ).catch(
        err => {
          reject({
            type: errorType.FAIL,
            reason: err
          })
        }
      )
    }
  )
}

/**
 * 下载 投币余额
 * @returns {Promise}
 */
const loadCurrentBalance = () => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('toubi_balance')
        }
      ).then(
        currentBalance => {
          resolve(currentBalance)
        }
      ).catch(
        err => {
          reject({
            type: errorType.FAIL,
            reason: err
          })
        }
      )
    }
  )
}

/**
 * 获取 延期订单
 * @returns {Promise}
 */
const getPostponeOrder = (type, id) => {
  let subjectId = parseInt(id)
  return new Promise(
    (resolve, reject) => {
      if (user.isLogin) {
        Promise.all([loadSubjectProgress(subjectId), loadCurrentBalance()]).then(
          ([is90DayAvailable, currentBalance]) => {
            resolve({is90DayAvailable, currentBalance})
          }
        ).catch(
          err => {
            reject(err)
          }
        )
      } else {
        reject({
          type: errorType.FAIL,
          reason: '账号过期，请重新登录'
        })
      }
    }
  )
}

/**
 * 支付
 * @param trade
 * @param channel
 * @returns {Promise}
 */
const pay = ({trade, channel, isSubscriber}) => {
  return new Promise(
    (resolve, reject) => {
      let pay
      if (channel === payChannel.ALI) {
        //window.alert('ALI')
        switch (Device.platform) {
          case platformMap.ANDROID:
            //window.alert('ANDROID')
            pay = AliAppPay
            break
          case platformMap.IOS:
            //window.alert('IOS')
            pay = AliAppPay
            break
          case platformMap.WEB:
            //window.alert('WEB')
            pay = AliBrowserPay
            break
        }
      } else if (channel === payChannel.WECHAT) {
        //window.alert('WECHAT')
        switch (Device.platform) {
          case platformMap.ANDROID:
            //window.alert('ANDROID')
            pay = WeChatAppPay
            break
          case platformMap.IOS:
            //window.alert('IOS')
            pay = WeChatAppPay
            break
          case platformMap.WEB:
            //window.alert('WEB')
            if (Agent.isWx) {
              //window.alert('isWx')
              if (isSubscriber) {
                pay = WeChatQRCodePay
              } else {
                pay = WeChatBrowserPay
              }
            } else {
              reject({
                type: errorType.FAIL,
                reason: '请在微信浏览器中打开'
              })
            }
            break
        }
      } else if (channel === payChannel.TOUBI) {
        //window.alert('TOUBI')
        pay = ToubiPay
      }

      pay(trade).then(
        res => {
          resolve(res)
        }
      ).catch(
        err => {
          reject(err)
        }
      )
    }
  )
}

export {
  payChannel,
  goodsType,
  dealType,
  transactionChannel,
  errorType,
  getIntegral, //积分券
  getOrder, // 课程 | 专题 订单
  getPostponeOrder, // 延期 订单
  getStrategyOrder, // 策略产品 订单
  pay
}
