/**
 * Created by sunyiran on 2017/3/28.
 */
import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

//专题文章列表
export const loadTopicArticle = ({ dispatch }, topicId) => {
  return new Promise((resolve, reject) => {
      console.log('push ajax')
      getWithoutAuth(
        {
          url: getUrl('load_topic_article').replace(':topicId', topicId)
        }
      ).then(
        topic => {
          console.log('get ajax')
          dispatch('UPDATE_TOPIC_ARTICLE', topic)
          resolve(topic)
        }
      ).catch(
        err => {
          console.log('reject ajax')
          reject(err)
        }
      )
    }
  )
}

//文章内容
export const loadArticleContent = ({ dispatch }, articleId) => {
  return new Promise((resolve, reject) => {
      //获取专题文章
      console.log('push ajax2')
      getWithoutAuth(
        {
          url: getUrl('load_article_content').replace(':articleId', articleId)
        }
      ).then(
        article => {
          console.log('get ajax2')
          dispatch('UPDATE_ARTICLE_CONTENT', article)
          resolve(article)
        }
      ).catch(
        err => {
          console.log('reject ajax')
          reject(err)
        }
      )
    }
  )
}

