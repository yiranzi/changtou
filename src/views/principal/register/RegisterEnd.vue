<template>
  <div class="principal-base register-end">
    <ict-titlebar>注册</ict-titlebar>
    <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
      {{errTip}}
    </div>
    <flexbox>
      <flexbox-item :span="1/20"></flexbox-item>
      <flexbox-item>
        <group>
          <div style="height: 1rem"></div>
          <x-input title="手机号"
                   placeholder="输入手机号"
                   :readonly="isPhoneReadonly"
                   :value.sync="phone">
          </x-input>
          <x-input title="密码"
                   placeholder="输入密码"
                   v-if="isPlainPasswordShow"
                   :value.sync="plainPassword">
          </x-input>
          <div style="height: 1rem"></div>
          <flexbox>
            <flexbox-item>
              <x-input title="验证码"
                       placeholder="输入验证码"
                       :value.sync="validationCode">
              </x-input>
            </flexbox-item>
            <ict-button type="mini"
                        :disabled="isValidationBtnDisable"
                        @click="getValidationCode"
                        :text="validationBtnText">
            </ict-button>
          </flexbox>
        </group>
      </flexbox-item>
      <flexbox-item :span="1/20"></flexbox-item>
    </flexbox>
    <div style="height: 3rem" class="spacer"></div>
    <div class="btn-box">
      <ict-button type="default"
                  :disabled="isDisabled"
                  @click="doRegister"
                  text="提交">
      </ict-button>
    </div>
    <div style="height: 4rem" class="spacer"></div>
  </div>
</template>
<script>
  import IctTitlebar from '../../../components/IctTitleBar.vue'
  import IctButton from '../../../components/IctButton.vue'
  import {Flexbox, FlexboxItem} from 'vux/flexbox'
  import Group from 'vux/group'
  import XInput from 'vux/x-input'
  import {userActions, globalActions} from '../../../vuex/actions'
  import {eventMap} from '../../../frame/eventConfig'

  export default {
    vuex: {
      actions: {
        registerStart: userActions.registerStart,
        registerEnd: userActions.registerEnd,
        showAlert: globalActions.showAlert
      }
    },
    components: {
      IctTitlebar,
      Flexbox,
      FlexboxItem,
      Group,
      XInput,
      IctButton
    },
    data () {
      return {
        errTip: '',
        phone: '',
        validationCode: '',
        plainPassword: '',
        isPhoneReadonly: true,
        isPlainPasswordShow: false,
        validationBtnText: '再次发送',
        isValidationBtnDisable: false,
        leftTime: 120,
        isDisabled: true,
        timer: null
      }
    },

    computed: {
      isDisabled () {
        return !(/^\d{6}$/.test(this.validationCode))
      }
    },
    route: {
      data ({to: {params}}) {
        const me = this
        me.phone = params.phone
        me.plainPassword = params.plainPassword
        setInterval(
          () => {
            if (me.leftTime > 0) {
            me.leftTime--
            me.validationBtnText = me.leftTime + 's后重发'
            me.isValidationBtnDisable = true
          } else {
            me.leftTime = 120
            me.validationBtnText = '再次发送'
            me.isValidationBtnDisable = false
            clearInterval(me.timer)
          }
        }, 1000)
      }
    },
    watch: {
      validationCode () {
        this.errTip = ''
        this.verifyCode()
      }
    },
    methods: {
      /**
       * 倒计时
       */
      countdown () {
        const me = this
        me.timer = setInterval(
          () => {
            if (me.leftTime > 0) {
            me.leftTime--
            me.validationBtnText = me.leftTime + 's后重发'
            me.isValidationBtnDisable = true
          } else {
            me.leftTime = 120
            me.validationBtnText = '再次发送'
            me.isValidationBtnDisable = false
            clearInterval(me.timer)
          }
        }, 1000)
      },
      /**
       *
       * 验证验证码
       */
      verifyCode () {
        if (/^\d{6}$/.test(this.validationCode)) {
          this.isDisabled = false
          return true
        } else {
          return false
        }
      },
      /**
       * 点击 获取验证码
       */
      getValidationCode () {
        const me = this
        me.isValidationBtnDisable = true
        me.registerStart(this.phone, this.plainPassword).then(
          res => me.countdown()
        ).catch(
          err => {
            me.errTip = err.message
            me.isValidationBtnDisable = false
          }
        )
      },
      /**
       * 点击提交
       */
      doRegister () {
        const me = this
        this.isDisabled = true
        if (this.verifyCode()) {
          this.registerEnd(this.phone, this.plainPassword, this.validationCode).then(
            (user) => {
              this.$dispatch(eventMap.REGISTER_SUCCESS, user)
              window.history.go(-2)
              me.isDisabled = false
            }).catch(
              (err) => {
                clearInterval(me.timer)
                me.errTip = err.message
                me.isDisabled = false
              }
          )
        } else {
          me.errTip = '请输入正确的验证码'
          me.isDisabled = false
        }
      }
    }
  }
</script>
<style lang="less">
  .register-end{
    .btn-box{
      .ict-btn {
        width: 84%;
      }
    }
    .ict-btn-mini{
      height: 2rem;
      border-radius: 0;
      font-size: 0.7rem;
    }
  }
</style>
