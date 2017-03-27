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
  shouldQuestionShow: false,
  HP: 0
}

const mutations = {
  /**
   * 更新生命值
   * @param state
   * @param HP
   * @constructor
   */
  GET_VILLAGE_HP (state, HP) {
    state.HP = HP
  },
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
  /**
   * 判断是否要显示答题界面
   * @param state
   * @param status
   * @constructor
   */
  SHOULD_QUESTION_SHOW (state, status) {
    state.shouldQuestionShow = status
  },
  RESET_VILLAGE_RECORD (state) {
    state.villageProgress.chapterNo = 0
    state.villageProgress.questionNo = 0
  }
}

export default {
  state,
  mutations
}
