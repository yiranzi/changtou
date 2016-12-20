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

export const getHomeworkList = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('homework_mine_list')
        }
      ).then(
        (homeworkList) => {
          const newHomeworkList = homeworkList.map(
            function (homeworkItem) {
              let item = Object.assign({}, homeworkItem)
              item.lessons.sort(
                function (former, latter) {
                  if (former.sequence < latter.sequence) {
                    return -1
                  } else if (former.sequence === latter.sequence) {
                    return 0
                  } else if (former.sequence > latter.sequence) {
                    return 1
                  }
                }
              )
              return item
            }
          )
          dispatch('UPDATE_MY_HOMEWORK_LIST', newHomeworkList)
          resolve(newHomeworkList)
        },
        err => reject(err)
      )
    }
  )
}
