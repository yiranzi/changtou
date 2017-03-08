/**
 * Created by jun on 2016/11/14.
 */
import {getWithinAuth} from '../../../frame/ajax'
import {getUrl} from '../../../frame/apiConfig'

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

/**
 * 获取QQ群 Vip版
 */
export const getVipGroupNumber = ({dispatch}) => {
  getGroup('V').then(
    function (res) {
      dispatch('UPDATE_GROUP_INFO', res.message)
    }
  ).catch(
    function (err) {
      console.dir(err)
    }
  )
}

/**
 *  获取QQ群 专业版
 */
export const getProfessionalGroupNumber = ({dispatch}) => {
  getGroup('P').then(
      function (res) {
        dispatch('UPDATE_GROUP_INFO', res.message)
      }
    ).catch(
      function (err) {
        console.dir(err)
      }
    )
}

/**
 *  获取QQ群
 * @param type
 * @returns {Promise}
 */
const getGroup = (type) => {
  const authority = type === 'V' ? 'V' : 'P'
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('strategy_qq_number').replace(':authority', authority)
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

