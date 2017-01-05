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
  UPDATE_COMMON_TOPIC_ISBUY (state, isBuy) {
    state.isbuy = isBuy
  }
}
export default {
  state,
  mutations
}
