/**
 * Created by jun on 2016/10/26.
 */
const state = {
  lessonId: '', //
  choiceQuestion: null, // 选择题数组
  knowledgeMap: null, // 选择题知识点 对应关系
  report: { // 发送服务器的 测试报告
    kpScore: [],  //知识点得分
    rightNum: 0,  //答对题数
    totalNum: 0 //总题数
  }
}

const mutations = {
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
   * 更新 测试报告
   * @param state
   * @param report
   * @constructor
     */
  UPDATE_CHOICE_REPORT (state, report) {
    state.report.kpScore = report.kpScore
    state.report.rightNum = report.rightNum
    state.report.totalNum = state.choiceQuestion.length
  },

  /**
   * 更新 测试题
   * @param state
   * @param question
   * @constructor
     */
  UPDATE_CHOICE_QUESTION (state, question) {
    state.choiceQuestion = question
  },

  /**
   * 更新 知识点 对应关系
   * @param state
   * @param map
   * @constructor
     */
  UPDATE_KNOWLEDGE_MAP (state, map) {
    let tempMap = {}
    for (let i = 0, length = map.length; i < length; i++) {
      tempMap[map[i].kpId] = map[i].content
    }
    state.knowledgeMap = tempMap
  }
}

export default {
  state,
  mutations
}
