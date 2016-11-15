/**
 * Created by jun on 2016/11/14.
 * 用户信息
 */

const state = {
  professionalIntro: {
    feature: null,
    intro: '',
    promotionUrl: '',
    purchaseOptionsUrl: '',
    strategyOptions: null,
    targetUser: null
  },
  professionalProduct: null,
  vipIntro: null,
  vipProduct: null
}

const mutations = {
  /**
   * 更新 专业版宣传页
   * @param state
   * @param professionalIntro
     * @constructor
     */
  STRATEGY_UPDATE_PROFESSIONAL_INTRO (state, professionalIntro) {
    state.professionalIntro = professionalIntro
  },

  /**
   * 更新 专业版 数据
   * @param state
   * @param professionalProduct
   * @constructor
     */
  STRATEGY_UPDATE_PROFESSIONAL_PRODUCT (state, professionalProduct) {
    state.professionalProduct = professionalProduct
  },

  /**
   * 更新 vip 宣传页
   * @param state
   * @param vipIntro
   * @constructor
     */
  STRATEGY_UPDATE_VIP_INTRO (state, vipIntro) {
    state.vipIntro = vipIntro
  },

  /**
   * 更新 vip 数据
   * @param state
   * @param vipProduct
   * @constructor
     */
  STRATEGY_UPDATE_VIP_PRODUCT (state, vipProduct) {
    state.vipProduct = vipProduct
  }
}

export default {
  state,
  mutations
}
