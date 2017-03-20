/**
 * Created by zyr on 2017.3.16
 * 造房子

import {getWithoutAuth, postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
 */

/**
 * 获取课程进度
 * @param dispatch
export const getCourseProgress = ({ dispatch }, subjectId) => {
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
        resolve(records)
      },
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}
 */
