/**
 * Created by zhongyan on 2017/2/15.
 */
/*获取经典详情*/

export const classicReadingDetails = (state) => {        //经典详情全部内容
  return state.classicReading.classicReadingDetails
}

export const audio = (state) => {           //经典详情全部内容
  return state.classicReading.audio
}

export const classicIntroText = (state) => {        // 经典详情的介绍
  return state.classicReading.classicIntroText
}

export const fansImgs = (state) => {                   //经典详情中粉丝头像
  return state.classicReading.fansImgs
}
