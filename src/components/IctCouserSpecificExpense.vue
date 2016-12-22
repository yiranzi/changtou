<template>
  <!--课程简介组件-->
  <div>
    <div class="detail-specific" v-if="subject">
      <div class="title-box">
      <p class="title">{{subject.title}}</p>
      <p class="price">{{priceTip}}</p>
      <p class="tip">
        <span class="number-tip">{{subject.studentCount}}人学过</span>
        <span class="timer-icon"></span>
        <span class="">{{timeTip}}</span>
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
              <img v-bind:src="subject.portrait" class="portrait">
            </div>
            <div class="right">
              <p style="font-size: 0.75rem color:#000">{{subject.teacher}}</p>
              <p style="font-size: 0.7rem color:#000">{{subject.background}}</p>
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

      <div class="acquisition-box" v-if="subject.acquisitions && subject.acquisitions.length > 0">
        <div class="title-babel">
          <span>学习收获</span>
        </div>
        <div v-for="qu in subject.acquisitions" class="acquisition-item">
          <div class="a-left">
            <img v-bind:src="qu.pic" alt="" class="a-img">
          </div>
          <div class="a-right">
            <p>{{qu.content.split('--')[0]}}</p>
            <p>{{qu.content.split('--')[1]}}</p>
          </div>
        </div>
      </div>

      <div v-if="subject.studentFeedbackUrl">
        <div class="title-babel" style="margin-top: 1.25rem">
          <span>学员评价</span>
        </div>
        <div style="margin-top: 0.75rem; text-align: center">
          <img v-bind:src="subject.studentFeedbackUrl" style="height: 15rem; width: 13rem;">
        </div>
      </div>

        <div class="notice-box" v-if="subject.notice && subject.notice.length > 0">
          <div class="title-babel">
            <span>注意事项</span>
          </div>
        <div v-for="item in subject.notice" class="notice-item">
          <p>{{$index+1}}. {{{item}}}</p>
        </div>
      </div>

        <div class="custom-divider" v-if="subject.similarSubjects && subject.similarSubjects.length > 0">
          <div class="left"><hr class="line"/></div>
          <div>发现好课</div>
          <div class="right"><hr class="line"/></div>
        </div>

        <div class="lessons-box" v-if="subject.similarSubjects && subject.similarSubjects.length > 0">
          <div v-for="item in subject.similarSubjects" class="lesson-item" v-touch:tap="goTolesson(item)">
            <div><img v-bind:src="item.pic" alt="" class="l-img"></div>
            <div class="l-title">{{item.title}}</div>
            <div class="l-price">￥{{item.price}}</div>
          </div>
        </div>
    </div>
  </div>
    <div style="height:1rem; background-color: #fff"></div>
  </div>
</template>

<script>
  export default{
    props: {
      subject: {
        type: Object,
        default: null
      },
      record: {
        type: Object,
        default: null
      }
    },

    data () {
      return {
        priceTip: '',
        timeTip: '',
        status: 'L'
       }
    },

    watch: {
      'record': function (newRecord, oldRecord) {
        let timeTip = ''
        let priceTip = ''

        if (newRecord) {
          switch (newRecord.graduated) {
            case 'I':
              priceTip = `已购买`
              timeTip = `激活后${this.subject.period}天有效`
              break
            case 'N':
              let remainDays = parseInt(new Date(newRecord.startDate.replace(/\-/g, '/')) / (24 * 3600 * 1000)) + parseInt(newRecord.period) - parseInt(new Date() / (24 * 3600 * 1000))
              priceTip = `正在学该课程`
              timeTip = `课程有效期还有${remainDays}天`
              break
            case 'E':
              priceTip = `课程已过期`
              timeTip = `您可以使用延期功能`
              break
            case 'Y':
              priceTip = `课程已毕业`
              timeTip = `您可以使用延期功能`
              break
            case 'P':
              let resumeDays = parseInt((new Date(newRecord.resumeDate.replace(/\-/g, '/')) - new Date()) / (24 * 3600 * 1000))
              priceTip = `课程暂停`
              timeTip = `${resumeDays}天后将自动解锁开启`
              break
          }
        } else {
          timeTip = `课程有效期${this.subject.period}天`
          priceTip = `￥${this.subject.price}`
        }
//
        this.timeTip = timeTip
        this.priceTip = priceTip
      },

      'subject': function (newSubject) {
        if (!this.record) {
          this.priceTip = `￥${newSubject.price}`
          this.timeTip = `课程有效期${newSubject.period}天`
        }
      }
    },

    methods: {
      goTolesson (subject) {
        this.$dispatch('goToSubject', {
          subjectId: subject.subjectId,
          type: subject.type
        })
//        subject.subjectId
      }
    },

    components: {
    }
  }
</script>

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
      .left, .right{
        flex: 1;
        margin: auto;
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
    .timer-icon:before {
      font-family: 'myicon';
      content: '\e906';
      color: #00b0f0;
      font-size: 26/40rem !important;
    }
    }
    }

    .specific-items-box{
      padding-left: 50/40rem;
      box-sizing: border-box;

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
      margin-top: 1.5rem;
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
      margin-top: 0.25rem;
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

    .acquisition-box {
      .acquisition-item {
        margin-top: 40/40rem;
        padding: 0 1rem;
        .a-left {
          display: inline-block;
          width: 2rem;
          vertical-align: middle;
          padding-right: 0.5rem;
          .a-img {
            height: 2rem;
            width: 2rem;
          }
        }
        .a-right {
          display: inline-block;
          width: 80%;
          vertical-align: middle;
          /*flex: 1;*/
          font-size: 28/40rem;
          p{
            margin: 0;
          }
          p:nth-of-type(1){
            font-size: 0.7rem;
            line-height: 1rem;
            color: #00b0f0;
          }
          p:nth-of-type(2){
            font-size: 0.65rem;
            line-height: 1rem;
            color: #656565;
          }
        }
      }
    }

      .notice-box {
        margin-top: 50/40rem;
        font-size: 28/40rem;
        color: #656565;
        .title-babel{
          margin-bottom: 0.75rem;
        }
        p{
          margin: 0;
        }
        .notice-item {
          padding-left: 20/40rem;
          padding-right: 70/40rem;
          span {
            color: #00b0f0;
          }
        }
      }
    }

    .lessons-box {
      position: relative;
      left: -0.6rem;
      margin-top: 30/40rem;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      .lesson-item {
        margin-top: 20/40rem;
        flex: 0 0 48%;
        text-align:center;

        .l-img {
          width: 95%;
        }
        .l-title {
          text-align: left;
          margin-top: 10/40rem;
          font-size: 28/40rem;
          color: #000;
        }
        .l-price {
          text-align: left;
          margin-top: 10/40rem;
          font-size: 28/40rem;
          color: #ff5b45;
        }
      }
      .lesson-item:nth-of-type(2n+1) {
        margin: 20/40rem 2% 0 0;
      }
    }
  }


</style>
