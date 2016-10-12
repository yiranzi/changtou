/**
 * Created by zl on 16/8/30.
 *
 * 转换器
 */

/**
 * 在前一位自动补全0
 *  注: 这里的函数考虑到性能,没有写完, 若是其他地方需要用到,再考虑重写
  * @param val {number}
 *  @return
 */
const padLeftZero = val => val >= 10 ? val + '' : '0' + val

/**
 * 转化音频时间(秒)到特定格式 00:00
 * @param time
 * @returns {*}
 */
const convertAudioTimeToString = (time) => {
  if (typeof time === 'number') {
    let hour = padLeftZero(parseInt(time / 60))
    let secds = padLeftZero(parseInt(time % 60))
    return `${hour}:${secds}`
  } else {
    return '00:00'
  }
}

export {
  convertAudioTimeToString
}
