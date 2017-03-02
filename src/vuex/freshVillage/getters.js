/**
 * Created by jun on 2017/1/24
 * 新手村
 */

/**
 * 吐槽内容列表
 * @param state
 * @returns {Array|*}
 */
export const adviseList = (state) => {
  return state.freshVillage.adviseList
}

/**
 * 新手村答题的进度
 * @param state
 * @returns {state.answerProgress|{charterNo, questionNo}|*}
 */
export const answerProgress = (state) => {
  return state.freshVillage.answerProgress
}
