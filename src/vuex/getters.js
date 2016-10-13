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
import * as systemMessageListGetters from './systemMessageList/getters'
import * as specTopicGetters from './topicSpec/getters'
import * as commonTopicGetters from './topicCommon/getters'
import * as interviewGetters from './interview/getters'

export {
  userGetters,
  navigatorGetters, //课程导航
  courselistGetters, //全部列表
  courseDetailGetters, //课程详情
  courseRecordsGetters, //进度
  globalGetters,
  myCoursesGetters,
  mineGetters, //个人中心
  systemMessageListGetters, //系统消息提醒
  specTopicGetters, //打包课专题
  commonTopicGetters, //通用课专题
  interviewGetters //院生访谈
}
