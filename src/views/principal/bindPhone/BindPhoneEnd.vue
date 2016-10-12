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
  import IctTitlebar from '../../../components/IctTitlebar.vue'
  import IctButton from '../../../components/IctButton.vue'
  import {Flexbox, FlexboxItem} from 'vux/flexbox'
  import Group from 'vux/group'
  import XInput from 'vux/x-input'
  import {userActions, globalActions} from '../../../vuex/actions'
  export default {
    vuex: {
      action: {
        bindPhone: userActions.bindPhone,
        bindPhoneEnd: userActions.bindPhoneEnd,
        showAlert: globalActions.showAlert
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
       * 点击获取验证码
       */
      getValidationCode () {
        var me = this
        console.log('Phone', this.phone)
        console.log('bindPhone', this.bindPhone)
        this.bindPhone(this.phone).then(
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
      sendIdentity () {
        var me = this
        this.bindPhoneEnd(this.phone, this.validationCode).then(
          function () {
            me.$route.router.go('/setting')
          },
          function (err) {
            me.showAlert(err)
          }
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
