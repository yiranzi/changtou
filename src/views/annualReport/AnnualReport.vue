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
              <div class="item-container-5">
                <div class="user-atavar">
                  <img src="../../../static/image/alloyTouch/default-avatar.png" />
                  <p class="user-name">长投学员</p>
                </div>
                <div class="favo-container">
                  <a class="favo-subject">理财入门课</a>
                  <a class="favo-subject-num">4</a>
                  <a class="favo-subject-minute">4125</a>
                </div>
                <img src="../../../static/image/alloyTouch/personInfo2.png" width="100%" height="100%" />
              </div>
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-6 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <div class="item-container-5">
                <div class="user-atavar">
                  <img src="../../../static/image/alloyTouch/default-avatar.png" />
                  <p class="user-name">长投学员</p>
                </div>
                <div class="favo-container">
                  <a class="favo-subject">理财入门课</a>
                  <a class="favo-subject-three">7</a>
                  <a class="favo-subject-two">11</a>
                </div>
                <img src="../../../static/image/alloyTouch/personInfo3.png" width="100%" height="100%" />
              </div>
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
            <div class="share-article" v-if="isInApp">
              <div><hr/><span>分享至</span><hr/></div>
              <div class="share-item" v-touch:tap="shareToTimelineInApp">
                <div class="timeline"></div>
                <div class="share-name">朋友圈</div>
              </div>
              <div class="share-item" v-touch:tap="shareToFriendInApp">
                <div class="wechat"></div>
                <div class="share-name">微信好友</div>
              </div>
              <div class="share-item" v-touch:tap="shareToQQInApp">
                <div class="qq"></div>
                <div class="share-name">QQ</div>
              </div>
              <div class="share-item" v-touch:tap="shareToWeiboInApp" v-if="canWeiboShow">
                <div class="weibo"></div>
                <div class="share-name">微博</div>
              </div>
            </div>
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
              <div class="item-container-5">
                <div class="user-atavar">
                  <img :src="atavar" />
                  <p class="user-name">{{userName}}</p>
                </div>
                <div class="favo-container">
                  <a class="favo-subject">{{report.fastestSubject ? report.fastestSubject : '理财入门课'}}</a>
                  <a class="favo-subject-num">{{report.subjectNum}}</a>
                  <a class="favo-subject-minute">{{parseInt(report.learningTime/60)}}</a>
                </div>
                <img src="../../../static/image/alloyTouch/personInfo2.png" width="100%" height="100%" />
              </div>
              <img src="../../../static/image/alloyTouch/drag-up.png" class="drag-up">
            </div>
          </div>
          <div>
            <div class="section-item-6 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <div class="item-container-5">
                <div class="user-atavar">
                  <img :src="atavar" />
                  <p class="user-name">{{userName}}</p>
                </div>
                <div class="favo-container">
                  <a class="favo-subject">{{report.lastSubject ? report.lastSubject : '你还没有提交哟'}}</a>
                  <a class="favo-subject-three">{{report.fiveNum}}</a>
                  <a class="favo-subject-two">{{report.fourNum}}</a>
                </div>
                <img src="../../../static/image/alloyTouch/personInfo3.png" width="100%" height="100%" />
              </div>
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
            <div class="share-article" v-if="isInApp">
              <div><hr/><span>分享至</span><hr/></div>
              <div class="share-item" v-touch:tap="shareToTimelineInApp">
                <div class="timeline"></div>
                <div class="share-name">朋友圈</div>
              </div>
              <div class="share-item" v-touch:tap="shareToFriendInApp">
                <div class="wechat"></div>
                <div class="share-name">微信好友</div>
              </div>
              <div class="share-item" v-touch:tap="shareToQQInApp">
                <div class="qq"></div>
                <div class="share-name">QQ</div>
              </div>
              <div class="share-item" v-touch:tap="shareToWeiboInApp" v-if="canWeiboShow">
                <div class="weibo"></div>
                <div class="share-name">微博</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<style lang="less">
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
      top:0 !important;
    }
    .item-container-5 {
      position: relative;
      top: -2rem;
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
          width: 11.3rem;
          height: 13.4rem;
          position: relative;
          top: 20%;
          left: 23%;
          .drag-up{
            position: absolute;
            left: 4.6rem;
            top: 23.2rem;
            width: 1rem;
          }
          .favo-container{
            color: #ffa530;
            font-size: 1.45rem;
            font-weight: bold;
            position: relative;
            .favo-subject{
              position: relative;
              /*top: 4.8rem;*/
              /*left: -1.3rem;*/
              top: 3.5rem;
              left: 2.5rem;
              font-size: 1.2rem;
            }
            .favo-subject-num{
              position: relative;
              /*top: 9rem;*/
              /*left: -9.4rem;*/
              top: 7rem;
              left: -2.2rem;
              font-size: 1.45rem;
            }
            .favo-subject-minute{
              position: relative;
              /*top: 9.2rem;*/
              /*left: 4.5rem;*/
              top: 9.3rem;
              left: -3rem;
              font-size: 1.45rem;
            }
          }
          .user-atavar{
            text-align: center;
            font-size: .6rem;
            color: white;
            position: relative;
            top:-4rem;
          }
        }
        .section-item-6 {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 90%;
          width: 9.45rem;
          height: 15.8rem;
          position: relative;
          top: 20%;
          left: 23%;
          .drag-up{
            position: absolute;
            left: 4.6rem;
            top: 23.2rem;
            width: 1rem;
          }
          .favo-container{
            color: #ffa530;
            font-size: 1.45rem;
            font-weight: bold;
            position: relative;
            .favo-subject{
              position: relative;
              top: 2.8rem;
              left: 1.9rem;
              font-size: 1.2rem;
            }
            .favo-subject-three{
              position: relative;
              top: 7.5rem;
              left: -0.8rem;
              font-size: 1.45rem;
            }
            .favo-subject-two{
              top: 9.5rem;
              position: relative;
              left: -2.5rem;
              font-size: 1.45rem;
            }
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
          /************        share     part  *********************/
          .right_unable {
            disabled: false;
            color: #fff;
          }
          .share-pic {
            width: 1.3rem;
            height: 1rem;
            margin-top: 0.65rem;
          }
          .content {
            width: 15.25rem;
            padding: 1.25rem 1.75rem 2rem 1.75rem;
            background-color: #fff;
            .title {
              margin-bottom: 2.5rem;
            }
            .introduce {
              border: 2px solid #00b0f0;
              padding: 1.25rem;
              font-size: 0.7rem;
              line-height: 1.2rem;
              color: #898989;
              position: relative;
              .xiao-tou {
                position: absolute;
                top: -0.6rem;
                width: 3rem;
                line-height: 1.2rem;
                background-color: #fff;
                font-size: 0.8rem;
                font-weight: bold;
                text-align: center;
                color: #00b0f0;
              }
            }
            .tip {
              font-size: 0.7rem;
              color: #00b0f0;
              text-align: center;
              margin: 1rem 0 2.5rem 0;
            }
            .paragraph-title {
              margin-bottom: 1.25rem;
              font-size: 0.8rem;
              color: #222;
              text-align: center;
              span {
                font-size: 1.2rem;
              }
            }
            .paragraph-content {
              padding: 0 1.25rem;
              margin-bottom: 1.25rem;
              font-size: 0.7rem;
              color: #898989;
              line-height: 1.2rem;
              hl {
                font-weight: bold;
                color: #ff9800;
              }
            }
            .pic {
              padding: 0 1.25rem;
              width: 12rem;
              text-align: center;
              margin-bottom: 2.5rem;
            }
          }
          .load-fail {
            width: 100%;
            height: 623px;
            background-color: #fff;
            text-align: center;
            padding-top: 40%;
          }
          .weui_actionsheet_cell {
            height: 7rem;
            background-color: #f0eff5;
          }
          .vux-actionsheet-gap {
            height: 0;
          }
          .vux-actionsheet-cancel {
            height: 1.2rem;
            background-color: #ccc;
          }
          .share-item {
            display: inline-block;
            width: 3.5rem;
            height: 4.3rem;
            margin: 0 0.35rem;
            text-align: center;
          }
          .wechat, .timeline, .qq, .weibo {
            display: inline-block;
            width: 2.5rem;
            height: 2.5rem;
          }
          .wechat {
            background: url("../../../static/image/interview/share-wechat.png") no-repeat center center / 100%;
          }
          .timeline {
            background: url("../../../static/image/interview/share-timeline.png") no-repeat center center / 100%;
          }
          .qq {
            background: url("../../../static/image/interview/share-qq.png") no-repeat center center / 100%;
          }
          .weibo {
            background: url("../../../static/image/interview/share-weibo.png") no-repeat center center / 100%;
          }
          .share-name {
            width: 100%;
            display: inline-block;
            text-align: center;
            margin-top: .5rem;
          }
          .share-box {
            width: 100%;
            padding: 1.2rem 0;
            font-size: 0.6rem;
            text-align: center;
          }
          .share-article {
            padding-top: 1.5rem;
            font-size: 26/40rem;
            color: #00b0f0;
            text-align: center;
            hr {
              margin: 0.32rem .5rem;
              width: 4.5rem;
              height: 1px;
              background: #aaa;
              border: 0;
              display: inline-block;
            }
            p {
              margin: 0;
            }
            .share-item {
              width: 2.8rem;
              margin-top: 1.5rem;
            }
          }
          /************        share     part  *********************/
        }
      }
      .unshow {
        display: none;
      }
    }
  }
</style>
<script>
  import AlloyTouch from 'alloyTouch'
  import FullPage from '../../util/alloyTouch/alloy_touch.full_page.js'
  import alloy_touch from '../../util/alloyTouch/alloy_touch.js'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  import {userGetters, annualReportGetters} from '../../vuex/getters'
  import {annualReportActions} from '../../vuex/actions'
  import {Device, platformMap} from '../../plugin/device'
  import IctCloseBtn from '../../components/IctCloseBtn.vue'
  export default {
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
          lastestSubject: '',
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
            (report) => {
              me.report = report
            }
          )
        }
        this.shareConfig = {
          title: '2016年度理财报告|长投学堂',
          desc: '看，这是曾带给你欢乐与痛苦的2016',
//                link: 'http://h5.ichangtou.com/mapp_new/index.html#!/annual/report',
//                imgUrl: 'http://h5.ichangtou.com/mapp_new/static/image/alloyTouch/shareImage.png'
          link: 'http://h5test.ichangtou.com.cn/juns/index.html#!/annual/report',
          imgUrl: 'http://h5test.ichangtou.com.cn/juns/static/image/alloyTouch/shareImage.png'
        }
        this.onViewChange()
        setTimeout(
          me.init,
          500
        )
      },
      deactivate () {
        this.shareConfig = null
        this.onViewChange()
      }
    },
    methods: {
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
      //分享朋友
      shareToFriendInApp () {
        const me = this
        if (window.Wechat) {
          window.Wechat.share({
              message: {
                title: me.shareConfig.title, // 分享标题
                description: me.shareConfig.desc,
                thumb: me.shareConfig.imgUrl, // 分享图标
                media: {
                  type: window.Wechat.Type.WEBPAGE,
                  webpageUrl: me.shareConfig.link
                }
              },
              scene: window.Wechat.Scene.SESSION
            },
            function () {
              me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
                '访谈Id': me.interviewRecord.interviewId,
                '分享渠道': '微信-会话'
              })
            },
            function (reason) {
              if (reason === '用户点击取消并返回') {

              } else {
                me.showAlert({title: '分享失败', message: reason})
              }
            }
          )
        } else {
          this.showAlert('请先安装微信客户端')
        }
      },

      //分享到朋友圈
      shareToTimelineInApp () {
        const me = this
        if (window.Wechat) {
          window.Wechat.share({
            message: {
              title: me.shareConfig.title, // 分享标题
              description: me.shareConfig.desc,
              thumb: me.shareConfig.imgUrl, // 分享图标
              media: {
                type: window.Wechat.Type.WEBPAGE,
                webpageUrl: me.shareConfig.link
              }
            },
            scene: window.Wechat.Scene.TIMELINE // share to Timeline
          },
            function () {
              me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
                '访谈Id': me.interviewRecord.interviewId,
                '分享渠道': '微信-朋友圈'
              })
            },
            function (reason) {
              if (reason === '用户点击取消并返回') {

              } else {
                me.showAlert({title: '分享失败', message: reason})
              }
            }
          )
        } else {
          this.showAlert('请先安装微信客户端')
        }
      },
      /**
       * 分享到QQ
       */
      shareToQQInApp () {
        if (window.YCQQ) {
          const me = this
          var args = {}
          args.url = me.shareConfig.link
          args.title = me.shareConfig.title
          args.description = me.shareConfig.desc
          args.imageUrl = me.shareConfig.imgUrl
          args.appName = '长投学堂'
          window.YCQQ.shareToQQ(
            function () {
              me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
                '访谈Id': me.interviewRecord.interviewId,
                '分享渠道': 'QQ'
              })
            },
            function (failReason) {
              if (failReason === 'cancelled by user') {

              } else {
                me.showAlert({title: '分享失败', message: failReason})
              }
            },
            args
          )
        } else {
          this.showAlert('请先安装QQ客户端')
        }
      },
      /**
       * 分享到微博
       */
      shareToWeiboInApp () {
        if (window.YCWeibo) {
          const me = this
          var args = {}
          args.url = me.shareConfig.link
          args.title = me.shareConfig.title
          args.description = '长投学堂' + me.shareConfig.desc
          args.imageUrl = me.shareConfig.imgUrl
          args.defaultText = me.shareConfig.desc
          window.YCWeibo.shareToWeibo(
            function () {
            },
            function (failReason) {
              if (failReason === 'cancel by user') {

              } else {
                me.showAlert({title: '分享失败', message: failReason})
              }
            },
            args
          )
        } else {
          this.showAlert('请先安装微博客户端')
        }
      }
   },
    components: {
      IctCloseBtn
    }
  }
</script>

