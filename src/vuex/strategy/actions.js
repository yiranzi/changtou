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

/**
 * 对小于10的数字补全
 * 返回string
 */
const paddLittleNum = (num) => {
  if (typeof num === 'number' && num < 10 && num > -1) {
    return '0' + num
  } else {
    return num
  }
}

/**
 * 整理 策略产品 数据
 * @param product
 * @returns {*}
 */
const arrangeProduct = (product) => {
  // 多因子
  if (product.duoYinZi) {
    product.duoYinZi.tips = product.duoYinZi.tips.split('#')
  }

  //指数宝
  if (product.zhiShuBao) {
    product.zhiShuBao.tips = product.zhiShuBao.tips.split('#')

    /**
     * 如果推荐日志为今天，加上new标志
     */

    var now = new Date()
    var date = now.getFullYear() + '-' + paddLittleNum(now.getMonth() + 1) + '-' + paddLittleNum(now.getDate())
    product.zhiShuBao.recommondMajor.isNew = product.zhiShuBao.recommondMajor.recommondDate === date
    product.zhiShuBao.recommondMinor.isNew = product.zhiShuBao.recommondMinor.recommondDate === date

    /**
     * 重仓，轻仓的两只标的一致， 合并
     */
    if (product.zhiShuBao.recommondMajor.code === product.zhiShuBao.recommondMinor.code) {
      product.zhiShuBao.recommondMajor.ratio = '100%'
      product.zhiShuBao.recommondMinor = null
    }
  }

  //定投宝
  if (product.dingTouBao) {
    product.dingTouBao.tips = product.dingTouBao.tips.split('#')

    product.dingTouBao.lowFundsList = product.dingTouBao.indexFundsList.filter(function (element, index, array) {
      return element.status === '低估'
    })
    product.dingTouBao.isLowFundsListShow = product.dingTouBao.lowFundsList.length !== 0

    product.dingTouBao.middleFundsList = product.dingTouBao.indexFundsList.filter(function (element, index, array) {
      return element.status === '正常'
    })
    product.dingTouBao.isMiddleFundsListShow = product.dingTouBao.middleFundsList.length !== 0

    product.dingTouBao.highFundsList = product.dingTouBao.indexFundsList.filter(function (element, index, array) {
      return element.status === '高估'
    })
    product.dingTouBao.isHighFundsListShow = product.dingTouBao.highFundsList.length !== 0
  }

  //分级宝
  if (product.fenJiBao) {
    var isShowTip = product.fenJiBao.recommondList.length === 0
    product.fenJiBao.isShowTip = isShowTip
  }

  return product
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
          const product = arrangeProduct(vipProduct)
          dispatch('STRATEGY_UPDATE_VIP_PRODUCT', product)
          resolve(vipProduct)
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
          const product = arrangeProduct(professionalProduct)
          dispatch('STRATEGY_UPDATE_PROFESSIONAL_PRODUCT', product)
          resolve(professionalProduct)
        },
        err => {
          reject(err)
        }
      )
    })
}
