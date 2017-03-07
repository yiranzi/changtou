/**
 * Created by jun on 2016/11/14.
 */
// 获取专业版数据
export const professionalProduct = (state) => {
  return state.strategyProduct.professionalProduct
}

// 获取vip数据
export const vipProduct = (state) => {
  return state.strategyProduct.vipProduct
}

// 获取qq数据
export const groupNumber = (state) => {
  console.log('try get')
  return state.strategyProduct.sGroupNumber
}
