/**
 * Created by zyr on 2016/10/8.
 */
const state = {
  userSignProgress: {},
  topPicksList: []
}
const mutations = {
  USER_SIGN_PROGRESS (state, data) {
    state.userSignProgress = data
  },
  TOP_PICKS_LIST (state, data) {
    state.topPicksList = data
  }
}
export default {
  state,
  mutations
}
