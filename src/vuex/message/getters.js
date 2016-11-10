/**
 * Created by dongdong on 2016/9/29.
 */
export const msgArr = (state) => {
  return state.message.msgArr
}

/**
 * 获取新消息数量
 * @param state
 * @returns {number|*}
 */
export const newMsgNum = (state) => {
  return state.message.newMsgNum
}
