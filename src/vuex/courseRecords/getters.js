/**
 * Created by zl on 2016/8/27.
 * 课程进度的getter
 *
 */

/**
 *  获取付费课进度
  * @param state
 * @returns {Array|string|*}
 */
export const expenseRecords = (state) => {
  return state.courseRecords.expenseRecords
}

/**
 *  获取免费课进度
  * @param state
 * @returns {Array|string|*}
 */
export const freeRecords = (state) => {
  return state.courseRecords.freeRecords
}

/**
 * 获取所有可用(可以购买)的选修课列表
 * @param state
 */
export const vaiildBranchSubjects = state => {
  return state.courseRecords.expenseRecords.reduce((preRecord, currRecord) => {
    return preRecord.lessonSet.branchSubjects.concat(currRecord.lessonSet.branchSubjects)
  }, [])
}
