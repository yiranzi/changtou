/**
 * Created by jun on 2016/10/26.
 */

// lessonId
export const lessonId = (state) => {
  return state.homeworkChoice.lessonId
}

// 测试 报告
export const report = (state) => {
  return state.homeworkChoice.report
}

// 选择题数组
export const choiceQuestionArr = (state) => {
  return state.homeworkChoice.choiceQuestion
}

// 知识点对应关系
export const knowledgeMap = (state) => {
  return state.homeworkChoice.knowledgeMap
}
