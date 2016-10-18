/**
 * Created by dongdong on 2016/10/14.
 */
const state = {
  dailyQuestion: ''
}
const mutations = {
  LOAD_DAILY_QUESTION (state, dailyQuestion) {
      state.dailyQuestion = dailyQuestion
  }
}
export default {
    state,
    mutations
}
