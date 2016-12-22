/**
 * Created by jun on 2016/9/2.
 */

const state = {
  isSubmit: false
}

const mutations = {

  /**
   * 更新 做过的问卷
   * @param state
   * @param courses
   * @constructor
   */
  UPDATE_MY_QUESTIONNAIRE (state, isSubmit) {
    state.isSubmit = isSubmit
  }
}

export default {
  state,
  mutations
}
