<template>
  <div class="principal-base register-end">
    <ict-titlebar  @back="onTitlebarBack">注册</ict-titlebar>
    <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
      {{errTip}}
    </div>

    <ict-input title="手机号"
             placeholder="输入手机号"
             :readonly="isPhoneReadonly"
             :value.sync="phone">
    </ict-input>

    <!--<ict-input title="密码"-->
             <!--type="password"-->
             <!--placeholder="输入密码"-->
             <!--v-if=false-->
             <!--id="register-end-plainPassword"-->
             <!--:value.sync="plainPassword">-->
    <!--</ict-input>-->

    <div style="height: 1rem"></div>

    <div class="validation-box">
      <ict-input title="验证码"
                 id="register-end-valid-code"
               placeholder="输入验证码"
               :value.sync="validationCode">
      </ict-input>
      <ict-button type="mini"
                  :disabled="isValidationBtnDisable"
                  v-touch:tap="getValidationCode"
                  :text="validationBtnText">
      </ict-button>
    </div>

    <div style="height: 3rem" class="spacer"></div>

    <div class="btn-box">
      <ict-button type="default"
                  :disabled="isDisabled"
                  v-touch:tap="doRegister"
                  text="提交">
      </ict-button>
    </div>
  </div>
</template>
<script>
  import IctTitlebar from '../../../components/IctTitleBar.vue'
  import IctButton from '../../../components/IctButton.vue'
  import IctInput from '../../../components/form/IctInput.vue'
  import {userActions} from '../../../vuex/actions'
  import {eventMap} from '../../../frame/eventConfig'
  import {statisticsMap} from '../../../statistics/statisticsMap'

  export default {
    vuex: {
      actions: {
        registerStart: userActions.registerStart,
        registerEnd: userActions.registerEnd
      }
    },
    components: {
      IctTitlebar,
      IctInput,
      IctButton
    },
    data () {
      return {
        errTip: '',
        phone: '',
        validationCode: '',
        plainPassword: '',
        isPhoneReadonly: true,
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
        clearInterval(this.timer)
        this.phone = params.phone
        this.plainPassword = params.plainPassword
        this.errTip = ''
        this.validationCode = ''
        this.isPhoneReadonly = true
        this.validationBtnText = '再次发送'
        this.isValidationBtnDisable = false
        this.leftTime = 120
        this.isDisabled = true
        this.timer = null

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
      }
    },

    watch: {
      validationCode () {
        this.errTip = ''
        this.verifyCode()
      }
    },
    events: {
      'ictInputFocus' (id) {
        if (id === 'register-end-valid-code') {
          this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.REGISTER_INPUT_VALIDATION_CODE, {})
        }
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
        if (me.isValidationBtnDisable) {
          return
        }

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
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.REGISTER_TAP_SUBMIT, {})
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
      },

      onTitlebarBack () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.REGISTER_VALIDATION_CODE_BACK, {})
      }
    }
  }
</script>
<style lang="less">
  .register-end{

  }
</style>
