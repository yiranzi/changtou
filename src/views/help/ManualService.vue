<template>
  <div>
    <div class="manual_service">
      <ict-titlebar v-el:titlebar>你问我答</ict-titlebar>

      <scroller :lock-x="true"  scrollbar-y v-ref:scroller :height="scrollerHeight"  v-ref:scroller>
        <div class="conversation" v-el:conversation>
          <div class="answer">
            <img class="answer_avatar" src="../../assets/styles/image/help/answerImg.png">
            <div class="answer_content">你好，我是小投。请问我有什么能帮助你的？你的留言，小投将在24小时内尽快给出回复！</div>
          </div>
          <div class="answer">
            <img class="answer_avatar" src="../../assets/styles/image/help/answerImg.png">
            <div class="answer_content">
              <div>若需急速解决请加QQ客服群578360014（或扫描下方二维码），咨询人工服务。客服事件：上午11:00-12:00，下午16:00-18:00</div>
              <img src="../../assets/styles/image/help/qrcode.png">
            </div>
          </div>
          <div v-for="recordArr in records">
            <div class="answer" v-show="recordArr.type === 'A'">
              <img  class="answer_avatar" src="../../assets/styles/image/help/answerImg.png">
              <div class="answer_content">{{hrefFilter(recordArr.content)}}</div>
              <div class="answer_time">{{recordArr.time}}</div>
            </div>
            <div class="question" v-show="recordArr.type === 'Q'">
              <div class="question_content">{{hrefFilter(recordArr.content)}}</div>
              <img class="question_avatar" :src="avatarUrl">
              <div class="question_time">{{recordArr.time}}</div>
            </div>
          </div>
        </div>
      </scroller>

      <div class="send_message" v-el:btns>
        <input type="text"  v-model="userQuestion" placeholder="有问题就向我提问吧" v-touch:tap="editQuestion">
        <div class="send_box" :disabled="isSendDisabled" :class="{'notSend':isSendDisabled,'send':!isSendDisabled}" v-touch:tap="sendUserQuestion">
          <span>发送</span>
        </div>

      </div>
    </div>

    <confirm :show.sync="isShowConfirm" title="" cancel-text="我再想想" confirm-text="登录" @on-confirm="goToLogin" @on-cancel="">
      <p style="text-align:center;">登录后才能提问</p>
    </confirm>

  </div>
</template>

<script>
  import Scroller from 'vux/scroller'
  import Confirm from 'vux/confirm'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {helpActions} from '../../vuex/actions'
  import {helpGetters, userGetters} from '../../vuex/getters'

  const hrefTag = {
    '打包课专题': {
      url: '/spec/topic/:stpId',
      paramName: 'stpid'
    },
    '通用专题': {
      url: '/common/topic/:ctpId',
      paramName: 'ctpid'
    }
  }

  export default {
    vuex: {
      actions: {
        loadRecords: helpActions.loadRecords,
        resetRecords: helpActions.resetRecords,
        submitQuestion: helpActions.submitQuestion
      },

      getters: {
        records: helpGetters.records,
        isLogin: userGetters.isLogin,
        avatar: userGetters.avatar //获取用户头像
      }
    },

    data () {
      return {
        scrollerHeight: '0px',
        isShowConfirm: false,
        userQuestion: '',
        isSendDisabled: true
      }
    },

    computed: {
      isDisabled () {
        return !(this.isLogin && this.userQuestion)
      },

      avatarUrl () {
        return this.avatar ? this.avatar : './static/image/defaultUserImg.png'
      }
    },

    watch: {
      'records' () {
        this.refreshScroller()
      },

      /**
       * 当用户登录
       **/
      'isLogin' (currLoginState) {
        if (currLoginState) {
          this.loadRecords().then().catch()
        } else {
          this.resetRecords().then(this.refreshScroller)
        }
      },

      /**
       * 输入提问
       */
      'userQuestion' (newVal) {
        if (/\S/.test(newVal)) {
          this.isSendDisabled = false
        } else {
          this.isSendDisabled = true
        }
      }
    },

    route: {
      data (transition) {
        if (this.isLogin) { //登录情况下加载问答记录
          this.loadRecords().then(transition.next).catch()
        } else {
          this.refreshScroller()
        }
      }
    },

    ready () {
      this.refreshScroller()
    },

    methods: {
    /**
       * 编辑问题
       */
      editQuestion () {
        // 如没有登录， 弹框提示登录
        if (!this.isLogin) {
          this.isShowConfirm = true
        }
      },

      /**
       *  转去登录
       */
      goToLogin () {
        this.$route.router.go('/entry')
      },

      sendUserQuestion () {
        if (this.isDisabled) {
          return
        }
        const me = this
        me.submitQuestion(me.userQuestion).then(
          function () {   //发送信息成功后重新加载问答记录
            me.loadRecords().then(
              function () {
                me.userQuestion = ''
              },
              function () {
                me.showAlert('加载信息失败，请重试！')
              }
            )
          },
          function () {
            me.showAlert('问题发送失败，请重新发送！')
          }
        )
      },

      hrefFilter (content) {
        let jumpStr = content.match(/&\S*&/)
        if (jumpStr && jumpStr.length > 0) {
          let params = jumpStr[0].replace(/&/g, '').split('#')
          let linkStr = '<span class="link" v-touch:tap="toLink(hrefTag[params[1]].url, params[2])"' +
            ' urlMapName=' + hrefTag[params[1]].url +
            ' paramName=' + hrefTag[params[1]].paramName +
            ' param=' + params[2] +
            '>' + params[0] + '</span>'
          return content.replace(/&\S*&/, linkStr)
        } else {
          return content
        }
      },

      toLink (url, id) {
        this.$route.router.go(url + id)
      },

      refreshScroller: function () {
        const me = this
        me.scrollerHeight = (window.document.body.offsetHeight - this.$els.titlebar.offsetHeight - this.$els.btns.offsetHeight) + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
              top: me.scrollerHeight
          })
        })
        }, 200)
      }
    },

    components: {
      IctTitlebar,
      Scroller,
      Confirm
    }
  }
</script>
<style lang="less">
  .manual_service{
    width: 100%;
    height: 100%;
    background-color: #ebebeb;
    .conversation{
      position: relative;
      width: 100%;
      .answer, .question{
        width: 100%;
        box-sizing: border-box;
        padding: 0.75rem 0.25rem 0 0.25rem;
      }
      .answer_avatar, .question_avatar{
        width: 2rem;
        height: 2rem;
        margin: 0 0.75rem;
      }
      .answer_content, .question_content{
        display: inline-block;
        vertical-align: top;
        max-width: 60%;
        box-sizing: border-box;
        line-height: 1rem;
        font-size: 0.7rem;
        border-radius: 0.5rem;
        padding: 0.75rem;
        word-break: break-all;
        img{
          display: block;
          width: 5rem;
          height: 5rem;
          margin: 0 auto;
        }
      }
      .answer_time, .question_time{
        line-height: 1.7rem;
        color: #aaa;
        font-size: 0.7rem;
        white-space: nowrap;
      }
      .answer_content{
        color: #222;
        background-color: #fff;
      }
      .answer_time{
        padding: 0 0 0 20%;
      }
      .question{
        text-align: right;
      }
      .question_content{
        color: #fff;
        background-color: #0d83fe;
      }
      .question_time{
        padding: 0 20% 0 0;
      }
      .link{
        text-decoration: underline;
        color: #007aff
      }
    }
    .send_message{
      width: 100%;
      min-height: 2.45rem;
      line-height: 2.45rem;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #ccc;
      background-color: #f5f5f7;
      text-align: center;
      input{
        width: 70%;
        height: 1.95rem;
        padding: 0 0.25rem;
        vertical-align: middle;
        border: 1px solid #ccc;
        font-size: 0.7rem;
        outline: 0;
        font-family: '微软雅黑';
      }
      .send_box{
        width: 20%;
        display: inline-block;
        vertical-align: middle;
        line-height: 1.95rem;
        font-size: 0.75rem;
      }
      .send{
        color: #007aff;
      }
      .notSend{
        color: #ddd;
      }
    }
  }
</style>
