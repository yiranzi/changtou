/**
 * Created by jun on 2016/8/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/store'
import global from './global/store'
import navigator from './courseNavigator/store'
import courselist from './courselist/store'
import courseRecords from './courseRecords/store'
import courseDetail from './courseDetail/store'
import myCourses from './myCourse/store'
import mine from './mine/store'
import message from './message/store'
import topicSpec from './topicSpec/store'
import topicCommon from './topicCommon/store'
import interview from './interview/store'
import dailyQuestion from './dailyQuestion/store'
import newertest from './newertest/store'
import homeworkEssay from './homework/essay/store'
import homeworkChoice from './homework/choice/store'
import homeworkList from './homework/mine/store'
import help from './help/store'
import strategyIntro from './strategy/intro/store'
import strategyProduct from './strategy/product/store'
import strategyNotice from './strategy/notice/store'
import graduationDiploma from './graduationDiploma/store'
import newerGift from './newerGift/store'
import questionNaire from './questionNaire/store'
import annualReport from './annualReport/store'
import ebook from './ebook/store'
import classicReading from './classicReading/store'
import newerGuide from './newerGuide/store'
import freshVillage from './freshVillage/store'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    mine, //个人中心
    courseRecords, //用户进度
    courseDetail, //课程详细信息
    user, //用户信息
    global, //全局信息
    navigator, //首页信息
    courselist, //课程列表
    myCourses, //我的课程
    message, //系统消息
    topicSpec, //打包课专题
    topicCommon, //通用专题
    interview, //院生访谈
    dailyQuestion, //每日一题
    newertest, //新手测试
    homeworkEssay, // 问答题
    homeworkChoice, // 选择题
    homeworkList, // 我的作业
    help, //小投答疑
    strategyIntro, // 策略产品 宣传
    strategyProduct, // 策略产品 数据
    strategyNotice, // 滚动通知文字
    graduationDiploma, //毕业证
    newerGift,  // 新手礼包
    questionNaire, // 问卷调查
    annualReport,
    ebook,   //电子书
    classicReading, // 大咖读经典
    newerGuide, //入门指南
    freshVillage //新手村
  }
})
