/**
 * Created by Administrator on 2016/12/11.
 */

import forbidWords from './forbidWords'

/**
 *  验证昵称
 * @param nickName
 * @returns {*}
 */
const verifyNickName = (nickName) => {
  let re = {
    isValid: false,
    errTip: ''
  }

  if (!isLengthValid(nickName)) {
    re.errTip = '名称必须为4-12位非空字符'
    return re
  }

  if (!isInWhiteList(nickName)) {
    re.errTip = '用户信息非法'
    return re
  }

  if (!isForbidWord(nickName)) {
    re.errTip = '用户信息非法'
    return re
  }

  return {
    isValid: true,
    errTip: re.errTip
  }
}

/**
 * 验证是否有敏感词
 * @param nickName
 * @param fbidWords
 * @returns {boolean}
 */
const isForbidWord = (nickName, fbidWords = forbidWords) => {
  const forbidWordLen = fbidWords.length
  for (let k = 0; k < forbidWordLen; k++) {
    if (nickName.indexOf(forbidWords[k]) > 0) {
      return false
    }
  }
  return true
}

/**
 * 验证昵称长度
 * @param nickName
 * @returns {boolean}
 */
const isLengthValid = (nickName) => {
  // const reg = /^[\w\u4e00-\u9fa5]{4,12}$/
  if (!nickName || nickName.length > 12 || nickName.length < 4) { // false
    return false
  } else {
    return true
  }
}

/**
 * 验证昵称是否含白名单
 * @param nickName
 * @returns {boolean}
 */
const isInWhiteList = (nickName) => {
  const whiteList = ['小熊之家', '水湄物语', '小投', '小小投', '长投', '长投网', '长投学堂']
  for (let k = 0; k < whiteList.length; k++) {
    if (nickName.indexOf(whiteList[k]) > 0) {
      return false
    }
  }
  return true
}

const verifyPhone = () => {}

export {
  verifyNickName,
  verifyPhone
}
