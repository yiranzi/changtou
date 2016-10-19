/**
 * Created by jun on 2016/9/30.
 */
import { AliAppPay } from '../../plugin/payment/AliAppPay'
import { AliBrowserPay } from '../../plugin/payment/AliBrowserPay'
import { ToubiPay } from '../../plugin/payment/ToubiPay'
import { WeChatAppPay } from '../../plugin/payment/WeChatAppPay'
import { WeChatBrowserPay } from '../../plugin/payment/WeChatBrowserPay'
//import { WeChatQRCodePay } from '../../plugin/payment/WeChatQRCodePay'
import { Device, platformMap } from '../../plugin/Device'
import { Agent } from '../../plugin/Agent'
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
  total: 0, //共计
  deduction: 0, // 投币抵扣
  currentBalance: 0, // 投币余额
  sum: 0 // 实付
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
const dealType = {
  SUBJECT: 'S',       // 课程
  COMMON_TOPIC: 'CT',  // 通用专题
  SPEC_TOPIC: 'ST',    // 打包课专题
  POSTPONE: 'P'       // 延期
}

const errorType = {
  CANCEL: 'cancel',
  FAIL: 'fail'
}

const resumeOrder = () => {
   order = {
    courseList: [],
    couponList: [],
    total: 0, //共计
    deduction: 0, // 投币抵扣
    currentBalance: 0, // 投币余额
    sum: 0 // 实付
  }
}

/**
 * 获取 订单
 * @param type 订单类型
 * @param id 产品Id
 */
const getOrder = (type, id) => {
  switch (type) {
    case dealType.SUBJECT:
      return getSubjectOrder(id)

    case dealType.COMMON_TOPIC:
      return getCommonTopicOrder(id)

    case dealType.SPEC_TOPIC:
      return getSpecTopicOrder(id)

    case dealType.POSTPONE:
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
          resumeOrder()

          order.courseList.push({
              pic: subjectOrder.pic,
              price: subjectOrder.price,
              subjectId: subjectId,
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
              channel: 'APP',  //todo 动态更换 channel
              items: [
                {
                  coupon: null,
                  dealType: 1,
                  itemId: subjectId,
                  mchantType: 1,
                  misc: '',
                  price: subjectOrder.price
                }
              ],
              stpId: null
            },
            openId: null,
            sum: subjectOrder.price
          }
          resolve(order)
        }
      ).catch(
        err => {
          //console.warn(err)
          reject(err)
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
          console.warn(err)
          reject(err)
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
          console.warn(err)
          reject(err)
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
        switch (Device.platform) {
          case platformMap.ANDROID:
            AliAppPay(trade).then(
              () => {
                resolve()
              }
            ).catch(
              () => {
                reject()
              }
            )
            break
          case platformMap.IOS:
            AliAppPay(trade).then(
              () => {
                resolve()
              }
            ).catch(
              () => {
                reject()
              }
            )
            break
          case platformMap.WEB:
             AliBrowserPay(trade).then(
              () => {
                resolve()
              }
            ).catch(
              () => {
                reject()
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
              () => {
                reject()
              }
            )
            break
          case platformMap.IOS:
            WeChatAppPay(trade).then(
              () => {
                resolve()
              }
            ).catch(
              () => {
                reject()
              }
            )
            break
          case platformMap.WEB:
            if (Agent.isWx) {
              //if (isSubscriber) {
              //  WeChatQRCodePay(trade).then(
              //    () => {
              //      resolve()
              //    }
              //  ).catch(
              //    () => {
              //      reject()
              //    }
              //  )
              //} else {
                WeChatBrowserPay(trade).then(
                  () => {
                    resolve()
                  }
                ).catch(
                  () => {
                    reject()
                  }
                )
              }
            //}
            break
        }
      } else if (channel === payChannel.TOUBI) {
        //window.alert('TOUBI')
        ToubiPay(trade).then(
          () => {
            resolve()
          }
        ).catch(
          () => {
            reject()
          }
        )
      }
    }
  )
}

export {
  payChannel,
  errorType,
  getOrder,
  pay
}
