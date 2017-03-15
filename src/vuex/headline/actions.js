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
export const checkinUpdate = () => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('homepage_headline_checkin_updata')
      }).then(
        function (data) {
          console.log(data)
          resolve(data)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
