/**
 *  Created by zl on 2016/8/25.
 *  所有课程列表
 */

/**
 * 获取免费课程列表
 * @param state
 * @returns {string|Array|*}
 */
export const freelist = (state) => {
  return state.courselist.freelist
}

/**
 * 获取付费课程列表
 * @param state
 * @returns {Array|string|*}
 */
export const expenselist = (state) => {
  return state.courselist.expenselist
}

/**
 *
 * @param state
 * @param freeFirst 免费课是否优先
 * @returns {Array.<T>|string}
 */
export const alllist = (state, freeFirst) => {
  return freeFirst ? state.courselist.freelist.concat(state.courselist.expenselist) : state.courselist.expenselist.concat(state.courselist.freelist)
}
