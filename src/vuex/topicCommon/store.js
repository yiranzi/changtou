/**
 * Created by dongdong on 2016/10/8.
 */
const state = {
  commonTopicInfo: {},
  isbuy: false
}
const mutations = {
  LOAD_COMMON_TOPIC (state, commonTopic) {
    state.commonTopicInfo = commonTopic
  },
  LOAD_ISBUY_TICKET (state, isbuy) {
    state.isbuy = isbuy
  }
}
export default {
  state,
  mutations
}
