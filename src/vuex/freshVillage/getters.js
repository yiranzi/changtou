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
 * @returns {state.villageProgress|{charterNo, questionNo}|*}
 */
export const villageProgress = (state) => {
  return state.freshVillage.villageProgress
}
/*
* 记载未登陆前选择
* */
export const villageUnLoginRecord = (state) => {
  return state.freshVillage.unLoginOptionRecord
}
/**
 * 是否需要显示答题界面
 * @param state
 * @returns {*|boolean}
 */
export const shouldQuestionShow = (state) => {
  return state.freshVillage.shouldQuestionShow
}
