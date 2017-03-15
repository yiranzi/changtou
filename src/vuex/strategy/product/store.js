/**
 * Created by jun on 2016/11/14.
 * 用户信息
 */

const state = {
  professionalProduct: {},
  vipProduct: {},
  groupNumber: ''
}

const mutations = {
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
   * 更新 vip 数据
   * @param state
   * @param vipProduct
   * @constructor
     */
  STRATEGY_UPDATE_VIP_PRODUCT (state, vipProduct) {
    state.vipProduct = vipProduct
  },

  /**
   * 更新 QQ群信息
   * @param state
   * @param professionalProduct
   * @constructor
   */
  UPDATE_GROUP_INFO (state, groupNumber) {
    state.groupNumber = groupNumber
  }
}

export default {
  state,
  mutations
}
