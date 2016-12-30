/**
 * Created by jun on 2016/10/25.
 * 课程横屏
 */
<template>
    <div :style="viewStyle" class="full-screen">

      <div class="chapter-title" v-show="isFloatShow" v-bind:style="titleStyle">
        {{title}}
        <span class="close-icon" v-touch:tap="onCloseIconTap"></span>
      </div>

      <!--箭头-->
      <div class="arrow left-arrow" v-show="isFloatShow && isLeftArrowShow" v-bind:style="leftArrowStyle"
           v-touch:tap="onLeftArrowTap"></div>
      <div class="arrow right-arrow" v-show="isFloatShow && isRightArrowShow" v-bind:style="rightArrowStyle"
           v-touch:tap="onRightArrowTap"></div>

      <swiper :style="screenHeight" v-if="isPptShow" v-ref:swiper @slide-change-end="onSlideChange">
        <div v-for="ppt in currPpts" class="test-box" track-by="$index">
          <img :src="ppt" alt="" v-bind:style="imgStyle" v-touch:tap="onPptTap">
        </div>
      </swiper>

      <web-audio :src.sync="currAudioSrc" v-el:audio direction="vertical"
                  v-show="isFloatShow"  v-bind:style="audioStyle" v-ref:audio>
      </web-audio>
    </div>
</template>
<script>
  import WebAudio from '../../components/WebAudio.vue'
  import Swiper from 'vue-swiper'
  import {getSessionCache, clearSessionCache} from '../../util/cache'
  import {Device, platformMap} from '../../plugin/device'
  export default {
    data () {
      return {
        isResponsive: false,
        direction: 'vertical',
        isPptShow: false,
        screenHeight: 'height: ' + window.document.body.offsetHeight + 'px',
        lesson: '', //当前lesson
        chapterIndex: '', //当前chapter index
        currChapter: null, //当前chapter,
        currAudioSrc: '', // 音频地址
        currPpts: [], //ppt
        currPptIndex: 0,
        isFloatShow: false, //是否显示浮层
        imgStyle: null,
        titleStyle: null,
        audioStyle: null,
        leftArrowStyle: null,
        rightArrowStyle: null,
        timer: 0 // 浮框消失的倒计时
      }
    },

    computed: {
      title () {
        return this.currChapter ? this.currChapter.title : ''
      },

      isLeftArrowShow () {
        return this.currPptIndex !== 0
      },

      isRightArrowShow () {
        return this.currPptIndex !== this.currPpts.length - 1
      }
    },

    watch: {
      /**
       * ppt改变
       */
      currChapter: function (chapter) {
        if (chapter) {
          this.currAudioSrc = chapter.audio
          this.currPpts = chapter.ppts
          this.isPptShow = false
          this.currPptIndex = 0

          setTimeout(() => { this.isPptShow = true }, 1000)
        }
      }
    },

    route: {
      data ({to: {params: {subjectId, lessonId}}}) {
        // 隐藏电池栏
        if (Device.platform !== platformMap.WEB) {
          window.StatusBar.hide()
        }

        const {lesson, chapterIndex, currChapter} = getSessionCache('landscapeSrc')
        clearSessionCache('landscapeSrc')

        setTimeout(() => {
          const height = window.document.body.offsetHeight

          this.screenHeight = 'height: ' + height + 'px'
          this.isFloatShow = true
          this.isResponsive = true

         // 设置横屏的样式
         this.setLandscapeStyle()
        }, 300)

        setTimeout(() => {
          this.lesson = lesson
          this.chapterIndex = chapterIndex
          this.currChapter = currChapter
          this.beginTimerToHideFloat()
        }, 300)
      },

      deactivate () {
        this.stopTimer()
        this.isResponsive = false
        // 显示电池栏
        if (Device.platform !== platformMap.WEB) {
          window.StatusBar.show()
        }
        this.isFloatShow = false
        this.lesson = '' //当前lesson
        this.chapterIndex = '' //当前chapter index
        this.currChapter = null //当前chapter,
        this.currPpts = [] //ppt
        this.currPptIndex = 0
      }
    },

    /**
     *
     */
    ready () {
      // 绑定音频事件(动态显示或者隐藏控件)
      const {audio} = this.$refs
      audio.setTouchStartHandler(this.doWhenAutioTouchStart.bind(this))
      audio.setTouchEndHandler(this.doWhenAutioTouchEnd.bind(this))
    },

    events: {
      /**
       *  响应播放的音频改变事件
       */
      'vaildChapterPlay': function (chapter) {
        if (this.isResponsive) {
          this.currChapter = chapter
        }
      }
    },

    methods: {
      /**
       * 点击ppt
       */
      onPptTap () {
        this.isFloatShow = true
        this.resetTimerToHideFloat()
      },

      /**
       * 点击关闭
       */
      onCloseIconTap () {
        window.history.back()
      },

      onLeftArrowTap () {
        const {swiper} = this.$refs
        swiper.prev()
      },

      onRightArrowTap () {
        const {swiper} = this.$refs
        swiper.next()
      },

      /**
       * ppt滑动
       */
      onSlideChange (pageNum) {
        this.currPptIndex = pageNum - 1
        this.resetTimerToHideFloat()
      },

      doWhenAutioTouchStart () {
        this.stopTimer()
      },

      doWhenAutioTouchEnd () {
        this.beginTimerToHideFloat()
      },

      resetTimerToHideFloat () {
        this.stopTimer()
        this.beginTimerToHideFloat()
      },

      beginTimerToHideFloat () {
        this.timer = setTimeout(() => {
          this.isFloatShow = false
        }, 5000)
      },

      stopTimer () {
        clearTimeout(this.timer)
      },

      /**
       * 设置横屏模式样式
       */
      setLandscapeStyle () {
        const height = window.document.body.offsetHeight
        const width = window.document.body.offsetWidth
        this.imgStyle = {
          width: height + 'px',
          height: width + 'px',
          transformOrigin: '0 0 0',
          transform: `rotate(90deg) translate3d(0,-${width}px,0)`
        }

        this.titleStyle = {
          width: height + 'px',
          transformOrigin: '0 0 0',
          transform: `rotate(90deg) translate3d(0,-${width}px,0)`
        }

        this.audioStyle = {
          height: '2.2rem',
          width: height + 'px',
          transformOrigin: '0 0 0',
          transform: `rotate(90deg) translate3d(-${height}px,-2.2rem,0)`
        }

        const arrowHeight = window.document.body.offsetWidth - (3.2 + 2.2) * window.fontScale
        this.leftArrowStyle = {
          height: arrowHeight + 'px',
          transformOrigin: '0 0 0',
          transform: `rotate(90deg) translate3d(0,-${arrowHeight + 2.2 * window.fontScale}px,0)`
        }
        this.rightArrowStyle = {
          height: arrowHeight + 'px',
          transformOrigin: '0 0 0',
          transform: `rotate(90deg) translate3d(${height - 2 * window.fontScale}px,${(3.2 - 2) * window.fontScale}px,0)`
        }
      }
    },
    components: {
      WebAudio,
      Swiper
    }
  }
</script>
<style lang="less">
  .full-screen{
     height: 100%;
    .chapter-title{
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 3.2rem;
      top: 0;
      left: 0;
      padding: 0 1rem;
      box-sizing: border-box;
      line-height: 3.2rem;
      background: #000;
      opacity: 0.7;
      font-size: 0.8rem;
      color: #fff;
      .close-icon{
        position: absolute;
        right: 0;
        padding: 0 1rem;
        &:before{
          font-family: 'myicon';
          content: '\e919';
          font-size: 0.7rem !important;
        }
      }
    }
    .audio-box{
      position: absolute;
      z-index: 10;
      left: 0;
      bottom: 0;
      background: #000;
      opacity: 0.7;
      color: #fff;
    }
    .arrow{
      position: absolute;
      z-index: 9;
      top: 0;
      width: 2rem;
      height: 100%;
      &:after{
        position: absolute;
        top: 3rem;
        font-size: 6rem;
        color: #ccc;
      }
    }
    .left-arrow{
      left: 0;
      &:after{
        left: 0;
        font-family: 'myicon';
        content: '\e909';
      }
    }
    .right-arrow{
      right: 0;
      &:after{
        right: 0;
        font-family: 'myicon';
        content: '\e908';
      }
    }
  }
</style>
