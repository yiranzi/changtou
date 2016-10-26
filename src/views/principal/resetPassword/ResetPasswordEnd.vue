<template>
    <div>
      <ict-titlebar>重置密码</ict-titlebar>
      <flexbox>
        <flexbox-item :span="1/20"></flexbox-item>
        <flexbox-item>
          <group>
            <x-input title="手机号"
                     placeholder="输入手机号"
                     v-if=false
                     :value.sync="phone">
            </x-input>
            <x-input title="密码"
                     placeholder="输入密码"
                     :value.sync="plainPassword">
            </x-input>
            <x-input title="确认密码"
                     placeholder="请再次输入密码"
                     :value.sync="conformedPlainPassword">
            </x-input>
          </group>
          <div style="height: 4rem" class="spacer"></div>
          <ict-button type="default"
                    :disabled="isDisabled"
                    @click="doResetPassword"
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
    actions: {
      resetPasswordEnd: userActions.resetPasswordEnd,
      showAlert: globalActions.showAlert
    }
  },
  data () {
    return {
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
  methods: {
    /**
     * 点击完成重置密码
     */
    doResetPassword () {
      if (this.conformedPlainPassword === this.plainPassword) {
        this.resetPasswordEnd(this.phone, this.plainPassword).then(
          () => window.history.go(-3),
          (err) => this.showAlert(err)
        )
      } else {
        this.showAlert('两次输入的密码不一致')
      }
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
