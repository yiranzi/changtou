/**
 * Created by jun on 2016/9/30.
 */
import { AliAppPay } from '../../plugin/payment/aliAppPay'
import { AliBrowserPay } from '../../plugin/payment/aliBrowserPay'
import { ToubiPay } from '../../plugin/payment/toubiPay'
import { WeChatAppPay } from '../../plugin/payment/weChatAppPay'
import { WeChatBrowserPay } from '../../plugin/payment/weChatBrowserPay'
import { WeChatQRCodePay } from '../../plugin/payment/weChatQRCodePay'
import { Device, platformMap } from '../../plugin/device'
import { Agent } from '../../plugin/agent'
import { getParamFromUrl } from '../../util/urlParams'
import { getWithoutAuth, getWithinAuth } from '../../frame/ajax'
import { getUrl } from '../../frame/apiConfig'
import store from '../../vuex/store'

const user = store.state.user

/**
 * 页面信息
 * @type {{courseList: Array, couponList: Array, total: number, deduction: number, currentBalance: number, sum: number}}
 */
let order = {
  courseList: [],
  couponList: [],
  price: 0, //原价
  currentBalance: 0, // 投币余额
  trade: null  // 交易信息
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
 * 商品类型
 * @type {{SUBJECT: string, COMMON_TOPIC: string, SPEC_TOPIC: string, POSTPONE: string}}
 */
const goodsType = {
  SUBJECT: 'S',       // 课程
  COMMON_TOPIC: 'CT',  // 通用专题
  SPEC_TOPIC: 'ST',    // 打包课专题
  POSTPONE: 'P'       // 延期
}

const errorType = {
  CANCEL: 'cancel',
  FAIL: 'fail'
}

const dealType = {
  WX_CODE: 'wx_code',
  ALI_BROWSER: 'ali_browser'
}

/**
 * 重置 订单页数据
 */
const resumeOrder = () => {
  order = {
    courseList: [],
    couponList: [],
    price: 0,
    currentBalance: 0,
    trade: null
  }
}

/**
 * 获取 订单
 * @param type 订单类型
 * @param id 产品Id
 */
const getOrder = (type, id) => {
  switch (type) {
    case goodsType.SUBJECT:
      return getSubjectOrder(id)

    case goodsType.COMMON_TOPIC:
      return getCommonTopicOrder(id)

    case goodsType.SPEC_TOPIC:
      return getSpecTopicOrder(id)

    case goodsType.POSTPONE:
      return getPostponeOrder(id)

    default:
      break
  }
}

/**
 * 获取 课程订单
 * @returns {Promise}
 */
const getSubjectOrder = (id) => {
  let subjectId = parseInt(id)
  return new Promise(
    (resolve, reject) => {
      let ajax = user.isLogin ? getWithinAuth : getWithoutAuth

      ajax(
        {
          url: getUrl('subject_order').replace('{subjectId}', subjectId)
        }
      ).then(
        subjectOrder => {
          subjectOrder.subjectId = subjectId
          arrangeOrderFromSubject(subjectOrder)
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
 * 获取 通用专题订单
 * @returns {Promise}
 */
const getCommonTopicOrder = (id) => {
  return new Promise(
    (resolve, reject) => {
      let ajax = user.isLogin ? getWithinAuth : getWithoutAuth

      ajax(
        {
          url: getUrl('common_topic_order').replace('{ctpId}', id)
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
 * 获取 打包课专题订单
 * @returns {Promise}
 */
const getSpecTopicOrder = (id) => {
  return new Promise(
    (resolve, reject) => {
      let ajax = user.isLogin ? getWithinAuth : getWithoutAuth

      ajax(
        {
          url: getUrl('spec_topic_order').replace('{stpId}', id)
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
 * 获取 延期订单
 * @returns {Promise}
 */
const getPostponeOrder = (id) => {

}

/**
 * 组织 订单页所需数据
 * @param subjectOrder
 * @returns {{courseList: Array, couponList: Array, total: number, deduction: number, currentBalance: number, sum: number}}
 */
const arrangeOrderFromSubject = (subjectOrder) => {
  resumeOrder()
  order.courseList.push({
    pic: subjectOrder.pic,
    price: subjectOrder.price,
    subjectId: subjectOrder.subjectId,
    subtitle: subjectOrder.subtitle,
    title: subjectOrder.title
  })
  order.couponList = arrangeCouponList(subjectOrder.card, subjectOrder.price, subjectOrder.coupons)
  order.price = subjectOrder.price
  order.currentBalance = subjectOrder.currentBalance
  order.trade = {
    body: subjectOrder.title,
    deal: {
      cardUsed: false,
      channel: (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) ? 'APP' : 'MAPP',
      items: [
        {
          coupon: null,
          dealType: 1,
          itemId: subjectOrder.subjectId,
          mchantType: 1,
          misc: '',
          price: subjectOrder.price
        }
      ],
      stpId: null
    },
    openId: user.openId,
    //openId: 'oeTjys44hEc6-rSo5oH2c_ASSep8',
    sum: subjectOrder.price
  }
  return order
}

/**
 * 整理优惠列表
 * @param card
 * @param price
 * @param coupons
 * @returns {Array}
 */
const arrangeCouponList = (card, price, coupons) => {
  let couponList = []
  if (card) {
    couponList.push({
      couponNo: null,
      name: '长投卡(7折)',
      userBene: Math.floor(price * 0.3),
      holderBene: 0
    })
  }
  if (coupons && coupons.length > 0) {
    for (var i = 0, length = coupons.length; i < length; i++) {
      couponList.push({
        couponNo: coupons[i].couponNo,
        name: coupons[i].name,
        userBene: coupons[i].userBene,
        holderBene: coupons[i].holderBene
      })
    }
  }
  return couponList
}

/**
 * 支付
 * @param trade
 * @param channel
 * @returns {Promise}
 */
const pay = (trade, channel) => {
  return new Promise(
    (resolve, reject) => {
      if (channel === payChannel.ALI) {
        //window.alert('ALI')
        switch (Device.platform) {
          case platformMap.ANDROID:
            //window.alert('ANDROID')
            AliAppPay(trade).then(
              () => {
                resolve()
              }
            ).catch(
              err => {
                reject(err)
              }
            )
            break
          case platformMap.IOS:
            //window.alert('IOS')
            AliAppPay(trade).then(
              () => {
                resolve()
              }
            ).catch(
              err => {
                reject(err)
              }
            )
            break
          case platformMap.WEB:
            //window.alert('WEB')
            AliBrowserPay(trade).then(
              () => {
                resolve()
              }
            ).catch(
              err => {
                reject(err)
              }
            )
            break
        }
      } else if (channel === payChannel.WECHAT) {
        //window.alert('WECHAT')
        switch (Device.platform) {
          case platformMap.ANDROID:
            //window.alert('ANDROID')
            WeChatAppPay(trade).then(
              () => {
                resolve()
              }
            ).catch(
              err => {
                reject(err)
              }
            )
            break
          case platformMap.IOS:
            //window.alert('IOS')
            WeChatAppPay(trade).then(
              () => {
                resolve()
              }
            ).catch(
              err => {
                reject(err)
              }
            )
            break
          case platformMap.WEB:
            //window.alert('WEB')
            if (Agent.isWx) {
              //window.alert('isWx')
              if (getParamFromUrl('subscriber')) {
                WeChatQRCodePay(trade).then(
                  url => {
                    resolve({
                      type: dealType.WX_CODE,
                      url: url
                    })
                  }
                ).catch(
                  err => {
                    reject(err)
                  }
                )
              } else {
                WeChatBrowserPay(trade).then(
                  () => {
                    resolve()
                  }
                ).catch(
                  err => {
                    reject(err)
                  }
                )
              }
            }
            break
        }
      } else if (channel === payChannel.TOUBI) {
        //window.alert('TOUBI')
        ToubiPay(trade).then(
          () => {
            resolve()
          }
        ).catch(
          err => {
            reject(err)
          }
        )
      }
    }
  )
}

export {
  payChannel,
  goodsType,
  dealType,
  errorType,
  getOrder,
  pay
}
