/**
 * Created by jun on 2016/10/26.
 * 作业模块
 */
import {getWithinAuth} from '../../../frame/ajax'
import {getUrl} from '../../../frame/apiConfig'
/**
 * 获取我的作业列表
 * @returns {Promise}
 */

export const getMyHomework = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('homework_mine_list')
        }
      ).then(
        (homeworkList) => {
          dispatch('UPDATE_MY_HOMEWORK_LIST', homeworkList)
          resolve(homeworkList)
        },
        err => reject(err)
      )
    }
  )
}
