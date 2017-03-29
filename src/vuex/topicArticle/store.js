/**
 * Created by sunyiran on 2017/3/28.
 */
const state = {
  topicArticle: {},
  articleContent: {}
}

const mutations = {
  UPDATE_TOPIC_ARTICLE (state, topicArticleData) {
    console.log('sava topicArticleData')
    state.topicArticle = topicArticleData
  },
  UPDATE_ARTICLE_CONTENT (state, articleContentData) {
    console.log('sava articleContentData2')
    state.topicArticle = articleContentData
  }
}

export default {
  state,
  mutations
}
