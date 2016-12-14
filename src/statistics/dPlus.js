/**
 * Created by jun on 2016/12/13.
 * Dplus 数据统计
 */
import {D_PLUS_ID} from '../frame/serverConfig'

/**
 * 是否支持dplus统计
 * @returns {boolean}
 */
const isSupport = () => {
  return !!window.dplus
}

/**
 * 初始化dplus配置
 */
const initDplus = () => {
  if (isSupport()) {
    window.dplus.init(D_PLUS_ID, {
      //"disable_cookie": true,
      //"cross_subdomain_cookie": true,
      localstorage: true,
      track_timeout: 1000, //回调响应时间

      loaded: function(){
        console.log('initDplus loaded')
      }
    })
  }
}

/**
 * 发送一次事件
 * @param eventName string  事件名称
 * @param properties object 事件属性
 * @param callback
 */
const track = ({eventName, properties}, callback = () => {}) => {
  if (isSupport()) {
    window.dplus.track(eventName, properties || {}, function(){
      if (callback) {
        callback()
      } else {
        //console.info('发送统计数据回调',' 事件：'+ eventname);
      }
    })
  }
}

/**
 * 注册超级属性，后面发送的事件会自动带上此类标签
 * @param properties {} object 类型
 *
 * 使用示例：
 *  register（{name：zl, sex: male}）
 */
const register = (properties) => {
  if (isSupport()) {
    window.dplus.register(properties)
  }

  if (window.window.ictData) {
    window.ictData.register(properties)
  }
}

/**
 *  停止制定事件的统计
 *  @params events []  事件的数组
 *  若是没有参数  表示停止所有的事件统计
 *
 */
const disable = (events) => {
  if(events){
    window.dplus.disable(events)
  }else{
    window.dplus.disable()
  }
}

/**
 *  删除执行的超级属性
 * @param properties String/Array  需要删除的属性值
 */
const unregister = (properties) => {
  if (isSupport()) {
    window.dplus.unregister(properties)
  }
}

/**
 *  返回指定的超级属性名称
 *  @params propertyName 属性名称
 */
const getProperty = (propertyName) => {
  if(isSupport()){
    return window.dplus.get_property(propertyName)
  }else{
    return null
  }
}

/**
 * 删除所有用户标识， 超级属性
 * 调用此方法后，再次调用 track 方法，会认为是一个新用户
 */
const clear = () => {
  if(isSupport()){
    window.dplus.clear()
  }
}

/**
 * （动态）设置配置信息
 *  @param config
 *
 *  例如：
 *  setConfig（{track_timeout: 500}）
 */
const setConfig = (config) => {
  if(isSupport()){
    window.dplus.set_config(config)
  }else{
    console.warn('dplus不存在，你尝试设置属性', config)
  }
}

/**
 * 获取指定的config配置
 * @param config
 */
const getConfig = (config) => {
  if(isSupport()){
    return window.dplus.get_config(config)
  }else{
    console.warn('dplus不存在，你尝试获取属性', config)
    return null
  }
}

export default {
  initDplus,
  track,
  register
}
