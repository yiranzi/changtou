<template>
  <div class="principal-base bind-phone-end">
    <ict-titlebar>绑定手机号</ict-titlebar>
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
          <flexbox>
            <div style="height: 1rem"></div>
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
        <div style="height: 3rem" class="spacer"></div>
        <ict-button type="default"
                    :disabled="isDisabled"
                    @click="sendIdentity"
                    text="提交">
        </ict-button>
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
        bindPhoneEnd: userActions.bindPhoneEnd
      }
    },
    data () {
      return {
        errTip: '',
        phone: '',
        validationCode: '',
        validationBtnText: '再次发送',
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
      data ({to: {params: {phone}}}) {
        const me = this
        me.phone = phone
        me.countdown()
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
       * 点击获取验证码
       */
      getValidationCode () {
        const me = this
        me.bindPhone(me.phone).then(
          () => me.countdown()
        ).catch(
          err => { me.errTip = err.message }
        )
      },

      /**
       * 点击提交
       */
      sendIdentity () {
        const me = this
        me.bindPhoneEnd(me.phone, me.validationCode).then(
          () => window.history.go(-3)
        ).catch(
          err => { me.errTip = err.message }
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
<style lang="less">
.bind-phone-end{

}
</style>
