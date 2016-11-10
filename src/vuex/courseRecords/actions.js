/**
 * Created by jun on 2016/8/23.
 */
import {postWithinAuth, putWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取所有付费进度的课程进度
 * @param dispatch
 */
export const loadAllExpenseRecords = ({ dispatch }) => {
  return new Promise((resolve, reject) => {
    postWithinAuth(
      {
        url: getUrl('expense_records'),
        data: {
          subjectId: -1
        }
      }
    ).then(
      records => {
        dispatch('UPDATE_EXPENSE_RECORDS_ALL', records)
        resolve()
      },
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}

/**
 * 获取单门付费进度的课程进度
 * @param dispatch
 * @param subjectId 课程Id (默认-1获取所有课程进度)
 */
export const loadOneSubjectExpenseRecord = ({ dispatch }, subjectId) => {
  return new Promise((resolve, reject) => {
    postWithinAuth(
      {
        url: getUrl('expense_records'),
        data: {
          subjectId
        }
      }
    ).then(
      records => {
        if (records.length) {
          dispatch('UPDATE_EXPENSE_RECORD_ONE_SUBJECT', records[0])
        }
        resolve()
      },
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}

/**
 * 获取免费进度的课程进度
 * @param dispatch
 */
export const loadAllFreeRecords = ({ dispatch }) => {
  return new Promise((resolve, reject) => {
    postWithinAuth(
      {
        url: getUrl('free_records'),
        data: {
          subjectId: -1
        }
      }
    ).then(
      records => {
        dispatch('UPDATE_FREE_RECORDS', records)
        resolve()
      },
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}

/**
 * 获取单门免费进度的课程进度
 * @param dispatch
 * @param subjectId 课程Id (默认-1获取所有课程进度)
 */
export const loadOneSubjectFreeRecord = ({ dispatch }, subjectId) => {
  return new Promise((resolve, reject) => {
    postWithinAuth(
      {
        url: getUrl('free_records'),
        data: {
          subjectId
        }
      }
    ).then(
      records => {
        dispatch('UPDATE_FREE_RECORDS', records)
        resolve()
      },
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}

/**
 * 激活课程
 * @param dispatch
 * @param subjectId
 */
export const activeSubject = ({ dispatch }, subjectId) => {
  return new Promise((resolve, reject) => {
    putWithinAuth(
      {
        url: getUrl('active_subject').replace(':subjectId', subjectId)
      }
    ).then(
      ({message}) => {
        if (message === 'SUCCESS') {
          //成功
          resolve()
        } else {
          //失败
          reject('激活失败, 稍后再试')
        }
      },
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}

/**
 * 暂停课程
 * @param dispatch
 * @param subjectId
 */
export const suspendSubject = ({ dispatch }, subjectId) => {
  return new Promise((resolve, reject) => {
    postWithinAuth(
      {
        url: getUrl('suspend_subject'),
        data: {
          subjectId
        }
      }
    ).then(
      (success) => {
        if (success) {
          //成功
          resolve()
        } else {
          //失败
          reject('暂停课程失败,稍事休息,一会再试!')
        }
      },
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}

/**
 * 暂停后开启课程
 * @param dispatch
 * @param subjectId
 */
export const resumeSubject = ({ dispatch }, subjectId) => {
  return new Promise((resolve, reject) => {
    postWithinAuth(
      {
        url: getUrl('resume_subject'),
        data: {
          subjectId
        }
      }
    ).then(
      (success) => {
        if (success) {
          //成功
          resolve()
        } else {
          //失败
          reject('开启课程失败,一会再试!')
        }
      },
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}

/**
 * 参加免费课程
 * @param dispatch
 * @param subjectId
 */
export const joinSubject = ({ dispatch }, subjectId) => {
  return new Promise((resolve, reject) => {
    postWithinAuth(
      {
        url: getUrl('join_subject'),
        data: {
          subjectId
        }
      }
    ).then(
      (success) => {
        if (success) {
          //成功
          resolve()
        } else {
          //失败
          reject('参加课程失败,一会再试!')
        }
      },
      err => {
        console.warn(err)
        reject(err.Msg)
      }
    )
  })
}

/**
 * 更新免费课程进度
 * @param dispatch
 * @param lessonId 课程章节标识
 * @param prevLessonId 前一个课程标识
 * @returns {Promise}
 */
export const updateSubjectRecord = ({ dispatch }, {lessonId, prevLessonId}) => {
  return new Promise((resolve, reject) => {
    postWithinAuth(
      {
        url: getUrl('update_free_subject_record'),
        data: {
          lessonId,
          prevLessonId
        }
      }
    ).then(
      (success) => {
        if (success) {
          //成功
          resolve()
        } else {
          //失败
          reject('参加课程失败,一会再试!')
        }
      },
      err => {
        console.warn(err)
        reject(err.Msg)
      }
    )
  })
}

/**
 * 延期课程
 * @param dispatch
 * @param subjectId
 */
/*export const postponeSubject = ({ dispatch }, subjectId) => {
  //todo
}*/

/**
 * 购买课程
 * @param dispatch
 * @param subjectId
 */
//export const buySubject = ({ dispatch }, subjectId) => {
//  //todo
//}

/**
 * 清空课程进度
 * @param dispatch
 */
export const resetRecords = ({ dispatch }) => {
  dispatch('RESET_RECORDS')
}
