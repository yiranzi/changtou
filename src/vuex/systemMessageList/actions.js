/**
 * Created by dongdong on 2016/9/29.
 */
import {getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

export const loadMessageList = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('load_person_list')
      }).then(
        function (response) {
          dispatch('UPDATE_MESSAGE_LIST', response)
          dispatch('USER_EMPTY_NEW_MESSAGE_NUM')
          resolve(response)
        },
        function () {
          reject()
        }
      )
    }
  )
}
