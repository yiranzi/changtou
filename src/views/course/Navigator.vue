<template>
  <div class="course-navigator" style="height: 100%;">
    <ict-titlebar :left-options="{showBack: false}" v-el:titlebar>长投学堂</ict-titlebar>
    <img v-show="showNewerGiftIcon" class="newer-gift" src="../../assets/styles/image/navigator/newerGift.png" v-touch:tap="getNewerGift"/>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div>
        <swiper :aspect-ratio="120/375" :list="banners"
                stop-propagation dots-position="center"
                :auto="true" :interval="3000"
                :show-desc-mask="false" dots-class="dots-class">
        </swiper>
        <!--理财新手村-入口-->
        <div class="fresh-village" v-touch:tap="goToFreshVillageTap"></div>

        <!--banner-->
        <div class="head-navigator">
          <p class="head-title">
            <span>为你优选</span>
          </p>
          <div class="under-banner">
            <div v-touch:tap="goToNewertestStart" class="under-banner-item">
              <i class="under-banner-icon newer-test "></i>
              <span class="under-banner-title">理财揭秘</span>
            </div>
            <div v-touch:tap="goToNewerGuide" class="under-banner-item">
              <i class="under-banner-icon newer-guide"></i>
              <span class="under-banner-title">入门指南</span>
            </div>
            <div v-touch:tap="goToInterviewList" class="under-banner-item">
              <i class="under-banner-icon interview"></i>
              <span class="under-banner-title">院生故事</span>
              <i class="new-interview-icon" v-show="hasNewInterview"></i>
            </div>
            <div v-touch:tap="goToCourseClassification" class="under-banner-item">
              <i class="under-banner-icon classification"></i>
              <span class="under-banner-title">课程分类</span>
            </div>
            <div v-touch:tap="goToTestPage1" class="under-banner-item">
              <i class="under-banner-icon classification"></i>
              <span class="under-banner-title">showhouse</span>
              <i class="new-interview-icon" v-show="hasNewInterview"></i>
            </div>
            <div v-touch:tap="goToTestPage2" class="under-banner-item">
              <i class="under-banner-icon classification"></i>
              <span class="under-banner-title">rule</span>
              <i class="new-interview-icon" v-show="hasNewInterview"></i>
            </div>
            <div v-touch:tap="goToTestPage3" class="under-banner-item">
              <i class="under-banner-icon classification"></i>
              <span class="under-banner-title">introduction</span>
              <i class="new-interview-icon" v-show="hasNewInterview"></i>
            </div>
          </div>
        </div>

        <!--头条精选-->
        <div class="head-line" v-touch:tap="goToHeadline">
          <div class="icon">
            <i class="picture"></i>
          </div>
          <span class="line"></span>
          <span class="topic-txt">{{headLineTitle}}</span><!--这里需要添加跳转-->
          <div class="gift">
            <i class="picture"></i>
          </div>
        </div>

        <!--大咖读经典-->
        <div v-touch:tap="goToClassicReading(readingClassics.cbId)">
          <p class="area-label">
            <span class="color-span"></span>
            <span class="title">大咖读经典</span>
          </p>
          <div class="classic-content">
            <img class="classic-cover" :src="readingClassics.pic"/>
            <div class="classic-info">
              <p class="classic-name">{{readingClassics.classicsName}}</p>
              <p class="classic-detail">主播：{{readingClassics.anchor}}</p>
              <p class="classic-detail">播放：{{readingClassics.playTimes}}次</p>
            </div>
          </div>
        </div>

        <div class="expenselist-area expenselistSpe">
          <p class="area-label">
            <span class="color-span"> </span>
            <span class="title">优质好课</span>
            <span class="subtitle" v-touch:tap="onListTap('P')">全部课程</span>
          </p>
          <div v-for="(index, course) in expenseList"
               v-bind:class="['expense-course',index ? index%2 ? 'expense-course-mini-left' : 'expense-course-mini-right' : 'expense-course-max']"
               v-touch:tap="goToCourseDetail(course,$index)">
            <img v-bind:src=expenseList[$index].pic class="expense-course-img"/>
            <p class="expense-course-promotion">{{course.promotion}}</p>
            <p class="expense-course-title">{{course.title}}</p>
            <p class="expense-course-price">
              <span v-if="!course.discountPrice">￥{{course.price}}</span>
              <span v-else >￥{{course.discountPrice}}
                <span class="expense-course-original-price">￥{{course.price}}</span>
              </span>
            </p>
          </div>
        </div>

        <div class="freelist-area">
          <p class="area-label">
            <span class="color-span"> </span>
            <span class="title">免费好课</span>
            <span class="subtitle" v-touch:tap="onListTap('F')">全部课程</span>
          </p>
          <div v-for="course in freeList"
               v-touch:tap="goToCourseDetail(course,$index)"
               class="free-course">
            <img v-bind:src=freeList[$index].pic class="free-course-img"/>
            <p class="free-course-title">{{course.title}}</p>
          </div>
        </div>

        <div class="strategy-entry">
          <img src="../../../static/image/navigator/home-strategy.jpg" v-touch:tap="goToStrategy">
          <p>－让金钱为你而工作－</p>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import Swiper from 'vux/swiper'
  import WebAudio from '../../components/WebAudio.vue'
  import {navigatorGetters, userGetters, appUpdateGetters} from '../../vuex/getters'
  import {navigatorActions, dailyQuestionActions, newertestActions, giftActions, villageActions, appUpdateActions} from '../../vuex/actions'
  import {setLocalCache, getLocalCache} from '../../util/cache'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  import {Device, platformMap} from '../../plugin/device'
  import {appVersion} from '../../frame/versionConfig'
  import {convertVersionToNum} from '../../plugin/version.js'
  export default {
    vuex: {
      getters: {
        originBanners: navigatorGetters.banners,
        freeList: navigatorGetters.freeCourseList,
        expenseList: navigatorGetters.expenseCourseList,
        recommends: navigatorGetters.recommends,
        readingClassics: navigatorGetters.readingClassics,
        isLogin: userGetters.isLogin,
        hasNewInterview: navigatorGetters.hasNewInterview,
        headLineTitle: navigatorGetters.headLineTitle,
        appUpdateContent: appUpdateGetters.appUpdateContent
      },
      actions: {
        loadNavigatorDataInApp: navigatorActions.loadNavigatorDataInApp,
        loadNavigatorDataInWeb: navigatorActions.loadNavigatorDataInWeb,
        loadDailyQuestion: dailyQuestionActions.loadDailyQuestion,
        loadNewertestReport: newertestActions.loadNewertestReport,
        receiveGiftPackage: giftActions.receiveGiftPackage,
        isQualifyGiftPackage: giftActions.isQualifyGiftPackage,
        isInterviewChange: navigatorActions.isInterviewChange,
        getVillageProgress: villageActions.getVillageProgress,
        getHeadLineTitle: navigatorActions.getHeadLineTitle,
        getAppUpdate: appUpdateActions.getAppUpdate,
        getColumnChange: navigatorActions.getColumnChange
      }
    },

    route: {
      data ({from}) {
        //是否显示更新提示
        this.showAppUpdate()
        this.$dispatch(eventMap.ACTIVE_TAB, 0)
        setLocalCache('statistics-entry-page', {entryPage: '首页'})
        //加载首页
        this.loadNavigator()
        this.fromPath = from.path
        //加载新手礼包
        this.loadNewerGift()
        //显示院生故事有新消息
        this.showInterviewNew()
        //显示头条精选的数据
        this.showHeadLineTitle()
        //比对版本号,判定是否是最新版本
        this.showColumnChange()
        //测试
        this.showPackage()
      }
    },

    data () {
      return {
        scrollerHeight: '0px',
        isShowNewTestPop: false,
        giftMaskCount: 0,  // 显示新手礼包的次数 超过1则不显示礼包
        showNewerGiftIcon: false,  // 显示新手礼包领取图标
        fromPath: '', // 前一个页面url
        appVersion//版本信息
      }
    },
    ready () {
      this.$dispatch(eventMap.FIRST_SCREEN_LOADED)
    },

    computed: {
      banners () {
        let banners = this.originBanners
        let newBanners = banners.map(
            banner => {
            return {
              img: banner.pic || '/static/image/subject/banner/banner.png',
              url: banner.type === 'O' ? banner.url : (banner.url ? banner.url : (banner.topicType === 'C' ? '/common/topic/' : '/spec/topic/') + banner.topicId)
            }
          }
        )
        return newBanners
      },

      headLineTitleCalcLength: function () {
        let titleString = this.headLineTitle
        let length = titleString.length
        if (length > 13) {
            titleString = titleString.slice(0, 13) + '...'
        }
        return titleString
      }
    },

    methods: {
      /**
       * 判断应用是否更新
       */
       showAppUpdate () {
         //当获取到旧版本号，且和新版本号一致就不显示升级提示，反之，显示
         if (!(getLocalCache('app-update') && (getLocalCache('app-update')['appVersionNumber'] === appVersion))) {
           // 显示更新提示,就存储最新版本号
           setLocalCache('app-update', {appVersionNumber: appVersion})
           // 应用更新内容
           let appUpdateConentObj = {}
           this.getAppUpdate().then(() => {
            appUpdateConentObj.appUpdateVersion = this.appUpdateContent['no']
            appUpdateConentObj.appUpdateExplain = this.appUpdateContent['note'].split(',')
             this.showMask({
               component: 'AppUpdate.vue',
               componentData: appUpdateConentObj
             })
           })
         }
       },

      //如果没有版本号或者版本号过小.就需要弹出
      isOldVersion () {
        let versionNo = window.localStorage.getItem('versionNo')
        return !versionNo || convertVersionToNum(versionNo) < convertVersionToNum(appVersion)
      },

      //进入主页判定版本变更的流程
      showColumnChange () {
        if (this.isLogin && this.isOldVersion()) {
          this.getColumnChange().then((columnChangeData) => {
            if (columnChangeData.content) {
              window.localStorage.setItem('versionNo', appVersion)
              //弹出弹框
              this.columnChange()
            }
          })
        }
      },
      //打开弹窗
      columnChange () {
        this.showMask({
          component: 'mycourse/ColumnChange.vue',
          componentData: this.columnChangeData.content,
          hideOnMaskTap: true,
          callbackName: 'onColumnChange',
          callbackFn: this.onColumnChange.bind(this) //组件上的
        })
      },
      //版本变更的跳转
      onColumnChange () {
        this.$route.router.go('this.columnChangeData.mbUrl')
      },
      /**
       * 设置滚动条高度
       */
      setScrollerHeight () {
        // 设置滚动条高度为 页面高度-titlebar高度-tabbar高度
        const me = this
        const {titlebar} = this.$els
        const {tabBar} = me.$parent.$els
        me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight -
          (tabBar ? tabBar.offsetHeight : 0)) + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 150)
      },

      /**
       * 下载首页数据
       */
      loadNavigator () {
        const me = this
        let loadData = null

        if (Device.platform === platformMap.WEB) {
          loadData = this.loadNavigatorDataInWeb
        } else {
          loadData = this.loadNavigatorDataInApp
        }

        loadData().then(
          function () {
            // 设置滚动条高度
            setTimeout(() => {
              me.setScrollerHeight()
          }, 200)
          }
        )
      },

      /**
       * 下载新手礼包
       */
      loadNewerGift () {
        const me = this
        if (this.isLogin) {
          this.isQualifyGiftPackage().then(
            function (isQualify) {
              if (isQualify.qualification && me.giftMaskCount === 0) {
                me.showPackage()
                me.giftMaskCount += 1
                me.showNewerGiftIcon = true
              } else if (!isQualify.qualification && (me.fromPath === '/entry' || (/\/register\/end\//g.test(me.fromPath)))) {
                me.showNewerGiftIcon = false
                me.showGetGiftFailed()
              } else if (!isQualify.qualification) {
                me.showNewerGiftIcon = false
              }
            }
          )
        } else {
          this.showNewerGiftIcon = true
        }
      },

      /**
      * 点击新手礼包领取图标，，未登录进入登录页面，已登录进入领取页面
      */
      getNewerGift () {
        if (this.isLogin) {
          this.showPackage()
        } else {
          this.$route.router.go('/entry')
        }
      },

      /**
       * 每次进入页面 重置滚动位置(尤其是横向的)
       */
      resetScroller () {
        this.$nextTick(() => {
          this.$refs.scroller.reset({
            top: 0
          })
        })
      },

      /**
       * 显示院生故事的new图标
       */
      showInterviewNew () {
        if (getLocalCache('interview-count') && getLocalCache('interview-count')['interview-count']) {
          this.isInterviewChange(getLocalCache('interview-count')['interview-count'])
        } else {
          this.isInterviewChange(0)
        }
      },

      /**
       * 跳转到课程详情页
       */
      goToCourseDetail (subject, index) {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          type: subject.type,
          subjectid: subject.subjectId,
          index: index,
          position: subject.type === 'F' ? '免费听课' : '畅销好课'
        })
        //判断课程类型
        if (subject.type === 'P') {
          this.$route.router.go(`/subject/detail/${subject.type}/${subject.subjectId}/0`)   //跳转到收费课程
        } else if (subject.type === 'S') {
          this.$route.router.go(`/spec/topic/${subject.subjectId}`)   //跳转到打包课程
        } else if (subject.type === 'C') {
          this.$route.router.go(`/common/topic/${subject.subjectId}`)   //跳转到通用课程
        }
      },

      /**
       * 跳转到推荐课程
       */
      goToRecommendDetail (subject, index) {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          type: subject.type,
          subjectid: subject.subjectId,
          index: index,
          position: '人气必备'
        })
        this.$route.router.go(`/subject/detail/${subject.type}/${subject.subjectId}/0`)
      },

      /**
       * 跳转到全部课程列表
       */
      onListTap (type) {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_TEXT_TAP, {
          titile: '全部课程',
          position: type === 'F' ? '免费听课' : '畅销好课'
        })
        this.$route.router.go('/totalList')
      },

      /**
       * 跳转到理财揭秘起始页
       */
      goToNewertestStart () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          position: '新手测试'
        })
        const me = this
        me.loadNewertestReport().then(function (newertestReport) {
          if (newertestReport) {
            me.$route.router.go('/newertest/ending')
          } else {
            me.$route.router.go('/newertest/start')
          }
        }).catch(function () {
          me.showAlert('信息加载失败，请重试！')
        })
      },

      goToNewerGuide () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          position: '新手指南'
        })
        // (提示: 若用户已领取攻略跳转到present页)
        if (getLocalCache('guide-answered')) {
          this.$route.router.go('/guide/present')
        } else {
          this.$route.router.go('/guide/test')
        }
      },

      /**
       * 跳转到院生访谈列表页面
       */
      goToInterviewList () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          position: '院生访谈'
        })
        this.$route.router.go('/interview/interview-list')
      },

      /**
       * 跳转到全部课程列表-分类排列
       */
      goToCourseClassification () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          position: '课程分类'
        })
        this.$route.router.go('/course/classification')
      },
      //测试界面
      goToTestPage1 () {
        this.$route.router.go('/building/showhouse')
      },
      //测试界面
      goToTestPage2 () {
        this.$route.router.go('/building/rule')
      },

      //测试界面
      goToTestPage3 () {
        this.$route.router.go('/building/introduction')
      },

      /**
       * 跳转到每日一题
       */
      goToDailyQuestion () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          position: '每日一题'
        })
        const me = this
        me.loadDailyQuestion().then(function (dailyQuestion) {
          if (dailyQuestion.selectedOption) {
            me.$route.router.go('/daily/answer')
          } else {
            me.$route.router.go('/daily/quiz')
          }
        }).catch(function () {
          me.showAlert('信息加载失败，请重试！')
        })
      },

      /**
       * 理财新手村入口
       * */
      goToFreshVillageTap () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          position: '理财新手村'
        })
        // 是否登录
        if (this.isLogin) {
          const me = this
          // 已登录
          this.getVillageProgress().then(
            function (progress) {
              if (progress) {
                // 有进度  进入新手村的首页
                me.$route.router.go('/village/map')
              } else {
                // 没进度
                me.$route.router.go('/village/initialPage')
              }
            }
          )
        } else {
          // 未登录
          this.$route.router.go('/village/initialPage')
        }
      },

      /**
       * 显示头条精选数据
       */
      showHeadLineTitle () {
        this.getHeadLineTitle()
      },

      /**
       * 跳转到头条精选页面
       */
      goToHeadline () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          position: '头条精选'
        })
        this.$route.router.go('/headline')
      },

      /**
       * 跳转到大咖读经典
       * */
      goToClassicReading (classicId) {   /*统计数据*/
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          position: '大咖读经典'
        })
        this.$route.router.go(`/classic/reading/${classicId}`)   /*classicId放在url中传递*/
      },

      backHandler () {
        window.alert('main')
      },
      /**
       * 跳转到专业版 策略 宣传
       */
      goToStrategy () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          position: '策略宣传'
        })
        this.$route.router.go('/strategy/professional/intro')
      },

        /**
         * 显示新手礼包浮层
         */
      showPackage () {
        this.showMask({
          component: 'newerGift/GiftMask.vue',
          hideOnMaskTap: true,
          callbackName: 'gotoGiftPackageDetails',
          callbackFn: this.gotoGiftPackageDetails.bind(this)
        })
      },

      /*
      * 领取新手礼包失败显示浮框
      * */
      showGetGiftFailed () {
        this.showMask({
          component: 'newerGift/GetGiftFailedMask.vue',
          hideOnMaskTap: true,
          callbackName: 'hideGetGiftFailedMask',
          callbackFn: this.hideMask.bind(this) //组件上的
        })
      },

        /**
         * 跳转到新手礼包详情
         */
      gotoGiftPackageDetails () {
        const me = this
        me.hideMask()
        me.receiveGiftPackage().then(function () {
            me.$route.router.go('/newerGift/giftPackageDetails')
        }).catch(function (err) {
            me.showAlert(err.message)
        })
      }
    },
    components: {
      IctTitlebar,
      WebAudio,
      Scroller,
      Swiper
    }
  }
</script>

<style lang="less">
  .course-navigator{
    background: #fff;
    .popularSpe{
      padding-bottom: .8rem;
    }
    .popular-list{
      .box-container{
        width: 37.5rem;
        margin-left: .3rem;
        .box-item {
          float: left;
          position: relative;
          text-align: center;
          width: 6.8rem;
          height: 8.5rem;
          margin-right: .5rem;
          margin-left: .1rem;
          img {
            width: 6.8rem;
            height: 8.5rem;
            border-radius: .8rem;
          }
          .sub-title {
            position: absolute;
            bottom: 1.5rem;
            padding: 0 0.5rem;
            font-size: 0.65rem;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .sub-price {
            position: absolute;
            bottom: 0;
            padding: 0 0.5rem 0.5rem 0.5rem;
            font-size: 0.6rem;
            color: #ff9800;
          }
          .box-item:first-child {
            margin-left: 1rem;
          }
        }
      }
    }
    p{
      margin: 0;
    }
    .area-label{
      text-align: left;
      height: 2.2rem;
      line-height: 2.2rem;
      width: 100%;
      padding: 0 4%;
      span{
        display: inline-block;
        vertical-align: middle;
      }
      .color-span{
        width: .125rem;
        height: .8rem;
        background-color: #00b0f0;
      }
      .title{
        padding-left: 2%;
        font-size: 0.8rem;
        width: 68%;
      }
      .subtitle{
        right: 4%;
        padding: 0;
        font-size: 0.7rem;
        color: #aaa;
        text-align: right;
        margin-left: -.5rem;
      }
      .subtitle:after{
        content: '';
        display: inline-block;
        position: relative;
        left: 5%;
        width: 12px;
        height: 12px;
        padding: 0;
        border-top: 1px solid #aaa;
        border-right: 1px solid #aaa;
        -webkit-transform: rotate(45deg);
      }
    }


    .expenselistSpe{
      border-bottom: .4rem solid #f0eff5;
    }
    .expenselist-area{
      background: white;
      text-align: center;
      .expense-course{
        position: relative;
        text-align: left;
        &-title{
          font-size: 0.7rem;
          line-height: 1rem;
          color: #000;
        }
        &-price{
          font-size: 0.75rem;
          line-height: 1rem;
          color: #ff5b45;
        }
        &-original-price{
          text-decoration: line-through;
          padding-left: .2rem;
          color: #bbbbbb;
          font-size: .6rem;
        }
        &-promotion{
          display: none;
        }
      }
      .expense-course-max{
        width: 694/40rem;
        margin: 0.25rem auto;
        text-align: center;
        .expense-course-img{
          width: 694/40rem;
          height: 300/40rem;
        }
        .expense-course-promotion{
          display: block;
          position: absolute;
          width: 100%;
          bottom: 2.25rem;
          line-height: 1.5rem;
          font-size: 0.65rem;
          color: #fff;
          background: #000;
          opacity: 0.3;
        }
      }
      .expense-course-mini-left{
        display: inline-block;
        width: 340/40rem;
        margin: 0.5rem 12/40rem 0.5rem 20/40rem;
        .expense-course-img{
          width: 340/40rem;
          height: 180/40rem;
        }
      }
      .expense-course-mini-right{
        display: inline-block;
        width: 340/40rem;
        margin: 0.5rem 20/40rem 0.5rem 12/40rem;
        .expense-course-img{
          width: 340/40rem;
          height: 180/40rem;
        }
      }
    }

    .freelist-area{
      background: white;
      text-align: center;
      .free-course{
        display: inline-block;
        width: 340/40rem;
        margin: 0.5rem 14/40rem;
        &-img{
          width: 340/40rem;
          height: 180/40rem;
        }
        &-title{
          font-size: 0.7rem;
          color: #000;
        }
      }
    }

    @media all and (max-width: 320px) {
      .newertest-pop-img{
        width: 10.7rem;
        height: 8.5rem;
        background: transparent url("../../assets/styles/image/newertest/tip/tipImg.png") center center no-repeat;
        background-size: 100% 100%;
      }
    }
    .dots-class{
      .vux-icon-dot {
        background-color: #fff!important;
        opacity: 0.5;
      }
      .vux-icon-dot.active{
        background-color: #fff!important;
        opacity: 1;
      }
    }
    .strategy-entry{
      width: 100%;
      padding: 1.25rem 0 1rem;
      text-align: center;
      background: #fff;
      img{
        width: 100%;
        height: 6.75rem;
      }
      p{
        font-size: 0.65rem;
        color: #aaa;
        margin: 1rem 0 0;
      }
    }
    /*每日一题*/
    .daily-question{
      width: 325/375;
      height: 3rem;
      padding: 1.5rem 5.5rem;
      font-size: .75rem;
      color:#444;
      line-height: 1.2rem;
      background: #f2f2f2 url("../../assets/styles/image/navigator/daily-question.png")  no-repeat 7% center / 20% ;
      position: relative;
    }

    .daily-subtext {
      color: #898989;
      font-size: .65rem;
    }

    .daily-anpic-container {
      width: 1.725rem;
      height: 1.05rem;
      background: url("../../assets/styles/image/navigator/plane.png") no-repeat  bottom  right / contain;
      display: inline-block;
      position: absolute;
      left: 86%;
      top: 40%;
    }

    .under-banner{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      font-size: 0.55rem;
      color: #444;

      .under-banner-item{
        position: relative;
        text-align: center;
        /*padding: 34/40rem 0 26/40rem;*/
        box-sizing: border-box;
        flex: 1;
      }
    }
    .under-banner-icon{
      width: 1.6rem;
      height: 1.6rem;
      vertical-align: middle;
      display: block;
      margin: 0 auto 0.35rem;
    }
    .new-interview-icon{
      width: 1.35rem;
      height: 0.55rem;
      background: url("../../../static/image/strategy/newTip.png") no-repeat center center / 100% 100%;
      position: absolute;
      left: 53%;
      top: 20%;
    }

    .under-banner-icon.newer-test{
      background: url("../../assets/styles/image/navigator/newer-test.png") no-repeat center center / contain;
    }

    .under-banner-icon.interview{
      background: url("../../assets/styles/image/navigator/interview.png") no-repeat center center / contain;
    }

    .under-banner-icon.newer-guide{
      background: url("../../assets/styles/image/navigator/guide.png") no-repeat center center / contain;
    }

    .under-banner-icon.classification{
      background: url("../../assets/styles/image/navigator/classification.png") no-repeat center center / contain;
    }
  /*理财新手村-首页入口*/
    .fresh-village{
      width: 100%;
      height: 4.5rem;
      background: url("../../../static/image/navigator/fresh-village.png") no-repeat center center / contain;
    }
  /*大咖读经典*/
    .classic-info >p {
      text-align: left;
    }
    .classic {
      &-content {
        margin: 0 .7rem;
        background: url("../../../static/image/classicReading/classic-background.png") no-repeat;
        background-size: contain;
        text-align: left;
        padding: .5rem 0 0;
      }
      &-cover {
        display: inline-block;
        padding: 0 .7rem .5rem .5rem;
        width: 4.1rem;
        height: 5.35rem;
      }
      &-info {
        display: inline-block;
        vertical-align: top;
        line-height: 1.3rem;
      }
      &-name {
        color: #fff;
        padding-top: .3rem;
        font-size: .7rem;
      }
      &-detail {
        font-size: .65rem;
        color: #fff;
      }

    }
    /*首页新手礼包小挂件样式*/
    .newer-gift{
      position: absolute;
      z-index: 2;
      width: 4rem;
      height: 4.25rem;
      bottom: 4rem;
      right: .75rem
    }

    /*人气必备*/
    .head-navigator{
      border-bottom: 0.025rem #f0eff5 solid;
      height:5.5rem;
      .head-title{
        padding: 0.75rem 1.35rem 0.75rem;
        font-size: 0.8rem;
      }
    }

    /*头条精选*/
    .head-line {
      font-size: 0;
      position: relative;
      height: 2.5rem;
      background-color: #fff;
      border-bottom: 0.5rem solid #f0eff5;
      .icon {
        position: relative;
        vertical-align: middle;
        display: inline-block;
        height: 2.5rem;
        .picture{
          margin: 0.5rem 0.7rem 0.5rem 1.3rem;
          font-size: 0px;
          display:inline-block;
          width: 1.6rem;
          height: 1.5rem;
          background: url("../../../static/image/firstNewsChoose/icon.png") no-repeat center center / contain;
        }
      }

      .line{
        vertical-align: middle;
        display:inline-block;
        width: 0.025rem;
        height: 1.75rem;
        background-color: #f0f0f0;
        margin: auto auto;
        line-height: 100%;
      }

      .topic-txt{
        vertical-align: middle;
        margin-left:0.75rem;
        font-size: 0.7rem;
        color: #aaa;
        display:inline-block;
        width: 11rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .gift{
        vertical-align: middle;
        display:inline-block;
        position: absolute;
        top: 0.5rem;
        right: 0;
        .picture{
          vertical-align: middle;
          font-size: 0px;
          display:inline-block;
          width: 2.85rem;
          height: 0.775rem;
          background: url("../../../static/image/firstNewsChoose/gift.png") no-repeat center center / contain;
        }
      }
    }
  }
</style>
