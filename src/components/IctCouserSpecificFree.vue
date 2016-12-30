<template>
  <!--课程简介组件-->
  <div>
    <div class="detail-specific" v-if="subject">
      <div class="title-box">
        <p class="title">{{subject.title}}</p>
        <p class="price">免费</p>
        <p class="tip">
          <span class="number-tip">{{subject.studentCount}}人学过</span>
        </p>
      </div>

      <div class="divider-line"></div>

      <div class="specific-items-box">
        <div class="title-sub-specific">
          <div class="title-babel">
            <span>课程简介</span>
          </div>
          <p class="content-position detail-content">{{{subject.description}}}</p>
        </div>

        <div class="teacher-introduce-box">
          <div class="title-babel">
            <span>讲师介绍</span>
          </div>
          <div class="teacher-detail">
            <div class="left">
              <img v-bind:src="subject.portrait" alt="" class="portrait"></im>
            </div>
            <div class="right">
              <p style="font-size: 0.75rem">{{subject.teacher}}</p>
              <p style="font-size: 0.6rem">{{subject.background}}</p>
            </div>
          </div>
        </div>

        <div class="featrue-box">
          <div class="title-babel">
            <span>课程亮点</span>
          </div>
          <div class="feature-detail">
            <div v-for="feature in subject.features" class="feature-item">
              <div style="text-align: center"><img v-bind:src="feature.pic" alt="" class="f-img"></div>
              <div class="f-title">{{feature.title}}</div>
              <div class="f-content">{{feature.content}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:1rem; background-color: #fff"></div>
  </div>
</template>

<style lang="less">
</style>

<script>
  export default{
    props: [
      'subject'
    ]
  }
</script>
