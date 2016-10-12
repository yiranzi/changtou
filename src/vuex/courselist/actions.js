/**
 * Created by zl on 2016/8/25.
 * 所有课程列表
 */

import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

export const loadCourseList = ({ dispatch }) => {
  //获取所有免费课程
  getWithoutAuth(
    {
      url: getUrl('freelist')
    }
  ).then(
    list => {
      dispatch('DISPLAY_UPDATE_FREE_LIST', list)
    },
    err => console.warn(err)
  )

  //获取所有付费课程
  getWithoutAuth(
    {
      url: getUrl('expenselist')
    }
  ).then(
    list => {
      dispatch('DISPLAY_UPDATE_EXPENCE_LIST', list)
    },
    err => console.warn(err)
  )
}
