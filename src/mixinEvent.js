/**
 * Created by zl on 16/10/30.
 *
 * 全局的事件监听器
 */
import {eventMap} from './frame/eventConfig'
import {loadAllFreeRecords, loadAllExpenseRecords, resetRecords} from './vuex/courseRecords/actions'
import {Jpush} from './plugin/jpush'
import {getDiplomaList} from './vuex/graduationDiploma/actions'
import {getHomeworkList} from './vuex/homework/mine/actions'
import {syncUser} from './vuex/user/actions'
import {isLogin, userId} from './vuex/user/getters'
import {newShowDiploma} from './vuex/graduationDiploma/getters'
import {getKnowledgePointMap} from './vuex/homework/choice/actions'
import ictData from './statistics/ictData'

const mixin = {
  vuex: {
    actions: {
      getKnowledgePointMap,
      loadAllFreeRecords,
      loadAllExpenseRecords,
      resetRecords,
      getDiplomaList,
      getHomeworkList,
      syncUser
    },
    getters: {
      isLogin,
      userId,
      newShowDiploma
    }
  },

  watch: {

  },

  events: {
    /**
     * app 启动的全局事件
     */
    [eventMap.APP_START]: function () {
      console.info('APP_START')
      // 设置推送配置
      Jpush.init()
      // 默认用户 设置成'00'
      Jpush.setAlias('00')
      // 打开app后,设置icon上的数字为0
      Jpush.setIconBadgeNumber(0)
      //传入路由对象用于跳转页面
      Jpush.setRouter(this.$route.router)

      // 添加收到推送的处理
      Jpush.addReceiveHandler(this.onReceiveNotification.bind(this))//todo
      // 添加点击通知事件
      Jpush.openNotification()

      // 同步用户信息
      this.syncUser().then(this.doWhenUserValid)
        .then(() => {})
        .catch(() => { ictData.insertUvRecord({userId: '00'}) })

      // 延迟获取对应知识点, 增加页面的响应速度
      const me = this
      setTimeout(function () {
        me.getKnowledgePointMap()
      }, 500)
    },

    /**
     * 登录成功事件
     */
    [eventMap.LOGIN_SUCCESS]: function (user) {
      //console.info('LOGIN_SUCCESS', user)
      this.doWhenUserValid(user)
    },

    /**
     * 同步用户信息
     */
    [eventMap.SYNC_USER]: function (user) {
      //console.info('SYNC_USER', user)
      this.doWhenUserValid(user)
    },

    /**
     * 注册成功事件
     */
    [eventMap.REGISTER_SUCCESS]: function (user) {
      //console.info('REGISTER_SUCCESS', user)
      this.doWhenUserValid(user)
    },

    /**
     * 退出账号事件
     */
    [eventMap.LOGOUT]: function (user) {
      //console.info('LOGOUT', user)
      this.doWhenUserNotValid(user)
      // 清除缓存
      window.localStorage.clear()
    },

    /**
     * 毕业
     */
    [eventMap.SUBJECT_GRADUATION]: function ({subjectId}) {
      this.showMask({
        component: 'graduationDiploma/Congratulation.vue',
        hideOnMaskTap: true,
        callbackName: 'graduationCongratulationConfirm',
        callbackFn: () => {
          this.$route.router.go(`/graduation/subject/diploma/${subjectId}`)
        }
      })
    },

    /**
     * 首屏加载完毕
     */
    [eventMap.NAVIGATOR_LOADED]: function () {
      this.hideSplashscreen()
    },

    /**
     * 章节播放,这里做中转,供横屏页面监听同步
     * @param chapter
     */
    chapterPlay (chapter) {
      this.$broadcast('vaildChapterPlay', chapter)
    }
  },

  methods: {
    /**
     * 用户信息合法并且成功进入系统
     * @param user
     */
    doWhenUserValid: function (user) {
      // 向统计后台发送用户数据
      // 更新用户数据
      ictData.updateUser(user)
      // 插入访问记录
      ictData.insertUvRecord(user)

      // 设置jpush用户关联
      Jpush.setAlias(user.userId)
      Jpush.setIconBadgeNumber(user.newMessageNum)

      let tasks = []
      // 获取课程进度
      tasks.push(this.loadAllFreeRecords())
      tasks.push(this.loadAllExpenseRecords())
      // 获取毕业证列表
      tasks.push(this.getDiplomaList().then(this.onGraduationDiplomaLoaded))
      // 获取作业目录
      tasks.push(this.getHomeworkList())

      return Promise.all(tasks).then(
        //this.hideSplashscreen
        () => user
      ).catch(
        () => null
      )
    },

    /**
     * 如果没有合法的用户
     * （未登录，账户退出）
     */
    doWhenUserNotValid: function () {
      // 清理课程进度
      this.resetRecords()
      // 设置推送关联
      Jpush.setAlias('00')
      Jpush.setIconBadgeNumber(0)
    },

    /**
     * 隐藏启动图片
     */
    hideSplashscreen: function () {
      //if (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS) {
      if (window.navigator.splashscreen) {
        window.navigator.splashscreen.hide()
      }
      //}
    },

    /**
     * 下载了用户的毕业证列表
     */
    onGraduationDiplomaLoaded: function () {
      if (this.newShowDiploma) {
        this.$dispatch(eventMap.SUBJECT_GRADUATION, this.newShowDiploma)
      }
    },

    /**
     * 跳转到指定页面
     * @param event
     */
    onReceiveNotification: function (event) {
      if (event.extras['type'] === 'IN_APP') {
        let desurl = event.extras['desurl']
        this.$route.router.go(desurl)
      }
    }
  }
}

export default mixin
