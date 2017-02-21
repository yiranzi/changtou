/**
 * Created by zhongyan on 2017/2/15.
 */
import {getWithoutAuth, postWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/*
*加载大咖读经典模块的经典专辑详情
*
*/

export const loadClassicReadingDetails = ({ dispatch }, classicId) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('load_classic_reading_details').replace(':cbId', classicId)
      }).then(
        data => {
          dispatch('CLASSIC_READING_DETAILS', data)
          resolve(data)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/*
* 更新音频播放次数
* */

export const updatePlayedTime = ({ dispatch }, classicId, id) => {
  return new Promise(
    (resolve, reject) => {
      postWithoutAuth({
        url: getUrl('update_classic_played_time').replace(':cbId', classicId).replace(':cbaId', id)
      }).then(
        () => {
          resolve()
        },
        (err) => {
          reject(err)
        }
      )
    }
  )
}
