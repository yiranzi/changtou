<template>
  <div class="lesson-content">
    <div v-for="lesson in lessons" v-touch:tap="updateSelectedLesson(lesson, $event)">
      <div class="lesson-title">
        <span class="lesson-title-title">{{lesson.title}}</span>
        <span v-bind:class="[(lessonListType.length !== 0 ? (lessonListType[$index] ? lessonListType[$index].isRollUp : false) : false) ? 'lesson-title-roll-up' : 'lesson-title-roll-down']"></span>
      </div>

      <!--<div v-show="lesson.lessonId === (selectedLesson ? selectedLesson.lessonId : 0)"-->
      <div v-show="lessonListType.length !== 0 ? (lessonListType[$index] ? lessonListType[$index].isRollUp : false): false"
           transition="expand"
           v-bind:style="{height: (lesson.lessonDetailsList.length +
           (lesson.choiceQuestion.length > 0 ? 1 : 0) + (lesson.essayQuestion.assigmentType !== 'N' ? 1 : 0)) * 11/4 + 'rem'}" >
        <div v-for="chapter in lesson.lessonDetailsList" v-touch:tap="updateSelectedChapter(chapter, $index)"
             class="chapter-title" v-bind:class="{'active': chapter.title === (selectedChapter && selectedChapter.title)}">
          <span style="width: 85%">
            <span class="number">{{$index+1}}</span>
            <span class="play-icon"></span>
            <span>{{chapter.title}}</span>
          </span>
          <span v-if="lesson.type === 'C'" style="color: #00b0f0; font-size:0.6rem">可试听</span>
        </div>

        <!--选择题作业-->
        <div v-if="lesson.choiceQuestion.length > 0" class="chapter-title"
             v-touch:tap="onHomeworkChoiceTap(lesson.choiceQuestion, lesson.lessonId, $index)">
          <span class="number">{{lesson.lessonDetailsList.length + 1}}</span>
          <span class="chioce-icon"></span>
          &nbsp;&nbsp;课后作业
        </div>

        <!--问答题作业-->
        <div v-if="lesson.essayQuestion.assigmentType !== 'N'" class="chapter-title"
             v-touch:tap="onHomeworkEssayTap(lesson.essayQuestion, lesson.lessonId, $index)">
          <span class="number">{{lesson.lessonDetailsList.length + 1 + (lesson.choiceQuestion.length > 0 ? 1: 0)}}</span>
          <span class="homework-icon"></span>&nbsp;&nbsp;{{lesson.choiceQuestion.length > 0 ? '选修作业 (补充习题)' : '课程作业'}}
        </div>

      </div>
    </div>

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

    .chioce-icon:before{
      font-family: 'myicon';
      content: '\e916';
      font-size: 0.7rem !important;
    }

    .homework-icon:before{
      font-family: 'myicon';
      content: '\e91f';
      font-size: 0.7rem !important;
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

      &-roll-up{
        display: inline-block;
        /*position: absolute;*/
        right: 1.5rem;
        top: 1.2rem;
        width: 0.6rem;
        height: 0.6rem;
        padding: 0;
        border-top: 1px solid #898989;
        border-right: 1px solid #898989;
        transform: rotate(-45deg);
      }

      &-roll-down{
        display: inline-block;
        /*position: absolute;*/
        right: 1.5rem;
        top: 1.2rem;
        width: 0.6rem;
        height: 0.6rem;
        padding: 0;
        border-top: 1px solid #898989;
        border-right: 1px solid #898989;
        transform: rotate(135deg);
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

    data () {
      return {
        lessonListType: []
      }
    },

    watch: {
      'lessons': function (newlessons, oldLessons) {
        this.lessonListType = newlessons.map(({lessonId}) => {
            return {lessonId: lessonId, isRollUp: false}
          })
      }
    },

    ready () {
      this.selectedLesson = this.lessons[0]
    },

    methods: {
      updateSelectedLesson (lesson, $event) {
        this.selectedLesson = lesson

        // 则设置开关列表状态
        if ($event.target.className.includes('lesson-title')) { // 若是选中的是 lesson 而不是 chapter
          let index = this.lessonListType.findIndex((lessonTypeItem) => lessonTypeItem.lessonId === lesson.lessonId)
          if (index > -1) {
            this.lessonListType = this.lessonListType.map(function (item, itemIndex) {
              if (index !== itemIndex) {
                item.isRollUp = false
              } else {
                item.isRollUp = !item.isRollUp
              }
              return item
            })
          }
        }
      },

      updateSelectedChapter (chapter, $index) {
        this.selectedChapter = chapter
        // 向父组件派发事件
        this.$dispatch('chapterSelected', chapter, $index, 'common')
      },

      /**
       * 点击选择题
       */
      onHomeworkChoiceTap (choiceQuestionArr, lessonId, index) {
        this.$dispatch('homeworkChoiceTap', {choiceQuestionArr, lessonId, index})

//        this.$dispatch('chapterSelected', null, -1, 'choice')
      },

      /**
       * 点击问答题
       */
      onHomeworkEssayTap (essayQuestion, lessonId, index) {
        this.$dispatch('homeworkEssayTap', {essayQuestion, lessonId, index})
//        this.$dispatch('chapterSelected', null, -1, 'essay')
      }
    }
  }
</script>
