/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
  <div class="chapter-choice">
    <scroller :lock-y='true' v-ref:vscroller :scrollbar-x="false" style="height=20.5rem;width:18.75rem">
      <div class="scroll-content active-position" >
        <!--:style="activePosition"--><!--v-el:first-chapter -->
        <chapter-choice-item  v-for="chapterCardInfo in componentData"
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
      componentData: Array
    },
    vuex: {
      getters: {

      },
      actions: {
      }
    },
    data () {
      return {
      }
    },
    computed: {
//      scrollPresentPosition () {
//        const {firstChapter} = this.$els
//        console.log('firstChapter.offsetWidth ', firstChapter.offsetWidth)
//        return firstChapter.offsetWidth
//      }
    },
    watch: {
//      scrollPresentPosition () {
//      }
    },
    route: {
      data () {
        //重置页面滚动位置
      }
    },
    ready () {
//      this.resetScroller()
    },
    methods: {
      villageEnterChapter (chapterNum) {
        if (chapterNum === 3) {             //章节开放到第二章
          return
        } else {
          this.$dispatch('villageShowStory', chapterNum)
        }
      },
      resetScroller () {
       // const {firstChapter} = this.$els
      //  console.log('firstChapter.offsetWidth ', firstChapter.offsetWidth)
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.vscroller.reset({
              left: 0
            })
          })
        }, 300)
      }
//      setPosition () {
//        activePosition = 'chapter1-active-position'
//      }
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
