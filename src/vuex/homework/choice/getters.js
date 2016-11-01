/**
 * Created by jun on 2016/10/26.
 */

//当前的题目
export const currQuestion = (state) => {
  return state.choice.currQuestion
}
// lessonId
export const lessonId = (state) => {
  return state.choice.lessonId
}

// 测试 报告
export const report = (state) => {
  return state.choice.showedReport
}

//当前题号
export const currIndex = (state) => {
  return state.choice.currIndex
}

//总题数
export const totalNum = (state) => {
  return state.choice.totalNum
}

// 提交服务器 的报告
export const postReport = (state) => {
  return state.choice.postReport
}
