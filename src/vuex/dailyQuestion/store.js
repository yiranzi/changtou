/**
 * Created by dongdong on 2016/10/14.
 */
const state = {
  question: {}
}
const mutations = {
  LOAD_DAILY_QUESTION (state, dailyQuestion) {
      state.question = dailyQuestion
  }
}
export default {
    state,
    mutations
}
