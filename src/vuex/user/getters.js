/**
 * Created by jun on 2016/8/23.
 */
// 获取长投卡信息
export const card = (state) => {
  return state.user.card
}
// 获取用户头像路径
export const avatar = (state) => {
  return state.user.image
}
// 获取用户最后一次登录时间
export const lastLogin = (state) => {
  return state.user.lastLogin
}
// 获取用户级别
export const level = (state) => {
  return state.user.level
}
// 获取新消息条数
export const newMessageNum = (state) => {
  return state.user.newMessageNum
}
// 获取手机号码
export const phone = (state) => {
  return state.user.phone
}
// 获取会话标识
export const sessionId = (state) => {
  return state.user.sessionId
}
// 获取长投宝信息
export const strategy = (state) => {
  return state.user.strategy
}
// 获取用户名
export const userName = (state) => {
  return state.user.userName
}
// 获取用户ID
export const userId = (state) => {
  return state.user.userId
}
//是否登录
export const isLogin = (state) => {
  return state.user.isLogin
}
