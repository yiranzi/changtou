<template>
  <div class="lesson-content">
    <div v-for="lesson in lessons" v-touch:tap="updateSelectedLesson(lesson, $index, $event)"
         class="chapter-title" v-bind:class="{'active': lesson.title === (selectedLesson && selectedLesson.title)}">
        <!--<div v-for="chapter in lesson.lessonDetailsList" v-touch:tap="updateSelectedChapter(chapter)"-->
             <!--class="chapter-title" v-bind:class="{'active': chapter.title === (selectedChapter && selectedChapter.title)}">-->
      <span style="width: 85%">
        <span class="number">{{$index+1}}</span>
        <span class="play-icon"></span>
        <span>{{lesson.title}}</span>
      </span>
    </div>

    <div class="tip-box">
      <img src="../../static/image/subject/detailView/series.png" alt="" class="img">
      <span>课程连载中...</span>
    </div>
      <!--</div>-->

    <div style="height: 4.1rem; background-color: #fff"></div>
  </div>
</template>

<style lang="less">
  .lesson-content {
    background-color: #fff;
    /*padding-top: 50/40rem;*/
    padding-left: 50/40rem;
    padding-right: 50/40rem;

  /*.lesson-title:first-child {*/
  /*margin-top: 0;*/
  /*}*/

    .tip-box {
      margin-top: 0.4rem;
      padding-left: 1rem;
      font-size: 0.75rem;
      color: #898989;
      .img {
        height: 0.75rem;
        width: 0.75rem;
        margin-right: 0.2rem;
      }
    }

    .lesson-title {
      display: flex;
      align-items: center;
      margin-top: 50/40rem;
      height: 110/40rem;
      padding-left: 30/40rem;
      color: #000;
      font-size: 30/40rem;
      background-color: #f7f9fc;

      &-title {
       display: inline-block;
       width: 87%;
      }

    }

    .active{
      color: #00b0f0 !important;
    }

    .chapter-title {
      display: flex;
      align-items: center;
      height: 110/40rem;
      font-size: 28/40rem;
      color: #656565;
      border-bottom: 1px solid #f0eff5;

      .number {
        display: inline-block;
        margin-right: 30/40rem;
      }
      .play-icon {
        margin-right: 10/40rem;
      }
      .play-icon:before {
        font-family: 'myicon';
        content: '\e907';
        font-size: 0.7rem !important;
      }
    }
  }

  /* 必需 */
  .expand-transition {
    transition: all 0.3s ease;
    opacity: 1;
    margin-left: .7rem;
  }

  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .expand-enter {
    height: 0 !important;
    opacity: 0;
  }
  .expand-leave {
    height: 0 !important;
    opacity: 0;
  }

</style>

<script>
  export default{
    props: [
      'lessons',
      'record',
      'selectedLesson',
      'selectedChapter'
    ],

    watch: {
      'lessons': function (newlessons, oldLessons) {
        this.lessonListType = newlessons.map(({lessonId}) => {
            return {lessonId: lessonId, isRollUp: false}
          })
      }
    },

    data () {
      return {
        lessonListType: [],
        currSelectedIndex: -1
      }
    },

    ready () {
      this.selectedLesson = this.lessons[0]
    },

    events: {
      'playNextCapterFree': function () {
        if (this.currSelecteLessonIndex + 1 < this.lessons.length) {
          this.updateSelectedLesson(
            this.lessons[this.currSelecteLessonIndex + 1], this.currSelecteLessonIndex + 1)
        }
      }
    },

    methods: {
      updateSelectedLesson (lesson, index) {
        this.selectedLesson = lesson
        this.currSelecteLessonIndex = index
        this.updateSelectedChapter(lesson.lessonDetailsList[0]) //这里更新chapter, 是为了预留二级空间,与付费课结构一致,以后好修改
//        // 则设置开关列表状态
//        if ($event.target.className.includes('lesson-title')) { // 若是选中的是 lesson 而不是 chapter
//          let index = this.lessonListType.findIndex((lessonTypeItem) => lessonTypeItem.lessonId === lesson.lessonId)
//          if (index > -1) {
//            this.lessonListType = this.lessonListType.map(function (item, itemIndex) {
//              if (index !== itemIndex) {
//                item.isRollUp = false
//              } else {
//                item.isRollUp = !item.isRollUp
//              }
//              return item
//            })
//          }
//        }
      },

      updateSelectedChapter (chapter) {
        this.selectedChapter = chapter
        // 向父组件派发事件 (注意这里的事件名称和付费课不一致)
        this.$dispatch('chapterSelectedFree', chapter)
      }
    }
  }
</script>
