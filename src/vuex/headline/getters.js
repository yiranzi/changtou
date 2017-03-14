/**
 * Created by zyr on 2016/10/8.
 */
// 头条精选内容
export const headlineContent = (state) => {
  return state.headline.headlineContent
}

// 用户当天是否签到
export const userIsCheckin = (state) => {
  return state.headline.userIsCheckin
}

// 用户是否连续签到
export const userIsSerialCheckin = (state) => {
  return state.headline.userIsSerialCheckin
}

// 用户连续签到数
export const userCheckinCount = (state) => {
  return state.headline.userCheckinCount
}
