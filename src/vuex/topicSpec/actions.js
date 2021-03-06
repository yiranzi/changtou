/**
 * Created by dongdong on 2016/10/8.
 */
import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
export const loadSpecTopic = ({ dispatch }, stpId) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('spec_topic').replace(':stpId', stpId)
      }).then(
        function (specTopic) {
          dispatch('LOAD_SPEC_TOPIC', specTopic)
          resolve(specTopic)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
