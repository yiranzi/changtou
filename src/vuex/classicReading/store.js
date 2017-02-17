/**
 * Created by zhongyan on 2017/2/15.
 */
const state = {
  classicReadingDetails: {    //经典详情全部内容
    anchor: '',       //主播
    cbId: 0,          //经典id
    classicsName: '',  // 经典名称
    fansNum: 0,       // 粉丝数量
    pic: '',          // 经典封面
    playTimes: 0      //播放次数
  },
  audio: [],           //经典音频
  fansImgs: [],       //经典粉丝头像
  classicIntroText: ''  // 经典的介绍文案
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
