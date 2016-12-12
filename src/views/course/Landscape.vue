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

      <swiper :style="screenHeight" v-if="isShow">
        <div v-for="ppt in currPpts" class="test-box" track-by="$index">
          <img :src="ppt" alt="" v-bind:style="imgStyle" v-touch:tap="onPptTap">
        </div>
      </swiper>

      <web-audio :src.sync="currAudioSrc" v-el:audio direction="vertical"
                  v-show="isFloatShow"  v-bind:style="audioStyle">
      </web-audio>
    </div>
</template>
<script>
  import WebAudio from '../../components/WebAudio.vue'
  import Swiper from 'vue-swiper'
  import {getSessionCache, clearSessionCache} from '../../util/cache'
  export default {
    data () {
      return {
        isResponsive: false,
        direction: 'vertical',
        isShow: false,
        screenHeight: 'height: ' + window.document.body.offsetHeight + 'px',
        width: '',
        height: '',
        lesson: '', //当前lesson
        chapterIndex: '', //当前chapter index
        currChapter: null, //当前chapter,
        currAudioSrc: '', // 音频地址
        currPpts: [], //ppt
        isFloatShow: false //是否显示浮层
      }
    },

    computed: {
      title () {
        return this.currChapter ? this.currChapter.title : ''
      },

      imgStyle () {
        const height = window.document.body.offsetHeight
        const width = window.document.body.offsetWidth
        return {
          width: height + 'px',
          height: width + 'px',
          transformOrigin: '0 0 0',
          transform: `rotate(90deg) translate3d(0,-${width}px,0)`
        }
      },

      titleStyle () {
        const height = window.document.body.offsetHeight
        const width = window.document.body.offsetWidth
        return {
          width: height + 'px',
          transformOrigin: '0 0 0',
          transform: `rotate(90deg) translate3d(0,-${width}px,0)`
        }
      },

      audioStyle () {
        const height = window.document.body.offsetHeight
        return {
          height: '5rem',
          width: height + 'px',
          transformOrigin: '0 0 0',
          transform: `rotate(90deg) translate3d(-${height}px,-5rem,0)`
        }
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
          this.isShow = false

          setTimeout(() => { this.isShow = true }, 1000)
        }
      }
    },

    route: {
      data ({to: {params: {subjectId, lessonId}}}) {
        const {lesson, chapterIndex, currChapter} = getSessionCache('landscapeSrc')
        clearSessionCache('landscapeSrc')

        return Promise.resolve({
          lesson,
          chapterIndex,
          currChapter,
          isFloatShow: true,
          isResponsive: true
        })
      },

      deactivate () {
        this.isResponsive = false
      }
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
      },

      /**
       * 点击关闭
       */
      onCloseIconTap () {
        window.history.back()
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
  }
</style>
