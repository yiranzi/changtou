/**
 * Created by jun on 2016/8/23.
 */
import * as userGetters from './user/getters'
import * as navigatorGetters from './courseNavigator/getters'
import * as courselistGetters from './courselist/getters'
import * as courseDetailGetters from './courseDetail/getters'
import * as courseRecordsGetters from './courseRecords/getters'
import * as globalGetters from './global/getters'
import * as myCoursesGetters from './myCourse/getters'
import * as mineGetters from './mine/getters'
import * as messageGetters from './message/getters'
import * as specTopicGetters from './topicSpec/getters'
import * as commonTopicGetters from './topicCommon/getters'
import * as interviewGetters from './interview/getters'
import * as dailyQuestionGetters from './dailyQuestion/getters'
import * as newertestGetters from './newertest/getters'
import * as essayGetters from './homework/essay/getters'
import * as choiceGetters from './homework/choice/getters'
import * as homeworkListGetters from './homework/mine/getters'
import * as helpGetters from './help/getters'
import * as strategyIntroGetters from './strategy/intro/getters'
import * as strategyProductGetters from './strategy/product/getters'
import * as strategyNoticeGetters from './strategy/notice/getters'
import * as graduationDiplomaGetters from './graduationDiploma/getters'
import * as giftGetters from './newerGift/getters'
import * as questionNaireGetters from './questionNaire/getters'
import * as annualReportGetters from './annualReport/getters'
import * as ebookGetters from './ebook/getters'
import * as newerGuideGetters from './newerGuide/getters'
import * as classicReadingGetters from './classicReading/getters'
import * as villageGetters from './freshVillage/getters'
import * as appUpdateGetters from './appUpdate/getters'
import * as headlineGetters from './headline/getters'
import * as buildingGetters from './building/getters'
import * as topicArticleGetters from './topicArticle/getters'
export {
  userGetters,
  navigatorGetters, //课程导航
  courselistGetters, //全部列表
  courseDetailGetters, //课程详情
  courseRecordsGetters, //进度
  globalGetters,
  myCoursesGetters,
  mineGetters, //个人中心
  messageGetters, //系统消息提醒
  specTopicGetters, //打包课专题
  commonTopicGetters, //通用课专题
  interviewGetters, //院生访谈
  dailyQuestionGetters, //每日一题
  newertestGetters, //新手测试
  essayGetters, // 问答题
  choiceGetters, // 选择题
  homeworkListGetters, // 我的作业
  helpGetters, //小投答疑
  strategyIntroGetters, // 策略产品 宣传
  strategyProductGetters, // 策略产品 数据
  strategyNoticeGetters,  //策略产品 通知
  graduationDiplomaGetters,  //毕业证
  giftGetters,                           // 新手礼包
  questionNaireGetters,          // 问卷调查
  annualReportGetters,  //年度报告
  ebookGetters,    //电子书
  newerGuideGetters, //入门指南
  classicReadingGetters,  //大咖读经典
  villageGetters,  //理财新手村
  appUpdateGetters,  //应用更新
  headlineGetters,  //头条精选
  buildingGetters,  //造房子
  topicArticleGetters  //专题文章
}
