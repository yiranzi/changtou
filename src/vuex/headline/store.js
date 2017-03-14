/**
 * Created by zyr on 2016/10/8.
 */
const state = {
  headlineContent: {},
  userIsCheckin: false,
  userIsSerialCheckin: false,
  userCheckinCount: 0
}
const mutations = {
  HEADLINE_CONTENT (state, data) {
    state.headlineContent = data
  },
  USER_IS_CHECKIN (state, data) {
    state.userIsCheckin = data
  },
  USER_IS_SERIAL_CHECKIN (state, data) {
    state.userIsSerialCheckin = data
  },
  USER_CHECKIN_COUNT (state, data) {
    state.userCheckinCount = data
  }
}
export default {
  state,
  mutations
}
