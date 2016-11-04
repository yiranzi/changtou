/**
 * Created by jun on 2016/8/23.
 * 用户信息
 */
import {setLocalCache, clearLocalCache} from '../../util/cache'
import {setIconBadgeNumber} from '../../plugin/jpush'

const state = {
  isLogin: false,
  card: '', // 1 长投卡信息
  image: '', // 2 头像路径
  lastLogin: '', // 3 最后登录时间
  level: '',  // 4 用户等级
  newMessageNum: 0, // 5 新消息条数
  phone: '', // 6 手机号码
  sessionId: '', // 7
  strategy: '',  // 8 长投宝信息
  userName: '', // 9 用户名
  userId: '' // 10
}

const mutations = {
  /**
   * 登录
   * @param state
   * @param user
   * @constructor
     */
  UPDATE_USER (state, user) {
    state.isLogin = true
    state.card = user.card
    state.image = user.image
    state.lastLogin = user.lastLogin
    state.level = user.level
    state.newMessageNum = user.newMessageNum
    state.phone = user.phone
    state.sessionId = user.sessionId
    state.strategy = user.strategy
    state.userName = user.userName
    state.userId = user.userId
    setLocalCache('frame-user', user)
  },

  /**
   * 登出
   * @constructor
     */
  LOGOUT_USER (state) {
    state.isLogin = false
    state.card = ''
    state.image = ''
    state.lastLogin = ''
    state.level = ''
    state.newMessageNum = 0
    state.phone = ''
    state.sessionId = ''
    state.strategy = ''
    state.userName = ''
    state.userId = ''
    clearLocalCache('frame-user')
  },
  /**
   * 绑定手机后更新号码
   * @constructor
     */
  UPDATE_PHONE (state, phone) {
    state.phone = phone
  },
  USER_ADD_NEW_MESSAGE_NUM () {
    state.newMessageNum ++
  },
  //清空新消息数
  USER_EMPTY_NEW_MESSAGE_NUM () {
    state.newMessageNum = 0
    setLocalCache('frame-user', {newMessageNum: 0})
    setIconBadgeNumber(0)
  }
}

export default {
  state,
  mutations
}
