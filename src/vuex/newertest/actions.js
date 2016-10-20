/**
 * Created by dongdong on 2016/10/19.
 */
import {getWithinAuth, getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
import store from '../../vuex/store'
let user = store.state.user

//加载问题
export const loadQuestion = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      let ajax = user.isLogin ? getWithinAuth : getWithoutAuth
      ajax({
        url: './static/newertest/questions.json'
      }).then(
        function (question) {
          dispatch('LOAD_QUESTION', question)
          resolve(question)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

//获取用户结果
export const loadNewertestReport = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('newertest_report')
      }).then(
        function (newertestReport) {
          dispatch('LOAD_NEWERTEST_REPORT', newertestReport)
          resolve(newertestReport)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
