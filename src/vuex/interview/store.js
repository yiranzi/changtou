/**
 * Created by dongdong on 2016/10/11.
 */
const state = {
  interviewList: {},
  interviewRecord: {}
}

const mutations = {
  INTERVIEW_LOAD_INTERVIEW_LIST (state, interviewList) {
    state.interviewList = interviewList
  },
  INTERVIEW_LOAD_INTERVIEW_RECORD (state, interviewRecord) {
    state.interviewRecord = interviewRecord
  }
}
export default {
  state,
  mutations
}
