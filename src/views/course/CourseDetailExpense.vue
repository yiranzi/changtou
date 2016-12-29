<template>
  <div style="height: 100%;" class="subject-detail">
    <div class="top-back-btn" v-touch:tap="back"></div>
    <scroller :lock-x="true" scrollbar-y :bounce="false" v-ref:scroller :height="scrollerHeight" style="background-color: #fff">
      <div>
        <img v-if="!hasValidChapterClicked" v-bind:src="currSubject ? currSubject.pic : './static/image/subject/intro-mini-pic.png'"
             alt="" style="height: 12rem; width: 100%; display: block">

        <!--ppt-->
        <ppt-panel v-if="hasValidChapterClicked" :ppts="currPpts"></ppt-panel>

        <!--音频-->
        <web-audio v-show="hasValidChapterClicked" :src.sync="currAudioSrc"></web-audio>

        <!--没有获取到课程内容时显示-->
        <div v-show="0">没有内容</div>

        <!--简介和目录-->
        <div v-show="1" style="height: 100%; background-color: #fff">
          <sticky>
            <tab :line-width=2 active-color='#00b0f0' :index.sync="currTabIndex">
              <tab-item class="vux-center" :selected="currTabItem === 's'">简介</tab-item>
              <tab-item class="vux-center" :selected="currTabItem === 'c'">目录</tab-item>
            </tab>
          </sticky>

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
    <div class="bottom-area" v-el:bottom-btn v-show="isBottomBtnShow">
      <!--<div v-if="currStatus === 'L'" class="btn-box">-->
        <!--<ict-button class="right">加载中..</ict-button>-->
      <!--</div>-->

      <div v-if="currStatus === 'W'" class="btn-box">
        <ict-button class="left" v-touch:tap="audition">试听</ict-button>
        <ict-button class="right" v-touch:tap="buy">立即购买</ict-button>
      </div>

      <div v-if="currStatus === 'I' && currSubject && currSubject.type == 'M'" class="btn-box">
        <ict-button class="right" v-touch:tap="active" style="background-color: #ff9800">激活</ict-button>
      </div>

      <div v-if="currStatus === 'N' && currSubject && currSubject.type == 'M'" class="btn-box">
        <ict-button class="left" v-if="!isSuspendUsed && currRecord && !currRecord.finishDate" v-touch:tap="suspend">暂停课程</ict-button>
        <ict-button class="right" v-touch:tap="postpone">{{postText}}</ict-button>
      </div>

      <div v-if="currStatus === 'P' && currSubject && currSubject.type == 'M'" class="btn-box">
        <ict-button class="right" v-touch:tap="resume">开启课程</ict-button>
      </div>

      <div v-if="(currStatus === 'Y' || currStatus === 'E') && currSubject && currSubject.type == 'M'" class="btn-box">
        <ict-button class="right" v-touch:tap="postpone">{{postText}}</ict-button>
      </div>
    </div>
    <essay-float :show="showEssay" :has-choice=" !!selectedLesson && !!selectedLesson.choiceQuestion.length" @close="resumeHomework" @confirm="confirmEssay"></essay-float>
    <choice-float :show="showChoice"  @close="resumeHomework" @confirm="confirmChoice"></choice-float>
  </div>
</template>
<style lang="less">
  .subject-detail {
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
    .bottom-area {
      position: fixed;
      /*background: red;*/
      width: 100%;
      height: 2.1rem;
      bottom: 0;
      /*font-size: 0;*/
      z-index: 101;

        .btn-box {
          display: flex;

        .ict-btn {
          border-radius: 0 !important;
        }

        .left {
          background: #f0eff5;
          color: #00b0f0;
          font-size: 34/40rem;
          flex: 24;
          /*flex-grow: 1;*/
        }

        .right {
          /*border-left: 1px solid #898989;*/
          font-size: 34/40rem;
          color: #fff;
          background-color: #00b0f0;
          flex: 51;

          &:active,&:visited{
            color: #898989;
          }
        }
      }
    }
  }

</style>
<script>
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
  import {courseDetailActions, courseRecordActions, essayActions, choiceActions, graduationDiplomaActions, homeworkListActions} from '../../vuex/actions'
  import {courseDetailGetters, courseRecordsGetters, userGetters, homeworkListGetters} from '../../vuex/getters'
  import {setSessionCache} from '../../util/cache'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  export default {
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

        getDiplomaList: graduationDiplomaActions.getDiplomaList,

        syncHomeworkList: homeworkListActions.getHomeworkList,
        updateExpenseChapterRecord: courseRecordActions.updateExpenseChapterRecord
      }
    },

    /**
     *
     */
    data () {
      return {
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

        currChapterRecord: null //当前课程chapter记录
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
        // 判断前一个页面, 如果是从横屏退过来的页面不做其他处理
        const me = this
        if (from.path && from.path.indexOf('landscape/') > -1) {
          // do nothing
        } else if (from.path && /\/homework\/choice\/mark/.test(from.path) && this.currUseabLessonArr.length === this.currSubject.lessonList.length) {
          //做完课程最后一课选择题 拉取毕业奖状列表
          me.getDiplomaList().then(
            (newDiploma) => {
              const subjectDiploma = newDiploma.find(
                function (diploma) {
                  return diploma.subjectId === parseInt(me.subjectId)
                }
              )
              if (subjectDiploma && subjectDiploma.drawStatus === 'N') {
                me.$dispatch(eventMap.SUBJECT_GRADUATION, subjectDiploma)
              }
            }
          )
        } else {
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

    watch: {
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
              me.$route.router.go('/homework/choice/mark')
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
        }).catch(
          err => {
            console.log(err.message)
          }
        )
      },
      /**
       * 跳转到问答题 编辑页
       */
      goEssayAnswer (lessonId) {
        const me = this
        this.getArticle(lessonId).then(
            () => me.$route.router.go(`/homework/essay/answer/${lessonId}`)
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
            () => me.$route.router.go('/homework/essay/mark')
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
          this.$route.router.go(`/homework/essay/answer/${this.selectedLesson.lessonId}`)
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
        this.$route.router.go(`/homework/choice/answer/${this.selectedLesson.lessonId}`)
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
          if (this.currUseabLessonArr.length > 0 && this.currUseabLessonArr.length < this.currSubject.lessonList.length) {
            this.currUseabLessonArr.push(this.currSubject.lessonList[this.currUseabLessonArr.length].lessonId)
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
      showTipWhenLessonLimitedAndOnLine () {
        const me = this
        let msg = ''
        let confirmText = '确认'
        let confirmHandler = null
        const lastSubmitLesson = this.currSubject.lessonList.find(lesson => lesson.lessonId === me.lastSubmitlessonId)
        const lessonTitle = lastSubmitLesson.title
        const essayQuestion = lastSubmitLesson.essayQuestion

        if (essayQuestion.assignmentType === 'S') {
          // 简单作业
          if (this.isAssignmentSubmitted) {
            // 如果提交作业
            confirmText = '查看作业'
            confirmHandler = function () {
              me.setEssayQuestion(essayQuestion)
              me.goEssayMark(me.lastSubmitlessonId)
            }
            msg = `需要先通过"${lessonTitle}"的作业才能学习本课内容`
          } else {
            // 如果没有提交作业
            if (lastSubmitLesson.choiceQuestion && lastSubmitLesson.choiceQuestion.length > 0) {
              // 有选择题
              confirmText = '去测试'
              confirmHandler = function () {
                me.$route.router.go(`/homework/choice/answer/${me.lastSubmitlessonId}`)
              }
              msg = `需要先通过"${lessonTitle}"的测试才能学习本课内容`
            } else {
              // 无选择题
              confirmText = '去写作业'
              confirmHandler = function () {
                  me.setEssayQuestion(essayQuestion)
                  me.goEssayAnswer(me.lastSubmitlessonId)
              }
              msg = `需要先提交"${lessonTitle}"的作业才能学习本课内容`
            }
          }
            // 加入延迟,防止出现msg被点透的情况
          me.showConfirm({
            title: '',
            message: msg,
            okText: confirmText,
            cancelText: '继续听课',
            okCallback: confirmHandler
          })
        } else if (essayQuestion.assignmentType === 'H') {
          me.showAlert(
            {
              message: `需要前往长投网www.ichangtou.com，提交"${lessonTitle}"的作业才能学习本课内容`,
              btnText: '知道了'
            }
          )
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
        const path = `/pay-P-${this.subjectId}`
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
            // 若主线课程已经购买并且是在读, 直接转去购买页面
            this.goToPay()
          } else {
            this.showConfirm({message: `仅支持在"${this.currSubject.relatedMajorSubjectTitle}"有效学习时间内购买该选修课`})
          }
        } else {
          // 不是选修课, 直接转去订单页面
          this.goToPay()
        }
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
        if (!this.currChapterRecord) {
          // 服务器上没有进度进入,直接上传
          return true
        } else {
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
      PptPanel
    }
  }
</script>
