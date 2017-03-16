/**
 *  Created by zl on 2016/8/25.
 *  所有课程列表
 */

/**
 * 获取课程列表
 * @param state
 * @returns {string|Array|*}
 */
export const courseList = (state) => {
  return state.courselist.totalList
}

//获得课程分类列表
export const courseClassification = (state) => {
  return state.courselist.courseClassification
}
