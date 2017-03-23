/**
 * Created by zl on 2016/8/25.
 * 所有课程页面
 */
const state = {
  totalList: [],
  courseClassification: []
}

const mutations = {
  DISPLAY_UPDATE_TOTAL_LIST (state, list) {
    state.totalList = list
  },
  DISPLAY_UPDATE_CLASSIFICATION_LIST (state, classificationList) {
    state.courseClassification = classificationList
  }
}

export default {
  state,
  mutations
}
