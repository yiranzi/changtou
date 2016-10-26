/**
 * Created by jun on 2016/10/26.
 * 作业模块
 */
import {postWithinAuth, getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
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
export const deleteDrafts = (articleId) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth(//todo delete
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
export const getArticle = (lessonId) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('drafts_list').replace(':lessonId', lessonId)
        }
      ).then(
        article => {
          resolve(article)
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
export const postArticle = (article) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('post_article'),
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
