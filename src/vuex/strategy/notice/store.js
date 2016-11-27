/**
 * Created by zl on 2016/8/27.
 * 滚动文字
 */

const state = {
  text: null //滚动文字
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

