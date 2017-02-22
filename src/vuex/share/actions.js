/**
 * Created by jun on 2017/02/22.
 */

import {postFileWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 上传文件到服务器
 * @param dispatch
 * @param file
 * @returns {Promise}
 */
export const uploadFile = ({ dispatch }, file) => {
  return new Promise(
    (resolve, reject) => {
      postFileWithinAuth({
        url: getUrl('upload_file'),
        data: {
          file
        }
      }).then(
        function (url) {
          resolve(url)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

