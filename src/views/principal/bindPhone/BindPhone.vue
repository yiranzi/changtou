<template>
  <div class="principal-base bind-phone">
    <ict-titlebar>{{userPhone ? '修改手机号' : '绑定手机号'}}</ict-titlebar>
    <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
      {{errTip}}
    </div>
    <flexbox>
      <flexbox-item :span="1/20"></flexbox-item>
      <flexbox-item>
        <group>
          <div style="height: 1rem"></div>
          <x-input title="手机号"
                   placeholder="请输入新手机号"
                   :value.sync="phone">
          </x-input>
        </group>
      </flexbox-item>
      <flexbox-item :span="1/20"></flexbox-item>
    </flexbox>
    <div style="height: 3rem" class="spacer"></div>
    <ict-button type="default"
                :disabled="isDisabled"
                @click="sendPhone"
                text="下一步">
    </ict-button>
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
  import {userGetters} from '../../../vuex/getters'
  import {userActions} from '../../../vuex/actions'
  export default {
    vuex: {
      getters: {
        userPhone: userGetters.phone
      },
      actions: {
        bindPhone: userActions.bindPhone
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
        this.bindPhone(this.phone).then(
          () => this.$route.router.go('/bind/phone/end/' + this.phone)
        ).catch(
          err => {
           console.dir('err')
           this.errTip = err.message
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
<style lang="less">
.bind-phone{
  .ict-btn {
    width: 84%;
  }
}
</style>
