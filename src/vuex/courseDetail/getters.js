/**
 *  Created by zl on 2016/8/25.
 *  所有课程列表
 */

/**
 * 获取免费课程列表
 * @param state
 * @returns {string|Array|*}
 */
export const freeDetailArr = (state) => {
  return state.courseDetail.freeDetailArr
}

/**
 * 获取付费课程列表
 * @param state
 * @returns {Array|string|*}
 */
export const expenseDetailArr = (state) => {
  return state.courseDetail.expenseDetailArr
}
