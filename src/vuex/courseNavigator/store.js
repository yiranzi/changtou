/**
 * Created by zl on 2016/8/25.
 * 首页展示页面
 */
const state = {
  banners: [],
  expenseCourseList: [],
  freeCourseList: []
}

const mutations = {
  UPDATE_NAIGATOR_DATA (state, data) {
    state.banners = data.banners
    state.expenseCourseList = data.expenseCourseList
    state.freeCourseList = data.freeCourseList
  }
}

export default {
  state,
  mutations
}
