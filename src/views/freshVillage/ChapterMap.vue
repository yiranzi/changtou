/**
 * Created by zhanheng on 2017/3/17.
 *
 */
<template>
  <div class="chapter-map-container">
      <span class="villagechapter-title" v-touch:tap="onChapterTap">第{{chapterCharacterNo}}章  {{chapter.title}}</span>
      <div class="map-close-icon-container" v-touch:tap="exitVillage"><span class="close-icon"></span></div>
      <img class="discuss" src="../../assets/styles/image/freshVillage/discuss.png" v-touch:tap="onAdviceTap"/>
      <div class="go-btn" :class="rightBtnStyle" v-touch:tap="onGoTap"></div>
    <scroller :lock-x="true" v-ref:scroller :height.sync="scrollerHeight">
      <div class="chapter-map" v-el:chaptermap>
        <img src="../../../static/image/freshVillage/villagebackground.jpg">
        <div class="user-img" :class="currPosition" ><div class="user-img-position"><img src="../../assets/styles/image/freshVillage/logo-position.png"></div><img class="user-logo" :src="userImgUrl"/></div>
        <div v-for="chapter in chapterArr">
          <div class="level" :class="getLevelCls(chapter.chapterNo, question.questionNo)" v-for="question in chapter.questionArr" v-touch:tap="onLevelTap(chapter.chapterNo, question)"></div>
        </div>
      </div>
    </scroller>
    <share-float :show.sync="showShareFloat"  @confirm="cancelShare" v-touch:tap="onActionTap"></share-float>
  </div>
</template>
<script>
  import Scroller from 'vux/scroller'
  import store from '../../vuex/store'
  import {userGetters, villageGetters} from '../../vuex/getters'
  import ShareFloat from '../../components/share/ImageShareFloat.vue'
  import {villageActions} from '../../vuex/actions'
  import mixinImageShare from '../../mixinImageShare'
  import mixinModal from '../../mixinModal'
  export default {
    mixins: [mixinImageShare, mixinModal],
    store,
    vuex: {
      getters: {
        isLogin: userGetters.isLogin,
        avatar: userGetters.avatar,
        villageProgress: villageGetters.villageProgress,
        shouldQuestionShow: villageGetters.shouldQuestionShow
      },
      actions: {
        getChapter: villageActions.getChapter,
        getQuestion: villageActions.getQuestion,
        updateRecord: villageActions.updateRecord,
        resetRecord: villageActions.resetRecord,
        getVillageProgress: villageActions.getVillageProgress,
        changeQuestionShow: villageActions.changeQuestionShow,
        commitVillageHP: villageActions.commitVillageHP
      }
    },
    data () {
      return {
        chapterArr: [],   //章节列表
        isUpgradeShow: false,   //当前章节是否显示过升级弹框
        scrollerHeight: '0px',  //屏幕滚动高度
        mapHeight: 0,   //整个地图的高度
        isShowEncourage: false,   //是否显示过求吐槽
        chapterNo: 0,    //当前章节序号
        questionNo: 0,   //当前题目序号
        chapter: {},  //当前章节内容
        question: {},   //当前问题内容
        currPosition: '',   //当前用户头像显示的位置
        showShareFloat: false,    //分享浮层的显示状态
        villageUnLoginRecord: {   //记录用户未登录时候的选择
          questionNo: 0,
          option: null
        }
      }
    },
    computed: {
      /*章节号对应汉字*/
      chapterCharacterNo () {
        const characterArray = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
        return characterArray[this.chapterNo - 1]
      },
      /*用户头像*/
      userImgUrl () {
        return this.avatar ? this.avatar : './static/image/defaultAvatar.png'
      },
      /*按钮样式改变*/
      rightBtnStyle () {
        if (this.chapterNo === 2 && this.questionNo >= 7) {
          return 'wait-btn'
        } else {
          return 'go-btn'
        }
      },
      /**
       * 储存不同题目时候的屏幕高度位置
       **/
      heightArr () {
        let height = this.mapHeight
        return [height, height * 7 / 12, 0]
      },
      /**
       * 判断当前题目应该定位到哪个位置
       **/
      currHeight () {
        if (this.chapterNo <= 1) {    //当题目是前4题的时候屏幕滚动的距离在最下方，4到7题在中间，后面的都在最顶部
          return this.questionNo < 4 ? this.heightArr[0] : this.heightArr[1]
        } else if (this.chapterNo === 2 && this.questionNo <= 1 || this.chapter === 1 && this.questionNo >= 4) {
          return this.heightArr[1]
        } else {
          return 0
        }
      }
    },
    watch: {
      villageProgress () {    //根据已保存的数据确定用户当前的答题进度
        this.chapterNo = this.villageProgress.chapterNo === 0 ? 1 : this.villageProgress.chapterNo
        this.questionNo = this.villageProgress.questionNo + 1
        this.chapter = this.chapterArr[this.chapterNo - 1]
        this.question = this.getQuestion(this.chapter.questionArr, this.questionNo)
        this.currPosition = `user-img-${this.chapterNo}-${this.questionNo > 5 ? 6 : this.questionNo}`
      },
      questionNo () {     //用户头像位置和屏幕位置随答题进度改变
        this.currPosition = `user-img-${this.chapterNo}-${this.questionNo > 5 ? 6 : this.questionNo}`
        this.checkScrollerHeight()
      }
    },
    route: {
      data ({from}) {
        this.setBackBtnToMain()
        const me = this
        this.chapterArr = [this.getChapter(1), this.getChapter(2)]    //获取章节列表
        if (from.path === '/village/initialPage') {   //如果是从导航页进入，不显示题目
          this.changeQuestionShow(false)
        }
        if (from.path === '/entry' || from.path.indexOf('/register') !== -1) {       //从登录页面进来的判断
          this.fromEntry()
        }
        if (this.isLogin) {   //如果进入页面时登陆了
          this.showLoading()
          this.getVillageProgress().then(
            () => {
              me.hideLoading()
              if (me.villageProgress.questionNo >= 7) {
                me.isUpgradeShow = true
              }
              if (me.villageProgress.chapterNo !== 0) {    //如果用户有进度，判断是不是从今日小智页面进入
                me.actionWithLogin()
                me.setScrollerHeight()
                if (from.path.indexOf('/village/wisdom') !== -1) {
                  me.checkIsUpgrade()   //如果是从今日小智进入 判断有没有升级
                }
                if (me.shouldQuestionShow && me.villageProgress.questionNo === 0) {   //如果是第一题且满足条件，显示问题
                  me.showQuestion()
                  me.changeQuestionShow(false)
                }
              } else {
                me.actionWithoutLogin()   //如果未登陆，初始化数据
                me.setScrollerHeight()
                if (me.shouldQuestionShow && me.villageProgress.questionNo === 0) {
                  me.showQuestion()
                  me.changeQuestionShow(false)
                }
              }
            }
          )     //获取用户的信息
        } else {
          this.actionWithoutLogin()   //如果未登陆，初始化数据
          if (me.shouldQuestionShow && me.villageProgress.questionNo === 0) {
            me.showQuestion()
            me.changeQuestionShow(false)
          }
          this.setScrollerHeight()
        }
      },
      deactivate () {
        this.resetViewBackHandler()
      }
    },
    methods: {
      /**
       * 从登陆注册页进入的操作
       **/
      fromEntry () {
        const me = this
        if (this.isLogin) {
          this.showLoading()
          this.getVillageProgress().then(() => {    //获得数据后
            me.hideLoading()
            if (me.villageProgress.questionNo >= 6) {
              me.isUpgradeShow = true
            }
            me.setScrollerHeight()
            me.checkAutoShowQuestion()
          })       //如果登陆，获取用户的进度
          return
        } else {
          this.actionWithoutLogin() //如果未登陆执行未登录操作
          this.setScrollerHeight()
          return
        }
      },
      /**
       * 判断要不要自动显示题目
       **/
      checkAutoShowQuestion () {
        if (!(this.villageProgress.questionNo >= 0 && this.villageProgress.chapterNo)) {
          this.answerQuestion(this.villageUnLoginRecord.option)   //判断是之前是未登录并且登陆后说无进度的用户在选择完答案登陆后自动显示答案反馈
          this.villageUnLoginRecord = {
            questionNo: 0,
            option: null
          }
        } else {
          this.actionWithLogin()
        }
      },
      /**
       * 设置物理返回键为退出新手村
       **/
      setBackBtnToMain () {
        this.$parent.viewBackHandler = this.exitVillage
      },
      /**
       * 已登陆情况的初始化
       **/
      actionWithLogin () {    //已登陆情况下的初始化
        this.chapterNo = this.villageProgress.chapterNo === 0 ? 1 : this.villageProgress.chapterNo
        this.questionNo = this.villageProgress.questionNo + 1
        this.currPosition = `user-img-${this.chapterNo}-${this.questionNo > 5 ? 6 : this.questionNo}`
        this.chapter = this.chapterArr[this.chapterNo - 1]
        this.question = this.getQuestion(this.chapter.questionArr, this.questionNo > 5 ? 6 : this.questionNo)
      },
      /**
       * 未登录的初始化
       **/
      actionWithoutLogin () {   //未登录情况下的初始化
        this.resetRecord()
        this.chapterNo = 1
        this.questionNo = 1
        this.currPosition = 'user-img-1-1'
        this.chapter = this.getChapter(this.chapterNo)
        this.question = this.getQuestion(this.chapter.questionArr, this.questionNo)
      },
      /**
       * 当地图上问题的坐标点被点击
       **/
      onLevelTap (chapterNo, question) {    //当地图上问题的坐标点被点击
        if (chapterNo === this.chapterNo && question.questionNo === this.questionNo) {    //如果是当前题目，显示问题
          if (this.villageProgress.questionNo === 0) {
            this.$route.router.go(`/village/chapterstart/${this.chapterNo}`)    //跳转到章节介绍页
            this.changeQuestionShow(true)
            return
          }
          //第三题第十一题显示求吐槽
          if ((this.questionNo === 3 && this.chapterNo === 1 && !this.isShowEncourage) || (this.questionNo === 5 && this.chapterNo === 2 && !this.isShowEncourage)) {
            this.showEncourage()
            return
          }
          this.showQuestion()
        }
        if (chapterNo < this.chapterNo || chapterNo === this.chapterNo && question.questionNo <= ((this.questionNo - 1) === 0 ? 1 : (this.questionNo - 1))) {  //判断是否为已答过的题目，如果答过，显示每日事件，否则无反应
          this.showTheExpands(question.materialType, question, chapterNo)
          return
        }
      },
      /**
       * 判断当前题目的屏幕位置
       **/
      checkScrollerHeight () {    //判断当前题目的屏幕位置
        if (this.chapterNo <= 1) {
          this.questionNo < 4 ? this.resetScrollerHeight(this.heightArr[0]) : this.resetScrollerHeight(this.heightArr[1])
        } else if (this.chapterNo === 2 && this.questionNo <= 1) {
          this.resetScrollerHeight(this.heightArr[1])
        } else {
          this.resetScrollerHeight(0)
        }
      },
      /**
       * 初始化窗口高度和屏幕位置
       **/
      setScrollerHeight () {    //初始化窗口高度和屏幕位置
        const me = this
        me.scrollerHeight = window.document.body.offsetHeight + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.mapHeight = me.$els.chaptermap.offsetHeight - window.document.body.offsetHeight
            me.$refs.scroller.reset({
              top: me.currHeight
            })
          })
        }, 150)
      },
      /**
       * 设置屏幕位置函数
       **/
      resetScrollerHeight (value) {   //设置屏幕位置函数
        const me = this
        setTimeout(() => {
          me.$refs.scroller.reset({
            top: value
          }, 150)
        })
      },
      /**
       * 页面左上角的章节标题点击事件
       **/
      onChapterTap () {
        this.$route.router.go(`/village/chapterstart/${this.chapterNo}`)    //跳转到章节介绍页
        this.changeQuestionShow(false)
      },
      /**
       * go按钮点击事件
       **/
      onGoTap () {
        this.checkScrollerHeight()
        if (!(this.questionNo > 6 && this.chapterNo === 2)) {   //限定题目范围
          if (this.villageProgress.questionNo === 0) {
            this.$route.router.go(`/village/chapterstart/${this.chapterNo}`)
            this.changeQuestionShow(true)
            return
          }
          //第三题第十一题显示求吐槽
          if ((this.questionNo === 3 && this.chapterNo === 1 && !this.isShowEncourage) || (this.questionNo === 5 && this.chapterNo === 2 && !this.isShowEncourage)) {
            this.showEncourage()
            return
          }
          this.showQuestion()   //如果不是上面的情况，就显示当前问题
        }
      },
      /**
       * 显示问题弹框
       **/
      showQuestion () {
        const me = this
        setTimeout(() => {
          me.showMask({
            component: 'freshVillage/Question.vue',
            hideOnMaskTap: false,
            callbackName: 'villageAnswerQuestion',
            componentData: me.question,
            callbackFn: me.answerQuestion.bind(this)
          })
        }, 150)
      },
      /**
       * 答案反馈
       **/
      answerQuestion (answer) {
        const me = this
        const answerResultData = {    //收到组件传来的信息
          'feedback': this.question.feedback,
          'lifeScore': this.question.answer === answer ? 10 : 2,
          'type': this.question.materialType
        }
        if (!this.isLogin) {          //如果是刚开始未登陆，记录选择答案并跳转到登陆页
          this.recordUnLoginOption(1, answer)
          this.$route.router.go('/entry')
        } else {
          me.showLoading()
          Promise.all([me.commitRecord(), me.commitVillageHP(me.question.answer === answer ? 10 : 2)]).then(   //提交答题进度并显示今日资料
            () => {
              setTimeout(() => {
                me.hideLoading()
                me.showMask({
                  component: 'freshVillage/Answer.vue',
                  hideOnMaskTap: false,
                  callbackName: 'showExpands',
                  componentData: answerResultData,
                  callbackFn: me.showTheExpands.bind(this)
                })
              }, 150)
            }
          )
        }
      },
      /**
       * 提交进度
       **/
      commitRecord (chapter, question) {
        return this.updateRecord(chapter || this.chapterNo, question || this.questionNo)
      },
      /**
       * 显示今日事件
       **/
      showTheExpands (type, question, chapterNo) {    //type:1.今日小智 2.投资箴言 3.突发事件
        const me = this
        switch (type) {
          case 1:
              this.$route.router.go(`/village/wisdom/${chapterNo || this.chapterNo}/${question ? question.questionNo : this.questionNo - 1}`)
                break
          case 2:
              setTimeout(() => {
                me.showProverbs(question)
              }, 150)
                break
          case 3:
              if (chapterNo < this.chapterNo || chapterNo === this.chapterNo && question.questionNo <= ((this.questionNo - 1) === 0 ? 1 : (this.questionNo - 1))) {  //判断是否为已答过的题目，如果答过，显示每日事件，否则无反应
                setTimeout(() => {
                  me.showEmergency(question)
                }, 150)
                return
              }
              this.commitEmergencyHP()
                break
        }
      },
      /**
       * 提交突发事件的生命值
       **/
      commitEmergencyHP () {
        const me = this
        this.showLoading()
        this.commitVillageHP(parseInt(this.chapter.questionArr[this.questionNo - 2].emergency.lifeScore)).then(
          () => {
            setTimeout(() => {
              me.hideLoading()
              me.showEmergency()
            }, 150)
          }
        )
      },
      /**
       * 判断是否升级
       **/
      checkIsUpgrade () {
        const me = this
        if (this.questionNo === 7 && !this.isUpgradeShow) {
          me.showLoading()
          me.commitVillageHP(15).then(
            () => {
              setTimeout(() => {
                me.hideLoading()
                me.showUpgrade(me.chapterNo)
                me.isUpgradeShow = true
                me.updateUpgrade()
              }, 150)
            }
          )
        }
        return
      },
      /**
       * 升级后的操作
       **/
      updateUpgrade () {
        const me = this
        if (me.chapterNo < 2) {
          me.chapterNo += 1   //切换到第二章第一体
          me.questionNo = 0
          me.isShowEncourage = false
          me.isUpgradeShow = false
          me.commitRecord()
        } else {
          me.commitRecord()
        }
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
      /**
       * 设置问题的坐标位置
       **/
      getLevelCls (chapterNo, questionNo) {
        return `level-${chapterNo + '-' + questionNo}`
      },
      /*
      * 退出新手村
      * */
      exitVillage () {
        this.$route.router.go('/main')
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
      * 显示鼓励
      * */
      showEncourage () {
        this.isShowEncourage = true
        this.showMask({
          component: 'freshVillage/GiveEncouragement.vue',
          hideOnMaskTap: false,
          callbackName: 'onEncouragementPageTap',
          componentData: '',
          callbackFn: this.onEncouragementPageTap.bind(this)
        })
      },
      /*
      * 跳转到吐槽编辑页
      * */
      onEncouragementPageTap () {
        this.$route.router.go('/village/fill/content')
      },

      /*
      * 显示箴言
      * */
      showProverbs (ques) {
        const question = ques || this.chapter.questionArr[this.questionNo - 2]
        this.showMask({
          component: 'freshVillage/Proverbs.vue',
          hideOnMaskTap: false,
          callbackName: 'onVillageProverbTap',
          componentData: question.proverbs,
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
          this.checkIsUpgrade()
        }
      },
      /*
      * 显示突发事件
      * */
      showEmergency (ques) {
        const question = ques || this.chapter.questionArr[this.questionNo - 2]
        this.showMask({
          component: 'freshVillage/Emergency.vue',
          hideOnMaskTap: false,
          callbackName: 'closeEmergency',
          componentData: question.emergency,
          callbackFn: this.checkIsUpgrade.bind(this)
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
        if (type === 2) {
          this.showShareFloat = true
        }
      }
    },
    components: {
      ShareFloat,
      Scroller
    }
  }

</script>
<style lang="less">
  .chapter-map-container {
  .chapter-map {
    position: relative;
    width: 750/40rem;
    height: 2668/40rem;
    img{
      width: 100%;
      height: 100%;
    }
    .level {
      position: absolute;
      width: 3rem;
      height: 3rem;
      &-2-6 {
        left: 0.456*375*2/40-30/20rem;
        top: 0.302*375*2/40-30/20rem;
      }
      &-2-5 {
        left: 0.637*375*2/40-30/20rem;
        top: 0.592*375*2/40-30/20rem;
      }
      &-2-4 {
        left: 10.71875rem;
        top: 0.877*375*2/40-30/20rem;
      }
      &-2-3 {
        left: 0.450*375*2/40-30/20rem;
        top: 1.165*375*2/40-30/20rem;
      }
      &-2-2 {
        left: 0.526*375*2/40-30/20rem;
        top: 1.453*375*2/40-30/20rem;
      }
      &-2-1 {
        left: 0.434*375*2/40-30/20rem;
        top: 1.740*375*2/40-30/20rem;
      }
      &-1-6 {
        left: 0.456*375*2/40-30/20rem;
        top: 2.026*375*2/40-30/20rem;
      }
      &-1-5 {
        left: 0.634*375*2/40-30/20rem;
        top: 2.313*375*2/40-30/20rem;
      }
      &-1-4 {
        left: 10.71875rem;
        top: 2.6*375*2/40-30/20rem;
      }
      &-1-3 {
        left: 0.449*375*2/40-30/20rem;
        top: 2.888*375*2/40-30/20rem;
      }
      &-1-2 {
        left: 0.525*375*2/40-30/20rem;
        top: 3.177*375*2/40-30/20rem;
      }
      &-1-1 {
        left: 0.436*375*2/40-30/20rem;
        top: 3.464*375*2/40-30/20rem;
      }
    }
    .user-img {
      position: absolute;
      .user-logo{
        position: relative;
        z-index: 20;
        width: 2.4rem;
        height: 2.4rem;
        border: .1rem solid #666;
        border-radius: 50%;
      }
      &-position{
        z-index: 10;
        position: absolute;
        width:50/40rem;
        height: 34/40rem;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: -14/40rem;
        img{
          width: 100%;
          height: 100%;
        }
       }
      &-2-6,&-2-7 {
        left: 0.456*375*2/40-30/20-18/40+1/4rem;
        top: 0.302*375*2/40-30/20-150/40+1rem;
      }
      &-2-5 {
        left: 0.637*375*2/40-30/20+1/4rem;
        top: 0.592*375*2/40-30/20-3rem;
      }
      &-2-4 {
        left: 10.71875+1/4rem;
        top: 0.877*375*2/40-30/20-3rem;
      }
      &-2-3 {
        left: 0.450*375*2/40-30/20+1/4rem;
        top: 1.165*375*2/40-30/20-3rem;
      }
      &-2-2 {
        left: 0.526*375*2/40-30/20+1/4rem;
        top: 1.453*375*2/40-30/20-3rem;
      }
      &-2-1 {
        left: 0.434*375*2/40-30/20+1/4rem;
        top: 1.740*375*2/40-30/20-3rem;
      }
      &-1-6,&-1-7 {
        left: 0.456*375*2/40-30/20+1/4rem;
        top: 2.026*375*2/40-30/20-3rem;
      }
      &-1-5 {
        left: 0.634*375*2/40-30/20+1/4rem;
        top: 2.313*375*2/40-30/20-3rem;
      }
      &-1-4 {
        left: 10.71875+1/4rem;
        top: 2.6*375*2/40-30/20-3rem;
      }
      &-1-3 {
        left: 0.449*375*2/40-30/20+10/40rem;
        top: 2.888*375*2/40-30/20-3rem;
      }
      &-1-2 {
        left: 0.525*375*2/40-30/20+10/40rem;
        top: 3.177*375*2/40-30/20-3rem;
      }
      &-1-1 {
        left: 0.436*375*2/40-30/20+10/40rem;
        top: 3.464*375*2/40-30/20-3rem;
      }
    }
  }


    .villagechapter-title {
      z-index: 50;
      display: inline-block;
      position: fixed;
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
    .map-close-icon-container {
      display:inline-block;
      position: fixed;
      top: 0.5rem;
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
    .discuss {
      position: fixed;
      top: 3.5rem;
      left: .75rem;
      width: 3.1rem;
      height: 3.5rem;
      z-index: 50;
    }
    .back-chapter {
      position: absolute;
      left: 1rem;
      bottom: 1rem;
      display: inline-block;
      width: 1.6rem;
      height: 1.6rem;
      z-index: 50;
    }
    .go-btn {
      position: fixed;
      bottom: .5rem;
      right: 3rem;
      width: 3.6rem;
      height: 3.75rem;
      background: url('../../assets/styles/image/freshVillage/go.png') no-repeat;
      background-size: contain;
      z-index: 50;
    }
    .wait-btn {
      position: fixed;
      bottom: .5rem;
      right: 3rem;
      width: 3.6rem;
      height: 3.75rem;
      background: url('../../assets/styles/image/freshVillage/wait.png') no-repeat;
      background-size: contain;
      z-index: 50;
    }  }




</style>
