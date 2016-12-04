/**
 * Created by zl on 2016/8/25.
 * 所有课程页面
 */
const state = {
  totalList: []
}

const mutations = {
  DISPLAY_UPDATE_TOTAL_LIST (state, list) {
    state.totalList = list
  }
}

export default {
  state,
  mutations
}
