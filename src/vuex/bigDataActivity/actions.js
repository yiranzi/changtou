/**
 * 大数据 个人信息
 */

import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取个人信息
 * @param dispatch
 */
export const loadFreeSubject = ({ dispatch }) => {
  return new Promise((resolve, reject) => {
    //获取免费课程
    getWithoutAuth(
      {
        url: getUrl('getPersonInfo/BigData')
      }
    ).then(
      personalInfo => {
        resolve()
      },
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}
