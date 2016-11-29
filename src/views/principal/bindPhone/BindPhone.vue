<template>
  <div>
    <ict-titlebar>绑定手机号</ict-titlebar>
    <flexbox>
      <flexbox-item :span="1/20"></flexbox-item>
      <flexbox-item>
        <group>
          <x-input title="手机号"
                   placeholder="请输入新手机号"
                   :value.sync="phone">
          </x-input>
        </group>
        <div style="height: 4rem" class="spacer"></div>
        <ict-button type="default"
                    :disabled="isDisabled"
                    @click="sendPhone"
                    text="下一步">
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
  export default {
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
        this.$route.router.go('/bind/phone/end/' + this.phone)
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
