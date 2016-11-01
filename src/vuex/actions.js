/**
 * Created by jun on 2016/8/23.
 */
import * as userActions from './user/actions'
import * as navigatorActions from './courseNavigator/actions'
import * as courselistActions from './courselist/actions'
import * as courseRecordActions from './courseRecords/actions'
import * as courseDetailActions from './courseDetail/actions'
import * as globalActions from './global/actions'
import * as myCoursesActions from './myCourse/actions'
import * as mineActions from './mine/actions'
import * as systemMessageListActions from './systemMessageList/actions'
import * as specTopicActions from './topicSpec/actions'
import * as commonTopicActions from './topicCommon/actions'
import * as interviewActions from './interview/actions'
import * as dailyQuestionActions from './dailyQuestion/actions'
import * as newertestActions from './newertest/actions'
import * as essayActions from './homework/essay/actions'
import * as choiceActions from './homework/choice/actions'

export {
  userActions,
  navigatorActions,
  courselistActions,
  courseRecordActions,
  courseDetailActions,
  globalActions,
  myCoursesActions,
  mineActions,
  systemMessageListActions, //系统消息提醒
  specTopicActions, //打包课专题
  commonTopicActions, //通用专题
  interviewActions, //院生访谈
  dailyQuestionActions, //每日一题
  newertestActions //新手测试
  essayActions,
  choiceActions
}
