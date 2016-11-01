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
import systemMessageList from './systemMessageList/store'
import topicSpec from './topicSpec/store'
import topicCommon from './topicCommon/store'
import interview from './interview/store'
import dailyQuestion from './dailyQuestion/store'
import newertest from './newertest/store'
import essay from './homework/essay/store'
import choice from './homework/choice/store'

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
    systemMessageList, //系统消息
    topicSpec, //打包课专题
    topicCommon, //通用专题
    interview, //院生访谈
    dailyQuestion, //每日一题
    newertest //新手测试
    essay,
    choice
  }
})
