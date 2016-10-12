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
