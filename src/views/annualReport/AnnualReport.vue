<template>
  <div id="alloyTouchDemo">
      <span class="section-title"> </span>
      <ict-close-btn @close="onCloseTap"> </ict-close-btn>
      <div class="section" >
        <div id="fullpage" :class='{unshow: isUserLogin}' class="site_header">
          <div>
            <div class="section-item-0 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page1.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-1 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page2.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-2 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page3.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-3 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page4.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-5 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <div class="user-atavar">
                <img src="../../../static/image/alloyTouch/default-avatar.png" />
                <p class="user-name">长投学员</p>
              </div>
              <span class="fast-subject">理财入门课</span>
              <span class="buy-subject-num">4</span>
              <span class="accumulate-time">4125</span>
              <img src="../../../static/image/alloyTouch/personInfo2.png" style="width:11.3rem;height:13.4rem;" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-6 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <div class="user-atavar">
                <img src="../../../static/image/alloyTouch/default-avatar.png" />
                <p class="user-name">长投学员</p>
              </div>
              <span class="favo-subject">理财入门课</span>
              <span class="favo-subject-three">7</span>
              <span class="favo-subject-two">11</span>
              <img src="../../../static/image/alloyTouch/personInfo3.png" style="width: 9.45rem;height: 15.8rem;"/>
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-7 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page8.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-8 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page9.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div class="section-item-9">
            <div class="item-title"></div>
            <div class="item-mid"></div>
            <div class="item-down" v-if="!isInApp" v-touch:tap="onDownAppTap"></div>

            <page-share-panel @onPanelTap="onActionTap"></page-share-panel>

          </div>
        </div>
        <div id="fullpage-user" :class='{unshow: !isUserLogin}' class="site_header">
          <div>
            <div class="section-item-0 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page1.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-1 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page2.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-2 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page3.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-3 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page4.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-4 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft" >
              <div class="user-atavar">
                <span><img :src="atavar" /></span>
                <p class="user-name">{{userName}}</p>
              </div>
              <span class="section-init-date">{{isUserLogin ? report.registrationDate.split('-')[0] : ''}}
                <span class="inner-cell" >年</span> {{isUserLogin ? report.registrationDate.split('-')[1] : ''}}
                <span class="inner-cell" >月</span> {{isUserLogin ? report.registrationDate ? report.registrationDate.split('-')[2].split('T')[0] : '' : ''}}
                <span class="inner-cell" >日</span>
              </span>
              <img src="../../../static/image/alloyTouch/personInfo1.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-5 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <div class="user-atavar">
                <img :src="atavar" />
                <p class="user-name">{{userName}}</p>
              </div>
              <span class="fast-subject">{{report.fastestSubject ? report.fastestSubject : '理财入门课'}}</span>
              <span class="buy-subject-num">{{report.subjectNum}}</span>
              <span class="accumulate-time">{{parseInt(report.learningTime/60)}}</span>
              <img src="../../../static/image/alloyTouch/personInfo2.png" style="width:11.3rem;height:13.4rem;" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-6 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <div class="user-atavar">
                <img :src="atavar" />
                <p class="user-name">{{userName}}</p>
              </div>
              <span class="favo-subject">{{report.lastSubject ? report.lastSubject : '你还没有提交哟'}}</span>
              <span class="favo-subject-three">{{report.fiveNum}}</span>
              <span class="favo-subject-two">{{report.fourNum}}</span>
              <img src="../../../static/image/alloyTouch/personInfo3.png" style="width: 9.45rem;height: 15.8rem;"/>
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-7 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page8.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-8 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page9.png" width="100%" height="100%" />
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div class="section-item-9">
            <div class="item-title"></div>
            <div class="item-mid"></div>
            <div class="item-down" v-if="!isInApp" v-touch:tap="onDownAppTap"></div>

            <page-share-panel @onPanelTap="onActionTap"></page-share-panel>

          </div>
        </div>
      </div>
  </div>
</template>
<style lang="less" scaped>
  #alloyTouchDemo{
    p{
      margin: 0;
    }
    .user-atavar{
      text-align: center;
      font-size: .6rem;
      color: white;
      img{
        width: 3rem;
        height: 3rem;
        position: relative;
        border-radius: 50%;
      }
    }
    .section-title {
      background: url("../../../static/image/alloyTouch/bgTitle.png") 0 0 no-repeat;
      background-size: 100%;
      position: fixed;
      top: 1.5rem;
      left: 5%;
      display: block;
      width: 8.775rem;
      height: 1.05rem;
      z-index: 10000;
    }
    .section {
      width: 100%;
      font-size: 24px;
      overflow: hidden;
      position: relative;
      background-image: url("../../../static/image/alloyTouch/backgdData.jpg");
      background-position: 0% 0%;
      background-repeat: no-repeat;
      background-size: 100%;
      #fullpage, #fullpage-user {
        visibility: hidden;
        .section-item-0 {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 90%;
          width: 8.825rem;
          height: 7.275rem;
          position: relative;
          top: 30%;
          left: 30%;
          .drag-up{
            position: absolute;
            left: 3.2rem;
            top: 20rem;
            width: 1rem;
          }
        }
        .section-item-1 {
          width: 15.025rem;
          height: 20.3rem;
          position: relative;
          top: 19%;
          left: 5%;
          .drag-up{
            position: absolute;
            left: 8rem;
            top: 23.5rem;
            width: 1rem;
          }
        }
        .section-item-2 {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 90%;
          width: 14.25rem;
          height: 19.7rem;
          position: relative;
          top: 20%;
          left: 10%;
          .drag-up{
            position: absolute;
            left: 7rem;
            top: 23.2rem;
            width: 1rem;
          }
        }
        .section-item-3 {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 90%;
          width: 14.825rem;
          height: 22.525rem;
          position: relative;
          top: 15%;
          left: 15%;
          .drag-up{
            position: absolute;
            left: 6.2rem;
            top: 24.7rem;
            width: 1rem;
          }
        }
        .section-item-4 {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 90%;
          width: 12.15rem;
          height: 8.725rem;
          position: relative;
          top: 25%;
          left: 17%;
          .inner-cell{
            font-size: 1rem;
            color: #fff;
          }
          .section-init-date{
            font-size: 1.45rem;
            color: #ffa530;
            position: relative;
            left: 2.66rem;
            top: 1.5rem;
          }
          .drag-up{
            position: absolute;
            left: 5.7rem;
            top: 21.6rem;
            width: 1rem;
          }
        }
        .section-item-5 {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 90%;
          position: relative;
          width: 100%;
          top: 20%;
          font-size: 1.45rem;
          color: #ffa530;
          font-weight: bold;
          text-align: center;

          .drag-up{
            position: absolute;
            left: 8.6rem;
            top: 23.2rem;
            width: 1rem;
          }
          .user-atavar{
            text-align: center;
            font-size: .6rem;
            color: white;
            margin-bottom: 1rem;
          }
          .fast-subject{
            width: 100%;
            text-align: center;
            position: absolute;
            top: 6.5rem;
            left: 0;
            font-size: 1.2rem;
          }
          .buy-subject-num{
            position: absolute;
            top: 10rem;
            left: 8rem;
            font-size: 1.45rem;
          }
          .accumulate-time{
            position: absolute;
            top: 12.3rem;
            left: 8.5rem;
            font-size: 1.45rem;
          }
        }
        .section-item-6 {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 90%;
          position: relative;
          width: 100%;
          top: 20%;
          font-size: 1.45rem;
          color: #ffa530;
          font-weight: bold;
          text-align: center;
          .user-atavar{
            text-align: center;
            font-size: .6rem;
            color: white;
            margin-bottom: 1rem;
          }
          .drag-up{
            position: absolute;
            left: 8.6rem;
            top: 23.2rem;
            width: 1rem;
          }
          .favo-subject{
            position: absolute;
            top: 7rem;
            left: 0;
            width: 100%;
            display: inline-block;
            font-size: 1.2rem;
            text-align: center;
          }
          .favo-subject-three{
            position: absolute;
            top: 10.3rem;
            left: 10.2rem;
            font-size: 1.45rem;
          }
          .favo-subject-two{
            position: absolute;
            top: 12rem;
            left: 10.2rem;
            font-size: 1.45rem;
          }
        }
        .section-item-7 {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 90%;
          width: 16.65rem;
          height: 19.15rem;
          position: relative;
          top: 15%;
          left: 10%;
          .drag-up{
            position: absolute;
            left: 7.1rem;
            top: 24.7rem;
            width: 1rem;
          }
        }
        .section-item-8 {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 90%;
          width: 16rem;
          height: 19.1rem;
          position: relative;
          top: 15%;
          left: 10%;
          .drag-up{
            position: absolute;
            left: 7rem;
            top: 24.7rem;
            width: 1rem;
          }
        }
        .section-item-9 {
          background: #fcf8f4;
          .item-title {
            background-image: url("../../../static/image/alloyTouch/backCover1.png");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 100%;
            width: 100%;
            height: 7.15rem;
            position: relative;
            left: 0;
            top: 3rem;
          }
          .item-mid {
            background-image: url("../../../static/image/alloyTouch/backCover2.png");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 90%;
            width: 13.125rem;
            height: 3.25rem;
            position: relative;
            left: 13%;
            margin-bottom: 6.5rem;
            margin-top: 5rem;
          }
          .item-down {
            background-image: url("../../../static/image/alloyTouch/backCover3.png");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 90%;
            width: 11.95rem;
            height: 2.2rem;
            position: relative;
            left: 16%;
          }
        }
      }
    }
  }
</style>
<script>
  import AlloyTouch from 'alloyTouch'
  import FullPage from '../../util/alloyTouch/alloy_touch.full_page.js'
  import alloy_touch from '../../util/alloyTouch/alloy_touch.js'
  import {userGetters, annualReportGetters} from '../../vuex/getters'
  import {annualReportActions} from '../../vuex/actions'
  import {Device, platformMap} from '../../plugin/device'
  import IctCloseBtn from '../../components/IctCloseBtn.vue'
  import {MSITE_URL} from '../../frame/serverConfig'
  import mixinPageShare from '../../mixinPageShare'
  import PageSharePanel from '../../components/share/PageSharePanel.vue'
  export default {
    mixins: [mixinPageShare],
    vuex: {
      getters: {
        userName: userGetters.userName,
        atavar: userGetters.avatar,
        isUserLogin: userGetters.isLogin,
        annualReport: annualReportGetters.annualReport
      },
      actions: {
       getAnnualReport: annualReportActions.getAnnualReport
      }
    },
    data () {
      return {
        report: {
          elapsedTime: 0,
          fastestSubject: '',
          fiveNum: 0,
          fourNum: 0,
          lastSubject: '',
          learningTime: 0,
          leastDays: '',
          longestSubject: '',
          registrationDate: '',
          strategyLevel: '',
          subjectNum: 0
        }
      }
    },
    computed: {
      isInApp () {
        return (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS)
      },
      canWeiboShow () {
        return Device.platform !== platformMap.IOS
      }
    },
    route: {
      data () {
        const me = this
        if (this.isUserLogin) {
          this.getAnnualReport().then(
            function (report) {
              me.report = report
            }
          )
        }
        setTimeout(
          function () {
            me.init()
            me.setViewWxShareConfig()
          },
          200
        )
      },
      deactivate () {
        this.shareConfig = null
        this.onViewChange()
      }
    },
    methods: {
      setViewWxShareConfig () {
        this.shareConfig = {
          title: '2016年度理财报告|长投学堂',
          desc: '看，这是曾带给你欢乐与痛苦的2016',
          link: MSITE_URL + 'index.html#!/annual/report',
          imgUrl: MSITE_URL + 'static/image/alloyTouch/shareImage.png'
        }
        this.onViewChange()
      },
      init () {
          var pb
          var fp =  new AlloyTouch.FullPage(this.isUserLogin ? '#fullpage-user' : '#fullpage',{
            animationEnd: function () {
            },
            leavePage: function (index) {
            },
            beginToPage: function (index) {
            }
          })
      },
      onCloseTap () {
       this.$route.router.go('/main')
      },
      /**
      * 点击下载app
      */
      onDownAppTap () {
         window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.changtou.ichangtou'
      },
   },
    components: {
      IctCloseBtn,
      PageSharePanel
    }
  }
</script>

