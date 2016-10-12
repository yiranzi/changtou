/**
 * Created by zl on 2016/8/25.
 * 所有课程页面
 */
const state = {
  freelist: [],
  expenselist: []
}

const mutations = {
  DISPLAY_UPDATE_FREE_LIST (state, freelist) {
    state.freelist = freelist
  },
  DISPLAY_UPDATE_EXPENCE_LIST (state, expenselist) {
    state.expenselist = expenselist
  }
}

export default {
  state,
  mutations
}
