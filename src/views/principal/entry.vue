<template>
  <div class="principal-base login-entry ">
    <ict-titlebar>登录</ict-titlebar>
    <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
      {{errTip}}
    </div>
    <flexbox>
      <flexbox-item :span="1/20"></flexbox-item>
      <flexbox-item>
        <group>
          <div style="height: 1rem"></div>
          <x-input title="用户名"
                   class="custom-input"
                   text-align="left"
                   placeholder="输入长投用户名/手机号"
                   :value.sync="identity" >
          </x-input>
          <div style="height: 1rem"></div>
          <x-input title="密码 "
                 class="custom-input"
                 text-align="left"
                 placeholder="输入密码"
                 :value.sync="plainPassword" >
          </x-input>
        </group>
      </flexbox-item>
      <flexbox-item :span="1/20"></flexbox-item>
    </flexbox>

    <div style="height: 3rem" class="spacer"></div>
    <ict-button type="default"  v-touch:tap="doLogin" :disabled="disabled">登录</ict-button>

    <flexbox>
      <ict-button type="string" text="注册" v-touch:tap="doRegister"></ict-button>
      <flexbox-item></flexbox-item>
      <ict-button type="string" text="忘记密码" v-touch:tap="doResetPassword"></ict-button>
    </flexbox>

    <div class="third-party-container">
      <div class="third-text-container">
        <i class="horizon-line"></i>
        <p class="third-text">第三方登录</p>
        <i class="horizon-line"></i>
      </div>
      <div style="height: 0.5rem" class="spacer"></div>
      <div class="third-icon-container">
        <div class="third-icon">
          <span class="third-icon-qq" v-touch:tap='onQQLoginTap'></span>
          <p>QQ登录</p>
        </div>
        <div class="third-icon">
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
  import {Flexbox, FlexboxItem} from 'vux/flexbox'
  import Group from 'vux/group'
  import XInput from 'vux/x-input'
  import {userGetters} from '../../vuex/getters'
  import {userActions} from '../../vuex/actions'
  import {eventMap} from '../../frame/eventConfig'
  import qqAuth from '../../plugin/thirdPartyQQ'
  import wxAuth from '../../plugin/thirdPartyWX'
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
        qqInstalled: false, //是否安装QQ
        wxInstalled: false //是否安装微信
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
      data () {
        this.plainPassword = ''
      }
    },
    ready () {
      const me = this
      qqAuth.checkQQInstalled().then(function () {
        me.qqInstalled = true
      }).catch(function () {
        me.qqInstalled = false
      })
      wxAuth.checkWxInstalled().then(function () {
        me.wxInstalled = true
        }).catch(function () {
        me.wxInstalled = false
      })
    },
    methods: {
//     isInstalledWX, isInstalledQQ,
      onQQLoginTap () {
        const me = this
        qqAuth.QQAuth().then(
            (qqCode) => {
              me.loginByQQ(qqCode).then(
                  (user) => {
                    me.$dispatch(eventMap.LOGIN_SUCCESS, user)
                    window.history.back()
                  }
              )
            }
        ).catch(
            err => { me.errTip = err }
        )
      },
      onWxLoginTap () {
        const me = this
        wxAuth.WxAuth().then(
          function (wxCode) {
            me.loginByWx(wxCode).then(
                (user) => {
                  me.$dispatch(eventMap.LOGIN_SUCCESS, user)
                  window.history.back()
                }
            )
          }
        ).catch(
          err => { me.errTip = err }
        )
      },
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
      doRegister () {
        this.$route.router.go('/register/start')
      },
      doResetPassword () {
        this.$route.router.go('/reset/password/start')
      }
    },
    components: {
      IctTitlebar,
      IctButton,
      Flexbox,
      FlexboxItem,
      Group,
      XInput
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
  }
  .login-entry{
    .ict-btn{
      width: 84%;
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
