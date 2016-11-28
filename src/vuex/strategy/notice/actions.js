/**
 * Created by zl on 2016/8/25.
 * 获取通知
 */

import {getWithinAuth} from '../../../frame/ajax'
import {getUrl} from '../../../frame/apiConfig'

/**
 * 获取通知数据 Vip版
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

/**
 *  获取通知数据 专业版
 * @param dispatch
 */
export const getProfessionalNotice = ({dispatch}) => {
   getNotice('PRO').then(
     function (res) {
       dispatch('NEWER_SCROLL_TEXT', res.message)
     }
   ).catch(
     function (err) {
       console.dir(err)
     }
   )
}

/**
 *  获取通知数据
 * @param type
 * @returns {Promise}
 */
const getNotice = (type) => {
  const authority = type === 'VIP' ? 'vip' : 'prof'
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
