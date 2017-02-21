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
