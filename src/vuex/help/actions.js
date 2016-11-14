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
export const loadQAList = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('help_load_QA_list')
      }).then(
        function (QAList) {
          dispatch('HELP_UPDATE_QA_LIST', QAList)
          resolve(QAList)
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
export const submitQuestion = ({ dispatch }, content) => {
  console.log('xxxx', content)
  return new Promise(
    (resolve, reject) => {
      postWithinAuth({
        url: getUrl('help_submit_question'),
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
        url: getUrl('help_load_QA_records')
      }).then(
        function (records) {
          dispatch('HELP_UPDATE_QA_RECORDS', records)
          resolve(records)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 重置
 * @param dispatch
 */
export const resetRecords = ({ dispatch }) => {
  return Promise.resolve().then(() => dispatch('HELP_UPDATE_QA_RECORDS', []))
}
