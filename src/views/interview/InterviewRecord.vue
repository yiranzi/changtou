<template>
  <div class="interview-record">
    <ict-titlebar :right-options="rightOptions" v-el:titlebar>
      院生故事
      <div slot="right" v-touch:tap="showActionSharePanel">
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

        <div class="share-article">
          <div><hr/><span>好文共赏</span><hr/></div>
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
        isLoadSuccess: false,
        isShowAction: false,
        channelConfig: { //分享浮层内容
          menu1: '<div class="share-box">' +
                    '<div class="share-item">' +
                      '<div class="timeline"></div>' +
                      '<div class="share-name">朋友圈</div>' +
                    '</div>' +
                    '<div class="share-item">' +
                      '<div class="wechat"></div>' +
                      '<div class="share-name" >微信好友</div>' +
                    '</div>' +
                    '<div class="share-item">' +
                      '<div class="qq"></div>' +
                      '<div class="share-name">QQ</div>' +
                    '</div>' +
                    '<div class="share-item">' +
                      '<div class="weibo"></div>' +
                      '<div class="share-name">微博</div>' +
                    '</div>' +
                  '</div>'
        }
      }
    },
    watch: {
      'interviewRecord' () {
        this.setScrollerHeight()
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
        switch (event.target.className) {
          case 'wechat':
            this.shareToFriend() // 分享朋友
            break
          case 'timeline':
            this.shareToFriendCircle() //分享到朋友圈
            break
          case 'qq':
            this.shareToQQ() // 分享朋友
            break
          case 'weibo':
            this.shareToWeibo() //分享到朋友圈
            break
          default:
                break
        }
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
      },

      /**
       * 取消分享
       */
      cancelShare () {
        console.log(2)
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

    .end{
      font-size: 0.7rem;
      color: #aaa;
      text-align: center;
    }
  }
</style>
