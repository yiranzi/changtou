<template>
  <div style="height: 100%;" class="subject-detail">
    <ict-back-btn></ict-back-btn>

    <scroller :lock-x="true" scrollbar-y :bounce="false" v-ref:scroller :height="scrollerHeight" style="background-color: #fff">
      <div>
        <img v-if="!hasValidChapterClicked" v-bind:src="currSubject ? currSubject.pic : './static/image/subject/intro-mini-pic.png'"
             alt="" style="height: 13rem; width: 100%; display: block">

        <!--ppt-->
        <ppt-panel v-if="hasValidChapterClicked" :ppts="currPpts"></ppt-panel>

        <!--音频-->
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

          <!--简介-->
          <specific v-show='currTabIndex === 0' :subject="currSubject" :record="currRecord"></specific>

          <!--目录-->
          <content v-show='currTabIndex === 1' :lessons="currSubject ? currSubject.lessonList : []"
                   :homework="currHomework"
                   :selected-lesson.sync="selectedLesson"
                   :selected-chapter.sync="selectedChapter">
          </content>
        </div>
      </div>
    </scroller>

    <!--底部的btn-->
    <div class="expensebottom-area" v-el:bottom-btn v-show="isBottomBtnShow">
      <!--听课提醒-->
      <div class="expensebtn-box" v-if="currStatus === 'N' && currSubject && currSubject.type == 'M'">
        <div class="action-btn">
          <div class="action-detail-btn" v-touch:tap="showShare">
            <div class="action-detail-btn-icon"><img class="shareIcon" src="../../assets/styles/image/courseDetail/shareIcon.png"></div>
            <div class="action-detail-btn-text">分享</div>
          </div>
          <div class="action-detail-btn" v-touch:tap="postpone">
            <div class="action-detail-btn-icon"><img src="../../assets/styles/image/courseDetail/delayIcon.png"></div>
            <div class="action-detail-btn-text">延期</div>
          </div>
          <div class="action-detail-btn" v-touch:tap="suspend" v-if="!isSuspendUsed && !currSubject.finishDate">
            <div class="action-detail-btn-icon"><img src="../../assets/styles/image/courseDetail/pauseIcon.png"></div>
            <div class="action-detail-btn-text">暂停</div>
          </div>
        </div>
        <div class="expenseright-btn">
          <div v-if="!isRemindSet" v-touch:tap="showRemind">听课提醒</div>
          <div v-if="isRemindSet" v-touch:tap="showRemoveRemind"><span class="remind-count-down">DAY{{remindCurrDate}}</span><span class="expenseright-btn-changeText">修改提醒</span></div>
        </div>
      </div>
      <!--立即购买-->
      <div class="expensebtn-box-buy" v-if="!isUserLogin || currStatus === 'W'">
        <div class="action-btn">
          <div class="action-detail-btn" v-touch:tap="showShare">
            <div class="action-detail-btn-icon"><img class="shareIcon" src="../../assets/styles/image/courseDetail/shareIcon.png"></div>
            <div class="action-detail-btn-text">分享</div>
          </div>
          <div class="action-detail-btn" v-touch:tap="audition" v-if="!isSubjectBranch">
            <div class="action-detail-btn-icon"><img src="../../assets/styles/image/courseDetail/freeStudyIcon.png"></div>
            <div class="action-detail-btn-text">试听</div>
          </div>
        </div>
        <div class="expenseright-btn" v-touch:tap="buy">
          <div>立即购买</div>
        </div>
      </div>
      <!--毕业-->
      <div class="expensebtn-box-postpone" v-if="currStatus === 'Y' || currStatus === 'E'">
        <div class="action-btn">
          <div class="action-detail-btn" v-touch:tap="showShare">
            <div class="action-detail-btn-icon"><img class="shareIcon" src="../../assets/styles/image/courseDetail/shareIcon.png"></div>
            <div class="action-detail-btn-text">分享</div>
          </div>
        </div>
        <div class="expenseright-btn" v-touch:tap="postpone">延期</div>
      </div>
      <!--激活课程-->
      <div class="expensebtn-box-active" v-if="currStatus === 'I' && currSubject && currSubject.type == 'M'">
        <div class="action-btn">
          <div class="action-detail-btn" v-touch:tap="showShare">
            <div class="action-detail-btn-icon"><img class="shareIcon" src="../../assets/styles/image/courseDetail/shareIcon.png"></div>
            <div class="action-detail-btn-text">分享</div>
          </div>
        </div>
        <div class="expenseright-btn" v-touch:tap="active">激活课程</div>
      </div>
      <div v-if="currStatus === 'P' && currSubject && currSubject.type == 'M'" class="expensebtn-box expensebtn-box-open">
        <div class="action-btn">
          <div class="action-detail-btn" v-touch:tap="showShare">
            <div class="action-detail-btn-icon"><img class="shareIcon" src="../../assets/styles/image/courseDetail/shareIcon.png"></div>
            <div class="action-detail-btn-text">分享</div>
          </div>
        </div>
        <div class="expenseright-btn" v-touch:tap="resume">开启课程</div>
      </div>
    </div>
    <essay-float :show="showEssay" :has-choice=" !!selectedLesson && !!selectedLesson.choiceQuestion.length" @close="resumeHomework" @confirm="confirmEssay"></essay-float>
    <choice-float :show="showChoice"  @close="resumeHomework" @confirm="confirmChoice"></choice-float>
    <div class="question-naire-btn" v-if="isQuestionPlaced" v-touch:tap="gotoQuestionNaire"></div>
    <course-remind :is-remind-show="isRemindShow" :is-remove-remind-show="isRemoveRemindShow" :remind-time-start="remindTimeStart" :remind-time-end="remindTimeEnd" :remind-time-data="remindTimeData" @on-set-time-change="onSetTimeChange" @close-modal="closeModal" @set-remind="setRemind" @get-remove-remind="removeRemind"></course-remind>
    <page-share-float :show.sync="isShareShow" v-touch:tap="onActionTap" @confirm="cancelShare"></page-share-float>
  </div>

</template>
<style lang="less">
  .subject-detail {
    .question-naire-btn{
      width:2.025rem;
      height: 2.075rem;
      position: relative;
      left: 80%;
      bottom: 9%;
      background: url("../../assets/styles/image/questionNaire/qsBtn.png") no-repeat center center /95%;
    }
    .question-naire-btn:active{
      background: url("../../assets/styles/image/questionNaire/qsBtnActice.png") no-repeat center center /95%;
    }
    .top-back-btn {
      position: absolute;
      height: 2rem;
      width: 2rem;
      top: 0.3rem;
      left: 1rem;
      z-index: 20;
    }
    .top-back-btn:before {
      position: absolute;
      display: inline-block;
      font-family: 'myicon';
      content: '\e91b';
      font-size: 1.6rem !important;
      line-height: 2rem;
      width: 2rem;
      color: #999;
    }
    .vux-tab-item {
      font-size: 0.85rem;
    }
    .expensebottom-area {
      position: fixed;
      /*background: red;*/
      width: 100%;
      height: 98/40rem;
      bottom: 0;
      /*font-size: 0;*/
      z-index: 101;
        .expensebtn-box,.expensebtn-box-buy,.expensebtn-box-active,.expensebtn-box-postpone{
          text-align: center;
          height:100%;
          display:flex;
          flex-direction:row;
          .action-btn{
            display: flex;
            flex-direction:row;
            .action-detail-btn{
              width: 2.5rem;
              padding:10/40rem 0 8/40rem;
              .action-detail-btn-icon{
                display:block;
                img{
                  width: 40/40rem;
                  height: 1rem;
                }
                .shareIcon{
                  width: 36/40rem;
                }
              }
              .action-detail-btn-text{
                text-align: center;
                font-size: 22/40rem;
                display: block;
              }
            }
        }
        .expenseright-btn{
          height:100%;
          flex: 1;
          font-size: 34/40rem;
          color: #fff;
          background-color: #c9b280;
          line-height: 98/40rem;
          &-changeText{
            margin-left: 3/4rem;
            line-height: 0.9rem;
            height: 0.9rem;
            color: #eee;
            border: 1px solid #eee;
            font-size: 22/40rem;
            border-radius: 0.9rem;
            box-sizing: border-box;
            padding: 0 6/40rem;
            display: inline-block;
           }
        }
      }
      .expensebtn-box-buy,.expensebtn-box-open,.expensebtn-box-postpone{
        .expenseright-btn{
          background-color: #00b0f0;
        }
      }
      .expensebtn-box-active{
        .expenseright-btn{
          background-color: #ff9800;
        }
      }
    }
  }
</style>
<script>
  import IctBackBtn from '../../components/IctCourseBackBtn.vue'
  import WebAudio from '../../components/WebAudio.vue'
  import PptPanel from '../../components/IctCoursePptPanel.vue'
  import Specific from '../../components/IctCouserSpecificExpense.vue'
  import Content from '../../components/IctCourseContentExpense.vue'
  import IctButton from '../../components/IctButton.vue'
  import essayFloat from '../homework/essayFloat.vue'
  import choiceFloat from '../homework/ChoiceFloat.vue'
  import {Tab, TabItem} from 'vux/tab'
  import Scroller from 'vux/scroller'
  import Sticky from 'vux/sticky'
  import {courseDetailActions, courseRecordActions, essayActions, choiceActions, homeworkListActions, questionNaireActions} from '../../vuex/actions'
  import {courseDetailGetters, courseRecordsGetters, userGetters, homeworkListGetters} from '../../vuex/getters'
  import {setSessionCache, setLocalCache, getLocalCache, clearLocalCache} from '../../util/cache'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  import {MSITE_URL} from '../../frame/serverConfig'
  import mixinPageShare from '../../mixinPageShare'
  import {Device, platformMap} from '../../plugin/device'
  import {Jpush} from '../../plugin/jpush'
  import CourseRemind from '../../components/course/CourseRemind.vue'
  import PageShareFloat from '../../components/share/PageShareFloat.vue'
  export default {
    mixins: [mixinPageShare],
    vuex: {
      getters: {
        expenseSubjectArr: courseDetailGetters.expenseDetailArr,
        expenseRecordsArr: courseRecordsGetters.expenseRecords,
        isUserLogin: userGetters.isLogin,
        homeworkList: homeworkListGetters.homeworkList
      },
      actions: {
        loadExpenseSubject: courseDetailActions.loadExpenseSubject,
        loadExpenseRecord: courseRecordActions.loadOneSubjectExpenseRecord,

        activeSubject: courseRecordActions.activeSubject,
        suspendSubject: courseRecordActions.suspendSubject,
        resumeSubject: courseRecordActions.resumeSubject,
//        postonSubject: courseRecordActions.postponeSubject,

        setEssayQuestion: essayActions.setEssay,
        getArticle: essayActions.getArticle,

        setChoiceQuestion: choiceActions.setChoice,
        getReport: choiceActions.getReport,

        syncHomeworkList: homeworkListActions.getHomeworkList,
        isSubmitQuestionNaire: questionNaireActions.isSubmitQuestionNaire,
        updateExpenseChapterRecord: courseRecordActions.updateExpenseChapterRecord
      }
    },
    /**
     *
     */
    data () {
      return {
        isShareShow: false,   //分享浮层显示
        isRemindShow: false,   //定时弹框状态
        isRemoveRemindShow: false,  //取消弹框显示
        isRemindSet: false,   //是否设定定时提醒
        remindTimeData: ['0', '0'],

        remindTimeStart: {},   //提醒开始时间
        remindTimeEnd: {},   //提醒结束时间
        remindList: {},  //提醒时间毫秒数列表
        remindCurrDate: 0,  //当前是第几天

        isResponsive: true, // 当前页面是否处于可响应状态 (响应 音频播放完成,全屏 事件)
        scrollerHeight: '480px',

        isLoadedFail: false, //数据是否加载完毕
        subjectId: '', //课程Id
        hasValidChapterClicked: false,

        isSubjectBranch: false, // 当前课程是否为选修课
        currSubject: null, // 当前课程
        currRecord: null, //当起进度
        currUseabLessonArr: [], //当前可用lessonId集合
        currStatus: 'L', //当前课程状态 {N：在读 | E：过期 | Y：毕业 | P：暂停 | I ：未激活 | W : 没有进度} 默认L: 加载中
        lastSubmitlessonId: 0, //最后一次提交作业的lesson
        listenOnlyLessonId: 0, //只能听课,但不能做作业的lesson
        isAssignmentSubmitted: false,
        postponeCount: 0,
        isSuspendUsed: false,

        currTabItem: 's', //选项卡当前选中项目 s表示简介, c表示目录
        currTabIndex: 0,

        selectedLesson: null, //当前选中的lesson
        selectedChapter: null, //当前选中的chapter
        currChapterIndex: -1, //当前选中的chater index
        currAudioSrc: null, //当前音频地址
        currPpts: [], //当前ppt地址集合

        isSelectdLessonLimited: true, //当前选中lesson是否受限
        showEssay: false,
        showChoice: false,
        isQuestionPlaced: false,  //是否放置提问按钮

        currChapterRecord: null, //当前课程chapter记录
        relatedMajorSubjectId: 0  //相关主线课的subjectId
      }
    },

    computed: {
      /**
       * 延期的文本
       */
      postText () {
        return this.postponeCount ? '再次延期' : '延期'
      },

      /**
       * 作业
       */
      currHomework () {
        return this.homeworkList.find(homework => (homework.subjectId + '') === this.subjectId)
      },

      isBottomBtnShow () {
        if (this.currStatus && this.currSubject) {
          return this.currStatus === 'W' || this.currSubject.type === 'M'
        } else {
          return false
        }
      },

      /**
       * 有选择题
       */
      hasChoice () {
        return this.currSubject && this.currSubject.lessonList && (this.currSubject.lessonList.findIndex(lesson => (lesson.choiceQuestion && lesson.choiceQuestion.length > 0)) > -1)
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
        //读取缓存，判断之前有没有设置定时提醒
        let items = getLocalCache('remind-data-subid-' + subjectId)    //读取对应课程的上课提醒缓存
        let currDate = new Date().getTime()   //读取现在的时间
        if (items && ((parseInt(items.remindList[6]) + parseInt(items.oldTime)) - currDate >= 0)) {   //如果有缓存，说明设置过提醒，把现在的缓存里的最后一次提醒和现在的时间相减，如果>0说明还在提醒期内，否则就把定时提醒归零
          this.remindTimeStart = items.start    //从缓存中取出数据
          this.remindTimeEnd = items.end
          this.remindList[subjectId] = items.remindList
          this.isRemindSet = true
          this.remindTimeData = items.time[0]   //------------------------
          this.getCurrDateNum()   //获取当前是第几天
        } else {      //如果超出提醒期,说明定时器过时，把缓存和本地通知清空
          this.isRemindSet = false
          clearLocalCache('remind-data-subid-' + subjectId)
          Jpush.clearLocalNotifications()
        }
        //-------------------------------------------
        this.isQuestionPlaced = false
        // 判断前一个页面, 如果是从横屏退过来的页面不做其他处理
        if (from.path && from.path.indexOf('landscape/') > -1) {
          // do nothing
        } else {
          // 用于查询是否提交过问卷
          const me = this
          const questionnaireId = 1
          // 暂时定为问卷一
          setTimeout(function () {
             // 提问入口按钮显示
             if (me.isUserLogin && (me.currRecord !== null)) {
                me.isSubmitQuestionNaire(questionnaireId).then(
                function (isSubmit) {
                  if (!isSubmit) {  // 未提交放置按钮
                    if (parseInt(me.subjectId) === 4 || parseInt(me.subjectId) === 15) {
                      me.isQuestionPlaced = true
                    }
                  }
                }
              )
            }
          }
         , 50)

          if (this.subjectId !== subjectId) {
            this.showLoading()
          }

          this.resetView()

          const tasks = [this.loadExpenseSubject(subjectId)]
          if (this.isUserLogin) {
            tasks.push(this.loadExpenseRecord(subjectId))
          }

          setTimeout(this.resetScroller.bind(this), 100)
          return Promise.all(tasks).then(
            () => {
              return {subjectId: subjectId, isLoadedFail: false, isResponsive: true}
            },
            () => {
              this.hideLoading()
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
          this.$broadcast('expense-detail-deactive')
          next()
        }
        this.clearTimeData()
      }
    },

    watch: {
      /**
       * 当前课程详情加载成功
       */
      'currSubject': function (newSubject) {
        this.relatedMajorSubjectId = newSubject.relatedMajorSubjectId
        this.shareConfig = {
          title: newSubject.title,
          desc: newSubject.subtitle,
          link: `${MSITE_URL}index.html#!/subject/detail/P/${this.subjectId}/0`,
          imgUrl: newSubject.pic
        }
        this.onViewChange()
      },
      'currTabIndex': function () {
        this.$nextTick(() => {
            this.$refs.scroller.reset({
//              top: 0
          })
        })
      },

      /**
       * 当前课程被选中, 设置进度是否有权限
       */
      'selectedLesson': function (lesson, oldlesson) {
        // 如果是公开课,永远不受限
        if (lesson && lesson.type === 'C') {
          this.isSelectdLessonLimited = false
        } else {
          this.isSelectdLessonLimited =
            this.currUseabLessonArr.findIndex((useableLesson) => useableLesson === lesson.lessonId) === -1
        }

        // 当课程切换时,会有动画,
        // 动画完毕,执行滚动重置
        const me = this
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
              bottom: 0
            })
          })
        }, 1000)
      },

      /**
       * 设置课程id时, 获取课程信息, 获取进度信息
       */
      'subjectId': function (newSubjectId, oldSubjectId) {
        // 这里调用 setTimeout  是因为页面切换同时刷新数据会有卡顿
        setTimeout(() => {
          //设置课程信息
          this.currSubject = this.expenseSubjectArr.find(subject => subject.subjectId === newSubjectId)

          //设置当前作业
  //        console.log('newSubjectId', newSubjectId, typeof newSubjectId, this.homeworkList[0].subjectId, typeof this.homeworkList[0].subjectId)

          //设置是否为选修课
          this.isSubjectBranch = this.currSubject.type === 'B'

          this.resetScroller()

          //获取进度信息
          let currSubjectRecord = this.expenseRecordsArr.find(subject => (subject.subjectId + '') === newSubjectId)

          if (currSubjectRecord) {
            // 设置课程进度状态
            this.setSubjectRecordStatus(currSubjectRecord)
          } else {
            //如果没有当前课程的进度
            //设置第0课可以听
            this.resetSubjectRecordStatus()
  //          this.currStatus = 'W'
  //          this.currUseabLessonArr = [this.currSubject.lessonList[0].lessonId]
          }

          // 隐藏loading提示
          this.$nextTick(() => {
            this.hideLoading()
          })
        }, 500)
      },

      /**
       *进度改变
       */
      'expenseRecordsArr': function (newRecords, oldRecords) {
        if (this.subjectId !== '') {
          //获取进度信息
          let currSubjectRecord = this.expenseRecordsArr.find(subject => (subject.subjectId + '') === this.subjectId)

          if (currSubjectRecord) {
            this.setSubjectRecordStatus(currSubjectRecord)
          } else {
            //如果没有当前课程的进度
            this.resetSubjectRecordStatus()
          }
        }
      },

      'isBottomBtnShow': function () {
        this.$nextTick(() => {
          this.scrollerHeight = (window.document.body.offsetHeight - this.$els.bottomBtn.offsetHeight) + 'px'
          setTimeout(this.resetScroller, 300)
        })
      },

      'currRecord': function (record) {
        this.currChapterRecord = record && record.studentChapter
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
      'chapterSelectedExpense': function (chapter, index, type) {
        this.currChapterIndex = index // 用于横屏
        if (this.isSelectdLessonLimited) { //课程受限
          if (this.isUserLogin) {
            // 用户登录的情况下,判断状态
            // {N：在读 | E：过期 | Y：毕业 | P：暂停 | I ：未激活 | W : 没有进度(未购买)} 默认L: 加载中
            switch (this.currStatus) {
              case 'W':
                this.buy()
                break
              case 'I':
                this.active()
                break
              case 'N':
                this.showTipWhenLessonLimitedAndOnLine(type)
                break
              case 'P':
                this.resume()
                break
              case 'E':
                //课程已过期
                this.postpone()
                break
              case 'Y':
                //课程已毕业
                this.postpone()
                break
              default:
                break
            }
          } else {
            // 用户在未登录的情况下, 直接跳转前去购买
            this.buy()
          }
        } else if (type === 'common') { //当前课程可以听
          this.hasValidChapterClicked = true
          this.playChapter(chapter)
        } else if (type === 'choice') {
          this.onChoiceTap()
        } else if (type === 'essay') {
          this.onEssayTap()
        }
      },

      'goToSubject': function (subject) {
        this.$route.router.go(`/subject/detail/${subject.type}/${subject.subjectId}/0`)
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
          this.$broadcast('playNextCapterExpense')
        }
      }

    },

    methods: {
      /**
       * 点击空白消失模态层
       **/
      closeModal () {
        this.hideRemind()
        this.hideRemoveRemind()
      },
      onSetTimeChange (value) {   //日期picker选中的值
        this.remindTimeData = [value[0], value[1]]
      },
      /**
       * 离开页面时清空定时状态
       **/
      clearTimeData () {
        //清空定时状态
        this.remindTimeData = ['0', '0']
        this.isRemindShow = false
        this.isRemoveRemindShow = false
        this.isRemindSet = false
        this.remindTimeStart = {}
        this.remindTimeEnd = {}
        this.remindList = {}
        this.clearTimePicker()
      },

      /**
       * 定时器picker归零
       **/
      clearTimePicker () {
        this.$broadcast('clearTimePicker')
      },

      /**
       * 获取当前课程提醒第几天
       **/
      getCurrDateNum () {
        let currDate = new Date().getTime()   //获取现在的时间
        let endDate = new Date(this.remindTimeEnd.year + '-' + this.remindTimeEnd.month + '-' + this.remindTimeEnd.day + ' 0:00:00')    //获取设定的最后一次提醒时间
        endDate.setDate(endDate.getDate() + 1)    //时间设定到最后一天的24:00
        let leftTime = endDate.getTime() - currDate   //算出时间差
        let currDateNumList = [7, 6, 5, 4, 3, 2, 1, 0]
        this.remindCurrDate = currDateNumList[Math.floor(leftTime / (24 * 3600 * 1000))]
      },
      /**
       * 显示分享浮层
       **/
      showShare () {
        this.isShareShow = true
      },
      /**
       * 获取定时开始和结束日期
       **/
      getSetTime () {
        let currDate = new Date()
        currDate.setDate(currDate.getDate() + 1)    //提醒从设置第二天起算
        let startTime = {   //第一次提醒的年月日
          year: currDate.getFullYear(),
          month: currDate.getMonth() + 1,
          day: currDate.getDate()
        }
        this.remindTimeStart = startTime
        currDate.setDate(currDate.getDate() + 6)    //时间设定到七天后，结束的日期
        let endTime = {
          year: currDate.getFullYear(),
          month: currDate.getMonth() + 1,
          day: currDate.getDate()
        }
        this.remindTimeEnd = endTime
      },
      /**
       * 获取每天提醒的时间
       **/
      getRemindList () {
        let currTime = new Date().getTime()  //获得当前时间毫秒数
        let date = new Date()
        date.setDate(date.getDate() + 1)    //当前时间的第二天
        date.setHours(parseInt(this.remindTimeData[0]))   //把小时和分钟设定到选择的时间
        date.setMinutes(parseInt(this.remindTimeData[1]))
        date.setSeconds(0)
        let remindList = []     //用一个数组保存提醒的毫秒数
        for (let i = 0; i < 7; i++) {   //循环七天的提醒时间
          remindList.push(date.getTime() - currTime)    //提醒时间-当前时间=当前时间距每次提醒的毫秒数
          date.setDate(date.getDate() + 1)  //每次加一天
        }
        this.remindList[this.subjectId] = remindList    //把数组保存到变量
        let items = {           //编辑缓存内容
          oldTime: currTime,    //设定时的毫秒数
          remindList,   //时间列表
          'start': this.remindTimeStart,    //开始时间
          'end': this.remindTimeEnd,    //结束时间
          'time': [this.remindTimeData]   //提醒的小时和分钟
        }
        setLocalCache(('remind-data-subid-' + this.subjectId), items)    //设置缓存
        this.getCurrDateNum()     //获取当前的第几天
      },

      /**
       * 定时提醒设置显示
       **/
      showRemind () {
        this.remindTimeData = ['0', '0']
        this.isRemindShow = true
        getLocalCache('remind-data-subid-' + this.subjectId) ? '' : this.getSetTime()
      },

      /**
       * 定时提醒隐藏
       **/
      hideRemind () {
        this.isRemindShow = false
        this.clearTimePicker()
      },
      /**
       * 取消提醒设置显示
       **/
      showRemoveRemind () {
        this.isRemoveRemindShow = true
      },
      /**
       * 取消提醒隐藏
       **/
      hideRemoveRemind () {
        this.isRemoveRemindShow = false
      },
      setLocalNotificationIOS () {      //ios设置提醒
        if (Device.platform === platformMap.IOS) {
          for (let i = 0; i < this.remindList[this.subjectId].length; i++) {
            Jpush.setLocalNotificationIOS(
              parseInt(this.remindList[this.subjectId][i]),
              `买房子存票子，同学今天${parseInt(this.remindTimeData[0]) + ':' + parseInt(this.remindTimeData[1])}你有一节${this.currSubject.title}课程,请做好上课准备。`,
              1,
              this.subjectId + '' + i,
              ''
            )
          }
        }
      },
      setLocalNotificationANDROID () {      //安卓设置提醒
        if (Device.platform === platformMap.ANDROID) {
          for (let i = 0; i < this.remindList[this.subjectId].length; i++) {
            Jpush.setLocalNotificationANDROID(
              1,
              `买房子存票子，同学今天${parseInt(this.remindTimeData[0]) + ':' + parseInt(this.remindTimeData[1])}你有一节${this.currSubject.title}课程,请做好上课准备。`,
              '长投学堂',
              this.subjectId + '' + i,
              parseInt(this.remindList[this.subjectId][i]),
              ''
            )
          }
        }
      },
      /**
       *  设置定时提醒
       **/
      afterSetRemind () {
        this.isRemindShow = false
        this.isRemindSet = true
        this.$broadcast('showCheckTipSet')
        this.clearTimePicker()
      },
      setRemind () {
        this.getRemindList()
        this.setLocalNotificationANDROID()
        this.setLocalNotificationIOS()
        this.afterSetRemind()
      },
      /**
       * 取消定时提醒
       **/
      deleteLocalNotificationWithIdentifierKeyInIOS () {      //IOS清除本地通知
        if (Device.platform === platformMap.IOS) {
          for (let i = 0; i < 7; i++) {
            Jpush.deleteLocalNotificationWithIdentifierKeyInIOS(this.subjectId + '' + i)
          }
        }
      },
      removeLocalNotificationANDROID () {     //安卓清除本地通知
        if (Device.platform === platformMap.ANDROID) {
          for (let i = 0; i < 7; i++) {
            Jpush.removeLocalNotificationANDROID(this.subjectId + '' + i)
          }
        }
      },
      afterRemoveRemind () {
        clearLocalCache('remind-data-subid-' + this.subjectId)
        this.isRemoveRemindShow = false
        this.isRemindSet = false
        this.$broadcast('showCheckTipCancel')
        this.clearTimePicker()
      },
      removeRemind () {
        this.deleteLocalNotificationWithIdentifierKeyInIOS()
        this.removeLocalNotificationANDROID()
        this.afterRemoveRemind()
      },

      /**
       * 选择题被点击
       **/
      onChoiceTap () {
        const me = this
        const lessonId = this.selectedLesson.lessonId
        const choiceQuestionArr = this.selectedLesson.choiceQuestion
        me.setChoiceQuestion(choiceQuestionArr)
        me.getReport(lessonId).then(
          report => {
            if (report.kpScore) {
              // 做过选择题
              me.$route.router.go(`/homework/choice/mark/${me.subjectId}/${lessonId}`)
            } else {
              // 没做过
              me.showChoice = true
            }
          }).catch(
          err => {
            console.log(err.message)
          }
        )
      },

      /**
       * 问答题被点击
       * */
      onEssayTap (limitedLessonId, limitedEssayQuestion) {
        const me = this
        const lessonId = limitedLessonId || this.selectedLesson.lessonId

        if (parseInt(lessonId) === parseInt(this.listenOnlyLessonId)) {
          const lastSubmitLesson = this.currSubject.lessonList.find(lesson => lesson.lessonId === me.lastSubmitlessonId)
          const lessonTitle = lastSubmitLesson.title
          const essayQuestion = lastSubmitLesson.essayQuestion

          me.showConfirm({
            title: '',
            message: `需要先通过"${lessonTitle}"的作业才能学习本课内容`,
            okText: '查看作业',
            cancelText: '继续听课',
            okCallback: function () {
              me.setEssayQuestion(essayQuestion)
              me.goEssayMark(me.lastSubmitlessonId)
            }
          })
        } else {
          const essayQuestion = limitedEssayQuestion || this.selectedLesson.essayQuestion
          me.setEssayQuestion(essayQuestion)
          me.getArticle(lessonId).then(
            evaluation => {
              if (evaluation && evaluation.status !== null) {
                switch (evaluation.status) {
                  case 0:
    //                   console.log('作业已提交')
                    me.goEssayMark(lessonId)
                    break
                  case 1:
    //                   console.log('草稿已提交 写作业')
                    me.goEssayAnswer(lessonId)
                    break
                  case 2:
    //                   console.log('已批改 未通过 查看作业')
                    me.goEssayMark(lessonId)
                    break
                  case 3:
    //                   console.log('已批改 通过 查看作业')
                    me.goEssayMark(lessonId)
                    break
                  default:
                    me.showEssayFloat()
                    break
                }
              } else {
               me.showEssayFloat()
              }
            }
          ).catch(
            err => {
              console.log(err.message)
            }
          )
        }
      },
      /**
       * 跳转到问答题 编辑页
       */
      goEssayAnswer (lessonId) {
        const me = this
        this.getArticle(lessonId).then(
            () => me.$route.router.go(`/homework/essay/answer/${me.subjectId}/${lessonId}`)
        ).catch(
            err => console.warn(err)
        )
      },

      /**
       * 显示 作业提示框
       */
      showEssayFloat () {
        this.showEssay = true
      },

      /**
       * 跳转到问答题 查看页
       */
      goEssayMark (LimitedLessonId) {
        const me = this
        const lessonId = LimitedLessonId || this.selectedLesson
        this.getArticle(lessonId).then(
            () => me.$route.router.go(`/homework/essay/mark/${me.subjectId}/${lessonId}`)
        ).catch(
            err => console.warn(err)
        )
      },

      /**
       * 重置 作业浮层
       */
      resumeHomework () {
        this.showChoice = false
        this.showEssay = false
      },

      /**
       * 确认做问答题
       */
      confirmEssay () {
        this.resumeHomework()
        if (this.selectedLesson.essayQuestion.assignmentType === 'S') {
          this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.DO_HOMEWORK, {
            lessonid: this.selectedLesson.lessonId
          })
          this.$route.router.go(`/homework/essay/answer/${this.subjectId}/${this.selectedLesson.lessonId}`)
        }
      },

      /**
       * 确认做选择题
       */
      confirmChoice () {
        this.resumeHomework()
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.CHOICE_QUESTION_BEGIN, {
          lessonid: this.selectedLesson.lessonId
        })
        this.$route.router.go(`/homework/choice/answer/${this.subjectId}/${this.selectedLesson.lessonId}`)
      },

      /**
       * 重置页面
       */
      resetView () {
        this.hasValidChapterClicked = false
        this.pause()
        this.resetScroller()
      },

      /**
       * 设置课程状态
       */
      setSubjectRecordStatus (currSubjectRecord) {
        this.currRecord = currSubjectRecord.lessonSet

        //设置是否已经提交了作业
        this.isAssignmentSubmitted = currSubjectRecord.lessonSet.isAssignmentSubmitted === 'Y'

        //设置课程状态
        this.currStatus = currSubjectRecord.status

        //设置是否已经暂停过
        this.isSuspendUsed = currSubjectRecord.isSuspendUsed

        //设置是否已经延期过
        this.postponeCount = currSubjectRecord.postponeCount

        //设置可用课程列表
        this.currUseabLessonArr = (currSubjectRecord && currSubjectRecord.lessonSet && currSubjectRecord.lessonSet.lessonIds) ? currSubjectRecord.lessonSet.lessonIds : []

        //设置当前提交作业(或者需要)的课程Id
        if (this.currUseabLessonArr.length > 0) {
          this.lastSubmitlessonId = this.currUseabLessonArr[this.currUseabLessonArr.length - 1]
        }

        // 当课程为在读状态 N 时, 若已经提交了作业, 自动给他添加听下一课的权限
        if (this.currStatus === 'N' && this.isAssignmentSubmitted) {
          const currSubject = this.expenseSubjectArr.find(subject => subject.subjectId === this.subjectId)
          if (this.currUseabLessonArr.length > 0 && this.currUseabLessonArr.length < currSubject.lessonList.length && !this.hasChoice) {
            this.listenOnlyLessonId = currSubject.lessonList[this.currUseabLessonArr.length].lessonId
            this.currUseabLessonArr.push(this.listenOnlyLessonId)
          }
        }

        // 设置, 当前选中(进度改变后), 课程可不可以听
        if (this.selectedLesson) {
          // 如果是公开课,永远不受限
          if (this.selectedLesson.type === 'C') {
            this.isSelectdLessonLimited = false
          } else {
            this.isSelectdLessonLimited =
              this.currUseabLessonArr.findIndex((useableLesson) => useableLesson === this.selectedLesson.lessonId) === -1
          }
        }

        // 设置完毕, 有进度自动展开
        if (this.currUseabLessonArr.length > 0) {
          this.currTabIndex = 1
          this.$broadcast('unfoldLessonChapters', this.currUseabLessonArr[this.currUseabLessonArr.length - 1])
          setTimeout(this.resetScroller, 300)
        }
      },

      /**
       * 重置课程进度状态
       */
      resetSubjectRecordStatus () {
        this.currTabIndex = 0

        this.currRecord = null

        //设置是否已经提交了作业
        this.isAssignmentSubmitted = false

        //设置课程状态
        this.currStatus = 'W'

        //设置是否已经暂停过
        this.isSuspendUsed = false

        //设置是否已经延期过
        this.postponeCount = false

        //设置可用课程列表
        this.currUseabLessonArr = []

        //设置作业
        this.homework = null

        //设置当前提交作业(或者需要)的课程Id
        if (this.currUseabLessonArr.length > 0) {
          this.lastSubmitlessonId = this.currUseabLessonArr[this.currUseabLessonArr.length - 1]
        }

        this.listenOnlyLessonId = 0

        // 设置当前选中(进度改变后), 课程可不可以听
        if (this.selectedLesson) {
          // 如果是公开课,永远不受限
          if (this.selectedLesson.type === 'C') {
            this.isSelectdLessonLimited = false
          } else {
            this.isSelectdLessonLimited =
              this.currUseabLessonArr.findIndex((useableLesson) => useableLesson === this.selectedLesson.lessonId) === -1
          }
        }
      },

      /**
       * 课程在读并且受限时,显示tip
       */
      showTipWhenLessonLimitedAndOnLine (type) {
        const me = this
        const lastSubmitLesson = this.currSubject.lessonList.find(lesson => lesson.lessonId === me.lastSubmitlessonId)
        const lessonTitle = lastSubmitLesson.title
        const essayQuestion = lastSubmitLesson.essayQuestion

        if (!this.hasChoice) {
          if (essayQuestion.assignmentType === 'S') {
            if (this.isAssignmentSubmitted) {
              me.showConfirm({
                title: '',
                message: `需要先通过"${lessonTitle}"的作业才能学习本课内容`,
                okText: '查看作业',
                cancelText: '继续听课',
                okCallback: function () {
                  me.setEssayQuestion(essayQuestion)
                  me.goEssayMark(me.lastSubmitlessonId)
                }
              })
            } else {
              me.showConfirm({
                title: '',
                message: `需要先提交"${lessonTitle}"的作业才能学习本课内容`,
                okText: '去写作业',
                cancelText: '继续听课',
                okCallback: function () {
                  me.setEssayQuestion(essayQuestion)
                  me.goEssayAnswer(me.lastSubmitlessonId)
                }
              })
            }
          } else if (essayQuestion.assignmentType === 'H') {
            me.showAlert(
              {
                message: `需要前往长投网www.ichangtou.com，提交"${lessonTitle}"的作业才能学习本课内容`,
                btnText: '知道了'
              }
            )
          }
        } else {
          me.showConfirm({
            title: '',
            message: `需要先通过"${lessonTitle}"的测试才能学习本课内容`,
            okText: '去测试',
            cancelText: '继续听课',
            okCallback: function () {
              me.$route.router.go(`/homework/choice/answer/${me.subjectId}/${me.lastSubmitlessonId}`)
            }
          })
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
        this.loadExpenseRecord(this.subjectId)
        this.syncRelatedBranchRecord(this.currSubject)
      },

      /**
       * 同步相关选修课程进度
       */
      syncRelatedBranchRecord (subject) {
        if (subject) {
          subject.branchSubjectList.forEach(branch => {
            this.loadExpenseRecord(branch.subjectId)
          })
        }
      },

      /**
       * 试听
       */
      audition () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.SUBJECT_AUDITION_TAP, {
          '商品名称': this.currSubject.title
        })
        this.currTabIndex = 1
        // 交给子控件统一处理
        // 播放第一个lesson
        this.$broadcast('listenToLesson', this.currSubject.lessonList[0])
//        this.selectedLesson = this.currSubject.lessonList[0]
//        this.selectedChapter = this.selectedLesson.lessonDetailsList[0]
      },

      /**
       * 暂停课程
       */
      suspend () {
        const me = this
        const activeHandler = function () {
          me.suspendSubject(me.subjectId).then(
            function () {
              me.syncRecord()
            },
            function () {
              me.showAlert('暂停失败,请重试')
            }
          )
        }
        const msg = '<p style="text-align: left">课程暂停功能为在短时间内无法继续学习的院生提供临时性免费停课机会，暂停功能只在课程有效期内使用；</p>' +
            '<p style="text-align: left">仅有一次暂停30天机会，中途支持提前开启课程；</p>' +
            '<p style="text-align: left">您是否想暂停课程？</p>'
        me.showConfirm({
          title: '',
          message: msg,
          okText: '确认暂停',
          cancelText: '我再想想',
          okCallback: activeHandler
        })
      },

      /**
       * 暂停后开启
       */
      resume () {
        const me = this
        const activeHandler = function () {
          me.resumeSubject(me.subjectId).then(
            function () {
              me.syncRecord()
            },
            function () {
              me.showAlert('开启课程失败,请重试')
            }
          )
        }
        const msg = '<p>仅有一次暂停30天机会,</p><p>您是否想提前开启课程?</p>'
        me.showConfirm({
          title: '',
          message: msg,
          okText: '确认开启',
          cancelText: '我再想想',
          okCallback: activeHandler
        })
      },

      /**
       * 延期
       */
      postpone () {
        //前去支付页面购买延期服务
        const path = `/pay-P-${this.relatedMajorSubjectId || this.subjectId}`
        this.$route.router.on(path, {
          component: require('../pay/PostponeOrder.vue')
        })
        this.$route.router.go(path)
      },

      /**
       * 激活
       */
      active () {
        const me = this

        const activeHandler = function () {
          me.activeSubject(me.subjectId).then(
            function () {
              me.syncRecord()
              me.syncHomeworkList()
              me.showToast({message: '激活课程成功', type: 'success'})
            },
            function () {
              me.showAlert('激活失败,请重试')
            }
          )
        }

        const msg = '<p>该课程尚未激活</p><p>您是否想现在激活此课程?</p>'
        me.showConfirm({
          title: '',
          message: msg,
          okText: '确认激活',
          cancelText: '我再想想',
          okCallback: activeHandler
        })
      },

      /**
       * 购买
       */
      buy () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.SUBJECT_BUY_NOW_TAP, {
          '商品名称': this.currSubject.title
        })
        // 如果是选修课
        if (this.isSubjectBranch) {
          // 先判断主线课程是否购买
           const originSubject = this.expenseRecordsArr.find(subject =>
            subject.subjectId === this.currSubject.relatedMajorSubjectId)

          const isOrignSubjectVaildBought = !!(originSubject && originSubject.status === 'N')
          if (isOrignSubjectVaildBought) {
            // 若主线课程已经购买并且是在读, 先弹出浮层，再转去购买页面
            this.isShowUserAgreement()
          } else {
            this.showConfirm({message: `仅支持在"${this.currSubject.relatedMajorSubjectTitle}"有效学习时间内购买该选修课`})
          }
        } else {
          // 不是选修课, 先弹出浮层，再转去订单页面
          this.isShowUserAgreement()
        }
      },

      /**
       * 点击立即购买后，判断是否弹出浮层
       */
      isShowUserAgreement () {
        if (this.subjectId === '21') {
          this.showMask({
            component: 'strategy/UserAgreement.vue',
            hideOnMaskTap: true,
            callbackName: 'onAgreeTap',
            callbackFn: this.onAgreeTap.bind(this)
          })
        } else {
          this.goToPay()
        }
      },

      /**
       * 用户协议同意
       */
      onAgreeTap () {
        this.goToPay()
      },

      /**
       * 前去支付页面
       */
      goToPay: function () {
        const path = `/pay-S-${this.subjectId}`
        this.$route.router.on(path, {
          component: require('../pay/SubjectOrder.vue')
        })
        this.$route.router.go(path)
      },

        /**
         * 跳转到横屏
         */
      goToFullScreen (subjectId, lesson, chapterIndex) {
        setSessionCache('landscapeSrc', {lesson, chapterIndex, currChapter: this.selectedChapter})
        this.$route.router.go(`/landscape/${subjectId}/${lesson.lessonId}`)
      },

      /**
       * 播放选中的chapter
       * @param chapter
       */
      playChapter (chapter) {
        this.currAudioSrc = chapter.audio
        this.currPpts = chapter.ppts
        if (this.isUserLogin) {
          this.uploadChapterRecord(chapter)
        }
        this.$dispatch('chapterPlay', chapter)
        this.resetScroller()
      },

      /**
       * 上传chapter进度
       */
      uploadChapterRecord (chapter) {
        const me = this
        if (me.canChapterUpload(chapter.chapterId)) {
          me.updateExpenseChapterRecord({
            subjectId: me.subjectId,
            chapterId: chapter.chapterId,
            lessonId: me.selectedLesson.lessonId
          }).then(
            () => {
              me.currChapterRecord = {
                subjectId: me.subjectId,
                chapterId: chapter.chapterId,
                lessonId: me.selectedLesson.lessonId
              }
            }
          )
        }
      },

      /**
       * 当前chapter进度是否可以上传
       * @params chapterId
       */
      canChapterUpload (selectedChapterId) {
        if (!this.currRecord) {
          //未购买课程 不上传
          return false
        } else if (!this.currChapterRecord) {
          //已购买  没有进度,直接上传
          return true
        } else {
          //已购买 有进度
          //chapterId 为当前点击的chapterId
          const selectedLessonId = this.selectedLesson.lessonId

          //this.currChapterRecord 为服务器上的进度 包括lessonId和chapterId
          const currChapterId = this.currChapterRecord.chapterId
          const currLessonId = this.currChapterRecord.lessonId
          // 当前点击的进度大于服务器上的进度时,可以上传
          return this.getLessonIndexOfIds(selectedLessonId) >= this.getLessonIndexOfIds(currLessonId) && this.getChapterSequences(selectedChapterId) > this.getChapterSequences(currChapterId)
        }
      },

      /**
       * 获取lesson在ids中的index
       * @params lessonId
       */
      getLessonIndexOfIds (lessonId) {
        const ids = this.currRecord.lessonIds
        const index = ids.findIndex(
                (itemId) => itemId === lessonId
              )
        return index >= 0 ? index : ids.length  //不在ids中的lesson为新学的lesson
      },

      /**
       * 获取chapter的sequences
       * @params chapterId
       */
      getChapterSequences (chapterId) {
        const chapters = this.selectedLesson.lessonDetailsList
        return chapters.find(
          (chapter) => chapter.chapterId === chapterId
        ).sequence
      },

      /**
       * 重置 滚动条
       */
      resetScroller () {
        this.$nextTick(() => {
          this.$refs.scroller.reset({
              top: 0
          })
        })
      },
      gotoQuestionNaire () {
        // 暂定为 问卷一
        const naireId = 1
        this.$route.router.go(`/questionNaire/${naireId}`)
      }
    },
    components: {
      WebAudio,
      Tab,
      TabItem,
      Scroller,
      Sticky,
      Specific,
      Content,
      IctButton,
      choiceFloat,
      essayFloat,
      PptPanel,
      IctBackBtn,
      PageShareFloat,
      CourseRemind
    }
  }
</script>
