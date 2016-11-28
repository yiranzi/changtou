/**
 * Created by zl on 2016/8/27.
 *  通知数据
 */

const state = {
  text: '' //通知文本
}

const mutations = {
  NEWER_SCROLL_TEXT (state, text) {
    state.text = text
  }
}

export default {
  state,
  mutations
}

