/**
 * Created by jun on 2016/9/2.
 * 我的课程
 */
<template>
    <div class="my-course">
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
        <div>
          <div class="time-box">
            <p>累计学习时间</p>
            <p><span class="time">{{parseInt(accumulateTime/60)}}</span>分钟</p>
          </div>

          <div class="homework-panel" v-if="isShowHomeWorkPanel">
            <span v-touch:tap="goToMyHomework" class="homework-item">
              <img src="../../assets/styles/image/myCourse/homework.png">
              <p>我的作业</p>
            </span>
            <span v-touch:tap="goToMyDiploma" class="homework-item">
              <span class="draw-icon" v-if="newDrawDiploma">抽奖</span>
              <img src="../../assets/styles/image/myCourse/diploma.png">
              <p>毕业证书</p>
            </span>
          </div>

          <div class="changtou-card" v-if="card">
            <span class="left-round"></span>
            长投VIP卡 有效日期至{{validity}}
            <span class="right-round"></span>
            <span class="help-icon" v-touch:tap="onCardHelpIconTap"></span>
          </div>

          <div class="recommend" v-el:recommend v-if="recommend" v-touch:tap="onRecommendTap">{{{recommend}}}</div>

          <div class="course-list" v-for="course in courseList" track-by="$index" >

            <!--电子书-->
            <div v-touch:tap="gotoReadBook" class="read-book-item" v-if="this.expenseRecords.length === 0 ? ($index === 0 && this.isLogin && isShowEBook) : 0">
              <div style="position:relative;display:inline-block;">
                <img class="course-list-img"  src='../../assets/styles/image/giftPackage/readIcon.png' >
                <span class="read-book-tip" v-if="$index === parseInt(this.expenseRecords.length)">伴学礼包</span>
              </div>
              <div class="course-list-info">
                <p class="course-list-title">{{ebook1.title}}</p>
                <p class="course-list-subtitle">{{ebook1.subtitle}}</p>
                <p class="course-list-state">{{book1Progress.totalOwnerNum}}人阅读过</p>
              </div>
            </div>

            <!--我的课程列表-->
            <div v-touch:tap="goToCourseDetail(course.type, course.subjectId)">
              <img class="course-list-img" :src=course.pic >
              <div class="course-list-info">
                <p class="course-list-title">{{course.title}}</p>
                <p class="course-list-subtitle">{{course.subtitle}}</p>
                <p class="course-list-state" >{{course.status}}<span class="course-list-price" v-if="expenseRecords.length <= 0 && course.price > 0">￥{{course.price}}</span></p>
              </div>
            </div>

            <!--电子书-->
            <div v-touch:tap="gotoReadBook" class="read-book-item" v-if="this.expenseRecords.length > 0 ? ($index === this.expenseRecords.length -1 && this.isLogin && isShowEBook) : 0">
              <div style="position:relative;display:inline-block;">
                <img class="course-list-img"  src='../../assets/styles/image/giftPackage/readIcon.png' >
                <span class="read-book-tip" v-if="$index === parseInt(this.expenseRecords.length)">伴学礼包</span>
              </div>
              <div class="course-list-info">
                <p class="course-list-title">{{ebook1.title}}</p>
                <p class="course-list-subtitle">{{ebook1.subtitle}}</p>
                <p class="course-list-state">{{book1Progress.totalOwnerNum}}人阅读过</p>
              </div>
            </div>
          </div>
        </div>
      </scroller>
      <building-entry></building-entry>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import IctButton from '../../components/IctButton.vue'
  import Scroller from 'vux/scroller'
  import {myCoursesActions, ebookActions, giftActions} from '../../vuex/actions'
  import {myCoursesGetters, userGetters, courseRecordsGetters, graduationDiplomaGetters, ebookGetters} from '../../vuex/getters'
  import {setLocalCache} from '../../util/cache'
  import {eventMap} from '../../frame/eventConfig'
  import buildingEntry from '../../components/building/entry.vue'
export default {
  vuex: {
    getters: {
      graduatedType: myCoursesGetters.graduatedType, //课程状态类型
      recommend: myCoursesGetters.recommend, //推荐信息
      myCourseList: myCoursesGetters.myCourseList, //我的课程列表
      accumulateTime: myCoursesGetters.accumulateTime, //累积学习时间
      isLogin: userGetters.isLogin, //是否登录
      card: userGetters.card, //长投卡信息
      expenseRecords: courseRecordsGetters.expenseRecords, //付费课程记录
      freeRecords: courseRecordsGetters.freeRecords, //免费课程记录
      newDrawDiploma: graduationDiplomaGetters.newDrawDiploma, // 有新的毕业证书
      book1Progress: ebookGetters.bookProgress //电子书1的阅读进度
    },
    actions: {
      loadDefaultCourses: myCoursesActions.loadDefaultCourses, // 下载 默认 我的课程 信息
      loadUserCourses: myCoursesActions.loadUserCourses, // 下载 用户 我的课程 信息
      loadAccumulateTime: myCoursesActions.loadAccumulateTime, //下载 累积学习时间
      getBookProgress: ebookActions.getBookProgress,   // 得到上次阅读进度
      receiveGiftPackage: giftActions.receiveGiftPackage,  // 获取新手礼包 （暂时用来判断是否领取过礼包，若领取过则显示电子书）
      isQualifyGiftPackage: giftActions.isQualifyGiftPackage
    }
  },
  data () {
    return {
      scrollerHeight: '1000px',
      courseList: [], //课程列表
      isShowEBook: false, // 是否显示电子书
      readTotalNum: 0,  // 阅读电子书人数
      isBookPlacedDown: false, // 已购买课程放在付费课程之下
      ebook1: {
        'title': '大熊股市历险记',
        'subtitle': '阅读材料'
      }

    }
  },

  ready () {
    this.scrollerHeight = (window.document.body.offsetHeight - (this.$parent.$els.tabBar ? this.$parent.$els.tabBar.offsetHeight : 0)) + 'px'
  },

  computed: {
    // 截止日期
    validity () {
      if (this.card) {
        const createTime = new Date(this.card.createTime.replace(/-/g, '/'))
        const newYear = createTime.getFullYear() + 1
        const expireTimeValue = new Date(createTime.setFullYear(newYear))
        return expireTimeValue.toLocaleDateString().replace(/\//g, '-')
      }
    },

    // 如果登录并且有付费课程显示 '我的作业' 和 '毕业证书'
    isShowHomeWorkPanel () {
      if (!this.isLogin) {
        return false
      } else {
        for (let i = 0, length = this.expenseRecords.length; i < length; i++) {
          if (this.expenseRecords[i] && this.expenseRecords[i].lessonSet.graduated !== 'I') {
            return true
          }
        }
        return false
      }
    }
  },
  route: {
    data () {
      this.$dispatch(eventMap.ACTIVE_TAB, 1)
      setLocalCache('statistics-entry-page', {entryPage: '我的课程'})

      let promiseArray = []
      const me = this
      if (this.isLogin) {
        promiseArray = [this.loadUserCourses(), this.loadAccumulateTime()]
      } else {
        promiseArray = [this.loadDefaultCourses()]
      }

      // 获取电子书阅读人数
       const bookId = 1
       if (this.isLogin) {
          this.getBookProgress(bookId)
          // 是否显示电子书
          this.isQualifyGiftPackage().then(
            function (res) {        // 没有资格领取新手礼包 可能包含已经领取过电子书
              if (!res.qualification) {
                me.receiveGiftPackage().then((message) => {})
                .catch(function (err) {
                  if (err.message === '您已领取过新手礼包' && me.isLogin) {
                    me.isShowEBook = true
                    if (me.expenseRecords.length > 0) {
                      me.isBookPlacedDown = true
                    }
                  }
                })
              }
            }
          )
      }

      return Promise.all(promiseArray).then(
        function () {
          setTimeout(
            function () {
              me.arrangeList()
              me.setScrollerHeight()
            }, 300)
        }
      )
    }
  },
  methods: {
    /**
     * 造房计划入口
     **/
    goToBuilding () {
      this.$route.router.go('/building/introduction')
    },
    /**
     *  去阅读电子书 若有阅读进度 则去上次阅读进度处
     */
    gotoReadBook () {
      const bookId = 1
      let currIndex = parseInt(this.book1Progress.sectionIndex)
      if (this.isLogin && currIndex !== 0) {
          // 有进度 跳转到章节
        this.$route.router.go(`/ebook/chapter/${bookId}/${currIndex - 1}`)
      } else {
        // 无进度 跳转到介绍
        this.$route.router.go(`/ebook/detail/${bookId}`)
      }
    },

    /**
     * 设置滚动高度
     */
    setScrollerHeight () {
      const me = this
      setTimeout(function () {
        me.$nextTick(() => {
          me.$refs.scroller.reset({
          top: 0
        })
      })
      }, 300)
    },

    /**
     * 整理课程列表
     */
    arrangeList () {
      const me = this
      let courseList = []
      if (me.isLogin) {
        for (let i = 0, length = me.myCourseList.length; i < length; i++) {
          if (me.myCourseList[i].type === 'P') {
            let myCourserItem = me.myCourseList[i]
            let expenseIndex = me.expenseRecords.findIndex(
              function (expenseRecord) {
                if (me.myCourseList[i].subjectId === expenseRecord.subjectId) {
                  return true
                }
              }
            )

            if (expenseIndex >= 0) {
              // 有学习记录
              myCourserItem.status = me.graduatedType[me.expenseRecords[expenseIndex].status]
            } else {
              // 无学习记录
              myCourserItem.status = myCourserItem.studentCount + '人学过'
            }

            courseList.push(myCourserItem)
          } else {
            let myCourserItem = me.myCourseList[i]
            let freeIndex = me.freeRecords.findIndex(
              function (freeRecords) {
                if (me.myCourseList[i].subjectId === freeRecords.subjectId) {
                  return true
                }
              }
            )

            if (freeIndex >= 0) {
              // 有学习记录
              myCourserItem.status = '已学习到' + me.freeRecords[freeIndex].sequence + '/' + me.freeRecords[freeIndex].count + '课'
            } else {
              // 无学习记录
              myCourserItem.status = myCourserItem.studentCount + '人学过'
            }

            courseList.push(myCourserItem)
          }
        }
        me.courseList = courseList
      } else {
        me.courseList = me.myCourseList.map(
          function (myCourse) {
            myCourse.status = myCourse.studentCount + '人学过'
            return myCourse
          }
        )
      }
    },

    /**
     * 进入课程详情
     * @param index
       */
    goToCourseDetail (type, subjectId) {
      const path = `/subject/detail/${type}/${subjectId}/0`
      this.$route.router.go(path)
    },

    /**
     * 点击长投卡帮助
     */
    onCardHelpIconTap () {
      this.showMask({
        component: 'mycourse/CardExplain.vue',
        hideOnMaskTap: true,
        callbackName: '',
        callbackFn: null //组件上的
      })
    },

    /**
     * 点击登录
     * @param e
       */
    onRecommendTap (e) {
      if (e.target.nodeName === 'SPAN') {
        if (!this.isLogin) {
          this.$route.router.go('/entry')
        }
      }
    },
    /**
     * 点击我的作业
     */
    goToMyHomework () {
      this.$route.router.go('/homework/mine')
    },
    /**
     * 点击我的毕业证书
     */
    goToMyDiploma () {
      this.$route.router.go('/graduation/list')
    }
  },
  components: {
    IctTitlebar,
    IctButton,
    Scroller,
    buildingEntry
  }
}
</script>
<style lang="less">
  .my-course{
    background: #fff;
    p{
      margin: 0;
    }
    .read-book-item{
      background: #e3f7fe !important;
      position: relative;
      .read-book-tip{
        background: #ff9800;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: .6rem;
        color: #fff;
        top: 0.5rem;
        right: 0.375rem;
        position: absolute;
        width: 3rem;
      }
    }
    .my-course-drfts{
      width: 5rem;
      color: #fff;
      position: absolute;
      top: 0;
      right: 0;
    }
    .time-box{
      padding: 120/40rem 0 60/40rem;
      background: #00b0f0;
      font-size: 28/40rem;
      text-align: center;
      color: #fff;
      .time{
        font-size: 90/40rem;
      }
    }
    .homework-panel{
      width: 100%;
      height: 160/40rem;
      padding: 24/40rem 0;
      box-sizing: border-box;
      background: #fff;
      border-bottom: 20/40rem solid #f0eff5;
      font-size: 0;
      .homework-item{
        position: relative;
        width: 50%;
        display: inline-block;
        text-align: center;
        img{
          width: 68/40rem;
          height: 60/40rem;
        }
        p{
          margin-top: 10/40rem;
          font-size: 22/40rem;
          color: #444;
        }
        .draw-icon{
          position: absolute;
          left: 50%;
          top: -7px;
          display: inline-block;
          width: 1.5rem;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          border-radius: 13/2px;
          font-size: 18/40rem;
          color: #fff;
          background: #ff9800;
        }
      }
    }
    .changtou-card{
      margin: 0.5rem 0.75rem;
      padding: 0 1.25rem;
      position: relative;
      font-size: 0.75rem;
      line-height: 2.25rem;
      color: #fff;
      background: #33d6ad;
      border-radius: 5px;
      .left-round,.right-round{
        position: absolute;
        display: inline-block;
        height: 2.25rem;
        line-height: 2.25rem;
      }
      .left-round{
        left: -0.5rem;
      }
      .right-round{
        right: -0.5rem;
      }
      .left-round:before,.right-round:before{
        position: relative;
        display: inline-block;
        vertical-align: text-top;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: #fff;
        content: '';
      }
      .help-icon{
        display: inline-block;
        line-height: 2.25rem;
        position: absolute;
        right: 1.25rem;
        &:before{
          font-family: 'myicon';
          content: '\e91a';
          color: #fff;
          font-size: 1rem !important;
          vertical-align: middle;
        }
      }
    }
    .recommend{
      background: #f0eff5;
      margin: 0.75rem;
      height: 5rem;
      text-align: center;
      color: #656565;
      font-size: 0.65rem;
      div{
        padding-top: 0.65rem;
      }
      span{
        color: #00b0f0;
      }
    }
    .course-list, .read-book-item{
      background: #fff;
      overflow: hidden;
      border-bottom: 1px solid #f0eff5;
      &-img{
        width: 300/40rem;
        height: 3.5rem;
        margin: 0.5rem 15/40rem 0.5rem 30/40rem;
        vertical-align: top;
      }
      &-info{
        position: relative;
        display: inline-block;
        margin: 0.5rem 30/40rem 0.5rem 15/40rem;
        width: 340/40rem;
        vertical-align: top;
        line-height: 1rem;
      }
      &-title{
        color: #000;
        font-size: 0.8rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &-subtitle{
        color: #898989;
        font-size: 0.7rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &-state{
        padding-top: 20/40rem;
        color: #00b0f0;
        font-size: 0.6rem;
        &:before{
          margin-right: 0.25rem;
          font-family: 'myicon';
          content: '\e906';
          color: #00b0f0;
          font-size: 0.7rem !important;
          vertical-align: bottom;
        }
      }
      &-state-unlogin{
        color: #898989;
        &:before{
          content: '';
          margin-right: 0;
        }
      }
    }
  }
</style>
