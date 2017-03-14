/**
 * Created by zyr on 2016/10/8.
 */
import {getWithinAuth, getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取头条精选
 * @param dispatch
 */
export const getHeadlineContent = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('homepage_headline')
      }).then(
        function (data) {
          dispatch('HEADLINE_CONTENT', data)
          resolve(data)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 获取用户当天是否签到
 * @param dispatch
 *
 */
export const getCheckinState = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('homepage_headline_checkin_haschecked')
      }).then(
        function (data) {
          dispatch('USER_IS_CHECKIN', data)
          resolve(data)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 获取用户是否连续签到
 * @param dispatch
 *
 */
export const getSerialCheckin = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('homepage_headline_checkin_serial')
      }).then(
        function (data) {
          dispatch('USER_IS_SERIAL_CHECKIN', data)
          resolve(data)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 获取用户签到天数
 * @param dispatch
 *
 */
export const getCheckinCount = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('homepage_headline_checkin_count')
      }).then(
        function (data) {
          dispatch('USER_CHECKIN_COUNT', data)
          resolve(data)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 用户签到
 * @param dispatch
 *
 */
export const checkinUpdate = () => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('homepage_headline_checkin_update')
      }).then(
        function (data) {
          resolve(data)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
