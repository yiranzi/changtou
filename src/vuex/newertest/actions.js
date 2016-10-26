/**
 * Created by dongdong on 2016/10/19.
 */
import {getWithinAuth, getWithoutAuth, postWithinAuth, postWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
import store from '../../vuex/store'
let user = store.state.user

//加载问题
export const loadQuestion = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      const ajax = user.isLogin ? getWithinAuth : getWithoutAuth
      ajax({
        url: './static/newertest/questions.json'
      }).then(
        function (question) {
          dispatch('LOAD_QUESTION', question)
          resolve()
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
//上传测试报告
export const postReport = ({ dispatch }, comboId, level) => {
  return new Promise(
    (resolve, reject) => {
      const ajax = user.isLogin ? postWithinAuth : postWithoutAuth
      ajax({
        url: getUrl('newertest_report'),
        data: {
          comboId,
          level
        }
      }).then(
        function (report) {
          dispatch('LOAD_TEST_REPORT', report)
          resolve()
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

//获取测试结果
export const loadNewertestReport = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      const ajax = user.isLogin ? getWithinAuth : getWithoutAuth
      ajax({
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
