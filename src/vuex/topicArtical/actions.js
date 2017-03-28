/**
 * Created by Administrator on 2017/3/28.
 */
import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

export const loadTopicArtical = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      //获取专题文章
      console.log('push ajax')
      getWithoutAuth(
        {
          url: getUrl('course_list')
        }
      ).then(
        topic => {
          console.log('get ajax')
          dispatch('UPDATE_Topic_Artical', topic)
          resolve(topic)
        }
      ).catch(
        err => {
          reject(err)
        }
      )
    }
  )
}
