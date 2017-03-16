/**
 * Created by zl on 2016/8/25.
 */
// 获取专题信息
export const banners = (state) => {
  return state.navigator.banners
}

//付费课程列表
export const expenseCourseList = (state) => {
  return state.navigator.expenseCourseList
}

//免费课程列表
export const freeCourseList = (state) => {
  return state.navigator.freeCourseList
}

// 推荐课程
export const recommends = (state) => {
   return state.navigator.recommends
}

// 大咖读经典，专辑简介
export const readingClassics = (state) => {
  return state.navigator.readingClassics
}

// 院生故事新消息
export const hasNewInterview = (state) => {
  return state.navigator.hasNewInterview
}

//获得头条精选信息
export const headLineTitle = (state) => {
  return state.navigator.headLineTitle
}

//获得栏目变更信息
export const columnChangeData = (state) => {
  return state.navigator.columnChangeData
}
