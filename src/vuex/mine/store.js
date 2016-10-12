/**
 * Created by dongdong on 2016/8/21.
 */
const state = {
  notificationSwitch: 'Y'
}

const mutations = {
  MINE_UPDATE_NOTIFICATION_SWITCH (state, nofiSwitch) {
    state.notificationSwitch = nofiSwitch
  }

}
export default {
  state,
  mutations
}
