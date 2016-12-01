<template>
    <div>
      <ict-titlebar>重置密码</ict-titlebar>
      <flexbox>
        <flexbox-item :span="1/20"></flexbox-item>
        <flexbox-item>
          <group>
            <x-input title="手机号"
                     placeholder="输入手机号"
                     :readonly=true
                     :value.sync="phone">
            </x-input>
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
          <div style="height: 4rem" class="spacer"></div>
          <ict-button type="default"
                    :disabled="isDisabled"
                    @click="sendIdentity"
                    text="提交">
          </ict-button>
          <div style="height: 4rem" class="spacer"></div>
        </flexbox-item>
        <flexbox-item :span="1/20"></flexbox-item>
      </flexbox>
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
  methods: {
    /**
     * 点击 获取验证码
     */
    getValidationCode () {
      var me = this
      this.resetPasswordStart(this.phone).then(
        res => {
          me.timer = setInterval(
            () => {
              if (me.leftTime > 0) {
                me.leftTime--
                me.validationBtnText = me.leftTime + 's后重发'
                me.isValidationBtnDisable = true
              } else {
                me.leftTime = 120
                me.validationBtnText = '获取验证码'
                me.isValidationBtnDisable = false
                clearInterval(me.timer)
              }
            }, 1000)
        })
    },
    /**
     * 点击下一步
     */
    sendIdentity () {
      this.resetPassword(this.phone, this.validationCode).then(
        () => this.$route.router.go('/reset/password/end/' + this.phone),
        err => this.showAlert(err)
      )
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
