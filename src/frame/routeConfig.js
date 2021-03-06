/**
 * Created by jun on 2016/8/22.
 * 路由
 */
import { sync } from 'vuex-router-sync'
import {setRouterHook} from './pageTransAnimation'
import store from '../vuex/store'

/**
 *
 * @param router
 */
export function configRouter (router) {
  const commit = store.commit || store.dispatch
  setRouterHook(router, commit)

  // 同步store的路由状态
  sync(store, router)

  router.map({
    /**
     * 课程模块
     */
    // '/main': { //主页面课程导航页
    //   component: require('../views/course/Navigator.vue')
    // },
    '/main': { //主页面课程导航页
      component: require('../views/course/Test.vue')
    },
    '/totalList': { //查看所有课程列表页
      component: require('../views/course/Courselist.vue')
    },

    '/course/classification': { //查看所有课程列-按照分类排列
      component: require('../views/course/Classification.vue')
    },
    'subject/detail/F/:subjectId/:position': { //课程详情页
      component: require('../views/course/CourseDetailFree.vue')
    },
    'subject/detail/P/:subjectId/:position': { //课程详情页
      component: require('../views/course/CourseDetailExpense.vue')
    },
    'seminar/:seminarId': { //课程详情页
      component: require('../views/course/Seminar.vue')
    },
    '/mycourse': {    //我的课程
      component: require('../views/course/MyCourse.vue')
    },
    '/landscape/:subjectId/:lessonId': { //横屏
      component: require('../views/course/Landscape.vue')
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
    // 修改昵称
    '/resetNickName': {
      component: require('../views/mine/ResetNickName.vue')
    },

    /**
     * 小投答疑
     */
    //自助答疑
    '/self/service': {
      component: require('../views/help/SelfService.vue')
    },
    //人工解答
    '/manual/service': {
      component: require('../views/help/ManualService.vue')
    },

    /**
     * 支付模块
     */
    // 支付成功
    '/pay/success/:type/:id': {
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
     * 新手测试
     */
    //新手测试起始页
    '/newertest/start': {
      component: require('../views/newertest/NewertestStart.vue')
    },
    //答题页
    '/newertest/question': {
      component: require('../views/newertest/NewertestQuestion.vue')
    },
    //结果页
    '/newertest/ending': {
      component: require('../views/newertest/NewertestEnd.vue')
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
    },
    /**
     * 每日一题
     */
    //获取每日一题
    '/daily/quiz': {
      component: require('../views/daily/DailyQuestion.vue')
    },
    //用户提交答案
    '/daily/answer': {
      component: require('../views/daily/DailyQuestionAnswer.vue')
    },

      /**
       * 作业
       */
    '/homework/mine': {
        component: require('../views/homework/Mine.vue')
      },
    //草稿箱
    '/homework/drafts': {
      component: require('../views/homework/Drafts.vue')
    },
    //问答题 写作业
    '/homework/essay/answer/:subjectId/:lessonId': {
      component: require('../views/homework/EssayAnswer.vue')
    },
    //问答题 看分数
    '/homework/essay/mark/:subjectId/:lessonId': {
      component: require('../views/homework/EssayMark.vue')
    },
    //选择题 做测试
    '/homework/choice/answer/:subjectId/:lessonId': {
      component: require('../views/homework/ChoiceAnswer.vue')
    },
    //选择题 看分数
    '/homework/choice/mark/:subjectId/:lessonId': {
      component: require('../views/homework/ChoiceMark.vue')
    },
    /**
     * 策略产品
     */
    //策略 专业版 宣传
    '/strategy/professional/intro': {
      component: require('../views/strategy/ProfessionalIntro.vue')
    },
    //策略 vip 宣传
    '/strategy/vip/intro': {
      component: require('../views/strategy/VipIntro.vue')
    },
    //策略 vip 数据
    '/strategy/vip/product': {
      component: require('../views/strategy/VipProduct.vue')
    },
    //策略 专业版 数据
    '/strategy/professional/product': {
      component: require('../views/strategy/ProfessionalProduct.vue')
    },
    '/strategy/duoyinzi/faq': {
      component: require('../views/strategy/DuoYinZiFaq.vue')
    },
    //延期说明
    '/postpone/explain': {
      component: require('../views/pay/PostponeExplain.vue')
    },

      /**
       * 毕业礼
       */
    // 毕业证 详情
    '/graduation/subject/diploma/:subjectId': {
      component: require('../views/graduationDiploma/SubjectDiploma.vue')
    },
    // 毕业证 列表
    '/graduation/list': {
      component: require('../views/graduationDiploma/DiplomaList.vue')
    },

    /**
     * 新手礼包
     */
     '/newerGift/giftPackageDetails': {
      component: require('../views/newerGift/giftPackageDetails.vue')
    },
    /**
     * 优惠信息
     */
    '/coupon/details': {
      component: require('../views/newerGift/CouponDetails.vue')
    },
    /**
     * 问卷调查
     */
    '/questionNaire/:naireId': {
      component: require('../views/questionnaire/questionDetail1.vue')
    },
    /**
     * 新手攻略 页面一
     */
    '/guide/test': {
      component: require('../views/newerGuide/GuideTest.vue')
    },
    /**
     * 新手攻略 页面二
     */
    '/guide/present': {
      component: require('../views/newerGuide/GuidePresent.vue')
    },
    /**
     * 大数据 活动
     */
    '/annual/report': {
      component: require('../views/annualReport/AnnualReport.vue')
    },

    /**
     * 电子书 简介页
     */
    '/ebook/detail/:bookId': {
      component: require('../views/ebook/Detail.vue')
    },

    /**
     * 电子书 阅读页
     */
    '/ebook/chapter/:bookId/:chapterId': {
      component: require('../views/ebook/Chapter.vue')
    },
    /*
    *大咖读经典
    */
    '/classic/reading/:classicId': {
      component: require('../views/classicReading/ClassicReading.vue')
    },

    /*
    *开机引导页
    */
    '/start': {
      component: require('../views/start/GuideView.vue')
    },
    /**
     * 新手村
     */
    //我要吐槽
    '/village/advise': {
      component: require('../views/freshVillage/Advise.vue')
    },
    //内容填写
    '/village/fill/content': {
      component: require('../views/freshVillage/FillContent.vue')
    },
    // 新手村主界面
    '/village/map': {
      component: require('../views/freshVillage/ChapterMap.vue')
    },
    //新手村初始页面
    '/village/initialPage': {
      component: require('../views/freshVillage/InitialPage.vue')
    },
    //新手村今日小智
    '/village/wisdom/:chapterNo/:questionNo': {
      component: require('../views/freshVillage/Wisdom.vue')
    },
    //新手村章节开始页
    '/village/chapterstart/:chapterNo': {
      component: require('../views/freshVillage/ChapterStart.vue')
    },

    /**
     * 头条精彩
     */
    '/headline': {
      component: require('../views/headline/Headline.vue')
    },

    /**
     * 造房子
     */
    // 造房子展示页
    '/building/show': {
      component: require('../views/building/BuildingShow.vue')
    },
    // 造房子添加物品页
    '/building/add': {
      component: require('../views/building/AddBuilding.vue')
    },
    //造房攻略
    '/building/rule': {
      component: require('../views/building/BuildingRule.vue')
    },
    //造房简介
    '/building/introduction': {
      component: require('../views/building/BuildingIntroduction.vue')
    },
    /**
     * 文章列表
     */
    '/topic-article/list/:topicId': {
      component: require('../views/topicArticle/ArticleList.vue')
    },
    '/topic-article/article/:articleId': {
      component: require('../views/topicArticle/ArticleContent.vue')
    }

  })

  // redirect
  router.redirect({
    '': '/start'
  })
}
