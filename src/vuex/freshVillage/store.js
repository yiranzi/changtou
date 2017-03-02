/**
 * Created by jun on 2017/1/24
 * 新增的理财新手村
 */
const state = {
  adviseList: [],
  answerProgress: {
    chapterNo: 0,
    questionNo: 0
  }
}

const mutations = {
  /**
   *
   * @param state
   * @param advise
   * @constructor
   */
  LOAD_VILLAGE_ADVISE (state, advise) {
    state.adviseList = advise
  },
  /**
   *
   * @param state
   * @param answerProgress
   * @constructor
   */
  FRESH_VILLAGE_ANSWER_PROGRESS (state, answerProgress) {
    state.answerProgress = answerProgress
  }
}

export default {
  state,
  mutations
}
