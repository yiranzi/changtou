/**
 * Created by jun on 2017/1/24
 * 新手村
 */
const state = {
  adviseList: [],
  villageProgress: {
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
   * @param villageProgress
   * @constructor
   */
  FRESH_VILLAGE_PROGRESS (state, villageProgress) {
    state.villageProgress = villageProgress
  }
}

export default {
  state,
  mutations
}
