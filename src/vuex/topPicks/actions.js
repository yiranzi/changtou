/**
 * Created by zyr on 2016/10/8.
 */
import {getWithinAuth, getWithoutAuth, postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取头条精选
 * @param dispatch
 */
export const getTopPicksList = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('homepage_toppicks')
      }).then(
        function (data) {
          dispatch('TOP_PICKS_LIST', data)
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
export const getUserSignState = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('homepage_toppicks_signin_hassigned')
      }).then(
        function (data) {
          dispatch('IS_SIGN', data)
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
export const getUserSignCount = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('homepage_toppicks_signin_count')
      }).then(
        function (data) {
          dispatch('USER_SIGN_COUNT', data)
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
export const signUpdate = (userId) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth({
        url: getUrl('homepage_toppicks_signin_signupdate')
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
