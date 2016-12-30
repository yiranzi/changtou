/**
 * Created by dongdong on 2016/10/31.
 */

import jpush from '../../plugin/jpush'

export const jpushInit = () => {
  return Promise.resolve(jpush.init())
}

export const jpushSetAlias = ({dispatch}, userId) => {
  jpush.setAlias(userId)
}

export const jpushAddReceiveHandler = ({dispatch}, receiveHandler) => {
  jpush.addReceiveHandler(receiveHandler)
}

export const jpushAddOpenHandler = ({dispatch}, openHandler) => {
  jpush.addReceiveHandler(openHandler)
}

export const jpushOpenNotification = () => {
  jpush.openNotification()
}

export const jpushSetRouter = (router) => {
  jpush.setRouter(router)
}
