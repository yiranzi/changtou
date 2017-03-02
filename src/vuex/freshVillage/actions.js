/**
 * Created by zyr on 2017/3/2
 * 新增的理财新手村
 */
import {getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取新手村答题进度
 *
 */
export const getAnswerProgress = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('fresh_village_answer_record')
      }).then(
        function (message) {
          dispatch('FRESH_VILLAGE_ANSWER_PROGRESS', message)
          resolve(message)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
