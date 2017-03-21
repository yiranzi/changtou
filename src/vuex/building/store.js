/**
 * Created by zyr on 2017.3.16
 * 造房子
 */
const state = {
  buildingGoodsStatus: {},
  buildingUpdata: true
}

const mutations = {
  BUILDING_GOODS_STATUS (state, buildingGoodsStatus) {
    state.buildingGoodsStatus = buildingGoodsStatus
  },
  BUILDING_UPDATA (state, buildingUpdata) {
    state.buildingUpdata = buildingUpdata
  }
}
export default {
  state,
  mutations
}
