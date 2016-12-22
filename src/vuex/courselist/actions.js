/**
 * Created by zl on 2016/8/25.
 * 所有课程列表
 */

import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

export const loadCourseList = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      //获取所有课程列表
      getWithoutAuth(
        {
          url: getUrl('course_list')
        }
      ).then(
        list => {
          dispatch('DISPLAY_UPDATE_TOTAL_LIST', list)
          resolve(list)
        }
      ).catch(
        err => {
          reject(err)
        }
      )
    }
  )
}
