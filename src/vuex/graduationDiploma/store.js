/**
 * Created by jun on 2016/12/7.
 */

const state = {
  diplomaList: []
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
  }
}

export default {
  state,
  mutations
}
