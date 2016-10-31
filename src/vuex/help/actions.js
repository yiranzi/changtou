/**
 * Created by dongdong on 2016/10/31.
 */
import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取自助答疑列表
 * @param dispatch
 * @returns {Promise}
 */
export const loadSelfHelpList = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('load_common_qanda')
      }).then(
        function (helpList) {
          dispatch('HELP_SELF_LIST', helpList)
          resolve(helpList)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
