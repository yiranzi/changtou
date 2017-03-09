/**
 * Created by yuan on 2017.3.8
 * 应用更新
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
        url: getUrl('app_update')
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
