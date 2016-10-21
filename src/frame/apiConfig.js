/**
 * Created by jun on 2016/8/23.
 * 接口定义
 */
import {SEVER_URL} from './serverConfig'

const apiUrl = {
  /**
   * 登录模块
   */
  // 注册
  'register_post_pone': '/principal/users/registration-vericode', //  注册 发送手机号
  'register_post_password_app': '/principal/auth/user-registration-info', //  注册 登录 app
  'register_post_password_msite': '/principal/msite/auth/user-registration-info', // 注册 登录 M站
  // 账号登录
  'principal_login': '/principal/auth/login-user-info',
  // 同步用户信息
  'sync_user': '/principal/msite/users/user-info',
  // 快速登录
  'fast_login_post_pone': '/principal/auth/fast-login-vericode', // 快速登录 发送手机号
  'fast_login_post_code': '/principal/auth/fast-login', // 快速登录 发送验证码 登录
  // 绑定手机
  'bind_phone_post_pone': '/principal/users/phone-bind-vericode', // 绑定手机 发送手机号
  'bind_phone_post_code': '/principal/users/bind-phone-num', // 绑定手机 发送验证码
  // 重置密码
  'reset_password_post_pone': '/principal/users/reset-password-vericode', // 重置密码 发送手机号
  'reset_password_post_password': '/principal/users/new-password', // 重置密码 发送密码
  'reset_password_post_code': '/principal/users/reset-password-verificaiton', // 重置密码 发送验证码
  // 第三方登录
  'qq_login': '/3rdparty/qq/login/info', // qq登录

  /**
   * 课程模块
   */
  'my_course': '/course/my/subjects', //我的课程

  'homepage_app': '/homepage/app', //课程首页-app
  'homepage_msite': '/homepage/msite', //课程首页-m站

  'expenselist': '/course/expense/list', //总课程列表 付费课程优先
  'expense_records': '/student/expense/lesson/record', //付费课程进度
  'expense_subject_specific': '/course/subject/specific/P/:subjectId', //付费课程简介
  'expense_subject_lessons': '/course/subject/content/P/:subjectId', //付费课程简介

  'freelist': '/course/free/list', //总课程列表 免费课程优先
  'free_records': '/student/free/lesson/record', //免费课程进度
  'free_subject_specific': '/course/subject/specific/F/:subjectId', //免费课程简介
  'free_subject_lessons': '/course/subject/content/F/:subjectId', //免费课程lessons

  'active_subject': '/course/status/activation/:subjectId', //激活
  'suspend_subject': '/student/expense/subject/suspend', //暂停
  'resume_subject': '/student/expense/subject/resume', //开启(暂停后)

  'update_free_subject_record': '/student/free/lesson/record', // 更新免费课程进度
  'join_subject': '/student/free/subject/registration', //打开免费课程

  /**
   * 专题模块
   */
  'common_topic': '/homepage/topic/common-topic/:ctpId', //通用专题
  'spec_topic': '/homepage/topic/spec-topic/:stpId', //打包课专题
  'boolean_meeting_ticket': '/homepage/topic/common-topic/meeting-ticket', //是否购买年会门票

  /**
   * 鼓励师
   */
  'pyramid_account': '/pyramid/spire/account', // 获取鼓励师信息

  /**
   * 个人中心
   */
  'load_noti_switch': '/person/notification/switch/status', //获取开关状态
  'post_noti_switch': '/person/notification/switch/status',
  'post_suggestion': '/person/suggestion', //提交建议
  'load_person_list': '/person/information/list', //获取系统消息

  /**
   * 院生访谈
   */
  'load_interview_list': '/homepage/interview/interview-list', //获取访谈列表
  'load_interview_record': '/homepage/interview/interview-record/:interviewId', //获取访谈列表

  /**
   * 支付模块
   */
  //获取订单
  'subject_order': '/deal/expense/course/{subjectId}', // 课程 订单
  'common_topic_order': '/deal/expense/common-topic/{ctpId}', // 通用专题 订单
  'spec_topic_order': '/deal/expense/course/package/{stpId}', // 打包课专题 订单
  //支付
  'toubi_pay': '/deal/request', // 投币 支付
  'weChat_app_prepay': '/payment/wx/app/order', // 微信 app 支付
  'weChat_browser_prepay': '/payment/wx/jsapi/order', // 微信 浏览器 支付
  'weChat_code_prepay': '/payment/wx/native/order', // 微信 二维码 支付
  'ali_app_prepay': '/payment/alipay/app/order', //支付宝 app 支付
  'ali_browser_prepay': '/payment/alipay/H5/order', //支付宝 app 支付
  //投币余额
  'toubi_balance': '/deal/coin/current-balance'
}

export const getUrl = (urlPath, server = SEVER_URL, urlMap = apiUrl) => server + urlMap[urlPath]
