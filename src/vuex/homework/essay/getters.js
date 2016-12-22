/**
 * Created by jun on 2016/10/26.
 */

  //作业类型
export const assignmentType = (state) => {
  return state.homeworkEssay.assignmentType
}

//作业题目
export const essayQuestion = (state) => {
  return state.homeworkEssay.essayQuestion
}

//作业 lessonId
export const essayLessonId = (state) => {
  return state.homeworkEssay.essayLessonId
}

// 用户答案
export const essayAnswer = (state) => {
  return state.homeworkEssay.essayAnswer
}
// 作业Id
export const articleId = (state) => {
  return state.homeworkEssay.articleId
}
// 作业提交时间
export const createTime = (state) => {
  return state.homeworkEssay.createTime
}
// 留言
export const remarkList = (state) => {
  return state.homeworkEssay.remarkList
}
// 分数
export const score = (state) => {
  return state.homeworkEssay.score
}
// 状态
export const status = (state) => {
  return state.homeworkEssay.status
}
