/**
 * Created by zyr on 2016/10/8.
 */
// 头条精选内容
export const headlineContent = (state) => {
  return state.headline.headlineContent
}

// 用户签到信息
export const userCheckinData = (state) => {
  return state.headline.userCheckinData
}

// 用户签到获得生命值
export const getAmount = (state) => {
  return state.headline.getAmount
}
