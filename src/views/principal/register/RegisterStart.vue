<template>
  <div class="principal-base register-start">
    <ict-titlebar>注册</ict-titlebar>
    <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
      {{errTip}}
    </div>
    <flexbox>
      <flexbox-item :span="1/20"></flexbox-item>
      <flexbox-item>
        <group>
          <div style="height: 1rem"></div>
          <x-input title="账号"
                   placeholder="输入手机号"
                   :value.sync="phone">
          </x-input>
          <div style="height: 1rem"></div>
          <x-input title="密码"
                   placeholder="输入密码"
                   :value.sync="plainPassword">
          </x-input>
          <div class="password-tip" v-if="passwordTipShow">(6~16位 数字英文字母混合排列，特殊字符仅支持下划线)</div>
        </group>
      </flexbox-item>
      <flexbox-item :span="1/20"></flexbox-item>
    </flexbox>
    <div style="height: 3rem" class="spacer"></div>
    <ict-button type="default" :disabled.sync="buttonDisable" v-touch:tap="doRegister">注册</ict-button>
    <p class="register-tip">点击“注册”即代表你同意
      <span class="user-agreement" v-touch:tap="showAgreement">长投学堂用户协议</span>
    </p>
  </div>
</template>
<script>
  import IctTitlebar from '../../../components/IctTitleBar.vue'
  import IctButton from '../../../components/IctButton.vue'
  import {Flexbox, FlexboxItem} from 'vux/flexbox'
  import Group from 'vux/group'
  import XInput from 'vux/x-input'
  import {userActions} from '../../../vuex/actions'

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
      data () {
        this.phone = ''
        this.plainPassword = ''
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
      }
    },
    components: {
      IctTitlebar,
      Flexbox,
      FlexboxItem,
      Group,
      XInput,
      IctButton
    }
  }
</script>
<style lang="less">
  .register-start{
    .password-tip{
      font-size: 0.6rem;
      color: #898989;
    }
    .ict-btn {
      width: 84%;
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
