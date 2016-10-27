/**
 * Created by dongdong on 2016/10/27.
 */
import {Device, platformMap} from './device'
/**
 * 推送消息
 */

/**
 * 设置别名
 */
export const setAlias = (alias) =>{
  JPushPlugin.prototype.setAlias(alias)
}

/**
 * 设置标签
 */
export  const setTags = (tags) =>{
  JPushPlugin.prototype.setTags(tags)
}

/**
 * 设置数字角标,number为0时不显示
 * @param value
 */
export const setBadge = (number) => {
    if (Device.platform === platformMap.IOS){
      window.plugins.jPushPlugin.setBadge(number)
    }
}

/**
 * 关闭推送消息
 */
export const stopPush = () => {
  window.plugins.jPushPlugin.stopPush()
}

/**
 * 恢复消息推送
 */
export const resumePush = () => {
  window.plugins.jPushPlugin.resumePush()
}
