/**
 * Created by jun on 2016/11/14.
 * 用户信息
 */

const state = {
  professionalIntro: {},
  vipIntro: {}
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
   * 更新 vip 宣传页
   * @param state
   * @param vipIntro
   * @constructor
     */
  STRATEGY_UPDATE_VIP_INTRO (state, vipIntro) {
    state.vipIntro = vipIntro
  }
}

export default {
  state,
  mutations
}
