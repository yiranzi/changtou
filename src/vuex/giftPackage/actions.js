import {getWithinAuth, putWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
/**
 * 用户领取礼包，如资格不符提示信息
 */
export const receiveGiftPackage = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('get_gift_package')
      }).then(
        function () {
          resolve()
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 判断是否有资格获取礼包
 * @param dispatch
 * @returns {Promise}
 */
export const isQualifyGiftPackage = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('get_gift_qualify')
      }).then(
        function (isQualify) {
          resolve(isQualify)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 加载积分券列表
 * @param dispatch
 * @returns {Promise}
 */
export const loadingCouponList = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('loading_coupon_list')
      }).then(
        function (couponList) {   // 优惠券
          dispatch('LOADING_COUPON_LIST', couponList)
          resolve(couponList)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 更新电子书阅读进度
 * /:bookId/:sectionIndex
 * update/book/progress
 */
export const updateBookProgress = ({ dispatch }, bookId, sectionIndex) => {
  return new Promise(
    (resolve, reject) => {
      putWithinAuth({
        url: getUrl('update/book/progress').replace(':bookId', bookId).replace(':sectionIndex', sectionIndex)
      }).then(
        function (message) {   // 更新成功与否
          resolve(message)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 获取电子书阅读进度
 * '/e-book/record/:bookId'
 * get/book/progress
 */
export const getBookProgress = ({ dispatch }, bookId) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('get/book/progress').replace(':bookId', bookId)
      }).then(
        function (message) {   // 信息: Id, createTime, Chapter
          resolve(message)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
