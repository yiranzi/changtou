<template>
  <div style="height: 100%;" class="subject-detail">
    <ict-back-btn></ict-back-btn>

    <scroller :lock-x="true" scrollbar-y :bounce="false" v-ref:scroller :height="scrollerHeight" style="background-color: #fff">
      <div>
        <img v-if="!hasValidChapterClicked" v-bind:src="currSubject ? currSubject.pic : './static/image/subject/intro-mini-pic.png'"
             alt="" style="height: 13rem; width: 100%; display: block">

        <ppt-panel v-if="hasValidChapterClicked" :ppts="currPpts"></ppt-panel>

        <web-audio v-show="hasValidChapterClicked" :src.sync="currAudioSrc"></web-audio>

        <!--没有获取到课程内容时显示-->
        <div v-show="0">没有内容</div>

        <!--简介和目录-->
        <div v-show="1" style="height: 100%; background-color: #fff">
          <div>
            <tab :line-width=2 active-color='#00b0f0' :index.sync="currTabIndex">
              <tab-item class="vux-center" :selected="currTabItem === 's'">简介</tab-item>
              <tab-item class="vux-center" :selected="currTabItem === 'c'">目录</tab-item>
            </tab>
          </div>

          <specific v-show='currTabIndex === 0' :subject="currSubject"></specific>
          <content v-show='currTabIndex === 1' :lessons="currSubject ? currSubject.lessonList : []" :selected-lesson.sync="selectedLesson"
                   :selected-chapter.sync="selectedChapter">
          </content>

        </div>
      </div>
    </scroller>

    <!--底部的btn-->
    <div class="bottom-area"  v-show="currStatus !== 'N'" v-el:bottom-btn>
       <div v-if="currStatus === 'L'" class="btn-box">
        <ict-button class="right">加载中..</ict-button>
      </div>

      <div v-if="currStatus === 'W'" class="btn-box">
        <ict-button class="right" v-touch:tap="join">参加课程</ict-button>
      </div>
    </div>
  </div>
</template>
<style lang="less">

</style>

<script>
  import IctBackBtn from '../../components/IctCourseBackBtn.vue'
  import WebAudio from '../../components/WebAudio.vue'
  import PptPanel from '../../components/IctCoursePptPanel.vue'
  import Specific from '../../components/IctCouserSpecificFree.vue'
  import Content from '../../components/IctCourseContentFree.vue'
  import IctButton from '../../components/IctButton.vue'
  import {Tab, TabItem} from 'vux/tab'
  import Confirm from 'vux/confirm'
  import Scroller from 'vux/scroller'
  import Sticky from 'vux/sticky'
  import {courseDetailActions, courseRecordActions} from '../../vuex/actions'
  import {courseDetailGetters, courseRecordsGetters, userGetters} from '../../vuex/getters'
  import {setSessionCache} from '../../util/cache'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  import {MSITE_URL} from '../../frame/serverConfig'
  export default {
    vuex: {
      getters: {
        freeSubjectArr: courseDetailGetters.freeDetailArr,
        freeRecordsArr: courseRecordsGetters.freeRecords,
        isUserLogin: userGetters.isLogin
      },
      actions: {
        loadfreeSubject: courseDetailActions.loadFreeSubject,
        loadfreeRecord: courseRecordActions.loadOneSubjectFreeRecord,

        joinSubject: courseRecordActions.joinSubject,
        updateSubject: courseRecordActions.updateSubjectRecord
      }
    },

    /**
     *
     */
    data () {
      return {
        isResponsive: true, // 当前页面是否处于可响应状态 ((响应 音频播放完成,全屏 事件))
        scrollerHeight: '480px',

        isLoadedFail: false, //数据是否加载完毕
        subjectId: '', //课程Id
        hasValidChapterClicked: false,

        currSubject: null, // 当前课程
        currStatus: 'L', //当前课程状态 {N：在读 | W : 没有进度} 默认L: 加载中
        recentLessonId: 0,

        currTabItem: 's', //选项卡当前选中项目 s表示简介, c表示目录
        currTabIndex: 0,

        selectedLesson: null, //当前选中的lesson
        selectedChapter: null, //当前选中的chapter
        currAudioSrc: null, //当前音频地址
        currPpts: [], //当前ppt地址集合

        isSelectdLessonLimited: false //当前选中lesson是否受限
      }
    },

    watch: {
      /**
       * 当前课程详情加载成功
       */
      'currSubject': function (newSubject) {
        this.shareConfig = {
          title: newSubject.title,
          desc: newSubject.subtitle,
          link: `${MSITE_URL}index.html#!/subject/detail/F${this.subjectId}/0`,
          imgUrl: newSubject.pic
        }
        this.onViewChange()
      },
      // 当按钮消失,滚动条高度重置
      'currStatus': function (val) {
        if (val === 'N') {
          this.scrollerHeight = window.document.body.offsetHeight + 'px'
        } else {
          // do nothing
        }
      },

      'currTabIndex': function () {
        this.resetScroller()
      },

      /**
       * 设置课程id时, 获取课程信息, 获取进度信息
       */
      'subjectId': function (newSubjectId, oldSubjectId) {
        //设置课程信息
        this.currSubject = this.freeSubjectArr.find(subject => subject.subjectId === newSubjectId)
        this.resetScroller()
        //获取进度信息
        let currSubjectRecord = this.freeRecordsArr.find(subject => (subject.subjectId + '') === newSubjectId)
        this.setSubjectRecordStatus(currSubjectRecord)
      },

      /**
       *进度改变
       */
      'freeRecordsArr': function (newRecords, oldRecords) {
        if (this.subjectId !== '') {
          //获取进度信息
          let currSubjectRecord = this.freeRecordsArr.find(subject => (subject.subjectId + '') === this.subjectId)
          this.setSubjectRecordStatus(currSubjectRecord)
        }
      }
    },
    /**
     * 路由函数
     */
    route: {
      /**
       * 初始化页面数据
       * 加载课程信息, 加载进度
       * @param type
       * @param subjectId
       * @returns {{type: string}}
       */
      data ({to: {params: {subjectId}}, from}) {
        this.resetScroller()
        // 判断前一个页面, 如果是从横屏退过来的页面不做其他处理
        if (from.path && from.path.indexOf('landscape/') > -1) {
          // do nothing
        } else {
          this.resetView()

          const tasks = [this.loadfreeSubject(subjectId)]
          if (this.isUserLogin) {
            tasks.push(this.loadfreeRecord(subjectId))
          }

          return Promise.all(tasks).then(
            () => {
              return {subjectId: subjectId, isLoadedFail: false, isResponsive: true}
            },
            () => {
              return {isLoaded: false, isLoadedFail: true, isResponsive: true}
            }
          )
        }
      },

      /**
       * 页面隐藏时
       */
      deactivate ({to, next}) {
        this.shareConfig = null
        this.onViewChange()
        // 如果是跳转到横屏页面, 不打断音频
        if (to.path && to.path.indexOf('landscape/') > -1) {
          next()
        } else {
          // 跳转到非横屏页面
          // 停止音频播放
          // 设置不可响应
          this.pause()
          this.isResponsive = false
          next()
        }
      }
    },

    ready () {
      this.scrollerHeight = (window.document.body.offsetHeight - this.$els.bottomBtn.offsetHeight) + 'px'
    },

    /**
     * 设置监听事件
     */
    events: {
      /**
       * 选中某个chapter, 设置音频,ppt ,跳转逻辑
       */
      'chapterSelectedFree': function (chapter) {
        this.playChapter(chapter)
      },

      /**
       * 当全屏被点击
       */
      'fullScreenTap' () {
        if (this.isResponsive) {
          this.goToFullScreen(this.subjectId, this.selectedLesson, this.currChapterIndex)
        }
      },

      /**
       * 音频播放结束
       * 继续播放下一节可用的音频
       */
      'audioPlayEnd' () {
        if (this.isResponsive) {
          // 尝试播放下一个章节
          // 由子组件接收事件控制
          this.$broadcast('playNextCapterFree')
        }
      }
    },

    methods: {
      resetScroller () {
        this.scrollerHeight = (window.document.body.offsetHeight - this.$els.bottomBtn.offsetHeight) + 'px'
        this.$nextTick(() => {
          this.$refs.scroller.reset({
              top: 0
          })
        })
      },

      back () {
        window.history.back()
      },

      /**
       * 重置页面
       */
      resetView () {
        this.hasValidChapterClicked = false
        this.pause()
      },

      /**
       * 设置课程状态
       */
      setSubjectRecordStatus (currSubjectRecord) {
        //设置课程状态
        if (currSubjectRecord) {
          this.currStatus = currSubjectRecord.status
          this.recentLessonId = currSubjectRecord.currentLessonId
        } else {
          this.currStatus = 'W'
        }
      },

      /**
       * 暂停课程
       */
      pause () {
        this.$broadcast('pause')
      },

      /**
       * 与服务器同步课程进度
       */
      syncRecord () {
        this.loadfreeRecord(this.subjectId)
      },

      /**
       * 更新免费课程进度
       */
      updateRecord () {
        const me = this
        me.updateSubject({prevLessonId: me.recentLessonId, lessonId: me.selectedLesson.lessonId}).then(
          function () {
            me.syncRecord()
          },
          function () {
          }
        )
      },

      /**
       * 参加课程
       */
      join () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.SUBJECT_JOIN_TAP, {
          '商品名称': this.currSubject.title
        })
        if (this.isUserLogin) {
          const me = this
          me.joinSubject(parseInt(me.subjectId)).then(
            function () {
              me.syncRecord()
              me.showToast({message: '参加课程成功', type: 'success'})
            }
          ).catch(
            function () {
              me.showToast({message: '参加课程失败,请重试'})
            }
          )
        } else {
          this.showLogin()
        }
      },

      /**
       * 提示登录
       **/
      showLogin () {
        const me = this

        const activeHandler = function () {
          me.$route.router.go('/entry')
        }

        const msg = '<p>您尚未登录,无法同步你的学习进度,请登录之后参加课程</p>'
        // 这里加入延迟是防止出现msg被点透的情况
        setTimeout(function () {
          me.showConfirm({
            title: '',
            message: msg,
            okText: '立即登录',
            cancelText: '暂不登录',
            okCallback: activeHandler
          })
        }, 200)
      },

      /**
       * 跳转到横屏
       */
      goToFullScreen (subjectId, lesson, chapterIndex) {
        setSessionCache('landscapeSrc', {lesson, chapterIndex, currChapter: this.selectedChapter})
        this.$route.router.go(`/landscape/${subjectId}/${lesson.lessonId}`)
      },

      /**
       *  播放
       * @param chapter
       */
      playChapter (chapter) {
        //显示ppt,音频
        this.hasValidChapterClicked = true
        this.currAudioSrc = chapter.audio
        this.currPpts = chapter.ppts

        //登录并且在读状态下, 更新课程进度
        if (this.isUserLogin && this.currStatus === 'N') {
          this.updateRecord()
        }
        this.$dispatch('chapterPlay', chapter)
        this.resetScroller()
      }
    },

    components: {
      WebAudio,
      Tab,
      TabItem,
      Confirm,
      Scroller,
      Sticky,
      Specific,
      Content,
      IctButton,
      PptPanel,
      IctBackBtn
    }
  }
</script>
