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
  .detail-specific {
    .divider-line {
      height: 0.5rem;
      background-color: #f0eff5;
    }

    .custom-divider {
      margin-top: 60/40rem;
      margin-right: 50/40rem;
      display: flex;
      font-size: 30/40rem;
      color: #00b0f0;
      .line {
        height: 1px;
        background-color: #00b0f0;
        border: none;
      }
      .left {
        flex: 1;
      }
      .right{
        flex: 1;
      }
    }

  .title-box {
    padding-left: 1.25rem;
    .title {
      margin-top: 1.25rem;
      font-size: 34/40rem;
      color: #000;
    }
    .price {
      margin-top: 30/40rem;
      font-size: 30/40rem;
      color: #ff5b45;
    }
    .tip {
      margin-top: 30/40rem;
      margin-bottom: 1rem;
      font-size: 26/40rem;
      color: #00b0f0;
      .number-tip {
        margin-right: 1rem;
      }
    }
  }

  .specific-items-box{
    padding-left: 50/40rem;

    .content-position {
      margin-left: 20/40rem;
      margin-right: 70/40rem;
    }

    /*课程简介*/
    .title-babel {
      position: relative;
      height: 60/40rem;
      width: 135/40rem;
      display: flex;
      align-items: center;
      padding-left: 0.5rem;
      font-size: 30/40rem;
      color: #fff;
      background-color: #00b0f0;
    }

    .title-babel:after {
      position: absolute;
      right: -58/40rem;
      content: '';
      height: 0;
      width: 0;
      border: 30/40rem solid transparent;
      border-left: 30/40rem solid #00b0f0;
    }

    .title-sub-specific {
      /*margin-left: ;*/
      margin-top: 30/40rem;
      .detail-content {
        font-size: 28/40rem;
      }
    }

    .teacher-introduce-box {
      margin-top: 50/40rem;
      .teacher-detail {
        margin-top: 30/40rem;
        margin-right: 50/40rem;
        display: flex;
        color: #656565;
        .left {
          font-size: 30/40rem;
          width: 130/40rem;
          .portrait {
            width: 110/40rem;
            height: 110/40rem;
          }
        }
        .right {
          font-size: 36/40rem;
          flex: 1;
        }
      }
    }

    .featrue-box {
      margin-top: 50/40rem;
      .feature-detail {
        margin-top: 30/50rem;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        .feature-item {
          flex: 0 0 50%;
          text-align:center;
          margin-bottom: 50/40rem;
          .f-img {
            width: 110/40rem;
            height: 110/40rem;
          }
          .f-title {
            margin-top: 30/40rem;
            font-size: 28/40rem;
            color: #656565;
          }
          .f-content {
            margin-top: 10/40rem;
            padding-left: 1rem;
            padding-right: 1rem;
            font-size: 24/40rem;
            color: #aaa;
          }
        }
      }
    }
  }
  }


</style>

<script>
  export default{
    props: [
      'subject'
    ]
  }
</script>
