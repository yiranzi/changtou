/**
 * Created by jun on 2016/10/26.
 * 作业模块
 */
import {postWithinAuth, getWithinAuth, getWithoutAuth} from '../../../frame/ajax'
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
          url: getUrl('homework_get_report').replace(':lessonId', lessonId)
        }
      ).then(
        report => {
          dispatch('UPDATE_CHOICE_LESSONID', lessonId)
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
 * 更新 报告
 * @param dispatch
 * @param report
 */
export const updateReport = ({dispatch}, report) => {
  dispatch('UPDATE_CHOICE_REPORT', report)
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
          url: getUrl('homework_submit_report'),
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

/**
 * 获取知识点对应关系
 * @param dispatch
 * @returns {Promise}
 */
export const getKnowledgePointMap = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth(
        {
          url: getUrl('homework_get_choice_knowledge_point')
        }
      ).then(
        knowledgeMap => {
          dispatch('UPDATE_KNOWLEDGE_MAP', knowledgeMap)
          resolve(knowledgeMap)
        },
        err => {
          reject(err)
        }
      )
    }
  )
}

