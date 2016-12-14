/**
 * Created by jun on 2016/12/13.
 */
import dPlus from './dPlus'
import ictData from './ictData'
import {Device, platformMap} from '../plugin/device'
import {} from '../vuex/principal/actions'
/**
 * 统计事件
 * @type {{}}
 */
export const events = {
  APP_START: '启动',

  /**
   *
   */
  PAGE_TIME: '页面停留时长',

  /**
   *
   */
  WX_SHARE: '微信内分享',
  WX_SHARE_SUCCESS: '微信内分享成功',
  WX_SHARE_CANCEL: '微信内分享取消',

  /**
   *
   */
  TAP_FT_ANDROID_LOAD: '点击富途安卓下载',
  TAP_FT_IOS_LOAD: '点击富途iOS下载',
  TAP_FT_OPEN: '富途页打开数',
  TAP_FT_COURSE: '富途长投课程点击数',
  TAP_FT_SECTION: '富途港股打新课小节点击数',
  TAP_FT_OAUTH_SUCCESS: '富途授权成功',

  /**
   * 课程
   */
  SUBJECT_JOIN_TAP: '点击“参加课程”按钮',
  SUBJECT_BUY_NOW_TAP: '课程-点击“立即购买”按钮',
  SUBJECT_AUDITION_TAP: '课程-点击“试听”按钮',
  /**
   * 专题
   */
  TOPIC_CONFIRM_TAP: '专题-点击“立即支付”按钮',
  TOPIC_SUBJECT_TAP: '专题-点击课程',
  TICKET_CONFIRM_TAP: '年会-点击“立即支付”按钮',

  /**
   * 支付流程
   */
  ORDER_CONFIRM_TAP: '点击“确认订单”按钮',
  PAY_CONFIRM_TAP: '点击“确认支付”按钮',
  PAY_SUCCESSFUL: '支付成功',
  PAY_FAIL: '支付失败',
  PAY_CANCEL: '支付取消',

  /**
   * 首页
   */
  HOME_PIC_TAP: '点击首页图片',
  HOME_TEXT_TAP: '点击首页文字',

  LOGIN_NOW: '点击立即登录',

  /**
   * 作业
   */
  DO_HOMEWORK: '点击"写作业"',
  SUBMIT_HOMEWORK: '点击"提交作业"',
  SAVE_DRAFT: '点击"保存草稿"',

  CHOICE_QUESTION_BEGIN: '选择题-点击"开始测试"',
  CHOICE_QUESTION: '选择题-答题',
  CHOICE_QUESTION_RETEST: '选择题-重测',

  /**
   * 每日一题
   */
  DAILY_QUIZ: '每日一题',

  /**
   * 院生访谈
   */
  INTERVIEW: '院生访谈-点击',
  INTERVIEW_SHARE_TAP: '院生访谈-点击分享',

  /**
   * 登录注册流程
   */
  REGISTER_INPUT_IDENTITY: '注册-输入-账号',
  REGISTER_INPUT_PASSWORD: '注册-输入-密码',
  REGISTER_INPUT_VALIDATION_CODE: '注册-输入-验证码',

  REGISTER_TAP_REGISTER: '注册-点击-注册',
  REGISTER_TAP_SUBMIT: '注册-点击-提交',

  REGISTER_VALIDATION_CODE_BACK: '注册-验证码页面-返回',
  REGISTER_IDENTITY_BACK: '注册-手机号页面-返回',

  BIND_PHONE_INPUT_PHONE: '绑定手机-输入-手机号',
  BIND_PHONE_INPUT_VALIDATION_CODE: '绑定手机-输入-验证码',
  BIND_PHONE_TAP_NEXT: '绑定手机-点击-下一步',
  BIND_PHONE_TAP_SUBMIT: '绑定手机-点击-提交',

  BIND_PHONE_PHONE_BACK: '绑定手机-手机号页面-返回',
  BIND_PHONE_VALIDATION_CODE_BACK: '绑定手机-验证码页面-返回',

  LOGIN_BIND_PHONE_TAP_CANCEL: '登录-绑定手机-点击-取消',
  LOGIN_BIND_PHONE_TAP_BIND: '登录-绑定手机-点击-绑定',

  KNOWLEDGE_ENTRY: '知识地图-点击进入',
  KNOWLEDGE_ARTICLE: '知识地图-3级知识点浮层',

  NEWER_TEST_SUBJECT_TAP: '理财揭秘-点击课程',

  ADVER_MY_COURSE_NO_LOGIN_KNOWLEDGE: '我的课程-未登录-点击广告A',
  ADVER_MY_COURSE_LOGIN_KNOWLEDGE: '我的课程-已登录-点击广告B',
  ADVER_MY_COURSE_LOGIN_KNOWLEDGE_CLOSE: '我的课程-已登录-删除广告'
}

/**
 * 初始化配置
 */
export const initConfig = () => {
  var user = User.get()
  //设置平台
  dPlus.register({
    '平台': Device.platform()
  })
  dPlus.register({
    '长投Id': (user && user.userId) || '00'
  })

  //设置长投统计数据
  ictData.register({
    'platform': Device.platform()
  })
  ictData.register({
    'userId': (user && user.userId) || '00'
  })
}

/**
 *  绑定监听的事件
 */
export const bindEvents = () => {
  /**
   * 通用事件发生
   */
  EventBus.on(eventMap.EVENT_TRACK, this.event_track, this)

  /**
   * 登陆事件
   * 注册事件
   * 设置用户的超级属性，并且上传一次登陆事件
   */
  EventBus.on(eventMap.LOGIN_SUCCESS,this.stat_login,this)
  EventBus.on(eventMap.REGISTER_SUCCESS,this.stat_register,this)
  EventBus.on(eventMap.LOGOUT_SUCCESS,this.stat_logout,this)

  /**
   * 页面跳转
   */
  EventBus.on(eventMap.VIEW_CHANGE,this.stat_view_change,this)

  /**
   * 微信分享事件
   */
  EventBus.on(eventMap.WX_SHARE,this.stat_share,this)
  EventBus.on(eventMap.WX_SHARE_SUCCESS,this.stat_share_success,this)
  EventBus.on(eventMap.WX_SHARE_CANCEL,this.stat_share_cancel,this)
}

/**
 * 设置用户
 * @param user {obj/null}
 * @param type string {login/register/null}
 */
export const setUser = (userconfig, type) => {
  var me = this
  dplus.define('user', function (user) {
    user.setId(userconfig ? userconfig.userId : '00')
    user.setName(userconfig ? userconfig.userName: '游客')
    user.setPhone(userconfig ? (userconfig.phone || '未知') : '未知')
    user.setAccountType(userconfig ? (userconfig.accountType || '未知'): '未知')

    if(type && type === me.user_type.LOGIN){
      user.login()
    }else if(type && type === me.user_type.REGISTER){
      user.signUp()
    }
  })
}

/**
 * 统计事件
 * @param eventName 事件名称
 * @param props 属性值
 */
export const eventTrack = (eventName, props) =>{
  dPlus.track(eventName, props)
  ictData.track(eventName, props)
}

/**
 * 统计登陆事件
 * 统计登陆，并设计超级属性
 */
export const login = (user) => {
  dPlus.register({
    '长投Id': (user && user.userId) || '00'
  })
  this.setUser(user, this.user_type.LOGIN)

  ictData.register({
    userId: user.userId
  })
  ictData.updateUser(user)
  ictData.track('登录')
}

/**
 * 统计注册事件
 * 统计注册，并设计超级属性
 */
export const register = (user) => {
  dPlus.register({
    '长投Id': (user && user.userId) || '00'
  })
  this.setUser(user, this.user_type.REGISTER)

  ictData.register({
    userId: user.userId
  })
  ictData.updateUser(user)
  ictData.track('注册')
}

/**
 * 登出事件
 * 重置
 */
export const logout = () => {
  dPlus.track('退出账号')
  this.setUser()
  dPlus.register({
    '长投Id':  '00'
  })

  ictData.register({
    userId: '00'
  })
}

preView: null

/**
 * 页面跳转
 */
export const viewChange = (view) => {
  //console.log('stat_view_change',view.config.stConfig,dPlus.isSupport())
  if(preView){
    var time = ((Date.now() - preView.startTime)/1000).toFixed(0)
    dPlus.track(steventMap.PAGE_TIME,{'时长': time, '页面':preView.url})

    ictData.track(steventMap.PAGE_TIME,{'时长': time, '页面':preView.url})
  }

  preView = {
    startTime: Date.now(),
    url: location.hash
  }

  dPlus.isSupport() && dplus.define('page', function (page) {
    page.setType(view.config.stConfig && view.config.stConfig.type || '未知')
    page.setTitle(view.config.stConfig && view.config.stConfig.title || '未知')
    page.setTags(view.config.stConfig && view.config.stConfig.tags || ['未知'])
    page.setCategory(view.config.stConfig && view.config.stConfig.categories || ['未知'])
    page.setAuthor(view.config.stConfig && view.config.stConfig.author || 'dev')
    page.setEditor(view.config.stConfig && view.config.stConfig.editor || 'dev')
    page.view({
      '访问页面': location.hash
    })
  })

  ictData.track('页面访问',{ '页面':location.hash})
}

/**
 * 统计分享事件
 * @param props 事件属性
 */
export const share = (props) =>{
  //console.log('stat_share',this.events.WX_SHARE,props)
  dPlus.track(this.events.WX_SHARE,props)

  ictData.track(this.events.WX_SHARE,props)
}

/**
 * 统计分享成功事件
 * @param props 事件属性
 */
export const shareSuccess = (props) => {
  //console.log('stat_share_success',this.events.WX_SHARE,props)
  dPlus.track(this.events.WX_SHARE_SUCCESS,props)

  ictData.track(this.events.WX_SHARE_SUCCESS,props)
}

/**
 * 统计分享取消事件
 * @param props 事件属性
 */
export const shareCancel = (props) => {
  dPlus.track(this.events.WX_SHARE_CANCEL,props)

  ictData.track(this.events.WX_SHARE_CANCEL,props)
}

