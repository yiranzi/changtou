/**
 * Created by dongdong on 2016/8/21.
 */
const state = {
  notificationSwitch: 'Y',
  isSpire: false
}

const mutations = {
  MINE_UPDATE_NOTIFICATION_SWITCH (state, nofiSwitch) {
    state.notificationSwitch = nofiSwitch
  },
  CHECK_IS_SPIRE (state, isSpire) {
    state.isSpire = isSpire
  }

}
export default {
  state,
  mutations
}
