/**
 * Created by yuan on 2017.3.8
 * 版本信息
 */
const state = {
  appUpdateContent: {}
}

const mutations = {
  APP_UPDATE_CONTENT (state, appUpdateContent) {
    state.appUpdateContent = appUpdateContent
  }

}
export default {
  state,
  mutations
}
