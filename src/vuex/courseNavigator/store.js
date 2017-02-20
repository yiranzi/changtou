/**
 * Created by zl on 2016/8/25.
 * 首页展示页面
 */
const state = {
  banners: [],
  expenseCourseList: [],
  freeCourseList: [],
  recommends: [],
  readingClassics: {}
}

const mutations = {
  UPDATE_NAIGATOR_DATA (state, data) {
    state.banners = data.banners
    state.expenseCourseList = data.expenseCourseList
    state.freeCourseList = data.freeCourseList
    state.recommends = data.recommends
    state.readingClassics = data.readingClassics
  },

  UPDATE_NAVIGATOR_CLASSIC_PLAYNUM (state) {
  state.readingClassics.playTimes = state.readingClassics.playTimes + 1
}
}

export default {
  state,
  mutations
}
