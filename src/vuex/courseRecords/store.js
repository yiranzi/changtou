/**
 * Created by jun on 2016/8/25.
 * 用户进度
 *
 *  付费进度
 *  关于records的数据格式[] :
 *    lessonSet: Object
      subjectId: 5
 *
 *  lessonSet的数据格式object :
 *    postponeType: "N"
      sequence: 32 //章节进度位于该课程的位置 从0开始
      branchSubjectIds: Array[0] //关联的分支课程
      isAssignmentSubmitted: "N" //作业是否提交
      graduated: "N" //课程状态
      awarded: "N" //是否已经抽奖
      finishDate: null
      likes: 0
      lessonIds: Array[7] //课程ids
      postponeCount: 0 //已经延期的次数
      resumeDate: null
      initDate: "2016-08-25 13:45:54"
      sort: "N" //
      startDate: "2016-08-25 13:45:57"
      subjectId: 5
      suspendDate: null
 *
 *  免费进度数据各式[]:
 *    count: 6
      currentLessonId: 3
      sequence: 2
      subjectId: 1
 *
 *
 */
const state = {
  freeRecords: [],
  expenseRecords: []
}

const mutations = {
  UPDATE_FREE_RECORDS (state, records) {
    state.freeRecords = records
  },

  /**
   * 更新所有课程进度
   * @param state
   * @param records
   * @constructor
     */
  UPDATE_EXPENSE_RECORDS_ALL (state, records) {
    // 设置当前进度seq(服务器传递的不准)
    records.forEach((record) => {
      //设置课程状态
      record.status = record.lessonSet.graduated
      // 设置当前进度seq(服务器传递的不准)
      record.sequence = record.lessonSet.lessonIds ? record.lessonSet.lessonIds.length : 1
      // 设置意否已经暂停过的标识
      record.isSuspendUsed = !!record.lessonSet.suspendDate
      // 设置是否已经使用过90天暂停期限的标识
      record.is90daysPostponeUsed = record.lessonSet.postponeType === 'Y'
      // 设置课程的学习时间
      record.accumulatedTime = record.lessonSet.finishDate ? parseInt((new Date(record.lessonSet.finishDate.replace(/-/g, '/')) - new Date(record.lessonSet.initDate.replace(/-/g, '/'))) / 1000 / 60) : 0
    })

    state.expenseRecords = records
  },

  /**
   * 更新单门课程进度
   * @param state
   * @param record
   * @constructor
     */
  UPDATE_EXPENSE_RECORD_ONE_SUBJECT (state, record) {
    // 设置课程状态
    record.status = record.lessonSet.graduated
    // 设置当前进度seq(服务器传递的不准)
    record.sequence = record.lessonSet.lessonIds ? record.lessonSet.lessonIds.length : 1
    // 设置意否已经暂停过的标识
    record.isSuspendUsed = !!record.lessonSet.suspendDate
    // 设置是否已经使用过90天暂停期限的标识
    record.is90daysPostponeUsed = record.lessonSet.postponeType === 'Y'

    const index = state.expenseRecords.findIndex((item) => {
      return item.subjectId === record.subjectId
    })

    if (index > -1) {
      state.expenseRecords.$set(index, record)
    } else {
      state.expenseRecords.push(record)
    }
  },

  /**
   * 删除 全部记录
   * @param state
   * @constructor
     */
  RESET_RECORDS (state) {
    state.freeRecords = []
    state.expenseRecords = []
  }
}

export default {
  state,
  mutations
}
