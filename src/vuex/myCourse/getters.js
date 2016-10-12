/**
 * Created by jun on 2016/9/2.
 * 我的课程
 */

/**
 * 获取 推荐信息
 * @param state
 * @returns {string}
 */
export const information = (state) => {
  return state.myCourses.information
}

/**
 * 获取 我的课程列表
 * @param state
 * @returns {string}
 */
export const myCourses = (state) => {
  return state.myCourses.myCourses
}
