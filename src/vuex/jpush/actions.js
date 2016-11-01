/**
 * Created by dongdong on 2016/10/31.
 */

import jpush from '../../plugin/jpush'

export const jpushInit = () => {
  return Promise.resolve(jpush.init())
}

export const setAlias = ({dispatch}, userId) => {
  jpush.setAlias(userId)
}

export const addOpenHandler = jpush.addOpenHandler

export const addReceiveHandler = jpush.addReceiveHandler
