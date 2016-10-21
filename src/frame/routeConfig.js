/**
 * Created by jun on 2016/8/22.
 * 路由
 */
import { sync } from 'vuex-router-sync'
import store from '../vuex/store'

/**
 * 清除路由
 * @type {Storage}
 */
let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

const setRouterHook = (router, commit) => {
  router.beforeEach(({ to, from, next }) => {
    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)
    if (toIndex) {
      if (toIndex > fromIndex) {
        commit('UPDATE_DIRECTION', 'forward')
      } else {
        commit('UPDATE_DIRECTION', 'reverse')
      }
    } else {
      ++historyCount
      history.setItem('count', historyCount)
      to.path !== '/' && history.setItem(to.path, historyCount)
      commit('UPDATE_DIRECTION', 'forward')
    }
    commit('UPDATE_LOADING', true)
    setTimeout(next, 50)
  })

  router.afterEach(() => {
    commit('UPDATE_LOADING', false)
  })
}

export function configRouter (router) {
  const commit = store.commit || store.dispatch
  setRouterHook(router, commit)

  // 同步store的路由状态
  sync(store, router)

  router.map({
    /**
     * 课程模块
     */
    '/main': { //主页面课程导航页
      component: require('../views/course/Navigator.vue')
    },
    '/totalList/:type': { //查看所有课程列表页
      component: require('../views/course/Courselist.vue')
    },
    'subject/detail/F/:subjectId/:position': { //课程详情页
      component: require('../views/course/CourseDetailFree.vue')
    },
    'subject/detail/P/:subjectId/:position': { //课程详情页
      component: require('../views/course/CourseDetailExpense.vue')
    },
    '/mycourse': {    //我的课程
      component: require('../views/course/MyCourse.vue')
    },
    /**
     * 登录模块
     */
    // 登录
    '/entry': {
      component: require('../views/principal/Entry.vue')
    },
    // 注册1
    '/register/start': {
      component: require('../views/principal/register/RegisterStart.vue')
    },
    // 注册2
    '/register/end/:phone/:plainPassword': {
      component: require('../views/principal/register/RegisterEnd.vue')
    },
    // 用户协议
    '/user/agreement': {
      component: require('../views/principal/register/UserAgreement.vue')
    },
    //重置密码1
    '/reset/password/start': {
      component: require('../views/principal/resetPassword/ResetPasswordStart.vue')
    },
    //重置密码2
    '/reset/password/:phone': {
      component: require('../views/principal/resetPassword/ResetPassword.vue')
    },
    //重置密码3
    '/reset/password/end/:phone': {
      component: require('../views/principal/resetPassword/ResetPasswordEnd.vue')
    },

    //修改绑定的手机号
    '/bind/phone': {
      component: require('../views/principal/bindPhone/BindPhone.vue')
    },
    //绑定手机号发送验证码
    '/bind/phone/end/:phone': {
      component: require('../views/principal/bindPhone/BindPhoneEnd.vue')
    },

    /**
     * 个人中心
     */
    // 个人中心首页
    '/setting': {
      component: require('../views/mine/Setting.vue')
    },
    // 设置
    '/configuration': {
      component: require('../views/mine/Configuration.vue')
    },
    // 关于我们
    '/contact/us': {
      component: require('../views/mine/ContactUs.vue')
    },
    // 意见反馈
    '/feedback': {
      component: require('../views/mine/Feedback.vue')
    },
    // 个人信息
    '/personal/information': {
      component: require('../views/mine/PersonalInformation.vue')
    },
    // 系统消息
    '/system/message': {
      component: require('../views/mine/SystemMessage.vue')
    },

    /**
     * 支付模块
     */
    // 支付成功
    'pay/success/:type': {
      component: require('../views/pay/Success.vue')
    },

    /**
     * 专题模块
     */
    //通用专题
    '/common/topic/:ctpId': {
      component: require('../views/topic/CommonTopic.vue')
    },
    //打包课专题
    '/spec/topic/:stpId': {
      component: require('../views/topic/SpecTopic.vue')
    },

    /**
     * 院生访谈
     */
    //访谈列表
    '/interview/interview-list': {
      component: require('../views/interview/InterviewList.vue')
    },
    //访谈内容
    '/interview/interview-record/:interviewId': {
      component: require('../views/interview/InterviewRecord.vue')
    }
  })

  // redirect
  router.redirect({
    '': '/main'
  })
}
