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
 * 设置lessonId
 * @param dispatch
 * @param lessonId
 */
export const setLessonId = ({dispatch}, lessonId) => {
  dispatch('UPDATE_CHOICE_LESSONID', lessonId)
}

/**
 * 记录答对
 * @param dispatch
 * @param answer
 */
export const updateAnswer = ({dispatch}, answer) => {
  dispatch('UPDATE_ANSWER', answer)
}

/**
 * 进入下一题
 * @param dispatch
 */
export const goToNextQuestion = ({dispatch}) => {
  dispatch('NEXT_QUESTION')
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
          url: getUrl('get_choice_knowledge_point')
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

/**
 * 重测
 * @param dispatch
 */
export const reTest = ({dispatch}) => {
  dispatch('CHOICE_RETEST')
}
