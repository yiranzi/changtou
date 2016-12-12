/**
 * Created by Administrator on 2016/12/11.
 */

import forbidWords from './forbidWords'
const whiteList = ['小熊之家', '水湄物语', '小投', '小小投', '长投', '长投网', '长投学堂']
const reg = /^[\w\u4e00-\u9fa5]{4,12}$/
const forbidWordLen = forbidWords.length
let isValid = true
const errTip = {}

const verifyNickName = (nickName) => {
  if (isLengthValid(nickName)) {
     if (isInWhiteList(nickName)) {
        isForbidWord(nickName)
     }
  }

  return {
    isValid: isValid,
    errTip: errTip
  }
}

const isForbidWord = (nickName) => {
  for (let k = 0; k < forbidWordLen; k++) {
    if (nickName.indexOf(forbidWords[k]) > 0) {
      errTip.message = '用户信息非法'
      isValid = false
      return false
    }
  }
}
const isLengthValid = (nickName) => {
  if (!reg.test(nickName)) { // false
    errTip.message = '名称必须为4-12位非空字符'
    isValid = false
    return false
  }
}
const isInWhiteList = (nickName) => {
  for (let k = 0; k < whiteList.length; k++) {
    if (nickName.indexOf(whiteList[k]) > 0) {
      errTip.message = '用户信息非法'
      isValid = false
      return false
    }
  }
}

const verifyPhone = () => {}

export {
  verifyNickName,
  verifyPhone
}
