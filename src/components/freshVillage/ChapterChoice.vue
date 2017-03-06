/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
  <div class="chapter-choice">
    <scroller :lock-y='true' v-ref:vscroller :scrollbar-x="false" style="height=20.5rem;width:18.75rem">
      <div class="scroll-content active-position" >
        <!--:style="activePosition"--><!--v-el:first-chapter -->
        <chapter-choice-item  v-for="chapterCardInfo in componentData.chapterIntro"
                              :chapter-card-info="chapterCardInfo"
                              v-on:village-enter-chapter="villageEnterChapter"
                              class="question-pic">
        </chapter-choice-item><!--scrollPresentPosition-->
      </div>
    </scroller>
  </div>
</template>
<script>
  import Scroller from 'vux/scroller'
  import chapterChoiceItem from './ChapterChoiceItem.vue'

  export default {
    props: {
      componentData: Object
    },
    data () {
      return {
      }
    },
    computed: {
      presentChapter () {
        return this.componentData.villageProgress/* .chapterNo + 1*/
      }
    },
    watch: {
      presentChapter () {
        this.setPresentChapterPosition()
      }
    },
    route: {
      data () {
        this.setPresentChapterPosition()
      }
    },
    ready () {
      this.setPresentChapterPosition()
    },
    methods: {
      villageEnterChapter (chapterNum) {
        if (chapterNum === 3) {
          return
        } else if (chapterNum === 2) {
          if (this.presentChapter.chapterNo === 1 &&
            (this.presentChapter.questionNo === 6 || this.presentChapter.questionNo === 7)) {
            this.$dispatch('onChapterSelected', chapterNum)
          }
        } else {
          this.$dispatch('onChapterSelected', chapterNum)
        }
      },
      resetScroller (scrollerLeftWidth) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.vscroller.reset({
              left: scrollerLeftWidth
            })
          })
        }, 300)
      },
      /*
      * 当前章节显示在最前方
      * */
      setPresentChapterPosition () {
        let presentChapter
        let scrollerLeftWidth = 0
        if (this.presentChapter.chapterNo === 1) {
          if ((this.presentChapter.questionNo === 7 || this.presentChapter.questionNo === 6)) {
            presentChapter = 2
          } else {
            presentChapter = 1
          }
        } else if (this.presentChapter.chapterNo === 2) {
          if (this.presentChapter.questionNo === 7 || this.presentChapter.questionNo === 6) {
            presentChapter = 3
          } else {
            presentChapter = 2
          }
        } else {
          presentChapter = 1
        }
        switch (presentChapter) {
          case 1:
            scrollerLeftWidth = 0
            break
          case 2:
            scrollerLeftWidth = window.document.body.offsetWidth * 0.83
            break
          case 3:
            scrollerLeftWidth = window.document.body.offsetWidth * 1.65
            break
          default :
            scrollerLeftWidth = 0
        }
        this.resetScroller(scrollerLeftWidth)
        //重置页面滚动位置
      }
    },
    components: {
      Scroller,
      chapterChoiceItem
    }
  }
</script>
<style lang="less">
  .chapter-choice {
    display: block !important;
  }

  .scroll-content {
    width: 50.25rem;
    margin-left:2.25rem;
    margin-right:2.25rem;
  }
  .chapter1-active-position {
    position: relative;
    left: 0;
  }
  .chapter2-active-position {
    position: relative;
    right: -7.95rem;
  }
  .chapter3-active-position1 {
    position: relative;
    right: 0;
  }
  .question-pic {
    display: inline-block;
    width: 14.5rem;
    height: 20.5rem;
    margin-right: 1rem;
  }
</style>
