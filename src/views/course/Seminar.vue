/**
 * Created by jun on 2016/11/24.
 *
 */
<template>
  <div style="height: 100%;" class="seminar-detail">
    <ict-back-btn></ict-back-btn>

    <scroller :lock-x="true" scrollbar-y :bounce="false" v-ref:scroller :height="scrollerHeight" style="background-color: #fff">
      <div>
        <img v-if="!hasValidChapterClicked" v-bind:src="seminar ? seminar.promotion : './static/image/subject/intro-mini-pic.png'"
             alt="" style="height: 13rem; width: 100%; display: block">

        <ppt-panel v-if="hasValidChapterClicked" :ppts="currPpts"></ppt-panel>

        <web-audio v-show="hasValidChapterClicked" :src.sync="currAudioSrc"></web-audio>

        <!--简介和目录-->
        <div style="height: 100%; background-color: #fff">
          <content :lessons="seminar ? seminar.details : []"
                   :selected-lesson.sync="selectedLesson">
          </content>
        </div>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .seminar-detail {
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
          /*flex-grow: 2;*/
        }
      }
    }
  }

</style>

<script>
  import IctBackBtn from '../../components/IctCourseBackBtn.vue'
  import WebAudio from '../../components/WebAudio.vue'
  import PptPanel from '../../components/IctCoursePptPanel.vue'
  import Content from '../../components/IctSeminarContent.vue'
  import Scroller from 'vux/scroller'
  import {getWithoutAuth} from '../../frame/ajax'
  import {getUrl} from '../../frame/apiConfig'
  import {setSessionCache} from '../../util/cache'

  export default {
    data () {
      return {
        currSelectedLessonIndex: 0,  // 当前讲座章节
        seminarId: '', //讲座Id
        seminar: null, //讲座
        isResponsive: true, // 当前页面是否处于可响应状态 (响应 音频播放完成,全屏 事件)
        scrollerHeight: '480px',  // 0px ?
        hasValidChapterClicked: false,
        selectedLesson: null, //当前选中的lesson
        selectedChapterIndex: 0, //当前选中的chapter
        currAudioSrc: null, //当前音频地址
        currPpts: [] //当前ppt地址集合
      }
    },

    /**
     * 路由函数
     */
    route: {
      /**
       * 初始化页面数据
       * 加载课程信息, 加载进度
       * @param seminarId
       */
      data ({to: {params: {seminarId}}, from}) {
         // 判断前一个页面, 如果是从横屏退过来的页面不做其他处理
        if (from.path && from.path.indexOf('landscape/') > -1) {
          // do nothing
        } else {
        this.isResponsive = true
        this.resetView()
        this.seminarId = seminarId
        const me = this
        getWithoutAuth({
          url: getUrl('seminar').replace(':seminarId', seminarId)
        }).then(
          function (seminar) {
            me.seminar = seminar
          }
        )
       }
      },

      /**
       * 页面隐藏时
       */
      deactivate ({to, next}) {
       if (to.path && to.path.indexOf('landscape/') > -1) {
          next()
        } else {
        this.pause()
        this.isResponsive = false
        next()
      }
      }
    },

    ready () {
      this.scrollerHeight = (window.document.body.offsetHeight) + 'px'
    },

    /**
     * 设置监听事件
     */
    events: {
      /**
       * 选中某个chapter, 设置音频,ppt ,跳转逻辑
       */
      'lessonSelectedSeminar': function (lesson, currSelectedLessonIndex) {
        this.playChapter(lesson)
        this.selectedLesson = lesson
        this.selectedChapterIndex = currSelectedLessonIndex
      },

      /**
       * 音频播放结束
       * 继续播放下一节可用的音频
       */
      'audioPlayEnd' () {
        if (this.isResponsive) {
          // 尝试播放下一个章节
          // 由子组件接收事件控制
          this.$broadcast('playNextCapterSeminar')
        }
      },
      'fullScreenTap' () {
        if (this.isResponsive) {
          this.goToFullScreen(this.selectedLesson, this.selectedChapterIndex)
        }
      }
    },

    methods: {
      resetScroller () {
//        this.scrollerHeight = (window.document.body.offsetHeight - this.$els.bottomBtn.offsetHeight) + 'px'
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
        this.seminar = null
        this.hasValidChapterClicked = false
        this.pause()
      },

      /**
       * 暂停课程
       */
      pause () {
        this.$broadcast('pause')
      },

      /**
       *  播放
       * @param chapter
       */
      playChapter (lesson) {
        //显示ppt,音频
        this.hasValidChapterClicked = true
        this.currAudioSrc = lesson.audio
        this.currPpts = lesson.ppts
        this.$dispatch('chapterPlay', lesson)

        this.resetScroller()
      },

      /**
       *  全屏
       * @param currChapter
       */
      goToFullScreen (currChapter, selectedChapterIndex) {
        setSessionCache('landscapeSrc', {currChapter, selectedChapterIndex, lesson: this.selectedLesson})
        this.$route.router.go(`/landscape/${selectedChapterIndex}/1`)
      }
    },
    components: {
      WebAudio,
      Scroller,
      Content,
      PptPanel,
      IctBackBtn
    }
  }
</script>
