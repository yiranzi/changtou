/**
 * Created by dongdong on 2016/10/31.
 */
const state = {
  helpList: null //自助答疑列表
}

const mutations = {
  HELP_SELF_LIST (state, helpList) {
    state.helpList = helpList
  }

}
export default {
  state,
  mutations
}
