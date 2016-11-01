/**
 * Created by jun on 2016/10/26.
 */
const state = {
  lessonId: '', //
  choiceQuestion: null, // 选择题数组
  knowledgeMap: null, // 选择题知识点 对应关系
  totalNum: 0, //总题数
  rightNum: 0, //答对的题数
  currIndex: 0, //当前题号
  currQuestion: null, //当前的题目
  postReport: { // 发送服务器的 测试报告
    kpScore: [],  //知识点得分
    rightNum: 0,  //答对题数
    totalNum: 0 //总题数
  },
  calReport: { // 计算中 报告数据
    idArr: [],
    countArr: [],
    rightNumArr: [],
    contentArr: []
  },
  showedReport: {
    score: 0,
    kpScore: [],
    defeatNum: 0,
    totalNum: 0,
    rightNum: 0
  }
}

const mutations = {
  /**
   * 更新 测试报告
   * @param state
   * @param report
   * @constructor
     */
  UPDATE_CHOICE_REPORT (state, report) {
    if (report.kpScore) {
      const score = parseInt(report.rightNum / report.totalNum * 10)
      const kpScoreArr = []

      for (var i = 0, length = report.kpScore.length; i < length; i++) {
        kpScoreArr.push({
          kpId: report.kpScore[i].kpId,
          content: state.knowledgeMap[report.kpScore[i].kpId],
          score: report.kpScore[i].score * 0.5
        })
      }

      let defeatNum = 0

      if (score < 6) {
        defeatNum = 0
      } else if (score <= 8) {
        defeatNum = 70 + parseInt(Math.random() * 10)
      } else if (score <= 9) {
        defeatNum = 80 + parseInt(Math.random() * 10)
      } else if (score <= 10) {
        defeatNum = 90 + parseInt(Math.random() * 10)
      }

      state.showedReport = {
        score: score * 0.5,
        kpScore: kpScoreArr,
        defeatNum: defeatNum,
        totalNum: report.totalNum,
        rightNum: report.rightNum
      }
    }
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
    state.rightNum = 0
    state.currIndex = 0
    state.currQuestion = question[0]

    state.postReport = {
      kpScore: [],
      rightNum: 0,
      totalNum: 0
    }

    state.calReport = {
      idArr: [],
      countArr: [],
      rightNumArr: [],
      contentArr: []
    }

    for (let i = 0, length = question.length; i < length; i++) {
      const index = state.calReport.idArr.indexOf(question[i].kpId)
      if (index < 0) {
        state.calReport.idArr.push(question[i].kpId)
        state.calReport.countArr.push(1)
        state.calReport.rightNumArr.push(0)
        state.calReport.contentArr.push(state.knowledgeMap[question[i].kpId])
      } else {
        state.calReport.countArr[index] ++
      }
    }

    state.showedReport = {
      score: 0,
      kpScore: [],
      defeatNum: 0,
      totalNum: 0,
      rightNum: 0
    }
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
   * 答题
   * @param state
   * @constructor
     */
  UPDATE_ANSWER (state, answer) {
    if (answer) {
      //答对
      let index = state.calReport.idArr.indexOf(state.currQuestion.kpId)
      state.calReport.rightNumArr[index] ++
      state.rightNum ++
    }

    if (state.currIndex === state.totalNum - 1) {
      // 最后一题 计算报告
      const calReport = state.calReport
      const showedReportKpScore = []
      const postReportKpScore = []

      for (var i = 0, length = calReport.idArr.length; i < length; i++) {
        showedReportKpScore.push({
          kpId: calReport.idArr[i],
          content: calReport.contentArr[i],
          score: parseInt(calReport.rightNumArr[i] / calReport.countArr[i] * 10) * 0.5
        })
        postReportKpScore.push({
          kpId: calReport.idArr[i],
          score: parseInt(calReport.rightNumArr[i] / calReport.countArr[i] * 10)
        })
      }

      const score = parseInt(state.rightNum / state.totalNum * 10)
      let defeatNum = 0

      if (score < 6) {
        defeatNum = 0
      } else if (score <= 8) {
        defeatNum = 70 + parseInt(Math.random() * 10)
      } else if (score <= 9) {
        defeatNum = 80 + parseInt(Math.random() * 10)
      } else if (score <= 10) {
        defeatNum = 90 + parseInt(Math.random() * 10)
      }

      state.showedReport = {
        score: score * 0.5,
        kpScore: showedReportKpScore,
        defeatNum: defeatNum,
        totalNum: state.totalNum,
        rightNum: state.rightNum
      }

      if (score >= 6) {
        state.postReport = {
          kpScore: postReportKpScore,
          lessonId: state.lessonId,
          rightNum: state.rightNum
        }
      }
    }
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
  },

  /**
   * 重置store
   * @param state
   * @constructor
     */
  CHOICE_RETEST (state) {
    state.rightNum = 0
    state.currIndex = 0
    state.currQuestion = state.choiceQuestion[0]
    state.postReport = {
      kpScore: [],
      rightNum: 0,
      totalNum: 0
    }
    state.calReport.rightNumArr.fill(0)
    state.showedReport = {
      score: 0,
      kpScore: [],
      defeatNum: 0,
      totalNum: 0,
      rightNum: 0
    }
  }
}

export default {
  state,
  mutations
}
