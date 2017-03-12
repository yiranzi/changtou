/**
 * Created by zyr on 2016/10/8.
 */
import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取用户签到记录
 * @param dispatch
 * @param userId
 */
export const getUserSignProgress = ({ dispatch }, userId) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('toppicks_sign').replace(':userId', userId)
      }).then(
        function (data) {
          dispatch('USER_SIGN_PROGRESS', data)
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
