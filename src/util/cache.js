/**
 * Created by jun on 2016/8/23.
 * 缓存
 */

/**
 * 设置缓存
 * @param itemName
 * @param jsonData
 */
const setLocalCache = (itemName, jsonData) => {
  window.localStorage.setItem(`cache-${itemName}`, JSON.stringify(jsonData))
}

/**
 * 获取缓存
 * @param itemName
 */
const getLocalCache = (itemName) => {
  return JSON.parse(window.localStorage.getItem(`cache-${itemName}`))
}

/**
 * 清除缓存
 * @param itemName
 */
const clearLocalCache = (itemName) => {
  window.localStorage.removeItem(`cache-${itemName}`)
}

export {
  setLocalCache,
  getLocalCache,
  clearLocalCache
}
