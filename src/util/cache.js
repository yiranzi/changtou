/**
 * Created by jun on 2016/8/23.
 * 缓存
 */

/**
 * 设置本地缓存
 * @param itemName
 * @param jsonData
 */
const setLocalCache = (itemName, jsonData) => {
  window.localStorage.setItem(`cache-${itemName}`, JSON.stringify(jsonData))
}

/**
 * 获取本地缓存
 * @param itemName
 */
const getLocalCache = (itemName) => {
  return JSON.parse(window.localStorage.getItem(`cache-${itemName}`))
}

/**
 * 清除本地缓存
 * @param itemName
 */
const clearLocalCache = (itemName) => {
  window.localStorage.removeItem(`cache-${itemName}`)
}

/**
 * 设置session缓存
 * @param itemName
 * @param jsonData
 */
const setSessionCache = (itemName, jsonData) => {
  window.sessionStorage.setItem(`cache-${itemName}`, JSON.stringify(jsonData))
}

/**
 * 获取session缓存
 * @param itemName
 */
const getSessionCache = (itemName) => {
  return JSON.parse(window.sessionStorage.getItem(`cache-${itemName}`))
}

/**
 * 清除sesson缓存
 * @param itemName
 */
const clearSessionCache = (itemName) => {
  window.sessionStorage.removeItem(`cache-${itemName}`)
}

export {
  setLocalCache,
  getLocalCache,
  clearLocalCache,
  setSessionCache,
  getSessionCache,
  clearSessionCache
}
