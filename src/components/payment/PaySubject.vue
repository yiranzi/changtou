/**
 * Created by jun on 2016/9/29.
  订单 课程列表

  @example
  <!--<pay-subject :course-list="courseList"></pay-subject>-->
  courseList: [
    {
      pic: '图片',
      title: '主标题',
      description: '副标题',
      price: 100
    },
    {
pic: '图片',
      title: '主标题',
      description: '副标题',
      price: 0
    }
  ]

 */
<template>
  <div v-if="isShow()">
    <div class="pay-course-list" v-for="course in courseList">
      <img class="pay-course-list-img"
           v-bind:src=course.pic>
      <div class="pay-course-list-info">
        <p class="pay-course-list-title">{{course.title}}</p>
        <p class="pay-course-list-subtitle">{{course.subtitle}}</p>
        <p class="pay-course-list-price"><span v-if="course.price">￥{{course.price}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    courseList: {
      type: Array
    }
  },
  methods: {
    isShow () {
      return this.courseList && this.courseList.length > 0
    }
  }
}
</script>
<style lang="less">
.pay-course-list{
  p{
    margin: 0;
  }
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
  &-price{
    padding-top: 20/40rem;
    color: #898989;
    font-size: 0.6rem;
    color: #ff5b45;
    font-size: 0.7rem;
  }
}
</style>
