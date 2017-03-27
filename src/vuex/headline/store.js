/**
 * Created by zyr on 2016/10/8.
 */
const state = {
  headlineContent: {},
  userCheckinData: {},
  getAmount: false
}
const mutations = {
  HEADLINE_CONTENT (state, data) {
    state.headlineContent = data
  },
  USER_CHECKIN_DATA (state, data) {
    state.userCheckinData = data
  },
  GET_AMOUNT (state, data) {
    state.getAmount = data
  }
}
export default {
  state,
  mutations
}
