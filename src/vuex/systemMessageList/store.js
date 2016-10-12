/**
 * Created by dongdong on 2016/9/29.
 */
const state = {
 msgArr: []
}
const mutations = {
  UPDATE_MESSAGE_LIST (state, response) {
      state.msgArr = response
    }
}
export default {
  state,
  mutations
}
