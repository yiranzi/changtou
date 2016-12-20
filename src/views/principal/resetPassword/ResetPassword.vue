<template>
    <div class="principal-base reset-password">
      <ict-titlebar>重置密码</ict-titlebar>
      <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
        {{errTip}}
      </div>

      <ict-input title="手机号"
               placeholder="输入手机号"
               :readonly=true
               :value.sync="phone">
      </ict-input>

      <div style="height: 1rem"></div>

      <div class="validation-box">
        <ict-input title="验证码"
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
                    v-touch:tap="sendIdentity"
                    text="下一步">
        </ict-button>
      </div>
    </div>
</template>
<style>

</style>
<script>
import IctTitlebar from '../../../components/IctTitleBar.vue'
import IctButton from '../../../components/IctButton.vue'
import IctInput from '../../../components/form/IctInput.vue'
import {userActions} from '../../../vuex/actions'
export default {
  vuex: {
    actions: {
      resetPasswordStart: userActions.resetPasswordStart,
      resetPassword: userActions.resetPassword
    }
  },
  data () {
    return {
      errTip: '',
      phone: this.$route.params.phone,
      validationCode: '',
      validationBtnText: '获取验证码',
      isValidationBtnDisable: false,
      leftTime: 120,
      timer: null
    }
  },
  computed: {
    isDisabled () {
      return !(/^\d{6}$/.test(this.validationCode))
    }
  },
  watch: {
    validationCode () {
      this.errTip = ''
    }
  },
  route: {
    data () {
      this.phone = this.$route.params.phone
      this.countdown()
    },

    /**
     * 重置
     */
    deactivate () {
      this.phone = ''
      this.errTip = ''
      clearInterval(this.timer)
      this.validationBtnText = '获取验证码'
      this.isValidationBtnDisable = false
      this.leftTime = 120
    }
  },
  methods: {
    /**
     * 点击 获取验证码
     */
    getValidationCode () {
      if (this.isValidationBtnDisable) {
        return
      }

      var me = this
      this.resetPasswordStart(this.phone).then(
        res => me.countdown()
      ).catch(
        err => { me.errTip = err.message }
      )
    },
    /**
     * 点击下一步
     */
    sendIdentity () {
      this.resetPassword(this.phone, this.validationCode).then(
        () => this.$route.router.go('/reset/password/end/' + this.phone)
      ).catch(
        err => { this.errTip = err.message }
      )
    },
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
  .reset-password{

  }
</style>
