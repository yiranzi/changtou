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
export const getHeadLineTitle = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth(
        {
          url: getUrl('headline_txt')
        }
      ).then(
        res => {
          dispatch('UPDATE_NAIGATOR_HEAD_LINE_TXT', res)
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
    })
}

/**
 * 获取栏目更新内容
 */
export const getColumnChange = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      console.log('push ajax')
      getWithoutAuth(
        {
          url: getUrl('headline_txt')
          // url: getUrl('column_change')
        }
      ).then(
        res => {
          console.log('receive ajax')
          dispatch('UPDATE_NAIGATOR_COLUMN_CHANGE', res)
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
    })
}

