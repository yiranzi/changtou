/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
  <div>
    <div v-if="!showWisdom" class="chapter-map" :class="bgStyle">
      <div class="other-element">
        <span class="chapter-title" v-touch:tap="showChapterStory">第{{chapterCharacterNo}}章  {{chapter.title}}</span><span class="close-icon" v-touch:tap="exitVillage"></span>
        <img class="discuss" src="../../assets/styles/image/freshVillage/discuss.png" v-touch:tap=""/>
        <img class="back-chapter" src="../../assets/styles/image/freshVillage/back.png" v-touch:tap="backToChapter"/>
        <div class="go-btn" v-touch:tap="goNextStep" :class="{'next-btn' : showNextChapterBtn}"></div>
      </div>
      <div class="level" :class="getLevelCls(i)" v-for="i in 6" v-touch:tap="onLevelTap(i + 1)"></div>
    </div>
    <wisdom v-if="showWisdom" :wisdom-data="wisdomData" @close-wisdom="closeWisdom"></wisdom>
</div>
</template>
<script>
  import {userGetters, villageGetters} from '../../vuex/getters'
  import wisdom from './Wisdom.vue'
  import {villageActions} from '../../vuex/actions'
  export default {
    vuex: {
      getters: {
        isLogin: userGetters.isLogin,
        avatar: userGetters.avatar,
        villageProgress: villageGetters.villageProgress
      },
      actions: {
        getChapterIntro: villageActions.getChapterIntro,
        getChapter: villageActions.getChapter,
        getStory: villageActions.getStory,
        getQuestion: villageActions.getQuestion,
        updateRecord: villageActions.updateRecord
      }
    },
    data () {
      return {
        activeChapterNo: 0,
        activeQuestionNo: 0,
        chapter: {},
        question: {},
        lifeScore: 0,
        showWisdom: false,
        bgStyle: 'chapter1-bg',
        showNextChapterBtn: false
      }
    },
    computed: {
      /*章节号对应汉字*/
      chapterCharacterNo () {
        const characterArray = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
        return characterArray[this.activeChapterNo - 1]
      },
      /*章节卡片信息*/
      chapterIntro () {
        return this.getChapterIntro()
      },
      /*某一章节的全部信息*/
//      chapter () {
//        return this.getChapter(this.activeChapterNo)
//      },
      /*今日小智内容*/
      wisdomData () {
        return this.question.wisdom
      }
//      showNextChapterBtn () {
//        console.log('this.activeQuestionNo', this.activeQuestionNo)
//        if (this.activeQuestionNo === 7) {
//          return true
//        } else {
//          return false
//        }
//      }
      /*关卡背景*/
    },
    watch: {
      villageProgress () {
        console.log('watch 1', this.villageProgress.questionNo)
        if (this.villageProgress.questionNo === 6 || this.villageProgress.questionNo === 7) {
          this.showNextChapterBtn = true
        } else {
          this.showNextChapterBtn = false
        }
      },
      activeChapterNo () {  //switch
        if (this.activeChapterNo === 1) {
          this.bgStyle = 'chapter1-bg'
        } else if (this.activeChapterNo === 2) {
          this.bgStyle = 'chapter2-bg'
        }
      }
    },
    route: {
      data () {
      }
    },
    ready () {
      console.log('this.isLogin', this.isLogin)
      if (!this.isLogin) {
        console.log('this.isLogin', this.isLogin)
        this.showChapterChoice()
      } else {
        this.JudgeProgress()
      }
    },
    methods: {
      getLevelCls (i) {
        return `level-${i + 1}`
      },
      /*
      * 退出新手村
      * */
      exitVillage () {
        window.history.back()
      },
      /*
      返回到章节选择页
      * */
      backToChapter () {
        this.showChapterChoice()
      },
      /*
      * 判断进度
      * */
      JudgeProgress () {
        if (this.villageProgress.chapterNo === 0 || this.villageProgress.questionNo === 7) {
          this.activeChapterNo = this.villageProgress.chapterNo + 1
          this.showChapterChoice()
        } else {
          if (this.villageProgress.questionNo === 6) {
            this.showUpgrade(this.villageProgress.chapterNo)
          }
          this.activeChapterNo = this.villageProgress.chapterNo
          this.activeQuestionNo = this.villageProgress.questionNo + 1
        }
        this.chapter = this.getChapter(this.activeChapterNo)
      },
      /*
      * 点击进入下一关,或是下一章
      * */
      goNextStep () {
        if (this.showNextChapterBtn) {
          this.showChapterChoice()
        } else {
          if (this.villageProgress.questionNo < 6) {
            this.activeQuestionNo = this.villageProgress.questionNo + 1
            this.showQuestion()
          }
        }
      },
      /*
      * 显示章节选择浮层
      * */
      showChapterChoice () {
        this.showMask({
          component: 'freshVillage/ChapterChoice.vue',
          hideOnMaskTap: false,
          callbackName: 'villageShowStory', //onChapterSelected
          componentData: this.chapterIntro,
          callbackFn: this.villageShowTheStory.bind(this)
        })
      },
      /*
      * 显示章节故事
      * */
      villageShowTheStory (chapterNum) {
        this.activeChapterNo = chapterNum
        this.chapter = this.getChapter(this.activeChapterNo)  // 获取章节内容
        if (chapterNum <= this.villageProgress.chapterNo + 1) {
          this.activeChapterNo = chapterNum
          setTimeout(this.showChapterStory, 300)
        }
      },
      /*
      * 显示章节故事浮层
      * */
      showChapterStory () {
        this.showMask({
          component: 'freshVillage/ChapterStory.vue',
          hideOnMaskTap: false,
          callbackName: 'villageStartChapter',
          componentData: this.getStory(this.chapter),
          callbackFn: this.startChapter.bind(this) //组件上的
        })
      },
      /*
      * 从小故事下一步按钮进入答题
      * */
      startChapter () {
        this.activeQuestionNo = 1
        setTimeout(() => {
          this.showQuestion()
        },
        300)
      },
      /*
      * 获取当前问题内容
      * */
      getActiveQuestion () {
        this.question = this.getQuestion(this.chapter.questionArr, this.activeQuestionNo)
      },
      /*
       * 显示答题浮层
       * */
      showQuestion () {
        this.getActiveQuestion()
        this.showMask({
          component: 'freshVillage/Question.vue',
          hideOnMaskTap: false,
          callbackName: 'villageAnswerQuestion',
          componentData: this.question,
          callbackFn: this.answerQuestion.bind(this)
        })
      },
      /*
       * 选择关卡
       * */
      onLevelTap (level) {
        if (level <= this.villageProgress.questionNo) {
          this.activeQuestionNo = level
          this.getActiveQuestion()
          this.showTheExpands()
        } else if (level === this.villageProgress.questionNo + 1) {
          this.activeQuestionNo = level      // activeQuestionNo改变的契机
          this.showQuestion()
        }
        console.log('onLevelTap', this.activeQuestionNo)
      },
      /*
      * 记录选择的项上传记录
      * */
      answerQuestion (result) {
        if (!this.isLogin) {
          this.$route.router.go('/entry')
        } else {
          this.lifeScore = result ? 10 : 2
          this.updateRecord(this.activeChapterNo, this.activeQuestionNo)
          setTimeout(() => {
            this.showResult()
          },
          300)
        }
      },
      /*
      * 显示答题结果浮层
      * */
      showResult () {
        let answerResultData = {
          feedback: this.question.feedback,
          lifeScore: this.lifeScore
        }
        this.showMask({
          component: 'freshVillage/Answer.vue',
          hideOnMaskTap: false,
          callbackName: 'showExpands',
          componentData: answerResultData,
          callbackFn: this.showTheExpands.bind(this)
        })
      },
      /*
      * 显示拓展材料，根据类型显示箴言，小智或突发事件
      * */
      showTheExpands () {
        let type = this.question.materialType
        switch (type) {
          case 1:
            this.showWisdom = true
            break
          case 2:
            setTimeout(this.showProverbs, 300)
            break
          default :
            setTimeout(this.showEmergency, 300)
        }
      },
      /*
      * 隐藏今日小智
      * */
      closeWisdom () {
        this.showWisdom = false
        this.showUpgradeJudgement()
      },
      /*
       * 判断是否显示升级页面
       *
       * */
      showUpgradeJudgement () {
        if (this.activeQuestionNo === 6) {
         setTimeout(() => {
           this.showUpgrade(this.activeChapterNo)
         }, 300)
        }
      },
      /*
      * 显示箴言
      * */
      showProverbs () {
        this.showMask({
          component: 'freshVillage/Proverbs.vue',
          hideOnMaskTap: false,
          callbackName: 'closeProverb',
          componentData: this.question.proverbs,
          callbackFn: this.showUpgradeJudgement.bind(this)
        })
      },

      /*
      * 显示突发事件
      * */
      showEmergency () {
        this.showMask({
          component: 'freshVillage/Emergency.vue',
          hideOnMaskTap: false,
          callbackName: 'closeEmergency',
          componentData: this.question.emergency,
          callbackFn: this.showUpgradeJudgement.bind(this)
        })
      },
      /*
      * 显示章节结束晋级页面
      * */
      showUpgrade (chapterNo) {
        let upgradePageData = {
          avatar: this.avatar,
          chapterNo: chapterNo
        }
        this.showMask({
          component: 'freshVillage/Upgrade.vue',
          hideOnMaskTap: false,
          callbackName: 'villageUpdateRecord',
          componentData: upgradePageData,
          callbackFn: this.updateTheRecord.bind(this)
        })
      },
      updateTheRecord () {
        console.log('updateTheRecord')
        this.updateRecord(this.activeChapterNo, 7)
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
      background-color: #00b7ee;
      width: 2.1rem;
      height: 2.1rem;
      &-6 {
        left: 7.7rem;
        top: 6.1rem;
      }
      &-5 {
        left: 8.96rem;
        top: 11.4rem;
      }
      &-4 {
        left: 6.7rem;
        top: 16.6rem;
      }
      &-3 {
        left: 9.4rem;
        bottom: 9.7rem;
      }
      &-2 {
        left: 8.9rem;
        bottom: 4.8rem;
      }
      &-1 {
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
