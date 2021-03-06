/**
 * Created by zl on 2016/8/25.
 * 首页展示页面
 */
const state = {
  banners: [],
  expenseCourseList: [],
  freeCourseList: [],
  recommends: [],
  readingClassics: {},
  hasNewInterview: false,
  headLineTitle: [],
  columnChangeData: []
}

const mutations = {
  UPDATE_NAIGATOR_DATA (state, data) {
    state.banners = data.banners
    state.expenseCourseList = data.expenseCourseList
    state.freeCourseList = data.freeCourseList
    state.recommends = data.recommends
    state.readingClassics = data.readingClassics
  },
  UPDATE_NAIGATOR_DATA_INTERVIEW (state, data) {
    state.hasNewInterview = data
  },
  UPDATE_NAIGATOR_HEAD_LINE_TXT (state, headLineData) {
    state.headLineTitle = headLineData.title
  },
  UPDATE_NAIGATOR_COLUMN_CHANGE (state, columnChangeData) {
    state.columnChangeData = columnChangeData
  }
}

export default {
  state,
  mutations
}
