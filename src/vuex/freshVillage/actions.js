/**
 * Created by jun on 2017/3/1
 */
import {getWithoutAuth, postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取吐槽内容列表
 * @param dispatch
 * @param index
 * @param size
 * @returns {Promise}
 */
export const getAdvise = ({ dispatch }, index, size) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('get_advise').replace(':index', index).replace(':size', size)
      }).then(
        function (advise) {
          dispatch('LOAD_VILLAGE_ADVISE', advise)
          resolve(advise)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 提交吐槽
 * @param dispatch
 * @param advise
 * @returns {Promise}
 */
export const submitAdvise = ({ dispatch }, advise) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth({
        url: getUrl('submit_advise'),
        data: advise
      }).then(
        function () {
          resolve()
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
