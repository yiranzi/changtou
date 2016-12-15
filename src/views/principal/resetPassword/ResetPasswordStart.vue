<template>
    <div class="reset-password-start">
      <ict-titlebar>重置密码</ict-titlebar>

      <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
        {{errTip}}
      </div>

      <ict-input title="手机号"
               placeholder="输入手机号"
               :value.sync="phone">
      </ict-input>

      <div style="height: 4rem" class="spacer"></div>

      <div class="btn-box">
        <ict-button type="default"
                  :disabled="isDisabled"
                  v-touch:tap="sendPhone"
                  text="提交">
        </ict-button>
      </div>

      <div style="height: 4rem" class="spacer"></div>
    </div>
</template>
<script>
import IctTitlebar from '../../../components/IctTitleBar.vue'
import IctButton from '../../../components/IctButton.vue'
import IctInput from '../../../components/form/IctInput.vue'
import {userActions} from '../../../vuex/actions'
export default {
  vuex: {
    actions: {
      resetPasswordStart: userActions.resetPasswordStart
    }
  },
  data () {
    return {
      phone: '',
      errTip: ''
    }
  },
  computed: {
    isDisabled () {
      return !(/^1[3|4|5|7|8]\d{9}$/.test(this.phone))
    }
  },
  watch: {
    phone () {
      this.errTip = ''
    }
  },
  methods: {
    /**
     * 点击下一步
     */
    sendPhone () {
      this.resetPasswordStart(this.phone).then(
        () => this.$route.router.go('/reset/password/' + this.phone)
      ).catch(
        err => { this.errTip = err.message }
      )
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
  .reset-password-start{

  }
</style>
