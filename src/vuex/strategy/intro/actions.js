/**
 * Created by jun on 2016/11/14.
 */
import {getWithoutAuth} from '../../../frame/ajax'
import {getUrl} from '../../../frame/apiConfig'

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
          //简介
          professionalIntro.intro = professionalIntro.intro.split('#')
          //策略选择
          for (let i = 0, length = professionalIntro.strategyOptions.length; i < length; i++) {
            professionalIntro.strategyOptions[i].labels = professionalIntro.strategyOptions[i].labels.split('#')
            professionalIntro.strategyOptions[i].intro = professionalIntro.strategyOptions[i].intro.replace(/#/g, '#●').split('#')
          }
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
          //简介
          vipIntro.intro = vipIntro.intro.split('#')
          //王牌策略
          vipIntro.featuredStrategy.labels = vipIntro.featuredStrategy.labels.split('#')
          vipIntro.featuredStrategy.intro = vipIntro.featuredStrategy.intro.replace(/#/g, '#●').split('#')
          vipIntro.featuredStrategy.related.push({
            type: 'FAQ',
            itemName: '多因子策略使用FAQ'
          })
          vipIntro.featuredStrategy = {
            product: [vipIntro.featuredStrategy],
            strategyBenefit: vipIntro.featuredStrategy.strategyBenefit,
            csi300Benefit: vipIntro.featuredStrategy.csi300Benefit,
            historicProfitsUrl: vipIntro.featuredStrategy.historicProfitsUrl
          }

          //策略升级
          for (let i = 0, length = vipIntro.strategyOptions.length; i < length; i++) {
            vipIntro.strategyOptions[i].labels = null
            vipIntro.strategyOptions[i].intro = null
            vipIntro.strategyOptions[i].related = null
          }
          dispatch('STRATEGY_UPDATE_VIP_INTRO', vipIntro)
          resolve(vipIntro)
        },
        err => {
          reject(err)
        }
      )
    })
}
