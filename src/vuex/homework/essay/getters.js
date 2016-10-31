/**
 * Created by jun on 2016/10/26.
 */

  //作业类型
export const essayType = (state) => {
  return state.essay.essayType
}

//作业题目
export const essayQuestion = (state) => {
  return state.essay.essayQuestion
}

//作业 lessonId
export const essayLessonId = (state) => {
  return state.essay.essayLessonId
}

// 用户答案
export const essayAnswer = (state) => {
  return state.essay.essayAnswer
}
// 作业Id
export const articleId = (state) => {
  return state.essay.articleId
}
// 作业提交时间
export const createTime = (state) => {
  return state.essay.createTime
}
// 留言
export const remarkList = (state) => {
  return state.essay.remarkList
}
// 分数
export const score = (state) => {
  return state.essay.score
}
// 状态
export const status = (state) => {
  return state.essay.status
}
