/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
  <div>
    <div v-if="!showWisdom" class="chapter-map" :class="bgStyle">
      <div class="other-element">
        <span class="chapter-title" v-touch:tap="showChapterStory">第{{chapterCharacterNo}}章  {{chapter.title}}</span>
        <div class="close-icon-container" v-touch:tap="exitVillage"><span class="close-icon"></span></div>
        <img class="discuss" src="../../assets/styles/image/freshVillage/discuss.png" v-touch:tap="onAdviceTap"/>
        <img class="back-chapter" src="../../assets/styles/image/freshVillage/back.png" v-touch:tap="backToChapter"/>
        <div class="go-btn" :class="rightBtnStyle" v-touch:tap="goNextStep"></div>
      </div>
      <img class="user-img" :class="getOverLevel" :src="userImgUrl"/>
      <div class="level" :class="getLevelCls(i)" v-for="i in 6" v-touch:tap="onLevelTap(i + 1)"></div>
    </div>
    <wisdom v-if="showWisdom" :wisdom-data="wisdomData" @close-wisdom="closeWisdom"></wisdom>
    <share-float :show.sync="showShareFloat"  @confirm="cancelShare" v-touch:tap="onActionTap"></share-float>
</div>
</template>
<script>
  import store from '../../vuex/store'
  import {userGetters, villageGetters} from '../../vuex/getters'
  import wisdom from './Wisdom.vue'
  import ShareFloat from '../../components/share/ImageShareFloat.vue'
  import {villageActions} from '../../vuex/actions'
  import mixinImageShare from '../../mixinImageShare'
  export default {
    mixins: [mixinImageShare],
    store,
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
        updateRecord: villageActions.updateRecord,
        resetRecord: villageActions.resetRecord,
        getVillageProgress: villageActions.getVillageProgress
      }
    },
    data () {
      return {
        activeChapterNo: 1,
        activeQuestionNo: 1,
        chapter: {},
        question: {},
        lifeScore: 0,
        showWisdom: false,
        bgStyle: 'chapter1-bg',
        getOverLevel: 'user-img-1',
        hasShownEncouragement: false,
        showShareFloat: false,
        villageUnLoginRecord: {
          questionNo: 0,
          option: false
        }
      }
    },
    computed: {
      /*章节号对应汉字*/
      chapterCharacterNo () {
        const characterArray = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
        return characterArray[this.activeChapterNo - 1]
      },
      /*用户头像*/
      userImgUrl () {
        return this.avatar ? this.avatar : './static/image/defaultAvatar.png'
      },
      /*章节卡片信息*/
      chapterIntro () {
        return this.getChapterIntro()
      },
      /*今日小智内容*/
      wisdomData () {
        return this.question.wisdom
      },
      /* 改变下一章btn状态显示*/
      showNextChapterBtn () {
        if (this.villageProgress.chapterNo > this.activeChapterNo ||
          (this.villageProgress.chapterNo === this.activeChapterNo && this.villageProgress.questionNo === 7)) {
          return true
        } else {
          return false
        }
      },
      /*主页右下按钮显示敬请期待*/
      showWaitBtn () {
        if (this.villageProgress.chapterNo === 2 && this.villageProgress.questionNo === 7 && this.activeChapterNo === 2) { //需要根据具体开放的章节修改！
          return true
        } else {
          return false
        }
      },
      /*按钮样式改变*/
      rightBtnStyle () {
        if (this.showNextChapterBtn && this.showWaitBtn) {
          return 'wait-btn'
        } else if (this.showNextChapterBtn) {
          return 'next-btn'
        } else {
          return 'go-btn'
        }
      }
    },
    watch: {
      villageProgress () {
        this.setUserImagePosition()
      },
      activeChapterNo () {  //switch
        if (this.activeChapterNo === 1) {
          this.bgStyle = 'chapter1-bg'
        } else if (this.activeChapterNo === 2) {
          this.bgStyle = 'chapter2-bg'
        }
        this.setUserImagePosition()
      },
      isLogin (newValue) {
        if (newValue) {
          this.getVillageProgress()
        }
      },
      showWisdom (newValue) {
        if (newValue) {
          this.setViewBackHandler()
        } else {
          this.resetViewBackHandler()
        }
      }
    },
    route: {
      data ({from}) {
        if (from.path === '/village/advise' || from.path === '/village/fill/content') { // 吐槽页面，鼓励编辑页面
          return
        }
        if (from.path !== '/entry' && !(/\/register\/end\//g.test(from.path))) { // 从主页面进入
          this.fromMainPageEnterProcess()
        } else {
          this.fromLoginRegisterEnterProcess()   // 从登陆注册页面进入
        }
        this.setUserImagePosition()
      },
      deactivate () {
        this.hideMask()
        this.resetViewBackHandler()
      }
    },
    methods: {
      /*
      * 从主页进入后的判断
      * */
      fromMainPageEnterProcess () {
        if (!this.isLogin) {
          this.resetRecord() // 将之前的记录清空
          this.activeChapterNo = 1
          this.activeQuestionNo = 1
          this.chapter = this.getChapter(this.activeChapterNo)
          this.showChapterChoice()
        } else {
          this.JudgeProgress()
        }
      },
      /*
      * 从登陆注册页进入的判断处理
      * */
      fromLoginRegisterEnterProcess () {
        if (!this.isLogin) {
          this.showQuestion()
        } else {
          if (this.villageProgress.chapterNo !== 0) {
            this.JudgeProgress()
          } else if (this.villageUnLoginRecord.questionNo === 0) {
            this.showQuestion()
          } else {
            this.answerQuestion(this.villageUnLoginRecord.option)
            this.recordUnLoginOption(0, false)
          }
        }
      },
      /**
       * 设置物理键back
       */
      setViewBackHandler () {
        this.$parent.viewBackHandler = this.closeWisdom
      },
      /*
      * 解绑物理back键
      * */
      resetViewBackHandler () {
        this.$parent.viewBackHandler = null
      },
      /*
      * 点击吐槽
      * */
      onAdviceTap () {
        this.$route.router.go('/village/advise')
      },
      /*
      * 更换头像位置
      * */
      setUserImagePosition () {
        if ((this.villageProgress.chapterNo > this.activeChapterNo) || (this.villageProgress.chapterNo === this.activeChapterNo && this.villageProgress.questionNo === 7)) {
          this.getOverLevel = 'user-img-6'
          return
        }
        if (this.villageProgress.chapterNo < this.activeChapterNo && this.villageProgress.questionNo === 7) {
          this.getOverLevel = 'user-img-1'
          return
        }
        if (this.villageProgress.questionNo !== 6 || this.villageProgress.questionNo !== 7) {
          this.getOverLevel = `user-img-${this.villageProgress.questionNo + 1}`
        } else {
          this.getOverLevel = 'user-img-6'
        }
      },
      /*
      * 各关卡位置样式类名
      * */
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
        if (this.villageProgress.chapterNo === 2 && this.villageProgress.questionNo === 7) { //根据开放到的关卡章节要动态修改！
          this.activeChapterNo = 2
          this.showChapterChoice()
          return
        }
        if (this.villageProgress.chapterNo === 0 || (this.villageProgress.questionNo === 7 && this.villageProgress.chapterNo !== 2)) { //只到第三关
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
            if (this.specialLevelJudge(this.activeQuestionNo) && !this.hasShownEncouragement) {
              this.showEncourage()
              this.hasShownEncouragement = true
              return
            }
            this.showQuestion()
          } else if (this.villageProgress.questionNo === 6) {
            this.onRecordedQuestionTap(this.activeQuestionNo)
          } else if (this.villageProgress.chapterNo < this.activeChapterNo) {
            this.showQuestion()
          }
        }
      },
      /*
      * 显示章节选择浮层
      * */
      showChapterChoice () {
        this.hasShownEncouragement = false
        let choiceComponentData = {
          chapterIntro: this.chapterIntro,
          villageProgress: this.villageProgress
        }
        this.showMask({
          component: 'freshVillage/ChapterChoice.vue',
          hideOnMaskTap: true,
          callbackName: 'onChapterSelected',
          componentData: choiceComponentData,
          callbackFn: this.villageShowTheStory.bind(this)
        })
      },
      /*
      * 显示章节故事
      * */
      villageShowTheStory (chapterNum) {
        if ((!this.isLogin && chapterNum === 1) || ((this.isLogin) && (chapterNum <= this.villageProgress.chapterNo + 1))) {
          this.activeChapterNo = chapterNum                       /*当前章节确定*/
          this.chapter = this.getChapter(this.activeChapterNo)  // 获取章节内容
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
        if (this.isLogin && this.activeChapterNo <= this.villageProgress.chapterNo) {
          return
        }
        if (!this.isLogin || this.isLogin && (this.activeChapterNo > this.villageProgress.chapterNo &&
          (this.villageProgress.questionNo === 7 || this.villageProgress.chapterNo === 0))) {
          this.activeQuestionNo = 1
          setTimeout(() => {
            this.showQuestion()
          },
          300)
        }
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
       * 设置记录未登录前选项
       * */
      recordUnLoginOption (questionNo, option) {
        this.villageUnLoginRecord = {
          questionNo: questionNo,
          option: option
        }
      },
      /*
       * 选择关卡
       * */
      onLevelTap (level) {
        if (this.activeChapterNo < this.villageProgress.chapterNo) {
          this.onRecordedQuestionTap(level)
          return
        }
        if (this.villageProgress.chapterNo === this.activeChapterNo) {
          if (this.villageProgress.questionNo === 7 || level <= this.villageProgress.questionNo) {
            this.onRecordedQuestionTap(level)
            return
          }
          if (level > this.villageProgress.questionNo + 1) {
            return
          }
          if (level === this.villageProgress.questionNo + 1) {
            if (this.specialLevelJudge(level) && !this.hasShownEncouragement) {
              this.showEncourage()
              this.hasShownEncouragement = true
              return
            }
            this.activeQuestionNo = level
            this.showQuestion()
          }
          return
        }
        if (this.activeChapterNo > this.villageProgress.chapterNo && level < this.activeQuestionNo + 1) {
          this.activeQuestionNo = level
          this.showQuestion()
        }
      },

      /*
      * 进入答过的题目时的操作
      * */
      onRecordedQuestionTap (level) {
        this.activeQuestionNo = level
        this.getActiveQuestion()
        this.showTheExpands()
      },
      /*
      * 判断是否为特殊关卡
      * */
      specialLevelJudge (level) {
        if ((this.villageProgress.chapterNo === 0 || this.villageProgress.chapterNo === 1) && level === 3) {
          return true
        } else if (this.villageProgress.chapterNo === 2 && level === 5) {
          return true
        } else {
          return false
        }
      },
      /*
      * 显示鼓励
      * */
      showEncourage () {
        this.showMask({
          component: 'freshVillage/GiveEncouragement.vue',
          hideOnMaskTap: false,
          callbackName: 'onEncouragementPageTap',
          componentData: 1,
          callbackFn: this.onEncouragementPageTap.bind(this)
        })
      },
      /*
      *判断是否可以跳转到吐槽编辑页
      * */
      onEncouragementPageTap () {
        this.$route.router.go('/village/fill/content')
      },
      /*
      * 记录选择的项上传记录
      * */
      answerQuestion (result) {
        if (!this.isLogin) {
          this.recordUnLoginOption(1, result)
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
        if (this.activeChapterNo < this.villageProgress.chapterNo || (this.activeChapterNo === this.villageProgress.chapterNo && (this.activeQuestionNo === 7 || this.villageProgress.questionNo === 7))) {
          return
        }
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
          callbackName: 'onVillageProverbTap',
          componentData: this.question.proverbs,
          callbackFn: this.onVillageProverbTap.bind(this)
        })
        const shareImgId = 'village-proverb'
        setTimeout(() => {
          this.loadShareImageUrl(shareImgId)
        }, 500)
      },
      /*
      * 点击箴言页面的操作
      * */
      onVillageProverbTap (type) {
        if (type === 1) {
          this.showShareFloat = true
        } else {
          this.showUpgradeJudgement()
        }
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
          callbackName: 'onVillageUpgradeTap',
          componentData: upgradePageData,
          callbackFn: this.onVillageUpgradeTap.bind(this)
        })
        const shareImgId = 'village-upgrade-detail'
        setTimeout(() => {
          this.loadShareImageUrl(shareImgId)
        }, 300)
      },
      /*
      * 加载图片
      * */
      loadShareImageUrl (shareImgId) {
        const origin = window.document.getElementById(shareImgId)
        const element = origin.cloneNode(true)
        const height = origin.offsetHeight
        const width = origin.offsetWidth
        setTimeout(() => {
          this.setShareImageUrl({element, height, width})
        }, 300)
      },
      /*
      * 提交答题记录,分享
      * */
      onVillageUpgradeTap (type) {
        this.updateRecord(this.activeChapterNo, 7)
        this.getOverLevel = 'user-img-1'
        if (type === 2) {
          this.showShareFloat = true
        }
      }
    },
    components: {
      ShareFloat,
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
      width: 3rem;
      height: 3rem;
      &-6 {
        left: 7.2rem;
        top: 4.7rem;
      }
      &-5 {
        left: 8.5rem;
        top: 9.8rem;
      }
      &-4 {
        left: 6.3rem;
        top: 15.5rem;
      }
      &-3 {
        left: 9rem;
        bottom: 9.6rem;
      }
      &-2 {
        left: 8.5rem;
        bottom: 4.7rem;
      }
      &-1 {
        left: 6.6rem;
        bottom: 0;
      }
    }
    .user-img {
      position: absolute;
      width: 2.4rem;
      height: 2.4rem;
      border: 4px solid #fff;
      border-radius: 50%;
      &-7, &-6{
        left: 7.2rem;
        top: 3rem;
      }
      &-5 {
        left: 8.5rem;
        top: 7.7rem;
      }
      &-4 {
        left: 6.3rem;
        top: 13rem;
      }
      &-3 {
        left: 9rem;
        bottom: 11.4rem;
      }
      &-2 {
        left: 8.5rem;
        bottom: 6.6rem;
      }
      &-1 {
        left: 6.6rem;
        bottom: 2rem;
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
    .close-icon-container {
      display:inline-block;
      position: absolute;
      top: 1rem;
      right: .75rem;
      width: 2rem;
      height: 2rem;
    }
    .close-icon:after{
      position: absolute;
      top: .6rem;
      right: .6rem;
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
      position: absolute;
      bottom: .5rem;
      right: 3rem;
      width: 3.6rem;
      height: 3.75rem;
      background: url('../../assets/styles/image/freshVillage/next.png') no-repeat;
      background-size: contain;
    }
    .wait-btn {
      position: absolute;
      bottom: .5rem;
      right: 3rem;
      width: 3.6rem;
      height: 3.75rem;
      background: url('../../assets/styles/image/freshVillage/wait.png') no-repeat;
      background-size: contain;
    }
  }



</style>