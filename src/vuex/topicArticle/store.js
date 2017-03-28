/**
 * Created by sunyiran on 2017/3/28.
 */
const state = {
  article: {}
}

const mutations = {
  UPDATE_TOPIC_ARTICAL (state, articleData) {
    state.Article = articleData
  }
}

export default {
  state,
  mutations
}
