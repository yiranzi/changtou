/**
 * Created by dongdong on 2016/10/31.
 */

/**
 * 获取自助答疑列表
 * @param state
 * @returns {Array|*}
 * @constructor
 */
export const QAList = (state) => {
  return state.help.QAList
}

/**
 * 获取问答记录
 * @param state
 * @returns {*}
 */
export const records = (state) => {
  return state.help.records
}

/**
 * 获取新的(回复给用户的)答疑数量
 * @param state
 * @returns {number|*}
 */
export const newSuggestionNum = (state) => {
  return state.help.newSuggestionNum
}
