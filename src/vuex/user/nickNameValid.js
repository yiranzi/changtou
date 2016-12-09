/**
 * Created by Administrator on 2016/12/9.
 */

import forbidWords from '../../../static/forbidWords'
const whiteList = ['小熊之家', '水湄物语', '小投', '小小投', '长投', '长投网', '长投学堂']
const reg = /^(?!(.)\1+$)(?!\d{2,8}$)[\w\u4e00-\u9fa5]{2,12}$/
const forbidWordLen = forbidWords.length

const validNickName = (nickName) => {
  let isValid = true
  const errTip = {}
  for (let k = 0; k < whiteList.length; k++) {
    if (nickName.indexOf(whiteList[k]) > 0) {
      errTip.message = '昵称不得含有白名单字段'
      isValid = false
    }
  }
  if (!reg.test(nickName)) { // false
    errTip.message = '昵称不规范请重新修改'
    isValid = false
  }
  for (let k = 0; k < forbidWordLen; k++) {
    if (nickName.indexOf(forbidWords[k]) > 0) {
      errTip.message = '昵称不得含有敏感词'
      isValid = false
    }
  }
  return {
    isValid: isValid,
    errTip: errTip
  }
}

export default validNickName
