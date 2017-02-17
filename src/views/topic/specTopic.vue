<template>
    <div class="spec-topic">
      <ict-back-btn></ict-back-btn>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight" style="background-color: #fff">
        <div class="content">
          <div class="spec-description">
            <img v-bind:src="specTopicInfo.topicPic"/>
            <div  class="description">{{{specTopicInfo.description}}}</div>
          </div>

          <div v-for="course in specTopicInfo.coursePackage">
            <div class="recommend">
              <div class="recommend-subject" v-touch:tap="onSubjectTap(course, $index)">
                <img v-bind:src="course.pic">
                <div class="item-info">
                  <span class="item-count">{{course.purchaseCount}}人学过</span>
                  <span class="item-price">￥{{course.origPrice}}</span>
                </div>
              </div>
              <div class="item-promotion">
                <span>小投推荐：</span>
                "{{course.promotion}}"
              </div>
            </div>
          </div>

          <div class="topic-conclusion">
            <span class="learning">学习收获</span>
            <p>{{specTopicInfo.conclusionTitle}}</p>
            <div class="conclusion-content" v-for="conclusion in specTopicInfo.conclusionContent">
              <img v-bind:src="conclusion.pic" />
              <span class="conclusion-title">{{conclusion.title}}</span>
            </div>
          </div>

        </div>
      </scroller>
      <div class="bottom-area" v-show="isTopicLoaded">
        <ict-button class="buttom-btn" :disabled="!canBuySubject" v-bind:class="{'disable': !canBuySubject}" v-touch:tap="toBuy" v-el:bottom-btn>
          立即支付
          <span class="disPrice">￥{{priceObj.disPriceSum}}</span>
          <span class="origPrice">￥{{priceObj.origPriceSum}}</span>
        </ict-button>
        <div class="buttom-tip" v-show="!canBuySubject">已购买过专题中任意一课，不再享受打包购买优惠价</div>
      </div>

    </div>
</template>
<style lang="less">
  .spec-topic{
    width: 100%;
    height: 100%;
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

      .recommend-subject{
        width: 17.25rem;
        height: 7.5rem;
        position: relative;
        img{
          width: 17.25rem;
          height: 7.5rem;
          margin: 0 0.75rem;
        }
      }

      .item-info{
        position: absolute;
        bottom: 0;
        width: 16.25rem;
        height: 0.85rem;
        margin: 0 0.75rem;
        font-size: 0.65rem;
        color: #fff;
        background-color: #000;
        opacity: 0.3;
        text-align: left;
        padding: 0.5rem ;
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
      .learning{
        position: relative;
        display: block;
        width: 4.25rem;
        height: 1.5rem;
        line-height: 1.5rem;
        background-color: #00b0f0;
        color: #fff;
        text-align: center;
        margin-bottom: 0.75rem;
        &:after{
          position: absolute;
          right: -1.45rem;
          content: '';
          height: 0;
          width: 0;
          border: 0.75rem solid transparent;
          border-left: 0.75rem solid #00b0f0;
        }
      }
      p{
        padding: 0;
        margin-bottom: 0.1rem;
        color: #aaa;
        border-bottom: 1px solid #ccc;
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
      position: absolute;
      bottom: 0;
      width: 100%;
      .buttom-btn{
        height: 2.2rem;
        font-family: '微软雅黑';
        font-size: 0.85rem;
        border-radius: 0;

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
        position: absolute;
        top: -1.25rem;
        width: 100%;
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
  import IctBackBtn from '../../components/IctCourseBackBtn.vue'
  import Scroller from 'vux/scroller'
  import IctButton from '../../components/IctButton.vue'
  import {specTopicActions, courseRecordActions} from '../../vuex/actions'
  import {specTopicGetters, userGetters, courseRecordsGetters} from '../../vuex/getters'
  import {setLocalCache} from '../../util/cache'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  export default {
    vuex: {
      actions: {
        loadSpecTopic: specTopicActions.loadSpecTopic, // 打包课专题信息
        loadUserCourses: courseRecordActions.loadAllExpenseRecords // 下载 用户 我的课程 信息
      },
      getters: {
        myCourse: courseRecordsGetters.expenseRecords,
        specTopicInfo: specTopicGetters.specTopic, //打包课程信息
        isUserLogin: userGetters.isLogin  //登录情况
      }
    },

    route: {
      canActivate: function (transition) {
        if (/\/pay\/success\/ST\//.test(transition.from.path)) {
          transition.redirect('/mycourse')
        }
        transition.next()
      },
      data ({to: {params: {stpId}}}) {
        setLocalCache('statistics-entry-page', {entryPage: '专题'})
        this.stpId = stpId

        let taskArr = []
        taskArr.push(this.loadSpecTopic(stpId))

        if (this.isUserLogin) {
          taskArr.push(this.loadUserCourses())
        }

        Promise.all(taskArr).then()
      }
    },

    data () {
      return {
        stpId: '',
        scrollerHeight: '0px',
        isTopicLoaded: false //数据是否加载完毕
      }
    },

    computed: {
      canBuySubject () {
        if (this.specTopicInfo && this.specTopicInfo.coursePackage && this.myCourse && this.myCourse.length > 0) {
          for (let i = 0; i < this.specTopicInfo.coursePackage.length; i++) {
            for (let j = 0; j < this.myCourse.length; j++) {
              if (parseInt(this.specTopicInfo.coursePackage[i].subjectId) === parseInt(this.myCourse[j].subjectId)) {
                return false
              }
            }
          }
          return true
        } else {
          return true
        }
      },
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
        this.isTopicLoaded = true
        this.resetScrollerHeight()
      }
    },
    methods: {
      resetScrollerHeight () {
        const me = this
        setTimeout(function () {
          me.scrollerHeight = (window.document.body.offsetHeight - me.$els.bottomBtn.offsetHeight) + 'px'
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 500)
      },
      back () {
        window.history.back()
      },
      toBuy () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.TOPIC_CONFIRM_TAP, {
          '商品名称': this.specTopicInfo.name,
          '价格': this.priceObj.origPriceSum
        })
        //跳转到订单页面
        const path = '/pay-ST-' + this.$route.params.stpId
        this.$route.router.on(path, {
          component: require('../pay/SpecTopicOrder.vue')
        })
        this.$route.router.go(path)
      },
      /**
       * 点击课程
       */
      onSubjectTap (subject, index) {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.TOPIC_SUBJECT_TAP, {
          'type': subject.type,
          'subjectid': subject.subjectId,
          'index': index
        })
        this.$route.router.go(`/subject/detail/${subject.type}/${subject.subjectId}/0`)
      }
    },
    components: {
      IctButton,
      Scroller,
      IctBackBtn
    }
  }
</script>
