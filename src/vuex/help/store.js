/**
 * Created by dongdong on 2016/10/31.
 */
const state = {
  QAList: [], //自助答疑列表
  records: [] //答疑列表
}

const mutations = {
  HELP_UPDATE_QA_LIST (state, QAList) {
    state.QAList = QAList
  },

  HELP_UPDATE_QA_RECORDS (state, records) {
    state.records = records
  }
}

export default {
  state,
  mutations
}
