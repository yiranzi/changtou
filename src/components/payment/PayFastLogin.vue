/**
 * Created by jun on 2016/11/18.
 *
 */
<template>
  <div class="order-fast-login">
    <flexbox>
      <flexbox-item :span="1/20"></flexbox-item>
      <flexbox-item>
        <group>
          <x-input title="手机号"
                   placeholder="输入手机号"
                   :readonly="isPhoneReadonly"
                   :value.sync="phone">
          </x-input>
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
        <div style="height: 4rem" class="spacer"></div>
        <ict-button type="default"
                    :disabled="isDisabled"
                    @click="doRegister"
                    text="提交">
        </ict-button>
        <div style="height: 4rem" class="spacer"></div>
      </flexbox-item>
      <flexbox-item :span="1/20"></flexbox-item>
    </flexbox>
  </div>
</template>
<script>
  import IctButton from '../IctButton.vue'
  import {Flexbox, FlexboxItem} from 'vux/flexbox'
  import Group from 'vux/group'
  import XInput from 'vux/x-input'
  import {userActions} from '../../vuex/actions'
  import {eventMap} from '../../frame/eventConfig'
export default {
  vuex: {
    actions: {
      fastLogin: userActions.fastLogin
    }
  },
  data () {
    return {
      phone: '',
      validationCode: '',
      validationBtnText: '获取验证码',
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
  watch: {
    validationCode () {
      this.verifyCode()
    }
  },
  route: {

  },
  ready () {

  },
  methods: {
    /**
     * 验证验证码
     */
    verifyCode () {
      if (/^\d{6}$/.test(this.validationCode)) {
        this.isDisabled = false
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
    },
      err => {
        me.showAlert(err.message)
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
      },
        (err) => {
          me.showAlert(err.message)
          me.isDisabled = false
        }
      )
      } else {
        me.isDisabled = false
      }
    }
  },
  components: {
    Flexbox,
    FlexboxItem,
    Group,
    XInput,
    IctButton
  }
}
</script>
<style lang="less">
  .order-fast-login{

  }
</style>
