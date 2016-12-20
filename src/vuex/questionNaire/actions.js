/**
 * Created by jun on 2016/9/2.
 */
import {getWithoutAuth, getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 提交问卷
 * @param dispatch
 * @returns {Promise}
 */
export const commitQuestionNaire = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('commit_question_naire')
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
export const isCommitQuestionNaire = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth(
        {
          url: getUrl('is_fillout_naire')
        }
      ).then(
        () => {
          resolve()
          //  dispatch('UPDATE_MY_COURSES', myCourses)
        },
        err => {
          reject(err)
        }
      )
    })
}
