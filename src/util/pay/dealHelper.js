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
 * 获取 订单
 * @param type 商品类型
 * @param id 产品Id
 */
const getOrder = (type, id) => {
  if (type === goodsType.POSTPONE) {
    return getPostponeOrder(type, id)
  } else {
    return getCommonOrder(type, id)
  }
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
 * 获取 课程/专题 订单
 * @returns {Promise}
 */
const getCommonOrder = (type, id) => {
  const orderGet = user.isLogin ? getWithinAuth : getWithoutAuth
  return new Promise(
    (resolve, reject) => {
      orderGet(
        {
          url: getUrl(orderUrl[type]).replace(':id', id)
        }
      ).then(
        order => {
          resolve(
            arrangeOrderFromServer({
              type: type,
              id: parseInt(id),
              order: order
              })
          )
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
 * 整理优惠列表
 * @param order
 * @returns {Array}
 */
const getCoupons = (order) => {
  let coupons = []

  if (order.coupons) {
    coupons = order.coupons
  }

  if (order.card) {
    coupons.push({
      name: '长投卡(7折)',
      userBene: 0
    })
  }

  return coupons
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
            resolve(arrangePostponeOrder(is90DayAvailable, currentBalance, subjectId))
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
 * 整理 延期订单
 * @param is90DayAvailable
 * @param currentBalance
 * @param subjectId
 * @returns {{courseList: Array, couponList: Array, currentBalance: *, pic: string, postponeList: *[], price: number, title: string, trade: {body: string, deal: {cardUsed: boolean, channel: string, items: *[], stpId: null}, sum: number}}}
 */
const arrangePostponeOrder = (is90DayAvailable, currentBalance, subjectId) => {
  const postponeList = [
    {
      name: '延长90天',
      price: 1,
      info: '只可使用一次',
      disabled: false,
      misc: '90'
    },
    {
      name: '延长30天',
      price: 50,
      info: '',
      disabled: false,
      misc: '30'
    }
  ]

  let price = 0
  let couponList = []
  if (is90DayAvailable === 'Y') {
    // 延期过
    postponeList[0].disabled = true
    price = 50

    if (user.card) {
      // 有长投卡
      couponList = [{
        couponNo: 1,
        name: '长投卡(7折)',
        userBene: Math.ceil(postponeList[1].price * 0.7),
        holderBene: 0
      }]
    }
  } else {
    price = 1
  }
  let trade = {
    body: '课程延期',
    deal: {
      cardUsed: false,
      channel: (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) ? 'APP' : 'MAPP',
      items: [
        {
          coupon: null,
          dealType: dealType.POSTPONE,
          itemId: subjectId,
          mchantType: 1,
          misc: '90',
          price: 1
        }
      ],
      stpId: null
    },
    sum: 1
  }
  return {
    courseList: [],
    couponList,
    currentBalance,
    pic: '',
    postponeList,
    price,
    title: '',
    trade
  }
}

/**
 * 整理订单页面需要的数据
 * @param type
 * @param id
 * @param order
 * @returns {{courseList: Array, couponList: Array, total: number, deduction: number, currentBalance: number, sum: number}}
 */
const arrangeOrderFromServer = ({type, id, order}) => {
  let courseList = []
  let dealItems = []
  let price
  switch (type) {
    case goodsType.SUBJECT:
     //console.log('课程')
      courseList.push({
        pic: order.pic,
        price: order.price,
        subjectId: id,
        subtitle: order.subtitle,
        title: order.title
      })
      dealItems = [
        {
          coupon: null,
          dealType: dealType.BUY,
          itemId: id,
          mchantType: 1,
          misc: '',
          price: order.price
        }
      ]
      price = order.price
          break

    case goodsType.SPEC_TOPIC:
      //console.log('打包课 专题')
      courseList = order.courseItems
      dealItems = order.courseItems.map(item => {
        return {
          coupon: null,
          dealType: dealType.BUY,
          itemId: item.subjectId,
          mchantType: 1,
          misc: '',
          price: item.price
        }
      })
      let priceArr = order.courseItems.map(
        item => {
          return item.price
        }
      )
      price = priceArr.reduce(
        (prev, curr) => {
          return prev + curr
        }, 0
      )
          break

    case goodsType.COMMON_TOPIC:
     //console.log('图片 专题')
      dealItems = [
        {
          coupon: null,
          dealType: dealType.BUY,
          itemId: id,
          mchantType: order.mchantType,
          misc: '',
          price: order.price
        }
      ]
      price = order.price
          break

    default:
          break

  }

  const couponList = getCouponList(order.card, price, order.coupons)
  const currentBalance = order.currentBalance
  const pic = order.pic
  const title = order.title ? order.title : order.stpTitle
  const trade = {
    body: title,
    deal: {
      cardUsed: false,
      channel: (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) ? 'APP' : 'MAPP',
      items: dealItems,
      stpId: (type === goodsType.SPEC_TOPIC) ? id : null
    },
    sum: price
  }

  return {
    courseList,
    couponList,
    currentBalance,
    pic,
    price,
    postponeList: [],
    title,
    trade
  }
}

/**
 * 整理优惠列表
 * @param card
 * @param price
 * @param coupons
 * @returns {Array}
 */
const getCouponList = (card, price, coupons) => {
  let couponList = []
  if (card) {
    couponList.push({
      couponNo: 1,
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
  getOrder,
  getStrategyOrder,
  getCoupons,
  pay
}
