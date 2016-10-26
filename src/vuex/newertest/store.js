/**
 * Created by dongdong on 2016/10/19.
 */
const state = {
  question: {}, //问题
  report: null, //测试报告
  newertestReport: null
}
const mutations = {
  LOAD_QUESTION (state, question) {
    state.question = question
  },
  LOAD_TEST_REPORT (state, report) {
    state.report = report
  },
  LOAD_NEWERTEST_REPORT (state, newertestReport) {
    state.newertestReport = newertestReport
  }
}
export default {
  state,
  mutations
}
