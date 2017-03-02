/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
  <div>
    <div v-if="!showWisdom" class="chapter-map" :class="bgStyle">
      <div class="other-element" v-show="false">
        <span class="chapter-title">第一章 一封来自陌生人的来信</span><span class="close-icon"></span>
        <img class="discuss" src="../../assets/styles/image/freshVillage/discuss.png"/>
        <img class="back-chapter" src="../../assets/styles/image/freshVillage/back.png"/>
        <div class="go-btn" :class="next-btn"></div>
      </div>
      <!--<div class="level level-sixth"></div>
      <div class="level level-fifth"></div>
      <div class="level level-fouth"></div>
      <div class="level level-third"></div>
      <div class="level level-second"></div>
      <div class="level level-first"></div>-->
    </div>
    <wisdom v-if="showWisdom" :wisdom-Data="wisdomData" @close-wisdom="closeWisdom"></wisdom>
</div>
</template>
<script>
  import {userGetters, villageGetters} from '../../vuex/getters'
  import wisdom from './Wisdom.vue'
  import {villageActions} from '../../vuex/actions'
 // import chapterChoice from '../../components/freshVillage/ChapterChoice.vue'

  export default {
  vuex: {
    getters: {
      isLogin: userGetters.isLogin,
      avatar: userGetters.avatar,
      answerProgress: villageGetters.answerProgress
    },
    actions: {
      getChapterCardInfo: villageActions.getChapterCardInfo,
      getChapterContent: villageActions.getChapterContent,
      getChapterStory: villageActions.getChapterStory,
      getQuestion: villageActions.getQuestion
    }
  },
  data () {
    return {
      activeChapterNo: 1,
      activeQuestionNo: 6,
      questionContent: {},
      lifeScore: 0,
      showWisdom: false
    }
  },
  computed: {
    /*章节卡片信息*/
    chapterCardInfo () {
      return this.getChapterCardInfo()
    },
    /*某一章节的全部信息*/
    chapterContent () {
      return this.getChapterContent(this.activeChapterNo)
    },
    /*今日小智内容*/
    wisdomData () {
      return this.questionContent.wisdom
    },
    /*关卡背景*/
    bgStyle () {
      if (this.activeChapterNo === 1) {
        return 'chapter1-bg'
      } else if (this.activeChapterNo === 2) {
        return 'chapter2-bg'
      }
    }
  },
  watch: {

  },
  route: {
    data () {
     this.showChapterChoice()
     // this.showUpgrade ()
     // this.showEmergency ()
     // this.showProverbs()
   //   this.showEmergency()
    //  this.showUpgrade()
    }
  },
  ready () {
    this.getActiveQuestion()
  //  this.showProverbs()
//    if (!this.isLogin) {
//      this.showChapterChoice()
//    } else {
//      this.JudgeProgress()
//    }
  },
  methods: {
    JudgeProgress () {

    },
    /*
    * 显示章节选择浮层
    * */
    showChapterChoice () {
      this.showMask({
        component: 'freshVillage/ChapterChoice.vue',
        hideOnMaskTap: false,
        callbackName: 'showStory',
        componentData: this.chapterCardInfo,
        callbackFn: this.showTheStory.bind(this)
      })
    },
    /*
    * 显示章节故事
    * */
    showTheStory (chapterNum) {
      this.activeChapterNo = chapterNum
      setTimeout(() => {
        this.showChapterStory()
      }, 300)
    },
    /*
    * 显示章节故事浮层
    * */
    showChapterStory () {
      this.showMask({
        component: 'freshVillage/ChapterStory.vue',
        hideOnMaskTap: true,
        callbackName: 'enterChapter',
        componentData: this.getChapterStory(this.chapterContent),
        callbackFn: this.enterChapter.bind(this) //组件上的
      })
    },
    /*
    * 从小故事下一步按钮进入答题
    * */
    enterChapter () {
      setTimeout(() => {
        this.showQuestion()
      }, 300)
    },
    /*
    * 获取当前问题内容
    * */
    getActiveQuestion () {
      this.questionContent = this.getQuestion(this.chapterContent.questionArr, this.activeQuestionNo)
      console.log('this.questionContent', this.questionContent)
    },
    /*
     * 显示答题浮层
     * */
    showQuestion () {
      this.getActiveQuestion()
      this.showMask({
        component: 'freshVillage/Question.vue',
        hideOnMaskTap: false,
        callbackName: 'tapOption',
        componentData: this.questionContent,
        callbackFn: this.tapTheOption.bind(this)
      })
    },

    /*
    * 记录选择的项上传记录
    * */
    tapTheOption (result) {
      if (!this.isLogin) {
        this.$route.router.go('/entry')
      } else {
        if (result) {
          this.lifeScore = 10
        } else {
          this.lifeScore = 2
        }
        setTimeout(() => {
          this.showAnswerResult()
        }, 300)
      }
    },
    /*
    * 显示答题结果浮层
    * */
    showAnswerResult () {
      let answerResultData = {
        feedback: this.questionContent.feedback,
        lifeScore: this.lifeScore
      }
      this.showMask({
        component: 'freshVillage/AnswerResult.vue',
        hideOnMaskTap: false,
        callbackName: 'showExpandsData',
        componentData: answerResultData,
        callbackFn: this.showTheExpandsData.bind(this) //组件上的
      })
    },
    /*
    * 显示拓展材料，根据类型显示箴言，小智或突发事件
    * */
    showTheExpandsData () {
      if (this.questionContent.expandsMaterialType === 1) {
        this.showWisdom = true
      } else if (this.questionContent.expandsMaterialType === 2) {
        setTimeout(() => {
          this.showProverbs()
        }, 300)
      } else {
        setTimeout(() => {
          this.showEmergency()
        }, 300)
      }
    },
    /*
    * 隐藏今日小智
    * */
    closeWisdom () {
      this.showWisdom = false
    },
    /*
    * 显示箴言
    * */
    showProverbs () {
      this.showMask({
        component: 'freshVillage/Proverbs.vue',
        hideOnMaskTap: true,
        componentData: this.questionContent.proverbs
      })
    },
    /*
    * 显示突发事件
    * */
    showEmergency () {
      this.showMask({
        component: 'freshVillage/Emergency.vue',
        hideOnMaskTap: true,
        componentData: this.questionContent.emergency
      })
    },
    /*
    * 显示章节结束晋级页面
    * */
    showUpgrade () {
      let upgradePageData = {
        avatar: this.avatar,
        level: this.activeChapterNo
      }
      this.showMask({
        component: 'freshVillage/Upgrade.vue',
        hideOnMaskTap: true,
        callbackName: 'getResult',
        componentData: upgradePageData,
        callbackFn: this.getResult.bind(this) //组件上的
      })
    },
    getResult () {
      console.log('getResult')
    }

  },
  components: {
  //  chapterChoice,
    wisdom
  }
}
</script>
<style lang="less">
  .chapter-map {
    position: relative;
    width: 100%;
    height: 100%;
    .level {
      position: absolute;
      background-color: red;
      width: 2.1rem;
      height: 2.1rem;
      &-sixth {
        left: 7.7rem;
        top: 6.1rem;
      }
      &-fifth {
        left: 8.96rem;
        top: 11.4rem;
      }
      &-fouth {
        left: 6.7rem;
        top: 16.6rem;
      }
      &-third {
        left: 9.4rem;
        bottom: 9.7rem;
      }
      &-second {
        left: 8.9rem;
        bottom: 4.8rem;
      }
      &-first {
        left: 6.8rem;
        bottom: .2rem;
      }
    }
  }
  .chapter1-bg {
    background: url('../../../static/image/freshVillage/chapter1-bg.png') no-repeat;
    background-size: 100% 100%;
  }
  .chapter2-bg {
    background: url('../../../static/image/freshVillage/chapter2-bg.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .other-element {
    width: 100%;
    height: 100%;

    .chapter-title {
      display: inline-block;
      position: absolute;
      top: 1rem;
      left: .75rem;
      padding: 0 .75rem;
      height: 1.5rem;
      line-height: 1.5rem;
      border-radius: .75rem;
      font-size: .7rem;
      background-color: #fff;
      opacity: .7;
      color: #888;
    }
    .close-icon:after{
      position: absolute;
      top: 1.3rem;
      right: .75rem;
      font-family: 'myicon';
      content: '\e90d';
      font-size: .9rem;
      color: #fff;
    }
    .discuss {
      position: absolute;
      top: 3.5rem;
      left: .75rem;
      width: 3.1rem;
      height: 3.5rem;
      margin-left: .75rem;
    }
    .back-chapter {
      position: absolute;
      left: 1rem;
      bottom: 1rem;
      display: inline-block;
      width: 1.6rem;
      height: 1.6rem;
    }
    .go-btn {
      position: absolute;
      bottom: .5rem;
      right: 3rem;
      width: 3.6rem;
      height: 3.75rem;
      background: url('../../assets/styles/image/freshVillage/go.png') no-repeat;
      background-size: contain;
    }
    .next-btn {
      background: url('../../assets/styles/image/freshVillage/next.png') no-repeat;
      background-size: contain;
    }
  }



</style>
