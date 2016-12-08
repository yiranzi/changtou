/**
 * Created by jun on 2016/12/7.
 */
// 获取毕业证列表
export const diplomaList = (state) => {
  return state.graduationDiploma.diplomaList
}

//获取毕业证详情
export const diplomaDetails = (state) => {
  return state.graduationDiploma.diplomaDetails
}
// 是否有新弹框的毕业证
export const newShowDiploma = (state) => {
  return state.graduationDiploma.newShowDiploma
}
// 是否有新提示的毕业证
export const newDrawDiploma = (state) => {
  return state.graduationDiploma.newDrawDiploma
}
