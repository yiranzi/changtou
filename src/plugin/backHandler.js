/**
 * Created by jun on 2016/11/11.
 *
 * 处理 (安卓后退键)
 */

// 默认后退处理
let defaultHandler = null

// 当前的设置的后退处理
let currbackHandler = null

/**
 * 添加处理函数
 * 若是没有设置后退处理, 执行默认.
 */
document.addEventListener('backbutton', () => {
  const handler = currbackHandler || defaultHandler
  handler && handler()
})

/**
 * 初始化默认(后退)处理
 * @param defaultHandler
 */
const setDefaultHandler = (handler) => {
  defaultHandler = handler
}

/**
 * 设置处理
 * @param handler
 */
const setHandler = (handler) => {
  currbackHandler = handler
}

/**
 * 重置处理
 */
const resetHandler = () => {
  currbackHandler = defaultHandler
}

export default {
  setDefaultHandler,
  setHandler,
  resetHandler
}

