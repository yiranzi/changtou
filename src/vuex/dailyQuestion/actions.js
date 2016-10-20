/**
 * Created by dongdong on 2016/10/14.
 */
import {getWithinAuth, getWithoutAuth, postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
import store from '../../vuex/store'
const user = store.state.user
/**
 * 获取每日一题
 */
export const loadDailyQuestion = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      const ajax = user.isLogin ? getWithinAuth : getWithoutAuth
      ajax({
        url: getUrl('load_daily_question')
      }).then(
        function (dailyQuestion) {
          dispatch('LOAD_DAILY_QUESTION', dailyQuestion)
          resolve(dailyQuestion)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
/**
 * 用户提交答案
 */
export const submitAnswer = ({ dispatch }, questionid, selectedOption) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth({
        url: getUrl('submit_answer'),
        data: {
          questionid,
          selectedOption
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

