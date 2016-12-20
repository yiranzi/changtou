/**
 * Created by dongdong on 2016/10/14.
 */
import {getWithinAuth} from '../../frame/ajax'
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
        function (isQualify) {   // 优惠券
          dispatch('LOADING_COUPON_LIST', isQualify)
          resolve(isQualify)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
