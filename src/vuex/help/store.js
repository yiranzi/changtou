/**
 * Created by dongdong on 2016/10/31.
 * 小投答疑
 */
const state = {
  newSuggestionNum: 0, // 新消息数目
  QAList: [], //自助答疑列表
  records: [] //答疑列表
}

const mutations = {
  HELP_UPDATE_QA_LIST (state, QAList) {
    state.QAList = QAList
  },

  HELP_UPDATE_QA_RECORDS (state, records) {
    state.records = records
  },

  HELP_UPDATE_NEW_SUGGESTION_NUM (state, num) {
    state.newSuggestionNum = num
  },

  HELP_RESET_NEW_SUGGESTION_NUM (state) {
    state.newSuggestionNum = 0
  }
}

export default {
  state,
  mutations
}
