/**
 * Created by dongdong on 2016/9/29.
 */
import {getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

export const loadMsgArr = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('load_person_list')
      }).then(
        function (msgList) {
          dispatch('MESSAGE_UPDATE_MESSAGE_LIST', msgList)
          // 获取消息，重置新消息的数目
          dispatch('MESSAGE_RESET_NEW_MSG_NUM')
          resolve(msgList)
        },
        function () {
          reject()
        }
      )
    }
  )
}

/**
 * 增加新消息数
 */
export const addNewMessageNum = ({ dispatch }) => {
  dispatch('MESSAGE_INCREASE_NEW_MSG_NUM')
  //todo setLocalCache setIconBadgeNumber
  //const newMessageNum = JSON.parse(getLocalCache('frame-user')).newMessageNum + 1
  //setLocalCache('frame-user', {newMessageNum: newMessageNum})
  //setIconBadgeNumber(newMessageNum)
}
