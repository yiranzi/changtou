/**
 * Created by zl on 2016/8/25.
 * 所有课程列表
 */

import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取免费课程简介
 * @param dispatch
 * @param subjectId
 */
export const loadFreeSubject = ({ dispatch }, subjectId) => {
  return new Promise((resolve, reject) => {
    //获取所有免费课程
    getWithoutAuth(
      {
        url: getUrl('free_subject_specific').replace(':subjectId', subjectId)
      }
    ).then(
      subject => {
        dispatch('DETAIL_UPDATE_FREE_SUBJECT', {subjectId, subject})
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
 * 获取付费课程简介
 * @param dispatch
 * @param subjectId
 */
export const loadExpenseSubject = ({ dispatch }, subjectId) => {
  return new Promise((resolve, reject) => {
    //获取所有免费课程
    getWithoutAuth(
      {
        url: getUrl('expense_subject_specific').replace(':subjectId', subjectId)
      }
    ).then(
      subject => {
        dispatch('DETAIL_UPDATE_EXPENSE_SUBJECT', {subjectId, subject})
        resolve()
      },
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}
