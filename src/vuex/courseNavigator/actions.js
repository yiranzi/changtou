/**
 * Created by jun on 2016/8/23.
 */
import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

export const loadNavigatorDataInApp = ({ dispatch }) => {
  return new Promise(function (resolve, reject) {
    getWithoutAuth(
      {
        url: getUrl('homepage_app')
      }
    ).then(
      data => {
        dispatch('UPDATE_NAIGATOR_DATA', data)
        resolve()
      },
      err => {
        reject(err)
      }
    )
  })
}

export const loadNavigatorDataInWeb = ({ dispatch }) => {
  return new Promise(function (resolve, reject) {
    getWithoutAuth(
      {
        url: getUrl('homepage_msite')
      }
    ).then(
      data => {
        dispatch('UPDATE_NAIGATOR_DATA', data)
        resolve()
      },
      err => {
        reject(err)
      }
    )
  })
}

export const isInterviewChange = ({ dispatch }, interviewCount) => {
  return new Promise(function (resolve, reject) {
    getWithoutAuth(
      {
        url: getUrl('interview_valid_new').replace(':interviewCount', interviewCount)
      }
    ).then(
      data => {
        dispatch('UPDATE_NAIGATOR_DATA_INTERVIEW', data)
        resolve()
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 获取头条精选 数据
 * @param dispatch
 * @returns {Promise}
 */
export const getFirstChooseTxt = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth(
        {
          // url: getUrl('first_choose_txt')
          url: getUrl('interview_valid_new').replace(':interviewCount', 0)
        }
      ).then(
        res => {
          dispatch('UPDATE_NAIGATOR_FIRST_CHOOSE_TXT', res)
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
    })
}

