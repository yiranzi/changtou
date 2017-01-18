/**
 * 大数据 用户年终报告
 */

import {getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取用户年终报告
 * @param dispatch
 */
export const getAnnualReport = ({ dispatch }) => {
  return new Promise((resolve, reject) => {
    getWithinAuth(
      {
        url: getUrl('user_annual_report')
      }
    ).then(
      annualReport => {
        dispatch('UPDATE_ANNUAL_REPORT', annualReport)
        resolve(annualReport)
      },
      err => {
        console.warn(err)
        reject(err)
      }
    )
  })
}
