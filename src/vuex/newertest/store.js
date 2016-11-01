/**
 * Created by dongdong on 2016/10/19.
 */
const state = {
  question: {}, //问题
  newertestReport: null //测试报告
}
const mutations = {
  NEWERTEST_UPDATE_QUESTION (state, question) {
    state.question = question
  },
  NEWERTEST_UPDATE_REPORT (state, newertestReport) {
    state.newertestReport = newertestReport
  }
}
export default {
  state,
  mutations
}
