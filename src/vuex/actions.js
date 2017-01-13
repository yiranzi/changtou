/**
 * Created by jun on 2016/8/23.
 */
import * as userActions from './user/actions'
import * as navigatorActions from './courseNavigator/actions'
import * as courselistActions from './courselist/actions'
import * as courseRecordActions from './courseRecords/actions'
import * as courseDetailActions from './courseDetail/actions'
//import * as globalActions from './global/actions'
import * as myCoursesActions from './myCourse/actions'
import * as mineActions from './mine/actions'
import * as messageActions from './message/actions'
import * as specTopicActions from './topicSpec/actions'
import * as commonTopicActions from './topicCommon/actions'
import * as interviewActions from './interview/actions'
import * as dailyQuestionActions from './dailyQuestion/actions'
import * as newertestActions from './newertest/actions'
import * as essayActions from './homework/essay/actions'
import * as choiceActions from './homework/choice/actions'
import * as homeworkListActions from './homework/mine/actions'
import * as helpActions from './help/actions'
import * as strategyIntroActions from './strategy/intro/actions'
import * as strategyProductActions from './strategy/product/actions'
import * as strategyNoticeActions from './strategy/notice/actions'
import * as graduationDiplomaActions from './graduationDiploma/actions'
import * as giftActions from './giftPackage/actions'
import * as questionNaireActions from './questionNaire/actions'

export {
  userActions,
  navigatorActions,
  courselistActions,
  courseRecordActions,
  courseDetailActions,
  //globalActions,
  myCoursesActions,
  mineActions,
  messageActions, //系统消息提醒
  specTopicActions, //打包课专题
  commonTopicActions, //通用专题
  interviewActions, //院生访谈
  dailyQuestionActions, //每日一题
  newertestActions, //新手测试
  essayActions, // 问答题
  choiceActions, // 选择题
  homeworkListActions, // 我的作业
  helpActions, //小投答疑
  strategyIntroActions, // 策略产品 宣传
  strategyProductActions, // 策略产品 数据
  strategyNoticeActions, //策略产品 通知
  graduationDiplomaActions, // 毕业证
  giftActions,          // 新手礼包
  questionNaireActions         // 调查问卷
}
