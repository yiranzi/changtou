<template>
  <div class="principal-base login-entry ">
    <ict-titlebar>登录</ict-titlebar>
    <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
      {{errTip}}
    </div>

    <ict-input v-ref:identity
               :value.sync="identity"
               title="用户名"
               placeholder="输入长投用户名/手机号">
    </ict-input>

    <div style="height: 1rem"></div>

    <ict-input :value.sync="plainPassword"
               v-ref:password
               title="密码"
               type="password"
               placeholder="输入密码">
    </ict-input>

    <div style="height: 3rem" class="spacer"></div>

    <div class="btn-box">
      <ict-button type="default"  v-touch:tap="doLogin" :disabled="disabled">登录</ict-button>
    </div>

    <div class="other-entry">
      <ict-button type="string" text="注册" v-touch:tap="doRegister" class="ict-btn"></ict-button>
      <ict-button type="string" text="忘记密码" v-touch:tap="doResetPassword" class="ict-btn"></ict-button>
    </div>
    <div class="third-party-container" v-if="isQQShow || isWxShow" v-el:auth-container style="display: block">
      <div class="third-text-container">
        <i class="horizon-line"></i>
        <p class="third-text">第三方登录</p>
        <i class="horizon-line"></i>
      </div>
      <div style="height: 0.5rem" class="spacer"></div>
      <div class="third-icon-container">
        <div class="third-icon" v-if="isQQShow">
          <span class="third-icon-qq" v-touch:tap='onQQLoginTap'></span>
          <p>QQ登录</p>
        </div>
        <div class="third-icon" v-if="isWxShow">
          <span class="third-icon-wx" v-touch:tap='onWxLoginTap'></span>
          <p>微信登录</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import IctButton from '../../components/IctButton.vue'
  import IctInput from '../../components/form/IctInput.vue'
  import {userGetters} from '../../vuex/getters'
  import {userActions} from '../../vuex/actions'
  import {eventMap} from '../../frame/eventConfig'
  import qqAuth from '../../plugin/thirdPartyQQ'
  import wxAuth from '../../plugin/thirdPartyWX'
  import {Device, platformMap} from '../../plugin/device'

  // 键盘是否弹出
  let isKeyboardPop = false

  export default{
    vuex: {
      getters: {
        userName: userGetters.userName
      },
      actions: {
        login: userActions.login,
        loginByQQ: userActions.loginByQQ,
        loginByWx: userActions.loginByWx
      }
    },

    data () {
      return {
        errTip: '',
        plainPassword: '',
        identity: '',
        disabled: true,
        isQQShow: false,             // 是否显示qq
        isWxShow: false,            //  是否显示微信
        isQQInstall: false,           // 是否安装qq
        isWXInstall: false           // 是否安装wx
      }
    },

    watch: {
      identity (newVal) {
        this.errTip = ''
        if (/\S/.test(newVal) && /\S/.test(this.plainPassword)) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      },

      plainPassword (newVal) {
        this.errTip = ''
        if (/\S/.test(this.identity) && /\S/.test(newVal)) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      }
    },

    route: {
      data (transition) {
        this.plainPassword = ''
        if (Device.platform !== platformMap.WEB) {
          const checkList = []
          checkList.push(qqAuth.checkQQInstalled())
          checkList.push(wxAuth.checkWxInstalled())
          return Promise.all(checkList).then(function (reArr) {
            if (Device.platform === platformMap.IOS) {
              return {
                isQQInstall: reArr[0],
                isWXInstall: reArr[1],
                isQQShow: reArr[0],
                isWxShow: reArr[1]
              }
            } else if (Device.platform === platformMap.ANDROID) {
              return {
                isQQInstall: reArr[0],
                isWXInstall: reArr[1],
                isQQShow: true,
                isWxShow: true
              }
            }
          })
        } else {
          this.isQQShow = false
          this.isWxShow = false
        }
      }
    },

    events: {
      /**
       * input控件被选中
       */
      'ictInputFocus': function () {
        isKeyboardPop = true
        this.hideThirdPartyWhenKeyboardShow()
      },

      /**
       * input控件失去焦点
       */
      'ictInputBlur': function () {
        isKeyboardPop = false
        setTimeout(() => {
          if (!isKeyboardPop) {
            this.showThirdPartyWhenKeyboardHide()
          }
        }, 500)
      }
    },

    methods: {
      /**
       * qq登录
       */
      onQQLoginTap () {
        const me = this
        if (this.isQQInstall) {
          qqAuth.QQAuth().then(
              qqCode => {
                  me.loginByQQ(qqCode).then(
                      user => {
                          me.$dispatch(eventMap.LOGIN_SUCCESS, user)
                          window.history.back()
                      }
                  )
              }
          ).catch(
              err => { me.errTip = err }
          )
        } else {
          this.showAlert({message: '请安装QQ客户端'})
        }
      },

      /**
       * 登录
       */
      onWxLoginTap () {
        const me = this
        if (this.isWXInstall) {
          wxAuth.WxAuth().then(
            wxCode => {
              me.loginByWx(wxCode).then(
                user => {
                  me.$dispatch(eventMap.LOGIN_SUCCESS, user)
                  window.history.back()
                }
              )
            }
          ).catch(
            err => { me.errTip = err }
          )
        } else {
          this.showAlert({message: '请安装微信客户端'})
        }
      },

      /**
       * 登录
       */
      doLogin () {
        this.disabled = true
        const me = this
        if (/\S/.test(this.identity) && /\S/.test(this.plainPassword)) {
          this.login(this.identity, this.plainPassword).then(
            (user) => {
              me.disabled = true
              me.$dispatch(eventMap.LOGIN_SUCCESS, user)
              window.history.back()
            }
          ).catch(
            err => {
              me.errTip = err.message
              me.disabled = false
            }
          )
        } else {
          me.errTip = '请输入正确的用户名和密码'
          me.disabled = true
        }
      },
      /**
       * 进入注册页面
       */
      doRegister () {
        this.$route.router.go('/register/start')
      },
      /**
       * 进入重置密码页面
       */
      doResetPassword () {
        this.$route.router.go('/reset/password/start')
      },

      /**
       * 键盘弹出
       * 隐藏 三方登录按钮
       */
      hideThirdPartyWhenKeyboardShow () {
        const {authContainer} = this.$els
        if (authContainer) {
          authContainer.setAttribute('style', 'display: none')
        }
      },

      /**
       * 键盘隐藏
       * 显示三方登录
       */
      showThirdPartyWhenKeyboardHide () {
        const {authContainer} = this.$els
        if (authContainer) {
          authContainer.setAttribute('style', 'display: block')
        }
      }
    },
    components: {
      IctTitlebar,
      IctButton,
      IctInput
    }
  }
</script>
<style lang="less">
  .principal-base{
    width: 100%;
    height: 100%;
    position: relative;
    p{
      margin: 0;
    }
    .err-tip{
      width: 100%;
      line-height: 30px;
      background: grey;
      text-align: center;
      color: black;
      font-size: 0.7rem;
    }
    .no-err{
      background: transparent;
      color: transparent;
    }
    .weui_cells{
      margin-top: 0;
      background-color: #f0eff5;
      &:before, &:after{
        border: 0;
      }
      .weui_cell{
        .weui_label{
          min-width: 4.7rem;
        }
        .weui_icon_warn:before{
          display: none;
          content: ''
        }
        .weui_icon_clear:before{
          display: none;
          content: ''
        }
        &:before{
          border: 0;
        }
        &:after{
          content: " ";
          position: absolute;
          left: 15px;
          bottom: 0;
          width: 100%;
          height: 1px;
          border-top: 1px solid #c3c3c3;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
      }
      .weui_label{
        font-size: 0.75rem;
      }
      .weui_input{
        font-size: 0.75rem;
      }
    }
    .validation-box{
      position: relative;
      margin: 0 12%;
      .ict-input-component{
        margin: 0!important;
      }
      .ict-btn-mini{
        height: 2rem;
        border-radius: 0;
        font-size: 0.7rem;
        position: absolute;
        top: 1px;
        right: 0;
      }
    }
    .btn-box{
      width: 84%;
      margin: 0 auto;
    }
  }
  .login-entry{
    .other-entry{
      width: 84%;
      margin: 0 auto;
      font-size: 0;
      .ict-btn-string{
        display: inline-block;
        width: 50%;
        padding: 0;
        font-size: 0.65rem;
        &:nth-of-type(1){
          text-align: left;
        }
        &:nth-of-type(2){
          text-align: right;
        }
      }
    }
    .third-party-container{
      position: absolute;
      bottom: 0;
      width:100%;
      font-size: 0.7rem;
      color: #656565;
      text-align: center;
    }
    .third-icon-container{
      width:100%;
      font-size: 0;
      text-align: center;
    }
    .horizon-line{
      display: inline-block;
      width: 30%;
      background:#BFB3B3;
      height: .05rem;
      vertical-align: middle;
    }
    .third-text{
      display: inline-block;
      margin-left: .5rem;
      margin-right: .5rem;
    }
    .third-icon{
      display: inline-block;
      width: 50%;
      text-align: center;
      font-size: 0.7rem;
    }
    .third-icon span{
      display: inline-block;
      width:2.4rem;
      height:2.4rem;
    }
    .third-icon-qq{
      display: inline-block;
      background: url("../../assets/styles/image/loginView/QQ.png") no-repeat center center/90%;
    }
    .third-icon-wx{
      display: inline-block;
      background: url("../../assets/styles/image/loginView/weixin.png") no-repeat center center/90%;
    }
  }
</style>
