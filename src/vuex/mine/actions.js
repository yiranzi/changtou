/**
 * Created by dongdong on 2016/8/21.
 */

import {putWithinAuth, getWithinAuth, postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
/**
 * 消息提醒设置开关
 */
export const loadNofiSwitch = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('load_noti_switch')
      }).then(
        function ([{status}]) {
          dispatch('MINE_UPDATE_NOTIFICATION_SWITCH', status)
          resolve(status)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

export const updateNofiSwitch = ({ dispatch }, status) => {
  return new Promise(
    (resolve, reject) => {
      putWithinAuth({
        url: getUrl('post_noti_switch'),
        data: [{
          name: 'common',
          status
        }]
      }).then(
        function () {
          dispatch('MINE_UPDATE_NOTIFICATION_SWITCH', status)
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
 * 意见反馈内容
 */
export const upLoadContent = ({ dispatch }, content) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth({
        url: getUrl('post_suggestion'),
        data: {
          content
        }
      }).then(
        function (content) {
          resolve(content)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

