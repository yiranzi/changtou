<template>
  <div id="alloyTouchDemo2">
    <div>
      <span class="section-title"></span>
      <div class="section">
        <div id="fullpage" class="site_header">
          <div>
            <div class="section-item-0 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page1.png" width="100%" height="100%" />
            </div>
          </div>
          <div>
            <div class="section-item-1 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page2.png" width="100%" height="100%" />
            </div>
          </div>
          <div>
            <div class="section-item-2 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page3.png" width="100%" height="100%" />
            </div>
          </div>
          <div>
            <div class="section-item-3 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page4.png" width="100%" height="100%" />
            </div>
          </div>
          <div>
            <div class="section-item-4 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page5.png" width="100%" height="100%" />
            </div>
          </div>
          <div>
            <div class="section-item-5 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page6.png" width="100%" height="100%" />
            </div>
          </div>
          <div>
            <div class="section-item-6 animated" data-show="bounceInLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page7.png" width="100%" height="100%" />
            </div>
          </div>
          <div>
            <div class="section-item-8 animated" data-show="rotateInUpLeft"  data-hide="bounceOutLeft">
              <img src="../../../static/image/alloyTouch/page9.png" width="100%" height="100%" />
            </div>
          </div>
          <div class="section-item-9">
            <div class="section-title"></div>
            <div class="section-mid"></div>
            <div class="section-down"></div>
            <div class="share-article">
              <div><hr/><span>分享至</span><hr/></div>
              <div class="share-item" v-touch:tap="shareToFriendCircle">
                <div class="timeline"></div>
                <div class="share-name">朋友圈</div>
              </div>
              <div class="share-item" v-touch:tap="shareToFriend">
                <div class="wechat"></div>
                <div class="share-name">微信好友</div>
              </div>
              <div class="share-item" v-touch:tap="shareToQQ">
                <div class="qq"></div>
                <div class="share-name">QQ</div>
              </div>
              <div class="share-item" v-touch:tap="shareToWeibo">
                <div class="weibo"></div>
                <div class="share-name">微博</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
      html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }
      * {
        box-sizing: border-box;
      }
      .section-title {
        background-image: url("../../../static/image/alloyTouch/bgTitle.png");
        background-position: 0% 0%;
        background-repeat: no-repeat;
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
        #fullpage {
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
          }
          .section-item-1 {
            width: 15.025rem;
            height: 20.3rem;
            position: relative;
            top: 19%;
            left: 5%;
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
          }
          .section-item-4 {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 90%;
            width: 15.85rem;
            height: 16.8rem;
            position: relative;
            top: 24%;
            left: 10%;
          }
          .section-item-5 {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 90%;
            width: 15.55rem;
            height: 20.8rem;
            position: relative;
            top: 20%;
            left: 12%;
          }
          .section-item-6 {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 90%;
            width: 18.75rem;
            height: 20.3rem;
            position: relative;
            top: 15%;
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
          }
          .section-item-9 {
            background: #fcf8f4;
            .section-title {
              background-image: url("../../../static/image/alloyTouch/backCover1.png");
              background-position: center center;
              background-repeat: no-repeat;
              background-size: 90%;
              width: 18.75rem;
              height: 7.15rem;
              position: relative;
              left: 1%;
            }
            .section-mid {
              background-image: url("../../../static/image/alloyTouch/backCover2.png");
              background-position: center center;
              background-repeat: no-repeat;
              background-size: 90%;
              width: 13.125rem;
              height: 3.25rem;
              position: relative;
              left: 13%;
              margin-bottom: 5rem;
              margin-top: 5rem;
            }
            .section-down {
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
              margin-top: 3rem;
              font-size: 26/40rem;
              color: #aaa;
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
      }
</style>
<script>
    import AlloyTouch from 'alloyTouch'
    import FullPage from '../../util/alloyTouch/alloy_touch.full_page.js'
    import ProgressBar from '../../util/alloyTouch/progress_bar.js'
    import alloy_touch from '../../util/alloyTouch/alloy_touch.js'
    import {eventMap} from '../../frame/eventConfig'
    import {statisticsMap} from '../../statistics/statisticsMap'
    export default {
       data () {
        return {
        }
       },
       ready () {
        this.init()
       },
       methods: {
        init () {
        var pb;
        console.log(AlloyTouch.FullPage)
        var fp =  new AlloyTouch.FullPage("#fullpage",{
            animationEnd:function () {

            },
            leavePage: function (index) {
            },
            beginToPage: function (index) {
            }
        });
        },
       gotoIndex () {
        this.$route.router.go('/main')
       },
       gotoAgain () {
        window.history.reload()
       },
             //分享朋友
      shareToFriend () {
        const me = this
        window.Wechat.share({
            message: {
              title: me.interviewRecord.title, // 分享标题
              description: '',
              thumb: me.interviewRecord.paragraph[0].image, // 分享图标
              media: {
                type: window.Wechat.Type.WEBPAGE,
//                webpageUrl: SEVER_URL + '#interview/content/' +  me.interviewRecord.interviewId
                webpageUrl: 'http://h5.ichangtou.com/mapp/index.html#interview/content/' + me.interviewRecord.interviewId
              }
            },
            scene: window.Wechat.Scene.SESSION
          },
          function () {
            me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
              '访谈Id': me.interviewRecord.interviewId,
              '分享渠道': '微信-会话'
            })
            me.showToast('分享成功')
          },
          function (reason) {
            if (reason === '用户点击取消并返回') {

            } else {
              me.showAlert({title: '分享失败', message: reason})
            }
          }
        )
      },

      //分享到朋友圈
      shareToFriendCircle () {
        const me = this
        window.Wechat.share({
          message: {
            title: me.interviewRecord.title, // 分享标题
            description: '',
            thumb: me.interviewRecord.paragraph[0].image, // 分享图标
            media: {
              type: window.Wechat.Type.WEBPAGE,
              webpageUrl: 'http://h5.ichangtou.com/mapp/index.html#interview/content/' + me.interviewRecord.interviewId
            }
          },
          scene: window.Wechat.Scene.TIMELINE // share to Timeline
        },
          function () {
            me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
              '访谈Id': me.interviewRecord.interviewId,
              '分享渠道': '微信-朋友圈'
            })
            me.showToast('分享成功')
          },
          function (reason) {
            if (reason === '用户点击取消并返回') {

            } else {
              me.showAlert({title: '分享失败', message: reason})
            }
          }
        )
      },
      /**
       * 分享到QQ
       */
      shareToQQ () {
        if (window.YCQQ) {
          const me = this
          var args = {}
          args.url = 'http://h5.ichangtou.com/mapp/index.html#interview/content/' + me.interviewRecord.interviewId
          args.title = me.interviewRecord.title
          args.description = ''
          args.imageUrl = me.interviewRecord.paragraph[0].image
          args.appName = '长投学堂'
          window.YCQQ.shareToQQ(
            function () {
              me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
                '访谈Id': me.interviewRecord.interviewId,
                '分享渠道': 'QQ'
              })
              me.showToast('分享成功')
            },
            function (failReason) {
              if (failReason === 'cancelled by user') {

              } else {
                me.showAlert({title: '分享失败', message: failReason})
              }
            },
            args
          )
        }
      },
      /**
       * 分享到微博
       */
      shareToWeibo () {
        if (window.YCWeibo) {
          const me = this
          var args = {}
          args.url = 'http://h5.ichangtou.com/mapp/index.html#interview/content/' + me.interviewRecord.interviewId
          args.title = me.interviewRecord.title + 'title'
          args.description = '长投学堂' + 'description'
          args.imageUrl = me.interviewRecord.paragraph[0].image
          args.defaultText = me.interviewRecord.title + 'defaultText'
          window.YCWeibo.shareToWeibo(
            function () {
              me.showToast('分享成功')
            },
            function (failReason) {
              if (failReason === 'cancel by user') {

              } else {
                me.showAlert({title: '分享失败', message: failReason})
              }
            },
            args
          )
        }
      }
     }
    }
</script>

