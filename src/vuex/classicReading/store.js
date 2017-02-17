/**
 * Created by zhongyan on 2017/2/15.
 */
const state = {
  classicReadingDetails: {
    anchor: '',
    cbId: 0,
    classicsName: '',
    fansNum: 0,
    pic: '',
    playTimes: 0
  },
  audio: [],
  fansImgs: [],
  classicIntroText: ''
}

const mutations = {
  CLASSIC_READING_DETAILS (state, data) {
    state.classicReadingDetails = data
    state.audio = data.audio
    state.classicIntroText = data.introText
    state.fansImgs = data.fansImgs
  }
}
export default {
  state,
  mutations
}
