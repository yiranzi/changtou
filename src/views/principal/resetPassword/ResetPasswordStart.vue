<template>
    <div class="principal-base reset-password-start">
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
                     :value.sync="phone">
            </x-input>
          </group>
          <div style="height: 3rem" class="spacer"></div>
          <ict-button type="default"
                    :disabled="isDisabled"
                    @click="sendPhone"
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
import {userActions, globalActions} from '../../../vuex/actions'
export default {
  vuex: {
    actions: {
      resetPasswordStart: userActions.resetPasswordStart,
      showAlert: globalActions.showAlert
    }
  },
  data () {
    return {
      errTip: '',
      phone: ''
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
        () => { this.$route.router.go('/reset/password/' + this.phone) }
      ).catch(
        err => { this.errTip = err.message }
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
  .reset-password-start{

  }
</style>
