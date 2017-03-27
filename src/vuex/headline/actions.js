/**
 * Created by zyr on 2016/10/8.
 */
import {getWithinAuth, getWithoutAuth, postWithinAuth, putWithinAuth} from '../../frame/ajax'
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
 * 获取用户签到信息
 * @param dispatch
 */
export const getCheckinData = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('homepage_headline_checkin_data')
      }).then(
        function (data) {
          dispatch('USER_CHECKIN_DATA', data)
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
 * 用户进行签到
 * @param dispatch
 *
 */
export const checked = () => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth({
        url: getUrl('homepage_headline_checkin_checked')
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

/**
 * 更新生命值
 * @param dispatch
 * @param HP
 */
export const updataAmount = ({ dispatch }, HP) => {
  return new Promise(
    (resolve, reject) => {
      putWithinAuth({
        url: getUrl('village_commit_HP').replace(':amount', HP)
      }).then(
        function (data) {
          dispatch('GET_AMOUNT', data)
          resolve(data)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
