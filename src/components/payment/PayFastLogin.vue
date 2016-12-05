/**
 * Created by jun on 2016/11/18.
 *
 */
<template>
  <div class="order-fast-login" v-if="show">
      <p class="fast-login-title">免登陆购买或<span v-touch:tap="onLoginTap" style="color: #007aff;">立即登录</span></p>
      <group>
        <flexbox>
          <flexbox-item>
            <x-input title="手机号"
                     placeholder="输入手机号"
                     :show-clear="false"
                     :readonly="isPhoneReadonly"
                     :value.sync="phone">
            </x-input>
          </flexbox-item>
          <ict-button type="mini"
                      :disabled="isValidationBtnDisable"
                      @click="getValidationCode"
                      :text="validationBtnText">
          </ict-button>
        </flexbox>
        <flexbox>
          <flexbox-item>
            <x-input title="验证码"
                     :show-clear="false"
                     placeholder="输入验证码"
                     :value.sync="validationCode">
            </x-input>
          </flexbox-item>
          <div class="code-tip">
            10分钟内有效
          </div>
        </flexbox>
      </group>
    <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
      {{errTip}}
    </div>
  </div>
</template>
<script>
  import IctButton from '../IctButton.vue'
  import {Flexbox, FlexboxItem} from 'vux/flexbox'
  import Group from 'vux/group'
  import XInput from 'vux/x-input'
  import {userActions} from '../../vuex/actions'
  import {userGetters} from '../../vuex/getters'
  import {eventMap} from '../../frame/eventConfig'
export default {
  vuex: {
    getters: {
      isLogin: userGetters.isLogin
    },
    actions: {
      fastLoginStart: userActions.fastLoginStart,
      fastLoginEnd: userActions.fastLoginEnd
    }
  },
  data () {
    return {
      errTip: '',
      phone: '',
      validationCode: '',
      validationBtnText: '获取验证码',
      isValidationBtnDisable: false,
      leftTime: 120,
      timer: null
    }
  },
  computed: {
    show () {
      return !this.isLogin
    },
    isValidationBtnDisable () {
      return !(/^1[3|4|5|7|8]\d{9}$/.test(this.phone))
    }
  },
  watch: {
    phone (newPhone) {
      this.errTip = ''
    },
    validationCode (newCode) {
      this.errTip = ''
      const me = this
      if (/^\d{6}$/.test(newCode) && /^1[3|4|5|7|8]\d{9}$/.test(this.phone)) {
        this.fastLoginEnd(this.phone, this.validationCode).then(
          (user) => {
            me.onCodeConfirm()
            me.$dispatch(eventMap.LOGIN_SUCCESS, user)
          }
        ).catch(
          err => {
            this.errTip = err.message
          }
        )
      }
    }
  },
  methods: {
    /**
     * 点击立即登录
     */
    onLoginTap () {
      this.$emit('login-tap')
    },

    /**
     * 快速登录 输入验证码完毕
     */
    onCodeConfirm () {
      this.$emit('code-confirm')
    },

    /**
     * 点击 获取验证码
     */
    getValidationCode () {
      const me = this
      if (this.phone && /^1[3|4|5|7|8]\d{9}$/.test(this.phone)) {
        me.isValidationBtnDisable = true
        me.fastLoginStart(this.phone).then(
          res => {
            me.leftTime = 120
            me.validationBtnText = '获取验证码'
            me.isValidationBtnDisable = false

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
        }).catch(
          () => {
            me.isValidationBtnDisable = false
            clearInterval(me.timer)
          }
        )
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
    width: 100%;
    height: 7rem;
    padding: 0 0 2.2rem 0;
    p {
      margin: 0;
    }
    .fast-login-title{
      height: 2rem;
      line-height: 2rem;
      padding: 0 0.5rem;
      font-size: 0.75rem;
      color: #656565;
    }
    .ict-btn-mini{
      height: 1.3rem;
      width: 4.25rem;
      margin-right: 0.5rem;
      border: 1px solid #007aff;
      border-radius: 0;
      font-size: 0.65rem;
      background: #fff;
      color: #007aff;
    }
    .ict-btn-disabled.ict-btn-mini{
      border: 1px solid #ddd;
      color: #ddd;
    }
    .code-tip{
      margin-right: 1rem;
      font-size: 0.65rem;
      color: #aaa;
    }
    .weui_cells{
      margin: 0;
      .weui_label{
        font-size: 0.7rem;
        font-weight: bold;
        color: #080808;
      }
      .weui_input{
        font-size: 0.7rem;
      }
      .weui_icon_warn{
        display: none;
      }
    }
    .vux-flex-row{
      height: 2rem;
      border-bottom: 1px solid #f0eff5;
    }
    .err-tip{
      width: 100%;
      line-height: 30px;
      background: grey;
      text-align: center;
      color: black;
      font-size: 0.7rem;
    }
    .no-err{
      background: transparent;
      color: transparent;
    }
  }
</style>
