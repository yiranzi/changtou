import {getWithinAuth, postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 提交问卷
 * @param dispatch
 * @returns {Promise}
 */
export const submitQuestionNaire = ({ dispatch }, answer, questionnaireId) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth(
        {
          url: getUrl('submit_question_naire'),
          data: {
            answer,
            questionnaireId
          }
        }
      ).then(
        () => {
          resolve()
        },
        err => {
          reject(err)
        }
      )
    })
}

/**
 * 是否提交过问卷
 * @param dispatch
 * @returns {Promise}
 */
export const issubmitQuestionNaire = ({ dispatch }, questionnaireId) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('is_questionnaire_submit').replace(':questionnaireId', questionnaireId)
        }
      ).then(
        (isSubmit) => {
          dispatch('UPDATE_MY_QUESTIONNAIRE', isSubmit)
          resolve(isSubmit)
        },
        (err) => {
          reject(err)
        }
      )
   })
}
