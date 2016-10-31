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
  answerRight: 0,
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
    state.lessonId = ''
    state.report = {
      kpScore: [],
      rightNum: 0,
      totalNum: 0
    }
    state.currIndex = 0
    state.answerRight = 0
    state.choiceQuestion = question
    state.totalNum = question.length
    state.currQuestion = question[0]
  },

  /**
   * 下一题
   * @param state
   * @constructor
     */
  NEXT_QUESTION (state) {
    state.currIndex ++
    state.currQuestion = state.choiceQuestion[state.currIndex]
  },

  /**
   * 答题正确
   * @param state
   * @constructor
     */
  UPDATE_ANSWER (state) {
    state.answerRight ++
  }
}

export default {
  state,
  mutations
}
