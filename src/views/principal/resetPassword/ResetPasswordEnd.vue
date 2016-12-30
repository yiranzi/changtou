<template>
    <div class="principal-base reset-password-end">
      <ict-titlebar>重置密码</ict-titlebar>
      <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
        {{errTip}}
      </div>

      <ict-input title="手机号"
               placeholder="输入手机号"
               v-if=false
               :value.sync="phone">
      </ict-input>

      <div style="height: 1rem"></div>

      <ict-input title="密码"
               type="password"
               placeholder="输入密码"
               :value.sync="plainPassword">
      </ict-input>

      <div style="height: 1rem"></div>

      <ict-input title="确认密码"
               placeholder="请再次输入密码"
               :value.sync="conformedPlainPassword">
      </ict-input>

    <div style="height: 3rem" class="spacer"></div>

    <div class="btn-box">
      <ict-button type="default"
                :disabled="isDisabled"
                v-touch:tap="doResetPassword"
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
export default {
  vuex: {
    actions: {
      logout: userActions.logout,
      resetPasswordEnd: userActions.resetPasswordEnd
    }
  },
  data () {
    return {
      errTip: '',
      phone: this.$route.params.phone,
      plainPassword: '',
      conformedPlainPassword: ''
    }
  },
  computed: {
    isDisabled () {
      return !((/^(?![0-9]+$)(?![a-zA-Z]+$)(?!_+$)[A-Za-z0-9_]{6,16}$/.test(this.plainPassword)))
    }
  },
  watch: {
    plainPassword () {
      this.errTip = ''
    },
    conformedPlainPassword () {
      this.errTip = ''
    }
  },

  route: {
    deactivate () {
      this.phone = ''
      this.errTip = ''
      this.plainPassword = ''
      this.conformedPlainPassword = ''
    }
  },

  methods: {
    /**
     * 点击完成重置密码
     */
    doResetPassword () {
      const me = this
      if (me.conformedPlainPassword === this.plainPassword) {
        this.resetPasswordEnd(this.phone, this.plainPassword).then(
          () => {
            me.logout()
            me.$dispatch(eventMap.LOGOUT)
            window.history.go(-3)
          }
        ).catch(
          err => { me.errTip = err.message }
        )
      } else {
        me.errTip = '两次输入的密码不一致'
      }
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
  .reset-password-end{

  }
</style>
