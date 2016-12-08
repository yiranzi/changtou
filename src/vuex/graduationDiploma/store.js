/**
 * Created by jun on 2016/12/7.
 */

const state = {
  diplomaList: [],
  diplomaDetails: null,
  newShowDiploma: null, // 显示弹框的新的 毕业证
  newDrawDiploma: null // 显示在我的课程的新的毕业证
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
  },

  /**
   * 是否有需要弹框显示的新的毕业证
   * @param state
   * @param newShowDiploma
   * @constructor
     */
  GRADUATION_UPDATE_SHOW_DIPLOMA (state, newShowDiploma) {
    state.newShowDiploma = newShowDiploma
  },

  /**
   * 是否有需要同时的新的毕业证
   * @param state
   * @param newDrawDiploma
   * @constructor
     */
  GRADUATION_UPDATE_DRAW_DIPLOMA (state, newDrawDiploma) {
    state.newDrawDiploma = newDrawDiploma
  }
}

export default {
  state,
  mutations
}
