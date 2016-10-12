/**
 * Created by dongdong on 2016/10/8.
 */
const state = {
  specTopicInfo: {}
}
const mutations = {
  LOAD_SPEC_TOPIC (state, specTopic) {
    state.specTopicInfo = specTopic
  }
}
export default {
  state,
  mutations
}
