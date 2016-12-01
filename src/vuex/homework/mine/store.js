/**
 * Created by jun on 2016/10/26.
 */
const state = {
  list: []
}

const mutations = {
  /**
   * 更新我的作业列表
   * @param state
   * @param list
   * @constructor
     */
  UPDATE_MY_HOMEWORK_LIST (state, list) {
    state.list = list
  }
}

export default {
  state,
  mutations
}
