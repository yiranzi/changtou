/**
 * Created by dongdong on 2016/9/29.
 */
const state = {
  msgArr: [],
  newMsgNum: 0
}

const mutations = {
  MESSAGE_UPDATE_MESSAGE_LIST (state, msgArr) {
    state.msgArr = msgArr
  },

  /**
   * 设置新消息数目
   * @param state
   * @param num
   * @constructor
     */
  MESSAGE_UPDATE_NEW_MSG_NUM (state, num) {
    state.newMsgNum = num
  },

  /**
   *
   * @constructor
   */
  MESSAGE_INCREASE_NEW_MSG_NUM (state) {
    state.newMsgNum ++
  },

  /**
   * 重置新消息数目
   * @param state
   * @constructor
     */
  MESSAGE_RESET_NEW_MSG_NUM (state) {
    state.newMsgNum = 0
  }
}

export default {
  state,
  mutations
}
