/**
 * Created by zl on 16/10/30.
 *
 * 全局的事件监听器
 */
import {eventMap} from './frame/eventConfig'
import {loadAllFreeRecords, loadAllExpenseRecords, resetRecords} from './vuex/courseRecords/actions'
import {jpushInit, jpushSetAlias, jpushAddReceiveHandler} from './vuex/jpush/actions'
import {getDiplomaList} from './vuex/graduationDiploma/actions'
import {getHomeworkList} from './vuex/homework/mine/actions'
import {syncUser} from './vuex/user/actions'
import {isLogin, userId} from './vuex/user/getters'
import {newShowDiploma} from './vuex/graduationDiploma/getters'
import {getKnowledgePointMap} from './vuex/homework/choice/actions'

const mixin = {
  vuex: {
    actions: {
      getKnowledgePointMap,
      loadAllFreeRecords,
      loadAllExpenseRecords,
      resetRecords,
      jpushInit,
      jpushSetAlias,
      jpushAddReceiveHandler,
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
    //'isLogin': function (currLoginStatus, preloginStatus) {
    //  if (currLoginStatus) {
    //    this.setAlias(this.userId)
    //  } else {
    //    this.setAlias('00')
    //  }
    //}
  },

  events: {
    /**
     * app 启动的全局事件
     */
    [eventMap.APP_START]: function () {
      console.info('APP_START')

      // 设置推送配置
      this.jpushInit()
      // 默认用户 设置成'00'
      this.jpushSetAlias('00')
      // 增加推送消息接收处理
      this.jpushAddReceiveHandler(this.onReceiveNotification)

      // 同步用户信息
      this.syncUser().then(this.doWhenUserValid)
        .then(() => {})
        .catch(() => {})

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
      let tasks = []
      // 获取课程进度
      tasks.push(this.loadAllFreeRecords())
      tasks.push(this.loadAllExpenseRecords())
      // 设置jpush用户关联
      tasks.push(Promise.resolve(user.userId).then(this.jpushSetAlias))
      // 获取毕业证列表
      tasks.push(this.getDiplomaList().then(this.onGraduationDiplomaLoaded))

      tasks.push(this.getHomeworkList())
      return Promise.all(tasks).then(
        //this.hideSplashscreen
      ).catch(
        () => {}
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
      this.jpushSetAlias('00')
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
    }
  }
}

export default mixin
