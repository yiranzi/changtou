/**
 * Created by dongdong on 2016/10/31.
 */
import {getWithoutAuth, getWithinAuth, postWithinAuth} from '../../frame/ajax'
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

/**
 * 用户提交问题
 */
export const postSuggestion = ({ dispatch }, content) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth({
        url: getUrl('post_help_suggestion'),
        data: {
          content
        }
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

/**
 * 获取问答记录
 */
export const loadRecords = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('load_records')
      }).then(
        function (records) {
          dispatch('LOAD_RECORDS', records)
          resolve(records)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
