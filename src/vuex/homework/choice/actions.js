/**
 * Created by jun on 2016/10/26.
 * 作业模块
 */
import {postWithinAuth, getWithinAuth} from '../../../frame/ajax'
import {getUrl} from '../../../frame/apiConfig'

/**
 * 设置选择题 题目
 * @param dispatch
 * @param choice
 */
export const setChoice = ({dispatch}, choice) => {
  dispatch('UPDATE_CHOICE_QUESTION', choice)
}

/**
 * 设置lessonId
 * @param dispatch
 * @param lessonId
 */
export const setLessonId = ({dispatch}, lessonId) => {
  dispatch('UPDATE_CHOICE_LESSONID', lessonId)
}

export const increaseIndex = ({dispatch}) => {
  dispatch('INCREASE_INDEX')
}

/**
 * 获取报告
 * @param dispatch
 * @param lessonId
 * @returns {Promise}
 */
export const getReport = ({dispatch}, lessonId) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('get_report').replace(':lessonId', lessonId)
        }
      ).then(
        report => {
          dispatch('UPDATE_CHOICE_REPORT', report)
          resolve(report)
        },
        err => {
          reject(err)
        }
      )
    }
  )
}

/**
 * 提交报告
 * @param dispatch
 * @param report
 * @returns {Promise}
 */
export const submitReport = ({dispatch}, report) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth(
        {
          url: getUrl('submit_report'),
          data: report
        }
      ).then(
        () => {
          resolve()
        },
        err => {
          reject(err)
        }
      )
    }
  )
}
