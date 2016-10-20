/**
 * Created by dongdong on 2016/10/19.
 */
const state = {
  question: {},
  newertestReport: {}
}
const mutations = {
  LOAD_QUESTION (state, question) {
    state.question = question
  },
  LOAD_NEWERTEST_REPORT (state, newertestReport) {
    state.newertestReport = newertestReport
  }
}
export default {
  state,
  mutations
}

