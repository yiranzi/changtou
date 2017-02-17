/**
 * Created by jun on 2017/02/17.
 */
const state = {
  audioList: []
}
const mutations = {
  LOAD_GUIDE_AUDIO (state, audioList) {
      state.audioList = audioList
  }
}
export default {
    state,
    mutations
}
