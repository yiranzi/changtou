/**
 * Created by jun on 2016/9/2.
 * 我的课程
 */
<template>
    <div class="my-course">
      <scroller :lock-x="true" scrollbar-y v-ref:scroller>
        <div>
          <div class="time-box">
            <ict-button class="my-course-drfts" type="string" text="草稿箱" v-touch:tap="onDraftsTap"></ict-button>
            <p>累计学习时间</p>
            <p><span class="time">{{accumulatedTime}}</span>分钟</p>
          </div>
          <div class="changtou-card" v-if="hasCard">
            <span class="left-round"></span>
            长投VIP卡 有效日期至{{validity}}
            <span class="right-round"></span>
            <span class="help-icon" v-touch:tap="onCardHelpIconTap"></span>
          </div>
          <div class="information" v-el:information v-if="information">{{{information}}}</div>
          <div class="course-list" v-for="course in courseList">
            <img class="course-list-img" v-touch:tap="gotoCourseDetail($index)" :src=myCourses[$index].pic>
            <div class="course-list-info" v-touch:tap="gotoCourseDetail($index)">
              <p class="course-list-title">{{course.title}}</p>
              <p class="course-list-subtitle">{{course.subtitle}}</p>
              <p class="course-list-state">{{course.status}}</p>
            </div>
          </div>
          <div style="height: 4.8rem; background-color: transparent"></div>
        </div>
      </scroller>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import IctButton from '../../components/IctButton.vue'
  import Scroller from 'vux/scroller'
  import {myCoursesActions, courseRecordActions} from '../../vuex/actions'
  import {myCoursesGetters, userGetters, courseRecordsGetters} from '../../vuex/getters'

export default {
  vuex: {
    getters: {
      information: myCoursesGetters.information, //推荐信息
      myCourses: myCoursesGetters.myCourses, //我的课程列表
      isLogin: userGetters.isLogin, //是否登录
      hasCard: userGetters.card, //长投卡信息
      expenseRecords: courseRecordsGetters.expenseRecords, //付费课程记录
      freeRecords: courseRecordsGetters.freeRecords //免费课程记录
    },
    actions: {
      loadAllFreeRecords: courseRecordActions.loadAllFreeRecords, // 下载全部免费课进度
      loadAllExpenseRecords: courseRecordActions.loadAllExpenseRecords, // 下载全部付费课进度
      loadDefaultCourses: myCoursesActions.loadDefaultCourses, // 下载 默认 我的课程 信息
      loadUserCourses: myCoursesActions.loadUserCourses // 下载 用户 我的课程 信息
    }
  },
  computed: {
    validity () {
      let createTime = new Date(this.hasCard.createTime.replace(/-/g, '/'))
      let newYear = createTime.getFullYear() + 1
      let expireTimeValue = new Date(createTime.setFullYear(newYear))
      return expireTimeValue.toLocaleDateString().replace(/\//g, '-')
    },
    accumulatedTime () {
      let accumulatedTime = 0
      this.expenseRecords.map(
        record => {
        accumulatedTime = accumulatedTime + record.accumulatedTime
      return record.accumulatedTime
    }
    )
      return accumulatedTime
    },
    courseList () {
      let graduatedType = {
        N: '在读中',
        E: '课程过期',
        Y: '已毕业',
        I: '未激活',
        P: '暂停'
      }
      let courseList = []
      this.myCourses.map(
        course => {
          if (course.type === 'P') {
          this.expenseRecords.map(
            record => {
              if (course.subjectId === record.subjectId) {
                course.status = graduatedType[record.status]
                courseList.push(course)
              }
              return course
            }
          )
        } else {
          this.freeRecords.map(
            record => {
              if (course.subjectId === record.subjectId) {
                course.status = '已学习到' + record.sequence + '/' + record.count + '课'
                courseList.push(course)
              }
            }
          )
        }
      }
    )
    return courseList
    }
  },
  route: {
    data () {
      let promiseArray = []
      let me = this

      if (this.isLogin) {
        promiseArray = [this.loadUserCourses(), this.loadAllFreeRecords(), this.loadAllExpenseRecords()]
      } else {
        promiseArray = [this.loadDefaultCourses()]
      }

      return Promise.all(promiseArray).then(
        () => {
          setTimeout(
            () => {
              me.resetScroller()
              me.addLoginTapEvent()
            },
            300
          )
        },
        () => {}
      )
    }
  },
  methods: {
    /**
     * 点击 草稿箱
     */
    onDraftsTap () {
      console.log('进入草稿箱')
    },

    /**
     * 进入课程详情
     * @param index
       */
    gotoCourseDetail (index) {
      let myCourses = this.myCourses
      let path = `/subject/detail/${myCourses[index].type}/${myCourses[index].subjectId}/0`
      this.$route.router.go(path)
    },

    /**
     * 点击长投卡帮助
     */
    onCardHelpIconTap () {
      console.log('弹出提示框')
    },

    resetScroller () {
      let me = this
      me.$nextTick(() => {
        me.$refs.scroller.reset({
          top: 0
        })
      })
    },

    /**
     * 添加 登录 点击事件
     */
    addLoginTapEvent () {
      let {information} = this.$els
      if (information) {
        information.addEventListener('touchstart', ({target}) => {
          if (target.tagName === 'SPAN') {
            if (!this.isLogin) {
              this.$route.router.go('/entry')
            }
          }
        })
      }
    }
  },
  components: {
    IctTitlebar,
    IctButton,
    Scroller
  }
}
</script>
<style lang="less">
  .my-course{
    background: #fff;
    p{
      margin: 0;
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
    .information{
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
    .course-list{
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
    }

  }
</style>
