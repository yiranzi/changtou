<template>
  <div>
    <ict-titlebar>注册</ict-titlebar>
    <flexbox>
      <flexbox-item :span="1/20"></flexbox-item>
      <flexbox-item>
        <group>
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
  import IctTitlebar from '../../../components/IctTitlebar.vue'
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
        phone: this.$route.params.phone,
        validationCode: '',
        plainPassword: this.$route.params.plainPassword,
        isPhoneReadonly: true,
        isPlainPasswordShow: false,
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
          err => me.showAlert(err)
        )
      },
      /**
       * 点击提交
       */
      doRegister () {
        this.registerEnd(this.phone, this.plainPassword, this.validationCode).then(
          (user) => {
            this.$dispatch(eventMap.REGISTER_SUCCESS, user)
            window.history.go(-2)
          },
          (err) => this.showAlert(err)
        )
      }
    }
  }
</script>
