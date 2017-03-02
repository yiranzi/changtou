/**
 * Created by zyr on 2017/3/2
 * 新增的理财新手村
 */
const state = {
  answerProgress: {
    chapterNo: 0,
    questionNo: 0
  }
}

const mutations = {
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
