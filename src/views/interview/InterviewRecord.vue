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
      <div class="load-fail" v-show="!isLoadSuccess">
        <div>信息加载失败</div>
        <button v-touch:tap="loadInterviewRecord">请重新加载</button>
      </div>
    </scroller>
    <actionsheet :show.sync="isShowAction" :menus="channelConfig" v-touch:tap="onActionTap" show-cancel cancel-text="取消"></actionsheet>
  </div>
</template>
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
      background-color: #ffffff;
      text-align: center;
      padding-top: 40%;
    }
    .weui_actionsheet_cell{
      height: 9rem;
      background-color: #DCDCDC;
    }
    .vux-actionsheet-gap{
      height: 0;
    }
    .vux-actionsheet-cancel{
      height: 1.2rem;
      background-color: #ccc;
    }
    .share-picture{
      width: 45%;
      height: 4.45rem;
      margin: 2rem 5.17rem;
      position: relative;
      font-size: 0.6rem;

      .share-picture-left{
        width: 4.2rem;
        height: 4.3rem;
        margin: 0 0.35rem;
        .wechat{
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          padding: 0.75rem;
          background: #fff url("../../../static/image/interview/wechat.png") no-repeat center center / 50%;
        }
      }
      .share-picture-right{
        width: 4.2rem;
        height: 4.3rem;
        position: absolute;
        top: 0;
        left: 4rem;
        margin: 0 7px;
        .timeline{
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          padding: 0.75rem;
          background: #fff url("../../../static/image/interview/timeline.png") no-repeat center center / 50%;
        }
      }
      img {
        width: 2rem;
        height: 2rem;
        display: block;
      }
      .pic-bottom{
        text-align: center;
        margin-left: -0.7rem;
        margin-top: .5rem;
      }
    }
    @media all and (max-width: 320px){
      .share-picture{
        width: 45%;
        height: 4.45rem;
        margin: 2rem 4.17rem;
        position: relative;
      }
    }
    .end{
      font-size: 0.7rem;
      color: #aaa;
      text-align: center;
    }
  }
</style>
<script>
  import Scroller from 'vux/scroller'
  import Actionsheet from 'vux/actionsheet'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {interviewActions} from '../../vuex/actions'
  import {interviewGetters} from '../../vuex/getters'
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
        scrollerHeight: '590px',
        rightOptions: {
          disabled: false
        },
        isLoadSuccess: false,
        isShowAction: false,
        channelConfig: { //分享浮层内容
          menu1: '<div class="share-picture">' +
                    '<div class="share-picture-left">' +
                      '<div class="wechat"></div>' +
                      '<div class="pic-bottom">微信好友</div>' +
                    '</div>' +
                    '<div class="share-picture-right">' +
                      '<div class="timeline"></div>' +
                      '<div class="pic-bottom">微信朋友圈</div>' +
                    '</div>' +
                  '</div>'
        }
      }
    },
    watch: {
      'interviewRecord': function () {
        const me = this
        const {titlebar} = this.$els
        me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight) + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
//              top: 0
          })
        })
        }, 1500)
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
          function (err) {
            console.log('err', err)
            return {
              isLoadSuccess: false
            }
          }
        )
      }
    },
    methods: {
      showActionSharePanel () {
        const me = this
        setTimeout(() => {
          me.isShowAction = true
        }, 150)
      },
      onActionTap (event) {
        if (event.target.src.indexOf('wechat') >= 0) {
          this.shareToFriend() // 分享朋友
        } else if (event.target.src.indexOf('timeline') >= 0) {
          this.shareToFriendCircle() //分享到朋友圈
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
            me.showAlert('分享微信朋友圈失败')
          }
        }
      )
    }
    },

    components: {
      IctTitlebar,
      Scroller,
      Actionsheet
    }
  }
</script>
