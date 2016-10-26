<template>
    <div class="spec-topic">
      <div class="top-back-btn" v-touch:tap="back"></div>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight" style="background-color: #fff">
        <div class="content">
          <div class="spec-description">
            <img v-bind:src="specTopicInfo.topicPic"/>
            <div  class="description">{{{specTopicInfo.description}}}</div>
          </div>
          <div v-for="course in specTopicInfo.coursePackage">
            <div class="recommend">
              <img v-bind:src="course.pic">
              <div class="item-info">
                <span class="item-count">{{course.purchaseCount}}人学过</span>
                <span class="item-price">￥{{course.origPrice}}</span>
              </div>
              <div class="item-promotion">
                <span>小投推荐：</span>
                "{{course.promotion}}"
              </div>
            </div>
          </div>
          <div class="topic-conclusion">
            <div class="conclusion-top">
              <span class="learning">学习收获</span>
              <span class="triangle"></span>
            </div>
            <p>{{specTopicInfo.conclusionTitle}}</p>
            <div class="conclusion-content" v-for="conclusion in specTopicInfo.conclusionContent">
              <img v-bind:src="conclusion.pic" />
              <span class="conclusion-title">{{conclusion.title}}</span>
            </div>
          </div>

        </div>
      </scroller>
      <div class="bottom-area" v-el:bottom-btn >
        <ict-button class="buttom-btn" :disabled="isBuySubject" v-bind:class="{'disable': isBuySubject}" v-touch:tap="toBuy">
          立即支付
          <span class="disPrice">￥{{ priceObj.disPriceSum}}</span>
          <span class="origPrice">￥{{priceObj.origPriceSum}}</span>
        </ict-button>
        <div class="buttom-tip" v-show="isBuySubject">已购买过专题中任意一课，不再享受打包购买优惠价</div>
      </div>

    </div>
</template>
<style lang="less">
  .spec-topic{
    position: relative;

    .top-back-btn {
      position: absolute;
      height: 2rem;
      width: 2rem;
      top: 0.3rem;
      left: 1rem;
      z-index: 20;
    }
    .top-back-btn:before {
      position: absolute;
      display: inline-block;
      font-family: 'myicon';
      content: '\e91b';
      font-size: 1.6rem !important;
      line-height: 2rem;
      width: 2rem;
      color: #999;
    }
    .spec-description{
      width: 100%;
      background: #fff;
      img{
        width: 100%;
      }
      .description{
        padding: 0.2rem 0.8rem 1.5rem;
        font-size: 0.7rem;
        color: #656565;
        border-bottom: 0.5rem #f0eff5 solid;
      }
    }
    .recommend{
      width: 100%;
      background: #fff;
      padding: 0.5rem 0;
      text-align: center;
      font-size: 0;
      border-bottom: 0.5rem #f0eff5 solid;
      img{
        width: 17.25rem;
      }
      .item-info{
        width: 16.25rem;
        height: 0.85rem;
        font-size: 0.65rem;
        color: #fff;
        background-color: #000;
        opacity: 0.3;
        text-align: left;
        margin: 0 0.75rem;
        padding: 0.5rem ;
        position: relative;
        .item-price{
          position: absolute;
          right: 0.5rem;
        }
      }
      .item-promotion{
        width: 16.25rem;
        margin: 0 0.75rem;
        padding: 0.85rem 0.5rem;
        font-size: 0.7rem;
        text-align: left;
        span{
          font-size: 0.8rem;
          color: #898989;
        }
      }
    }
    .topic-conclusion{
      width: 15rem;
      height: 11rem;
      background: #fff;
      font-size: 0.75rem;
      padding: 0.75rem 1.75rem;
      .conclusion-top{
        width: 4.25rem;
        height: 1.5rem;
        position: relative;
        left: -0.25rem;
        margin-bottom: 0.75rem;
        .learning{
          width: 5rem;
          line-height: 1.5rem;
          background-color: #00b0f0;
          color: #fff;
          text-align: center;
          padding: 0.3rem 0.7rem 0.3rem 0.5rem;
        }
        .triangle{
          position: absolute;
          left: 4.2rem;
          top: -0.05rem;
          height: 0;
          width: 0.5rem;
          border: 0.8rem solid transparent;
          border-left-color: #00b0f0;
        }
      }
      p{
        padding: 0;
        margin-bottom: 0.1rem;
        color: #898989;
        border-bottom: 1px solid #898989;
      }
      .conclusion-content{
        width: 15rem;
        height: 2.5rem;
      }
      img{
        width: 1.75rem;
        height: 1.75rem;
        margin: 0.375rem 0 0.375rem 1.25rem;
      }
      .conclusion-title{
        font-size: 0.7rem;
        line-height: 1.75rem;
        position: relative;
        top: -1rem;
        left: 0.25rem;
      }
    }
    .bottom-area{
      .buttom-btn{
        height: 2.2rem;
        font-family: '微软雅黑';
        font-size: 0.85rem;

        .disPrice{
          padding: 0 0.25rem;
          font-size: 1rem;
        }
        .origPrice{
          font-size: 0.7rem;
          text-decoration: line-through;
        }
      }
      .buttom-tip{
        position: relative;
        top: -3.45rem;
        font-size: 0.45rem;
        color: #fff;
        background-color: #ff9800;
        line-height:  1.25rem;
        text-align: center;
      }
    }
  }
</style>
<script>
  import Scroller from 'vux/scroller'
  import IctButton from '../../components/IctButton.vue'
  import {specTopicActions, myCoursesActions} from '../../vuex/actions'
  import {specTopicGetters, myCoursesGetters, userGetters} from '../../vuex/getters'
  export default {
    vuex: {
      actions: {
        loadSpecTopic: specTopicActions.loadSpecTopic, // 打包课专题信息
        loadUserCourses: myCoursesActions.loadUserCourses // 下载 用户 我的课程 信息
      },
      getters: {
        specTopicInfo: specTopicGetters.specTopic, //打包课程信息
        myCourses: myCoursesGetters.myCourses, //我的课程列表
        isUserLogin: userGetters.isLogin  //登录情况
      }
    },

    route: {
      data ({to: {params: {stpId}}}) {
        this.stpId = stpId

        let taskArr = []
        taskArr.push(this.loadSpecTopic(stpId))

        if (this.isUserLogin) {
          taskArr.push(this.loadUserCourses())
        }
        const me = this
        return Promise.all(taskArr).then(
          function () {
            return {isBuySubject: me.isBuy(), isLoadedFail: false}
          }
        ).catch(
          function () {
            return {isLoadedFail: true}
          }
        )
      }
    },

    data () {
      return {
        stpId: '',
        scrollerHeight: '590px',
        isBuySubject: false,
        isLoadedFail: false //数据是否加载完毕
      }
    },

    computed: {
      priceObj () {
        let courseArr = this.specTopicInfo.coursePackage
        let ret = courseArr ? courseArr.reduce(function (preValue, currCourse) {
          return {
            origPriceSum: preValue.origPriceSum + currCourse.origPrice,
            disPriceSum: preValue.disPriceSum + currCourse.disPrice
          }
        }, {origPriceSum: 0, disPriceSum: 0}) : {origPriceSum: 0, disPriceSum: 0}
        return ret
      }
    },
    watch: {
      'specTopicInfo': function () {
        var me = this
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
//              top: 0
          })
        })
        }, 9000)
      }
    },
    ready () {
      this.scrollerHeight = (window.document.body.offsetHeight - this.$els.bottomBtn.offsetHeight) + 'px'
    },
    methods: {
      back () {
        window.history.back()
      },
      isBuy () {
        let myCourses = this.myCourses
        let coursePackage = this.specTopicInfo.coursePackage
        let ret = false

        for (let i = 0; i < coursePackage.length; i++) {
          for (let j = 0; j < myCourses.length; j++) {
            if (coursePackage[i].subjectId === myCourses[j].subjectId) {
              ret = true
              break
            }
          }
          if (ret) {
            break
          }
        }
        return ret
      },
      toBuy () {
        //跳转到订单页面
        const path = '/pay-ST-' + this.$route.params.stpId
        this.$route.router.on(path, {
          component: require('../pay/Order.vue')
        })
        this.$route.router.go(path)
      }
    },
    components: {
      IctButton,
      Scroller
    }
  }
</script>
