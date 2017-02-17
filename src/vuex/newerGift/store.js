/**
 * Created by dongdong on 2016/10/14.
 */
const state = {
  couponList: []
}
const mutations = {
  LOADING_COUPON_LIST (state, couponList) {
      state.couponList = couponList
  }
}
export default {
    state,
    mutations
}
