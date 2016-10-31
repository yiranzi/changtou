/**
 * Created by jun on 2016/10/26.
 */
const state = {
  lessonId: '', //
  choiceQuestion: null, // 选择题题目
  report: { //  选择题 测试报告
    kpScore: [],  //知识点得分
    rightNum: 0,  //答对题数
    totalNum: 0 //总题数
  },
  totalNum: 0, //总题数
  currIndex: 0, //当前题号
  currQuestion: null //当前的题目
}

const mutations = {
  /**
   * 更新 测试报告
   * @param state
   * @param report
   * @constructor
     */
  UPDATE_CHOICE_REPORT (state, report) {
    state.report.kpScore = report.kpScore
    state.report.rightNum = report.rightNum
    state.report.totalNum = report.totalNum
  },

  /**
   * 更新 lessonId
   * @param state
   * @param lessonId
   * @constructor
     */
  UPDATE_CHOICE_LESSONID (state, lessonId) {
    state.lessonId = lessonId
  },

  /**
   * 更新 测试题
   * @param state
   * @param question
   * @constructor
     */
  UPDATE_CHOICE_QUESTION (state, question) {
    state.choiceQuestion = question
    state.totalNum = question.length
  },

  /**
   * index +1
   * @param state
   * @constructor
     */
  INCREASE_INDEX (state) {
    state.currIndex ++
  },

  /**
   * 重置 选择题store
   * @param state
   * @constructor
     */
  RESET_CHOICE (state) {
      state.lessonId = ''
      state.choiceQuestion = null
      state.report = {
        kpScore: [],
        rightNum: 0,
        totalNum: 0
      }
      state.totalNum = 0
      state.currIndex = 0
      state.currQuestion = null
  }
}

export default {
  state,
  mutations
}
