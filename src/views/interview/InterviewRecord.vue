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
          <p class="end">-END-</p>
      </div>
    </scroller>
    <share-float :show="showShareFloat"  @cancel="cancelShare" v-touch:tap="onActionTap"></share-float>
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
                      '<div class="wechat"></div>' +
                      '<div class="share-name">微信好友</div>' +
                    '</div>' +
                    '<div class="share-item">' +
                      '<div class="timeline"></div>' +
                      '<div class="share-name">微信朋友圈</div>' +
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
        if (event.target.className === 'wechat') {
          this.shareToFriend() // 分享朋友
        } else if (event.target.className === 'timeline') {
          this.shareToFriendCircle() //分享到朋友圈
        }
      },
      //分享朋友
      shareToFriend () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
          '访谈Id': this.interviewRecord.interviewId,
          '分享渠道': '微信-会话'
        })

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
            console.log('分享微信好友成功')
          },
          function (reason) {
            if (reason === '用户点击取消并返回') {

            } else {
              me.showAlert('分享微信好友失败')
            }
          }
        )
      },

      //分享到朋友圈
      shareToFriendCircle () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
          '访谈Id': this.interviewRecord.interviewId,
          '分享渠道': '微信-朋友圈'
        })

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
            console.log('分享微信朋友圈成功')
          },
          function (reason) {
            if (reason === '用户点击取消并返回') {

            } else {
//              me.showAlert('分享微信朋友圈失败')
            }
          }
        )
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

    .end{
      font-size: 0.7rem;
      color: #aaa;
      text-align: center;
    }
  }
</style>
