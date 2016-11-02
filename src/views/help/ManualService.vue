<template>
  <div>
    <div class="manual_service">
      <ict-titlebar v-el:titlebar>你问我答</ict-titlebar>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight" style="background-color: #fff">
        <div class="conversation">
          <div class="answer">
            <img src="../../assets/styles/image/help/answerImg.png">
            <div class="content">你好，我是小投。请问我有什么能帮助你的？你的留言，小投将在24小时内尽快给出回复！</div>
          </div>
          <div class="answer">
            <img src="../../assets/styles/image/help/answerImg.png">
            <div class="content">
              <div>若需急速解决请加QQ客服群578360014（或扫描下方二维码），咨询人工服务。客服事件：上午11:00-12:00，下午16:00-18:00</div>
              <img src="../../assets/styles/image/help/qrcode.png">
            </div>
          </div>
        </div>
      </scroller>
      <div class="send_message">
        <input type="text"  :value="userQuestion" placeholder="有问题就向我提问吧" v-touch:tap="judgeLogin">
        <span :class="isDisabled ? 'notSend' : 'send'" v-touch:tap="sendUserQuestion">发送</span>
      </div>
    </div>
    <confirm :show.sync="remindToLogin" title="" cancel-text="我再想想" confirm-text="登录" @on-confirm="toSave" @on-cancel="">
      <p style="text-align:center;">登录后才能提问</p>
    </confirm>
  </div>
</template>
<style lang="less">
  .manual_service{
    width: 100%;
    height: 100%;
    background-color: #f0eff5;
    position: relative;
    .conversation{
      width: 100%;
      min-height: 89%;
      .answer{
        width: 100%;
        padding: 0.75rem 0.25rem 0 0.25rem;
        img{
          width: 2rem;
          height: 2rem;
          margin: 0 0.75rem;
        }
        .content{
          display: inline-block;
          width: 52%;
          line-height: 1rem;
          color: #222;
          font-size: 0.7rem;
          background-color: #f0eff5;
          border-radius: 0.5rem;
          padding: 0.75rem;
          img{
            display: block;
            width: 5rem;
            height: 5rem;
            margin: 0 auto;
          }
        }
      }
    }
    .send_message{
      width: 100%;
      line-height: 1.95rem;
      border-top: 1px solid #ccc;
      padding-left: 0.9rem;
      /*margin-bottom: 0.25rem;*/
      background-color: #f5f5f7;
      /*position: absolute;*/
      /*bottom: 0;*/

      input{
        width: 75%;
        height: 1.45rem;
        border: 1px solid #ccc;
        font-size: 0.65rem;
        color: #bbb;
        outline: 0;
        font-family: '微软雅黑';
        padding-left: 0.25rem;
        /*margin-bottom: 0.25rem;*/
      }
      span{
        width: 15%;
        line-height: 1.45rem;
        text-align: center;
        font-size: 0.75rem;
        .send{
          color: #007aff;
        }
        .notSend{
          color: #ddd;
        }
      }
    }
  }
</style>
<script>
  import Scroller from 'vux/scroller'
  import Confirm from 'vux/confirm'
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import {helpActions, globalActions} from '../../vuex/actions'
  import {helpGetters, userGetters} from '../../vuex/getters'
  export default {
    vuex: {
      actions: {
        loadRecords: helpActions.loadRecords,
        postSuggestion: helpActions.postSuggestion,
        showAlert: globalActions.showAlert
      },
      getters: {
        records: helpGetters.records,
        isLogin: userGetters.isLogin,
        avatar: userGetters.avatar //获取用户头像
      }
    },
    data () {
      return {
        scrollerHeight: '530px',
        isDisabled: true,
        remindToLogin: false
      }
    },
    watch: {
      'records': function () {
         const me = this
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
//              top: 0
          })
        })
        }, 300)
      }
    },
    route: {
      data (transition) {
        const me = this
        me.loadRecords().then(
          function () {
            transition.next()
          },
          function () {
            me.showAlert('加载信息失败，请重试！')
          }
        )
      }
    },
  ready () {
    this.scrollerHeight = (window.document.body.offsetHeight - this.$els.titlebar.offsetHeight - 45) + 'px'
    if (this.isLogin) {
      this.isDisabled = false
    }
  },
  methods: {
    //判断是否登录
    judgeLogin () {
      if (this.isLogin) {
        this.remindToLogin = true
      }
    },
    //去登录
    toSave () {
      this.$route.router.go('/entry')
    },
    sendUserQuestion () {
      if (this.isDisabled) {
        return
      }
      console.log('sendUserQuestion')
      const me = this
      me.postSuggestion(me.userQuestion).then(
        function () {
          //todo 提交问题成功
        },
        function () {
          me.showAlert('问题发送失败，请请重新发送！')
        }
      )
    }
  },
  components: {
    IctTitlebar,
    Scroller,
    Confirm
  }
  }
</script>
