/**
 * Created by jun on 2016/10/26.
 * 作业模块
 */
import {postWithinAuth, getWithinAuth, deleteWithinAuth} from '../../../frame/ajax'
import {getUrl} from '../../../frame/apiConfig'
/**
 * 获取草稿箱内容
 * @returns {Promise}
 */
export const getDrafts = () => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('drafts_list')
        }
      ).then(
        draftsList => {
          resolve(draftsList)
        },
        err => reject(err)
      )
    }
  )
}

/**
 * 删除草稿
 * @param articleId
 * @returns {Promise}
 */
export const deleteDrafts = ({ dispatch }, articleId) => {
  return new Promise(
    (resolve, reject) => {
      deleteWithinAuth(
        {
          url: getUrl('delete_drafts').replace(':articleId', articleId)
        }
      ).then(
        isDelete => {
          resolve(isDelete)
        },
        err => reject(err)
      )
    }
  )
}

/**
 * 获取作业或草稿
 * @param lessonId
 * @returns {Promise}
 */
export const getArticle = ({ dispatch }, lessonId) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('get_article').replace(':lessonId', lessonId)
        }
      ).then(
        article => {
          resolve(article)
          dispatch('UPDATE_ESSAY_STATUS', article)
        },
        err => reject(err)
      )
    }
  )
}

/**
 * 提交作业或草稿
 * @param article
 * @returns {Promise}
 */
export const submitArticle = ({ dispatch }, article) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth(
        {
          url: getUrl('submit_article'),
          data: article
        }
      ).then(
        markInfo => {
          resolve(markInfo)
        },
        err => reject(err)
      )
    }
  )
}

/**
 * 设置 当前作业
 * @param dispatch
 * @param essay
 */
export const setEssay = ({ dispatch }, essay) => {
  dispatch('UPDATE_ESSAY', essay)
}

/**
 * 设置 当前作业 题目
 * @param dispatch
 * @param question
 */
export const setEssayQuestion = ({ dispatch }, question) => {
  dispatch('UPDATE_ESSAY_QUESTION', question)
}

/**
 * 设置 当前作业 lessonId
 * @param dispatch
 * @param lessonId
 */
export const setEssayLessonId = ({ dispatch }, lessonId) => {
  dispatch('UPDATE_ESSAY_LESSONID', lessonId)
}

/**
 * 设置 草稿
 * @param dispatch
 * @param draft
 */
export const setEssayDraft = ({ dispatch }, draft) => {
  dispatch('UPDATE_ESSAY_DRAFT', draft)
}
