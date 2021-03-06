/**
 * Created by jun on 2016/9/2.
 */
import {getWithoutAuth, getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 下载 用户 我的课程信息
 * @param dispatch
 * @returns {Promise}
 */
export const loadUserCourses = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('my_course')
        }
      ).then(
        myCourses => {
          resolve(myCourses)
          dispatch('UPDATE_MY_COURSES', myCourses)
        },
        err => {
          reject(err)
        }
      )
    })
}

/**
 * 下载 默认 我的课程信息
 * @param dispatch
 * @returns {Promise}
 */
export const loadDefaultCourses = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth(
        {
          url: getUrl('my_course')
        }
      ).then(
        myCourses => {
          resolve(myCourses)
          dispatch('UPDATE_MY_COURSES', myCourses)
        },
        err => {
          reject(err)
        }
      )
    })
}

/**
 * 下载累积学习时间
 * @param dispatch
 * @returns {Promise}
 */
export const loadAccumulateTime = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('my_accumulate_time')
        }
      ).then(
        accumulateTime => {
          resolve(accumulateTime)
          dispatch('UPDATE_ACCUMULATE_TIME', accumulateTime)
        },
        err => {
          reject(err)
        }
      )
    }
  )
}
