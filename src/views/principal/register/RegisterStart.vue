<template>
  <div class="principal-base register-start">
    <ict-titlebar @back="onTitlebarBack">注册</ict-titlebar>
    <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
      {{errTip}}
    </div>

    <ict-input title="账号"
             placeholder="输入手机号"
             id="register-start-phone"
             :value.sync="phone">
    </ict-input>

    <div style="height: 1rem"></div>

    <ict-input title="密码"
             type="password"
             placeholder="输入密码"
             id="register-start-plainPassword"
             :value.sync="plainPassword">
    </ict-input>

    <div class="password-tip" v-if="passwordTipShow">(6~16位 数字英文字母混合排列，特殊字符仅支持下划线)</div>

    <div style="height: 3rem" class="spacer"></div>

    <div class="btn-box">
      <ict-button type="default" :disabled.sync="buttonDisable" v-touch:tap="doRegister">注册</ict-button>
    </div>

    <p class="register-tip">点击“注册”即代表你同意
      <span class="user-agreement" v-touch:tap="showAgreement">长投学堂用户协议</span>
    </p>
  </div>
</template>
<script>
  import IctTitlebar from '../../../components/IctTitleBar.vue'
  import IctButton from '../../../components/IctButton.vue'
  import IctInput from '../../../components/form/IctInput.vue'
  import {userActions} from '../../../vuex/actions'
  import {eventMap} from '../../../frame/eventConfig'
  import {statisticsMap} from '../../../statistics/statisticsMap'
  import {setSessionCache} from '../../../util/cache'
  export default {
    vuex: {
      actions: {
        registerStart: userActions.registerStart
      }
    },
    data () {
      return {
        errTip: '',
        phone: '',
        plainPassword: '',
        buttonDisable: true,
        passwordTipShow: false
      }
    },
    watch: {
      phone () {
        this.errTip = ''
        this.verifyPhoneAndPassword()
      },
      plainPassword () {
        this.errTip = ''
        this.passwordTipShow = true
        this.verifyPhoneAndPassword()
      }
    },
    route: {
      data ({from}) {
        setSessionCache('register-sources-page', {sourcesPage: from.path})
        this.phone = ''
        this.plainPassword = ''
      }
    },
    events: {
      'ictInputFocus' (id) {
        if (id === 'register-start-phone') {
          this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.REGISTER_INPUT_IDENTITY, {})
        } else if (id === 'register-start-plainPassword') {
          this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.REGISTER_INPUT_PASSWORD, {})
        }
      }
    },
    methods: {
      /**
       * 验证手机号和密码是否合法
       */
      verifyPhoneAndPassword () {
        if (/^1[3|4|5|7|8]\d{9}$/.test(this.phone) && /^(?![0-9]+$)(?![a-zA-Z]+$)(?!_+$)[A-Za-z0-9_]{6,16}$/.test(this.plainPassword)) {
          this.buttonDisable = false
          return true
        } else {
          this.buttonDisable = true
          return false
        }
      },
      /**
       * 点击注册
       */
      doRegister () {
        if (this.verifyPhoneAndPassword()) {
          this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.REGISTER_TAP_REGISTER, {})
          const me = this
          this.buttonDisable = true
          this.registerStart(this.phone, this.plainPassword).then(
            () => {
              me.$route.router.go(`/register/end/${this.phone}/${this.plainPassword}`)
              me.buttonDisable = false
            },
            (err) => {
              me.errTip = err.message
              me.buttonDisable = false
            }
          )
        }
      },
      /**
       * 点击协议
       */
      showAgreement () {
        this.$route.router.go('/user/agreement')
      },

      onTitlebarBack () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.REGISTER_IDENTITY_BACK, {})
      }
    },
    components: {
      IctTitlebar,
      IctInput,
      IctButton
    }
  }
</script>
<style lang="less">
  .register-start{
    .password-tip{
      margin-top: 0.5rem;
      text-align: center;
      font-size: 0.6rem;
      color: #898989;
    }
    .register-tip {
      margin-top: 0.5rem;
      font-size: 0.6rem;
      color: #bbb;
      text-align: center;
    }
    .user-agreement {
      color: #00b0f0;
    }
    .disable {
      background: #ccc !important;
      color: #898989 !important;
    }
  }
</style>
