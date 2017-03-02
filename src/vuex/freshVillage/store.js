/**
 * Created by jun on 2017/1/24
 */
const state = {
  adviseList: []
}

const mutations = {
  /**
   *
   * @param state
   * @param advise
     * @constructor
     */
  LOAD_VILLAGE_ADVISE (state, advise) {
    state.adviseList = advise
  }
}

export default {
    state,
    mutations
}
