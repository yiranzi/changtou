<template>
    <div class="principal-base reset-password">
      <ict-titlebar>重置密码</ict-titlebar>
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
                     :readonly=true
                     :value.sync="phone">
            </x-input>
            <div style="height: 1rem"></div>
            <flexbox>
              <flexbox-item>
                <x-input title="验证码"
                         placeholder="输入验证码"
                         :show-clear=false
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
      <ict-button type="default"
                  :disabled="isDisabled"
                  @click="sendIdentity"
                  text="提交">
      </ict-button>
    </div>
</template>
<style>

</style>
<script>
import IctTitlebar from '../../../components/IctTitleBar.vue'
import IctButton from '../../../components/IctButton.vue'
import {Flexbox, FlexboxItem} from 'vux/flexbox'
import Group from 'vux/group'
import XInput from 'vux/x-input'
import {userActions, globalActions} from '../../../vuex/actions'
export default {
  vuex: {
    actions: {
      resetPasswordStart: userActions.resetPasswordStart,
      resetPassword: userActions.resetPassword,
      showAlert: globalActions.showAlert
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
      this.countdown()
    }
  },
  methods: {
    /**
     * 点击 获取验证码
     */
    getValidationCode () {
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
    Flexbox,
    FlexboxItem,
    Group,
    XInput,
    IctButton
  }
}
</script>
<style lang="less">
  .reset-password{

  }
</style>
