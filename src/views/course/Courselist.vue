/**
* Created by jun on 2016/11/19.
*
*/

<template>
  <div class="course-list">
    <ict-titlebar>全部课程</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller>
      <div>
        <div class="promote-panel" v-show="promoteShow">
          <img src="../../../static/image/subject/courseList/total-list-close.png" class="close-icon" v-touch:tap="onPromoteCloseTap">
          <img src="../../../static/image/subject/courseList/total-list-strategy.png" class="promote-img">
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
      const me = this
      setTimeout(function () {
        me.$nextTick(() => {
          me.$refs.scroller.reset({
          top: 0
        })
      })
      }, 300)
    },
    data () {
      return {
        promoteShow: true
      }
    },
    created () {
      this.loadList()
    },
    methods: {
      onPromoteCloseTap () {
        this.promoteShow = false
      },
      goToCourseDetail (type, subjectId) {
        const path = `/subject/detail/${type}/${subjectId}/0`
        this.$route.router.go(path)
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
  }
</style>
