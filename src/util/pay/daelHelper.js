/**
 * Created by jun on 2016/9/30.
 */
//import { weChatAppPay } from '../../plugin/payment/WeChatAppPay'
import {getWithoutAuth, getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
import store from '../../vuex/store'

const user = store.state.user

const order = {
  courseList: [],
  couponList: [],
  total: 0, //共计
  deduction: 0, // 投币抵扣
  currentBalance: 0, // 投币余额
  sum: 0 // 实付
}

const dealType = {
  SUBJECT: 'S',       // 课程
  COMMON_TOPIC: 'CT',  // 通用专题
  SPEC_TOPIC: 'ST',    // 打包课专题
  POSTPONE: 'P'       // 延期
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
          order.courseList.push({
              pic: subjectOrder.pic,
              price: subjectOrder.price,
              subjectId: subjectId,
              subtitle: subjectOrder.subtitle,
              title: subjectOrder.title
          })
          order.couponList = arrangeCouponList(subjectOrder.card, subjectOrder.price, subjectOrder.coupons)
          order.price = subjectOrder.price
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
  //return new Promise(
  //  (resolve, reject) => {
  //    let ajax = user.isLogin ? getWithinAuth : getWithoutAuth
  //
  //    ajax(
  //      {
  //        url: getUrl('spec_topic_order').replace('{stpId}', id)
  //      }
  //    ).then(
  //      order => {
  //        resolve(order)
  //      }
  //    ).catch(
  //      err => {
  //        console.warn(err)
  //        reject(err)
  //      }
  //    )
  //  }
  //)
}

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

const payStart = (trade, channel) => {

}

export {
  getOrder,
  payStart
}
