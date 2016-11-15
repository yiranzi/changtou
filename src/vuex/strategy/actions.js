/**
 * Created by jun on 2016/11/14.
 */
import {getWithoutAuth, getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取专业版介绍
 * @param dispatch
 * @returns {Promise}
 */
export const getProfessionalIntro = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth(
        {
          url: getUrl('strategy_professional_intro')
        }
      ).then(
        professionalIntro => {
          dispatch('STRATEGY_UPDATE_PROFESSIONAL_INTRO', professionalIntro)
          resolve(professionalIntro)
        },
        err => {
          reject(err)
        }
      )
    })
}

/**
 * 获取VIP介绍
 * @param dispatch
 * @returns {Promise}
 */
export const getVipIntro = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth(
        {
          url: getUrl('strategy_vip_intro')
        }
      ).then(
        vipIntro => {
          dispatch('STRATEGY_UPDATE_PROFESSIONAL_INTRO', vipIntro)
          resolve(vipIntro)
        },
        err => {
          reject(err)
        }
      )
    })
}

/**
 * 获取专业版 数据
 * @param dispatch
 * @returns {Promise}
 */
export const getProfessionalProduct = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('strategy_professional_data')
        }
      ).then(
        professionalProduct => {
          dispatch('STRATEGY_UPDATE_PROFESSIONAL_INTRO', professionalProduct)
          resolve(professionalProduct)
        },
        err => {
          reject(err)
        }
      )
    })
}

/**
 * 获取vip版 数据
 * @param dispatch
 * @returns {Promise}
 */
export const getVipProduct = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('strategy_vip_data')
        }
      ).then(
        vipProduct => {
          dispatch('STRATEGY_UPDATE_PROFESSIONAL_INTRO', vipProduct)
          resolve(vipProduct)
        },
        err => {
          reject(err)
        }
      )
    })
}
