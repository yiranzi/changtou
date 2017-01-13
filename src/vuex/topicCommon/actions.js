/**
 * Created by dongdong on 2016/10/8.
 */
import {getWithoutAuth, getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 *获取通用专题信息
 */
export const loadCommonTopic = ({ dispatch }, ctpId) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('common_topic').replace(':ctpId', ctpId)
      }).then(
        function (commonTopic) {
          dispatch('LOAD_COMMON_TOPIC', commonTopic)
          resolve(commonTopic)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 获取是否购买通用专题
 */
export const isCommonTopicBuy = ({ dispatch }, ctpId) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('is_common_topic_buy').replace(':ctpId', ctpId)
      }).then(
        function (isBuy) {
          dispatch('UPDATE_COMMON_TOPIC_ISBUY', isBuy)
          resolve(isBuy)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
