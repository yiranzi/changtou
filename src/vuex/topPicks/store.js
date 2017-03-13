/**
 * Created by zyr on 2016/10/8.
 */
const state = {
  topPicksList: [],
  isSign: false,
  userSignCount: 0
}
const mutations = {
  TOP_PICKS_LIST (state, data) {
    state.topPicksList = data
  },
  IS_SIGN (state, data) {
    state.userIsSign = data
  },
  USER_SIGN_COUNT (state, data) {
    state.userSignCount = data
  }
}
export default {
  state,
  mutations
}
