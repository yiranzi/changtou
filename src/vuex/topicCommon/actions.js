/**
 * Created by dongdong on 2016/10/8.
 */
import {getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 *获取通用专题信息
 */
export const loadCommonTopic = ({ dispatch }, ctpId) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
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
 * 获取是否购买年会门票
 */
export const booleanMeetingTicket = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('boolean_meeting_ticket')
      }).then(
        function (isBuyTicket) {
          dispatch('LOAD_ISBUY_TICKET', isBuyTicket)
          resolve(isBuyTicket)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
