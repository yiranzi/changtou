/**
 * Created by zl on 2016/8/25.
 * 获取通知
 */

import {getWithinAuth} from '../../../frame/ajax'
import {getUrl} from '../../../frame/apiConfig'

/**
 * 获取通知数据
 * @param dispatch
 * @param strategy_notice
 */
export const getVipNotice = ({dispatch}) => {
  getNotice('VIP').then(
    function (res) {
      dispatch('NEWER_SCROLL_TEXT', res.message)   // not sure the res is a String OR Object
    }
  ).catch(
    function (err) {
      console.dir(err)
    }
  )
}

export const getProNotice = ({dispatch}) => {
   getNotice('PRO').then(
     function (res) {
       dispatch('NEWER_SCROLL_TEXT', res.message)   // not sure the res is a String OR Object
     }
   ).catch(
     function (err) {
       console.dir(err)
     }
   )
}

const getNotice = (type) => {
  let authority = type === 'VIP' ? 'vip' : 'prof'
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('strategy_notice').replace(':authority', authority)
        }
      ).then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
    })
}
