/**
 * Created by zyr on 2017.3.8
 * 版本信息
 */

import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 应用更新
 * @param dispatch
 */
export const getAppUpdate = ({ dispatch }) => {
  return new Promise((resolve, reject) => {
    getWithoutAuth({
        url: getUrl('app_update_content')
      }).then(
      function (data) {
        dispatch('APP_UPDATE_CONTENT', data)
        resolve(data)
      },
      err => {
        reject(err)
      }
    )
  })
}
