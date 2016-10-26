<template>
  <div class="course-list">
    <ict-titlebar>全部课程</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller>
      <div>
        <div class="course-list" v-for="course in courseList">
          <img class="course-list-img"
               v-touch:tap="gotoCourseDetail(myCourses[$index].type,$index)"
               v-bind:src=courseList[$index].pic>
          <div class="course-list-info"
               v-touch:tap="gotoCourseDetail($index)">
            <p class="course-list-title">{{course.title}}</p>
            <p class="course-list-subtitle">{{course.description}}</p>
            <p class="course-list-count">{{course.studentCount}}人学过<span class="course-list-price" v-if="courseList[$index].price">￥{{course.price}}</span></p>
          </div>
        </div>
        <div class="course-list-no-more">没有更多内容了.....</div>
      </div>
    </scroller>
  </div>
</template>
<script>
  /**
   * 展示所有的页面
   */
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import Scroller from 'vux/scroller'
  import {courselistActions} from '../../vuex/actions'
  import {courselistGetters} from '../../vuex/getters'

  export default {
    vuex: {
      getters: {
        freelist: courselistGetters.freelist,
        expenselist: courselistGetters.expenselist
      },
      actions: {
        loadList: courselistActions.loadCourseList
      }
    },

    /**
     * 路由函数
     */
    route: {
      data ({to: {params: {type}}}) {
        const ret = type === 'P' ? {isFreeFirst: false} : {isFreeFirst: true}
        return Promise.resolve(ret)
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
        isFreeFirst: false
      }
    },
    created () {
      this.loadList()
    },

    computed: {
      courseList () {
        return this.isFreeFirst ? this.freelist : this.expenselist
      }
    },
    methods: {
      gotoCourseDetail (index) {
        let courseList = this.courseList
        let path = `/subject/detail/${courseList[index].type}/${courseList[index].subjectId}/0`
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
        font-size: 0.6rem;
        text-align: center;
        height: 4.8rem;
        line-height: 1.5rem;
      }
    }
  }
</style>
