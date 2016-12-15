<template>
  <div class="course-navigator" style="height: 100%;">
    <ict-titlebar :left-options="{showBack: false}" v-el:titlebar>长投学堂</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div>
        <swiper :aspect-ratio="120/375" :list="banners"
                stop-propagation dots-position="center"
                :auto="true" :interval="3000"
                :show-desc-mask="false" dots-class="dots-class"></swiper>
        <div class="financial-interview">
          <span v-touch:tap="goToNewertestStart">
            <i class="finan-icon finan-icon-jiemi"></i>
            理财揭秘
          </span>
          <i class="vertical-line-yan"></i>
          <span v-touch:tap="goToInterviewList">
            <i class="finan-icon finan-icon-fangtan"></i>
            院生故事
          </span>
        </div>
        <div class="expenselist-area popularSpe">
          <p class="area-label">
            <span class="color-span"> </span>
            <span class="title">人气必备</span>
          </p>
          <scroller :lock-y='true' :scrollbar-x="false" style="height=8.5rem">
            <div class="box-container" >
                <div class="box-item" v-for="item in recommends"
                     v-touch:tap="goToRecommendDetail(item,$index)">
                  <img :src="item.imgUrl">
                  <p class="sub-title">{{item.title}}</p>
                  <p class="sub-price">￥{{item.price}}</p>
                </div>
            </div>
          </scroller>
        </div>
        <div class="daily-question" v-touch:tap="goToDailyQuestion">
          <p>每日一题 积攒你的财商</p>
          <p class="daily-subtext">财富自由之路第一步</p>
          <span class="daily-anpic-container"></span>
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
            <p class="expense-course-price">￥{{course.price}}</p>
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
          <img src="../../assets/styles/image/home/home-strategy.jpg" v-touch:tap="goToStrategy">
          <p>－让金钱为你而工作－</p>
        </div>
        <!--<div style="height: 4.8rem; background-color: transparent"></div>-->
      </div>
    </scroller>
  </div>
</template>

<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import Swiper from 'vux/swiper'
  import WebAudio from '../../components/WebAudio.vue'
  import {navigatorGetters} from '../../vuex/getters'
  import {navigatorActions, dailyQuestionActions, newertestActions} from '../../vuex/actions'
  import {setLocalCache} from '../../util/cache'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  export default {
    vuex: {
      getters: {
        originBanners: navigatorGetters.banners,
        freeList: navigatorGetters.freeCourseList,
        expenseList: navigatorGetters.expenseCourseList,
        recommends: navigatorGetters.recommends
      },
      actions: {
        loadData: navigatorActions.loadNavigatorData,
        loadDailyQuestion: dailyQuestionActions.loadDailyQuestion,
        loadNewertestReport: newertestActions.loadNewertestReport
      }
    },

    route: {
      data () {
        setLocalCache('statistics-entry-page', {entryPage: '首页'})
        this.$nextTick(() => {
          this.$refs.scroller.reset({
          top: 0
          })
        })
      }
    },

    data () {
      return {
        scrollerHeight: '0px',
        isShowNewTestPop: false
      }
    },
    ready () {
      const me = this
      this.loadData().then(
        function () {
          // 设置滚动条高度
          me.setScrollerHeight()
        }
      )
    },

    computed: {
      banners () {
        let banners = this.originBanners
        let newBanners = banners.map(
            banner => {
            return {
              img: banner.pic || '/static/image/subject/banner/banner.png',
              url: (banner.topicType === 'C' ? '/common/topic/' : '/spec/topic/') + banner.topicId
            }
          }
      )
        return newBanners
      }
    },
    methods: {
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
      goToCourseDetail (subject, index) {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          type: subject.type,
          subjectid: subject.subjectId,
          index: index,
          position: subject.type === 'F' ? '免费听课' : '畅销好课'
        })
        this.$route.router.go(`/subject/detail/${subject.type}/${subject.subjectId}/0`)
      },
      goToRecommendDetail (subject, index) {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.TOPIC_CONFIRM_TAP, {
          type: 'P',
          subjectid: subject.subjectId,
          index: index
        })
        this.$route.router.go(`/subject/detail/${subject.type}/${subject.subjectId}/0`)
      },
      onListTap (type) {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_TEXT_TAP, {
          titile: '全部课程',
          position: type === 'F' ? '免费听课' : '畅销好课'
        })
        this.$route.router.go('/totalList')
      },
      //跳转到理财揭秘起始页
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
      //跳转到院生访谈列表页面
      goToInterviewList () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.HOME_PIC_TAP, {
          position: '院生访谈'
        })
        this.$route.router.go('/interview/interview-list')
      },
      //跳转到每日一题
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
    .popularSpe{
      padding-bottom: .8rem;
    }
    .expenselist-area{
      .box-container{
        width: 37.5rem;
        margin-left: .3rem;
        .box-item {
          float: left;
          text-align: center;
          line-height: 5rem;
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
            bottom: 1.2rem;
            padding: 0 0.5rem;
            font-size: 0.65rem;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            bottom: -9.2rem;
          }
          .sub-price {
            position: absolute;
            bottom: -10.5rem;
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
    /*新增理财揭秘，院生访谈的样式*/
    .financial-interview{
      width: 100%;
      line-height: 4rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-bottom: 0.5rem #f0eff5 solid;
      font-size: 0.75rem;
      color: #444;

      span{
        width: 50%;
        text-align: center;
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
      margin-top: 1.25rem;
      text-align: center;
      img{
        width: 100%;
        height: 6.75rem;
      }
      p{
        font-size: 0.65rem;
        color: #aaa;
        margin: 1rem 0 1.25rem;
      }
    }
    /*每日一题*/
    .daily-question{
      width: 325/375;
      height: 3rem;
      padding: 1.5rem 5.5rem;
      background-color: #f2f2f2;
      font-size: .75rem;
      color:#444;
      line-height: 1.2rem;
      background: url("../../assets/styles/image/meiriyiti.png")  no-repeat 7% center / 20% ;
      position: relative;
    }

    .daily-subtext {
      color: #898989;
      font-size: .65rem;
    }

    .daily-anpic-container {
      width: 1.725rem;
      height: 1.05rem;
      background: url("../../assets/styles/image/feiji.png") no-repeat  bottom  right / 70%;
      display: inline-block;
      position: absolute;
      left: 86%;
      top: 40%;
    }

    .finan-icon{
      width: 1.725rem;
      height: 1.725rem;
      display: inline-block;
      margin-bottom: -.3rem;
    }

  .finan-icon.finan-icon-jiemi{
    background: url("../../assets/styles/image/xinshouceshi.png") no-repeat bottom right / 70%;
  }

    .finan-icon.finan-icon-fangtan{
      background: url("../../assets/styles/image/fangtan.png") no-repeat center right / 70%;
      margin-bottom: -.5rem;
    }

    .vertical-line-yan{
      display: inline-block;
      width:.08rem;
      height:1.5rem;
      background: #eee;
    }
  }

</style>
