/**
 * Created by jun on 2016/10/25.
 * 课程横屏
 */
<template>
    <div :style="viewStyle" class="full-screen">
      <div class="chapter-title" v-show="isFloatShow">{{chapterTitle}}
        <span class="close-icon" v-touch:tap="onCloseIconTap"></span></div>
      <swiper :show-dots="false" :auto="false"
              :loop="false" :show-desc-mask="false"
              :aspect-ratio="aspectRatio" :style="style"
              v-touch:tap="onPptTap" direction="vertical">
        <swiper-item v-for="ppt in currPpts" class="black" :style="style">
          <img :src="ppt" alt="" style="height: 100%; width: 100%">
        </swiper-item>
      </swiper>
      <web-audio :src.sync="currAudioSrc" v-el:audio
                 :width="width" v-show="isFloatShow" size="mini"></web-audio>
    </div>
</template>
<script>
  import WebAudio from '../../components/webAudio.vue'
  import Swiper from 'vux/swiper'
  import SwiperItem from 'vux/swiper-item'
  import { courseDetailGetters } from '../../vuex/getters'
  import { platformMap, Device } from '../../plugin/device'

export default {
  vuex: {
    getters: {
      expenseSubjectArr: courseDetailGetters.expenseDetailArr
    }
  },
  data () {
    return {
      width: '',
      height: '',
      lessonId: '', //当前lesson id
      chapterIndex: '', //当前chapter index
      chapterTitle: '', //当前chapter title
      currAudioSrc: '', //当前音频地址
      currPpts: [], //当前ppt地址集合
      isFloatShow: false //是否显示浮层
    }
  },
  computed: {
    viewStyle () {
      if (!this.width || !this.height) {
        this.calculateSize()
      }

      return `width:${this.width}px;height:${this.height}px;
        transform-origin: 0 0 0;-webkit-transform-origin: 0 0 0;
        transform: rotate(90deg) translate3d(0,-${this.height}px,0);
        -moz-transform: rotate(90deg) translate3d(0,-${this.height}px,0);
        -webkit-transform: rotate(90deg) translate3d(0,-${this.height}px,0);
        -ms-transform: rotate(90deg) translate3d(0,-${this.height}px,0);`
    },
    style () {
      if (!this.width || !this.height) {
        this.calculateSize()
      }
      return `width:${this.width}px;height:${this.height}px;`
    },
    aspectRatio () {
      if (!this.width || !this.height) {
        this.calculateSize()
      }
      return this.height / this.width
    }
  },
  watch: {
    isFloatShow (newVal) {
      if (newVal) {
        const me = this
        setTimeout(
          function () {
            me.isFloatShow = false
          },
          3000
        )
      }
    }
  },
  route: {
    data ({to: {params: {subjectId, lessonId, chapterIndex}}}) {
      const me = this
      const subjectIndex = me.expenseSubjectArr.findIndex(
          item => {
            return item.subjectId === subjectId
          }
      )

      const subjectArr = me.expenseSubjectArr[subjectIndex]
      const lessonIndex = subjectArr.lessonList.findIndex(
          item => {
            return item.lessonId === parseInt(lessonId)
          }
      )

      const lessonArr = subjectArr.lessonList[lessonIndex]
      const chapter = lessonArr.lessonDetailsList[chapterIndex]

      return {
        lessonId,
        chapterIndex,
        chapterTitle: lessonArr.title,
        currAudioSrc: chapter.audio,
        currPpts: chapter.ppts
      }
    }
  },
  ready () {
    this.calculateSize()
    this.isFloatShow = true
  },
  methods: {
    /**
     * 计算屏幕大小
     */
    calculateSize () {
      const isWeb = (Device.platform === platformMap.WEB)
      const html = document.getElementsByTagName('html')[0]

      this.width = (isWeb ? html.offsetHeight : window.screen.height)
      this.height = (isWeb ? html.offsetWidth : window.screen.width)
    },

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
    Swiper,
    SwiperItem
  }
}
</script>
<style lang="less">
  .full-screen{
    position: relative;
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
