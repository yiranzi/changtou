/**
 * Created by jun on 2017/1/24
 * 新手村
 */
const state = {
  adviseList: [],
  villageProgress: {
    chapterNo: 0,
    questionNo: 0
  },
  unLoginOptionRecord: {
    questionNo: 0,
    option: false
  }
}

const mutations = {
  /**
   *
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
  },

  RESET_VILLAGE_RECORD (state) {
    state.villageProgress.chapterNo = 0
    state.villageProgress.questionNo = 0
  },

  RECORD_UNLOGIN_RECORD (state, option) {
    state.unLoginOptionRecord.questionNo = 1
    state.unLoginOptionRecord.option = option
  }
}

export default {
  state,
  mutations
}
