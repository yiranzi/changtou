<template>
    <div class="course-navigator" style="height: 100%;">
      <ict-titlebar :left-options="{showBack: false}" v-el:titlebar>长投学堂</ict-titlebar>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
        <div>
          <swiper :aspect-ratio="120/375" :list="banners" stop-propagation ></swiper>
          <div class="financial-interview">
            <span>理财揭秘</span>
            <span v-touch:tap="goToInterviewList">院生访谈</span>
          </div>
          <div class="daily-question" v-touch:tap="goToDailyQuestion">
            每日一题 积攒你的财商
          </div>
          <div class="expenselist-area">
            <p class="area-label">
              <span class="color-span"> </span>
              <span class="title">热门畅销</span>
              <span class="subtitle" v-touch:tap="onExpenseListTap">全部课程</span>
            </p>
            <div v-for="(index, course) in expenseList"
                 v-bind:class="['expense-course',index ? index%2 ? 'expense-course-mini-left' : 'expense-course-mini-right' : 'expense-course-max']"
                 v-touch:tap="gotoCourseDetail('P',$index)">
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
              <span class="subtitle" v-touch:tap="onFreeListTap">全部课程</span>
            </p>
            <div v-for="course in freeList"
                 v-touch:tap="gotoCourseDetail('F',$index)"
                 class="free-course">
              <img v-bind:src=freeList[$index].pic class="free-course-img"/>
              <p class="free-course-title">{{course.title}}</p>
            </div>
          </div>
          <!--<div style="height: 4.8rem; background-color: transparent"></div>-->
        </div>
      </scroller>
    </div>
</template>

<script>
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import Scroller from 'vux/scroller'
  import Swiper from 'vux/swiper'
  import WebAudio from '../../components/webAudio.vue'
  import {navigatorGetters, dailyQuestionGetters} from '../../vuex/getters'
  import {navigatorActions, dailyQuestionActions} from '../../vuex/actions'

  export default {
    vuex: {
      getters: {
        originBanners: navigatorGetters.banners,
        freeList: navigatorGetters.freeCourseList,
        expenseList: navigatorGetters.expenseCourseList,
        dailyQuestion: dailyQuestionGetters.question
      },
      actions: {
        loadData: navigatorActions.loadNavigatorData,
        loadDailyQuestion: dailyQuestionActions.loadDailyQuestion
      }
    },

    data () {
      return {
        scrollerHeight: '0px'
      }
    },
    route: {
      data (transition) {
        this.loadDailyQuestion().then(
          function () {
            transition.next()
          },
          function (err) {
            console.log('err', err)
          }
        )
      }
    },
    ready () {
      const me = this
      this.loadData().then(
        function () {
          // 设置滚动条高度
         me.setScrollerHeight()
        },
        function () {

        }
      )
    },

    created () {
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

      gotoCourseDetail (type, index) {
        let courseList = type === 'P' ? this.expenseList : this.freeList
        let path = `/subject/detail/${type}/${courseList[index].subjectId}/0`
        this.$route.router.go(path)
      },
      onExpenseListTap () {
        this.$route.router.go('/totalList/P')
      },
      onFreeListTap () {
        this.$route.router.go('/totalList/F')
      },
      //跳转到院生访谈列表页面
      goToInterviewList () {
        this.$route.router.go('/interview/interview-list')
      },
      //跳转到每日一题
      goToDailyQuestion () {
        if (this.dailyQuestion.selectedOption) {
          this.$route.router.go('daily/answer')
        } else {
          this.$route.router.go('daily/quiz')
        }
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
        width: 2%;
        height: 1rem;
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

      span{
        width: 50%;
        text-align: center;
      }
    }
    /*每日一题*/
    .daily-question{
      width: 325/375;
      height: 3rem;
      padding: 1.5rem 1.25rem;
      background-color: #fff;
    }
    .expenselist-area{
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
  }
</style>
