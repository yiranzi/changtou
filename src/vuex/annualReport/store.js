/**
 * Created by jun on 2017.1.17
 */
const state = {
  annualReport: null
}

const mutations = {
  UPDATE_ANNUAL_REPORT (state, annualReport) {
    state.annualReport = annualReport
  }

}
export default {
  state,
  mutations
}
