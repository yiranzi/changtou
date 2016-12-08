/**
 * Created by jun on 2016/12/7.
 */

const state = {
  diplomaList: [],
  diplomaDetails: null
}

const mutations = {
  /**
   * 更新
   * @param state
   * @param list
     * @constructor
     */
  GRADUATION_UPDATE_DIPLOMA_LIST (state, list) {
    state.diplomaList = list
  },

  /**
   * 更新 毕业证详情
   * @param state
   * @param details
   * @constructor
     */
  GRADUATION_UPDATE_DIPLOMA_DETAILS (state, details) {
    state.diplomaDetails = details
  }
}

export default {
  state,
  mutations
}
