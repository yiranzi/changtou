/**
 * Created by jun on 2016/10/25.
 * 课程横屏
 */
<template>
    <div :style="viewStyle" class="full-screen">
      <div class="chapter-title">{{chapter.title}}<span class="close-icon"></span></div>
      <swiper :show-dots="false" :auto="false"
              :loop="false" :show-desc-mask="false"
              :aspect-ratio="aspectRatio" :style="style"
              v-el:ppts direction="vertical">
        <swiper-item v-for="ppt in currPpts" class="black" :style="style">
          <img :src="ppt" alt="" style="height: 100%; width: 100%">
        </swiper-item>
      </swiper>
      <web-audio :src.sync="currAudioSrc" v-el:audio :width="width"></web-audio>
    </div>
</template>
<script>
  import WebAudio from '../../components/webAudio.vue'
  import Swiper from 'vux/swiper'
  import SwiperItem from 'vux/swiper-item'
  import { courseDetailGetters } from '../../vuex/getters'
  import { platformMap, getPlatform } from '../../plugin/device'
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
      chapter: '',
      currAudioSrc: '', //当前音频地址
      currPpts: [] //当前ppt地址集合
    }
  },
  computed: {
    viewStyle () {
      if (!this.width || !this.height) {
        this.calculateSize()
      }

//      return `width:${this.width}px;height:${this.height}px;
//        transform-origin: 0 0 0;-webkit-transform-origin: 0 0 0;
//        transform: rotate(90deg) translate3d(0,-${this.height}px,0);
//        -moz-transform: rotate(90deg) translate3d(0,-${this.height}px,0);
//        -webkit-transform: rotate(90deg) translate3d(0,-${this.height}px,0);
//        -ms-transform: rotate(90deg) translate3d(0,-${this.height}px,0);`
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
        chapter: chapter,
        currAudioSrc: chapter.audio,
        currPpts: chapter.ppts
      }
    }
  },
  ready () {
    this.calculateSize()
  },
  methods: {
    /**
     * 计算屏幕大小
     */
    calculateSize () {
      const isWeb = getPlatform === platformMap.WEB
      const html = document.getElementsByTagName('html')[0]
      this.width = (isWeb ? html.offsetHeight : window.screen.height)
      this.height = (isWeb ? html.offsetWidth : window.screen.width)
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
    .chapter-title{
      position: absolute;
      z-index: 10;
      height: 3.2rem;
      padding: 1rem 0.75rem 0;
      background: #000;
      opacity: 0.7;
      font-size: 0.8rem;
      line-height: 2.2rem;
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
  }
</style>
