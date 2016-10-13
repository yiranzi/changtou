/**
 * Created by dongdong on 2016/10/8.
 */
import {getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
export const loadSpecTopic = ({ dispatch }, stpId) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('spec_topic').replace(':stpId', stpId)
      }).then(
        function (SpecTopic) {
          dispatch('LOAD_SPEC_TOPIC', SpecTopic)
          resolve(SpecTopic)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
