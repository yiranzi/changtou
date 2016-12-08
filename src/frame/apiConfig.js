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
  'qq_login': '/3rdparty//qq/login/info', // qq登录
  'wx_app_login': '/wx/app/authorization/user-info',

  /**
   * 课程模块
   */
  'my_course': '/course/my/subjects', //我的课程

  'homepage_app': '/homepage/app', //课程首页-app
  'homepage_msite': '/homepage/msite', //课程首页-m站
  'course_list': '/course/free/category-list', //课程列表

  'expense_records': '/student/expense/lesson/record', //付费课程进度
  'expense_subject_specific': '/course/subject/specific/P/:subjectId', //付费课程简介
  'expense_subject_lessons': '/course/subject/content/P/:subjectId', //付费课程简介

  'free_records': '/student/free/lesson/record', //免费课程进度
  'free_subject_specific': '/course/subject/specific/F/:subjectId', //免费课程简介
  'free_subject_lessons': '/course/subject/content/F/:subjectId', //免费课程lessons

  'active_subject': '/course/status/activation/:subjectId', //激活
  'suspend_subject': '/student/expense/subject/suspend', //暂停
  'resume_subject': '/student/expense/subject/resume', //开启(暂停后)

  'update_free_subject_record': '/student/free/lesson/record', // 更新免费课程进度
  'join_subject': '/student/free/subject/registration', //打开免费课程

  'seminar': '/course/seminar/:seminarId', //讲座
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
   * 小投答疑
   */
  'help_load_QA_list': '/suggestion/common-qanda', //获取自助答疑列表
  'help_submit_question': '/suggestion/add-suggestion', //提交用户问题
  'help_load_QA_records': '/suggestion/get-records', //获取问答记录

  /**
   * 新手测试
   */
  'newertest_report': '/homepage/newcomer-test/report', //测试报告

  /**
   * 院生访谈
   */
  'load_interview_list': '/homepage/interview/interview-list', //获取访谈列表
  'load_interview_record': '/homepage/interview/interview-record/:interviewId', //获取访谈列表

  /**
   * 每日一题
   */
  'load_daily_question': '/homepage/daily-question/lastest-question', //获取每日一题
  'submit_answer': '/homepage/daily-question/submit-answer', //用户提交答案

  /**
   * 订单获取
   */
  //获取订单
  'order_subject': '/deal/expense/course/:id', // 课程 订单
  'order_common_topic': '/deal/expense/common-topic/:id', // 通用专题 订单
  'order_spec_topic': '/deal/expense/course/package/:id', // 打包课专题 订单
  'order_pro_strategy': '/deal/expense/pro-changtoubao',  // 专业版 长投宝
  'order_vip_strategy': '/deal/expense/vip-changtoubao', // vip 长投宝

  /**
   * 支付流程
   */
  'pay_toubi': '/deal/request', // 投币 支付
  'pay_weChat_app': '/payment/wx/app/order', // 微信 app 支付
  'pay_weChat_browser': '/payment/wx/jsapi/order', // 微信 浏览器 支付
  'pay_weChat_code': '/payment/wx/native/order', // 微信 二维码 支付
  'pay_ali_app': '/payment/alipay/app/order', //支付宝 app 支付
  'pay_ali_browser': '/payment/alipay/H5/order', //支付宝 app 支付
  //投币余额
  'toubi_balance': '/deal/coin/current-balance',

  /**
   * 作业
   */
  'homework_mine_list': '/student/expense/my/articles', // 我的作业 列表
  'homework_drafts_list': '/student/article/draft-box', //草稿箱列表
  'homework_delete_drafts': '/student/article/draft-box/:articleId', //删除草稿
  'homework_get_article': '/student/expense/lesson/article/:lessonId', //获取作业或草稿
  'homework_submit_article': '/student/expense/lesson/article', //提交作业或草稿
  'homework_get_report': '/student/choice-question-report/:lessonId', // 获取选择题 测试报告
  'homework_submit_report': '/student/choice-question-report', // 提交选择题 测试报告
  'homework_get_choice_knowledge_point': '/course/knowledge-point', // 获取选择题 对应知识点
  'homework_get_choice_question': '/student/choice-question/:lessonId', // 获取选择题
  'homework_get_essay_question': '/student/essay-question/:lessonId', // 获取问答题

  /**
   * 策略产品
   */
  'strategy_vip_data': '/strategy/data/vip',
  'strategy_professional_data': '/strategy/data/professional',
  'strategy_professional_intro': '/strategy/promotion/professional',
  'strategy_vip_intro': '/strategy/promotion/vip',
  'strategy_notice': '/strategy/data/message/:authority' // 通知

}

export const getUrl = (urlPath, server = SEVER_URL, urlMap = apiUrl) => server + urlMap[urlPath]
