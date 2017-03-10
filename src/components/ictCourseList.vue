<template>
  <div class="course-type-list" {{classType}}>
    <p class="course-group-title">{{classType.categoryName}}</p>
    <div class="course-list" v-for="course in classType.subjectList">
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
    <div class="course-list" v-for="course in classType.subjectList">
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
</template>
<style lang="less">
  .course-type-list{
    p{
      margin: 0;
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
  }
</style>
<script>
    export default {
        data () {
          return {}
        },
        components: {},
        props: [
        'classType',
          'mytest'
        ],
        methods: {
        goToCourseDetail (type, subjectId) {
          const path = `/subject/detail/${type}/${subjectId}/0`
          this.$route.router.go(path)
        }
      }

    }
</script>
