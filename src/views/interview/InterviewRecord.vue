<template>
  <div class="interview-record">
    <ict-titlebar :right-options="rightOptions" v-el:titlebar>
      院生故事
      <div slot="right" v-touch:tap="showActionSharePanel" v-if="canShare">
        <img class="share-pic" src='../../assets/styles/image/share.png'>
      </div>
    </ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight" style="background-color: #fff">
      <div v-show="isLoadSuccess" class="content">
        <div class="title">{{interviewRecord.title}}</div>
        <div class="introduce">
          <span class="xiao-tou">小投说</span>
          <span>{{interviewRecord.introduce}}</span>
        </div>
        <div class="tip">需耗时{{interviewRecord.spendTime}}分钟 文章约{{interviewRecord.wordNum}}字</div>
        <div v-for="paragraph in interviewRecord.paragraph">
          <div class="paragraph-title">
            <span>{{paragraph.paragraph}}</span>/{{paragraph.title}}
          </div>
          <div v-for="subParagraph in paragraph.subParagraphArr">
            <div class="paragraph-content">{{{subParagraph}}}</div>
          </div>
          <img class="pic" v-bind:src="paragraph.image">
        </div>

        <div class="share-article" v-if="canShare">
          <div><hr/><span>好文共赏</span><hr/></div>
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
          <div class="share-item" v-touch:tap="shareToWeiboInApp">
            <div class="weibo"></div>
            <div class="share-name">微博</div>
          </div>
        </div>

      </div>
      <!--<div class="load-fail" v-show="!isLoadSuccess">-->
        <!--<div>加载中...</div>-->
        <!--&lt;!&ndash;<button v-touch:tap="loadInterviewRecord">请重新加载</button>&ndash;&gt;-->
      <!--</div>-->
    </scroller>
    <share-float :show.sync="showShareFloat"  @confirm="cancelShare" v-touch:tap="onActionTap"></share-float>
  </div>
</template>

<script>
  import Scroller from 'vux/scroller'
  import Actionsheet from 'vux/actionsheet'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import ShareFloat from './InterviewFloat.vue'
  import {interviewActions} from '../../vuex/actions'
  import {interviewGetters} from '../../vuex/getters'
  import {eventMap} from '../../frame/eventConfig'
  import {Device, platformMap} from '../../plugin/device'
  import {statisticsMap} from '../../statistics/statisticsMap'
  export default {
    vuex: {
      actions: {
        loadInterviewRecord: interviewActions.loadInterviewRecord
      },
      getters: {
        interviewRecord: interviewGetters.interviewRecord
      }
    },
    data () {
      return {
        showShareFloat: false,
        scrollerHeight: '580px',
        rightOptions: {
          disabled: false
        },
        isLoadSuccess: false
      }
    },
    watch: {
      'interviewRecord' (newRecord) {
        this.shareConfig = {
          title: '院生故事',
          desc: newRecord.title,
          link: window.location.href,
          imgUrl: newRecord.paragraph[0].image
        }
        this.onViewChange()
        this.setScrollerHeight()
      }
    },
    computed: {
      //只有app中才能调用插件分享
      canShare () {
        return (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS)
      }
    },
    route: {
      data ({to: {params: {interviewId}}}) {
        return this.loadInterviewRecord(interviewId).then(
          function () {
            return {
              isLoadSuccess: true
            }
          },
          function () {
            return {
              isLoadSuccess: false
            }
          }
        )
      },
      deactivate () {
        this.shareConfig = null
        this.onViewChange()
      }
    },
    methods: {
      setScrollerHeight () {
        const me = this
        setTimeout(function () {
          me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.offsetHeight) + 'px'
          me.$nextTick(() => {
            me.$refs.scroller.reset({
              top: 0
          })
        })
        }, 500)
      },
      showActionSharePanel () {
        this.showShareFloat = true
      },
      onActionTap (event) {
        this.showShareFloat = false
        switch (event.target.className) {
          case 'wechat':
            this.shareToFriendInApp() // 分享朋友
            break
          case 'timeline':
            this.shareToTimelineInApp() //分享到朋友圈
            break
          case 'qq':
            this.shareToQQInApp() // 分享朋友
            break
          case 'weibo':
            this.shareToWeiboInApp() //分享到朋友圈
            break
          default:
                break
        }
      },
      //分享朋友
      shareToFriendInApp () {
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
      shareToTimelineInApp () {
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
      shareToQQInApp () {
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
      shareToWeiboInApp () {
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
      },

      /**
       * 取消分享
       */
      cancelShare () {
        this.showShareFloat = false
      }
    },

    components: {
      IctTitlebar,
      Scroller,
      Actionsheet,
      ShareFloat
    }
  }
</script>
<style lang="less">
  .interview-record{
    .right_unable{
      disabled: false;
      color: #fff;
    }
    .share-pic{
      width: 1.3rem;
      height: 1rem;
      margin-top: 0.65rem;
    }
    .content{
      width: 15.25rem;
      padding: 1.25rem 1.75rem 2rem 1.75rem ;
      background-color: #fff;
      .title{
        margin-bottom: 2.5rem;
      }
      .introduce{
        border: 2px solid #00b0f0;
        padding: 1.25rem;
        font-size: 0.7rem;
        line-height: 1.2rem;
        color: #898989;
        position: relative;
        .xiao-tou{
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
      .tip{
        font-size: 0.7rem;
        color: #00b0f0;
        text-align: center;
        margin: 1rem 0 2.5rem 0;
      }
      .paragraph-title{
        margin-bottom: 1.25rem;
        font-size: 0.8rem;
        color: #222;
        text-align: center;
        span{
          font-size: 1.2rem;
        }
      }
      .paragraph-content{
        padding: 0 1.25rem;
        margin-bottom: 1.25rem;
        font-size: 0.7rem;
        color: #898989;
        line-height: 1.2rem;
        hl{
          font-weight: bold;
          color: #ff9800;
        }
      }
      .pic{
        padding: 0 1.25rem;
        width: 12rem;
        text-align: center;
        margin-bottom: 2.5rem;
      }
    }
    .load-fail{
      width: 100%;
      height: 623px;
      background-color: #fff;
      text-align: center;
      padding-top: 40%;
    }

    .share-item{
      display: inline-block;
      width: 3.5rem;
      height: 4.3rem;
      margin: 0 0.35rem;
      text-align: center;
    }
    .wechat,.timeline,.qq,.weibo{
      display: inline-block;
      width: 2.5rem;
      height: 2.5rem;
    }
    .wechat{
      background: url("../../../static/image/interview/share-wechat.png") no-repeat center center / 100%;
    }
    .timeline{
      background: url("../../../static/image/interview/share-timeline.png") no-repeat center center / 100%;
    }
    .qq{
      background: url("../../../static/image/interview/share-qq.png") no-repeat center center / 100%;
    }
    .weibo{
      background: url("../../../static/image/interview/share-weibo.png") no-repeat center center / 100%;
    }
    .share-name{
      width: 100%;
      display: inline-block;
      text-align: center;
      margin-top: .5rem;
    }
    .share-box{
      width: 100%;
      padding: 1.2rem 0;
      font-size: 0.6rem;
      text-align: center;
    }
    .share-article{
      font-size: 26/40rem;
      color: #aaa;
      text-align: center;
      hr{
        margin: 0.32rem .5rem;
        width: 4.5rem;
        height: 1px;
        background: #aaa;
        border: 0;
        display: inline-block;
      }
      p{
        margin: 0;
      }
      .share-item{
        width: 2.8rem;
        margin-top: 1.5rem;
      }
    }
  }
</style>
