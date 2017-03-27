<template>
  <div class="chapterstart-choice-item">
    <div class="start-close-icon-container" v-touch:tap="backToMap"><span class="close-icon"></span></div>
    <div class="chapterstart-close"></div>
    <div class="chapterstart-wrapper">
      <p class="chapterstart-number">第{{chapterCharacterNum}}章</p>
      <p class="chapterstart-title">{{chapter.title}}</p>
      <img class="chapterstart-cover" :src="chapter.cover"/>
      <div class="chapterstart-btn" v-touch:tap="showStory">查看故事</div>
    </div>
  </div>
</template>
<script>
  import {villageActions} from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        getChapter: villageActions.getChapter,
        getStory: villageActions.getStory,
        changeQuestionShow: villageActions.changeQuestionShow
      }
    },
    route: {
      data ({to: {params: {chapterNo}}}) {
        this.setBackBtnToMain()
        this.chapter = this.getChapter(parseInt(chapterNo))
      },
      deactivate () {
        this.resetViewBackHandler()
      }
    },
    data () {
      return {
        chapter: {},
        chapterStory: {}
      }
    },
    watch: {
      isMaskShow () {
        this.$parent.viewBackHandler = this.isMaskShow ? this.setMaskHide : this.startChapter
      }
    },
    computed: {
      /*将章节号转换为汉字*/
      chapterCharacterNum () {
        const characterArray = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
        return characterArray[this.chapter.chapterNo - 1]
      }
    },
    methods: {
      /**
       * 解绑物理返回键
       */
      resetViewBackHandler () {
        this.$parent.viewBackHandler = null
      },
      /**
       * 设置物理返回键为回到地图
       */
      setBackBtnToMain () {
        this.$parent.viewBackHandler = this.backToMap
      },
      showStory () {
        this.showMask({
          component: 'freshVillage/ChapterStory.vue',
          hideOnMaskTap: false,
          callbackName: 'villageStartChapter',
          componentData: this.getStory(this.chapter),
          callbackFn: this.startChapter.bind(this) //组件上的
        })
      },
      backToMap () {
        this.$route.router.go('/village/map')
        this.changeQuestionShow(false)
      },
      startChapter () {
        this.$route.router.go('/village/map')
      }
    }
  }
</script>
<style lang="less">
  .chapterstart-choice-item {
    padding-top: 5rem;
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    text-align: center;
  p {
    margin: 0;
    font-size: .9rem;
    color: #444;
  }
  .chapterstart {
  &-number {
     line-height: 56/40rem;
   }
  &-title {
     padding-bottom:118/40rem;
   }
  &-cover {
     width:620/40rem;
     height: 434/40rem;
     padding-bottom: 106/40rem;
   }
  &-btn {
      background-color: #ff9800;
     font-size: 34/40rem;
     color: #fff;
     width: 340/40rem;
     height: 2rem;
     line-height: 2rem;
     border-radius: 1rem;
     margin: 0 auto;

   }
  &-btn-gray {
     background-color: #c0c0c0;
   }
  &-btn-white {
     background-color: #fff;
   }
  }
  .start-close-icon-container {
    display:inline-block;
    position: fixed;
    top: 1rem;
    right: .75rem;
    width: 2rem;
    height: 2rem;
    z-index: 50;
  }
  .close-icon:after{
    position: absolute;
    top: .6rem;
    right: .6rem;
    font-family: 'myicon';
    content: '\e90d';
    font-size: .9rem;
    color: #666;
  }
  }

</style>

