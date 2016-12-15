<template>
  <div class="principal-base bind-phone-end">
    <ict-titlebar @back="onTitlebarBack">{{userPhone ? '修改手机号' : '绑定手机号'}}</ict-titlebar>
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
               id="bind-phone-end-code"
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
                  text="提交">
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
  import {eventMap} from '../../../frame/eventConfig'
  import {statisticsMap} from '../../../statistics/statisticsMap'
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
    events: {
      'ictInputFocus' (id) {
        if (id === 'bind-phone-end-code') {
          this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.BIND_PHONE_INPUT_VALIDATION_CODE, {})
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
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.BIND_PHONE_TAP_SUBMIT, {})
        const me = this
        me.bindPhoneEnd(me.phone, me.validationCode).then(
          () => window.history.go(-3)
        ).catch(
          err => { me.errTip = err.message }
        )
      },

      onTitlebarBack () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.BIND_PHONE_VALIDATION_CODE_BACK, {})
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
.bind-phone-end{

}
</style>
