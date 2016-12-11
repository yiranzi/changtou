/**
 * Created by jun on 2016/8/23.
 * 用户信息
 */
import {setLocalCache, clearLocalCache, getLocalCache} from '../../util/cache'

const userCache = getLocalCache('frame-user')

const state = {
  isLogin: !!userCache,
  card: userCache && userCache.card ? userCache.card : null, // 1 长投卡信息
  image: userCache && userCache.image ? userCache.image : '', // 2 头像路径
  lastLogin: userCache && userCache.lastLogin ? userCache.lastLogin : '', // 3 最后登录时间
  level: userCache && userCache.level ? userCache.level : '',  // 4 用户等级
  //newMessageNum: 0, // 5 新消息条数
  phone: userCache && userCache.phone ? userCache.phone : '', // 6 手机号码
  sessionId: userCache && userCache.sessionId ? userCache.sessionId : '', // 7
  strategy: userCache && userCache.strategy ? userCache.strategy : null,  // 8 长投宝信息
  userName: userCache && userCache.userName ? userCache.userName : '', // 9 用户名
  userId: userCache && userCache.userId ? userCache.userId : '' // 10
}

//import {setLocalCache, clearLocalCache} from '../../util/cache'
//const state = {
//  isLogin: false,
//  card: '', // 1 长投卡信息
//  image: '', // 2 头像路径
//  lastLogin: '', // 3 最后登录时间
//  level: '',  // 4 用户等级
//  //newMessageNum: 0, // 5 新消息条数
//  phone: '', // 6 手机号码
//  sessionId: '', // 7
//  strategy: '',  // 8 长投宝信息
//  userName: '', // 9 用户名
//  userId: '' // 10
//}

const mutations = {
  /**
   * 登录
   * @param state
   * @param user
   * @constructor
     */
  USER_UPDATE (state, user) {
    state.isLogin = true
    state.card = user.card
    state.image = user.image
    state.lastLogin = user.lastLogin
    state.level = user.level
    //state.newMessageNum = user.newMessageNum
    state.phone = user.phone
    state.sessionId = user.sessionId
    state.strategy = user.strategy
    state.userName = user.userName
    state.userId = user.userId
    setLocalCache('frame-user', user)
  },
  /**
   * 重置昵称
   * @param state
   * @param username
   * @constructor
   */
  USERNAME_UPDATE (state, username) {
    state.userName = username
    let user = getLocalCache('frame-user')
    user.userName = username
    user.isLogin = state.isLogin
    user.card = state.card
    user.image = state.image
    user.lastLogin = state.lastLogin
    user.level = state.level
    user.phone = state.phone
    user.sessionId = state.sessionId
    user.strategy = state.strategy
    user.userId = state.userId
    setLocalCache('frame-user', user)
  },
  /**
   * 登出
   * @constructor
     */
  USER_LOGOUT (state) {
    state.isLogin = false
    state.card = ''
    state.image = ''
    state.lastLogin = ''
    state.level = ''
    //state.newMessageNum = 0
    state.phone = ''
    state.sessionId = ''
    state.strategy = ''
    state.userName = ''
    state.userId = ''
    state.newMsgNum = 0
    clearLocalCache('frame-user')
  },
  /**
   * 绑定手机后更新号码
   * @constructor
     */
  UPDATE_PHONE (state, phone) {
    state.phone = phone
  }
}

export default {
  state,
  mutations
}
