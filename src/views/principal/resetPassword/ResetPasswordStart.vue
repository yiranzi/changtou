<template>
    <div>
      <ict-titlebar>重置密码</ict-titlebar>
      <flexbox>
        <flexbox-item :span="1/20"></flexbox-item>
        <flexbox-item>
          <group>
            <x-input title="手机号"
                     placeholder="输入手机号"
                     :value.sync="phone">
            </x-input>
          </group>
          <div style="height: 4rem" class="spacer"></div>
          <ict-button type="default"
                    :disabled="isDisabled"
                    @click="sendPhone"
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
      phone: ''
    }
  },
  computed: {
    isDisabled () {
      return !(/^1[3|4|5|7|8]\d{9}$/.test(this.phone))
    }
  },
  methods: {
    /**
     * 点击下一步
     */
    sendPhone () {
      this.resetPasswordStart(this.phone).then(
        () => this.$route.router.go('/reset/password/' + this.phone),
        (err) => this.showAlert(err)
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
