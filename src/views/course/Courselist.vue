/**
* Created by jun on 2016/11/19.
*
*/

<template>
  <div class="course-list">
    <ict-titlebar v-el:titlebar>全部课程</ict-titlebar>
    <div class="enter-class-txt" v-touch:tap="goToCourseClassification">
      <span>课程分类</span>
    </div>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
      <div>
        <div class="promote-panel" v-show="promoteShow">
          <img src="../../assets/styles/image/courseList/total-list-close.png" class="close-icon" v-touch:tap="onPromoteCloseTap">
          <img src="../../assets/styles/image/courseList/total-list-strategy.png" class="promote-img"  v-touch:tap="goToProfessionalStrategy">
        </div>
        <div class="course-group" v-for="group in courseList">
          <p class="course-group-title">{{group.categoryName}}</p>
          <div class="course-list" v-for="course in group.subjectList">
            <img class="course-list-img"
                 v-touch:tap="goToCourseDetail(course.type, course.subjectId)"
                 v-bind:src=course.pic>
            <div class="course-list-info"
                 v-touch:tap="goToCourseDetail(course.type, course.subjectId)">
              <p class="course-list-title">{{course.title}}</p>
              <p class="course-list-subtitle">{{course.description}}</p>
              <p class="course-list-count">{{course.studentCount}}人学过<span class="course-list-price" v-if="course.price">￥{{course.price}}</span></p>
            </div>
          </div>
        </div>
        <div class="course-list-no-more">－从今天起努力提升自己－</div>
      </div>
    </scroller>
  </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import {courselistActions} from '../../vuex/actions'
  import {courselistGetters} from '../../vuex/getters'
  import {setLocalCache} from '../../util/cache'

  export default {
    vuex: {
      getters: {
        courseList: courselistGetters.courseList
      },
      actions: {
        loadList: courselistActions.loadCourseList
      }
    },
    ready () {
      this.loadList().then(this.setScrollerHeight)
    },
    data () {
      return {
        scrollerHeight: '0px',
        promoteShow: true
      }
    },
    route: {
      data () {
        setLocalCache('statistics-entry-page', {entryPage: '全部课程列表'})
        this.setScrollerHeight()
      }
    },
    methods: {
      /**
       * 设置滚动高度
       */
      setScrollerHeight () {
        const me = this
        setTimeout(function () {
          me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.clientHeight) + 'px'
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 100)
      },
      onPromoteCloseTap () {
        this.promoteShow = false
      },
      goToCourseDetail (type, subjectId) {
        const path = `/subject/detail/${type}/${subjectId}/0`
        this.$route.router.go(path)
      },
      goToProfessionalStrategy () {
        this.$route.router.go('/strategy/professional/intro')
      },
      goToCourseClassification () {
        this.$route.router.go('/course/classification')
      }
    },
    components: {
      IctTitlebar,
      Scroller
    }
  }
</script>

<style lang="less">
  .course-list{
    p{
      margin: 0;
    }
    .promote-panel{
      position: relative;
      height: 4rem;
      .close-icon{
        position: absolute;
        top: 0.4rem;
        right: 0.4rem;
        display: block;
        width: 1rem;
        height: 1rem;
      }
      .promote-img{
        width: 100%;
        height: 4rem;
      }
    }
    .course-group{
      position: relative;
      background: #fff;
      overflow: hidden;
      border-bottom: 0.5rem solid #f0eff5;
      &-title{
        width: 100%;
        height: 1.75rem;
        line-height: 1.75rem;
        text-align: center;
        font-size: 0.8rem;
        color: #00b0f0;
        border-bottom: 1px solid #f0eff5;
      }
    }
    .course-list{
      height: 86/20rem;
      background: #fff;
      overflow: hidden;
      border-bottom: 1px solid #f0eff5;
      &-img{
        width: 6.5rem;
        height: 3.5rem;
        margin: 0.5rem 15/40rem 0.5rem 30/40rem;
        vertical-align: top;
      }
      &-info{
        position: relative;
        display: inline-block;
        margin: 0.5rem 30/40rem 0.5rem 0;
        width: 360/40rem;
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
      &-count{
        padding-top: 20/40rem;
        color: #898989;
        font-size: 0.6rem;
      }
      &-price{
        position: absolute;
        right: 0;
        color: #ff5b45;
        font-size: 0.7rem;
      }
      &-no-more{
        background: #f7f9fc;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        font-size: 0.65rem;
        color: #aaa;
      }
    }
    .enter-class-txt{
      position:absolute;
      right: 0.3rem;
      top: 0.8rem;
      font-size: 0.6rem;
      color: #ffffff;
    }
  }
</style>
