<template>
  <div class="principal-base reset-password-start">
    <ict-titlebar>更改昵称</ict-titlebar>
    <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
      {{errTip}}
    </div>
    <flexbox>
      <flexbox-item :span="1/20"></flexbox-item>
      <flexbox-item>
        <group>
          <div style="height: 1rem"></div>
          <x-input title="昵称"
                   placeholder="输入昵称"
                   :value.sync="nickName">
          </x-input>
        </group>
        <div class="detail">
          1.支持6~12位数字、汉字、英文字母混编及纯汉字/纯英文组合；
          2.此昵称非会员名，仅做会员名片展示；
        </div>
        <div style="height: 3rem" class="spacer"></div>
        <ict-button type="default"
                    :disabled="isDisabled"
                    @click="updateNickName"
                    text="提交">
        </ict-button>
      </flexbox-item>
      <flexbox-item :span="1/20"></flexbox-item>
    </flexbox>
  </div>
</template>
<style>
 .detail {
font-size: .5rem;
margin-top: 1rem;
color: #888;
  }
</style>
<script>
import IctTitlebar from '../../components/IctTitleBar.vue'
import IctButton from '../../components/IctButton.vue'
import {Flexbox, FlexboxItem} from 'vux/flexbox'
import Group from 'vux/group'
import XInput from 'vux/x-input'
import {userActions} from '../../vuex/actions'
export default {
  vuex: {
    actions: {
      resetNickName: userActions.resetNickName
    }
  },
  data () {
    return {
      errTip: '',
      nickName: ''
    }
  },
  computed: {
    isDisabled () {
      return !(/\S/.test(this.nickName))
    }
  },
  route: {
      deactivate ({to, next}) {
          this.nickName = ''
          next()
      }
    },
 methods: {
    /**
     * 重置昵称
     */
    updateNickName () {
     this.resetNickName(this.nickName).then(
        () => { this.$route.router.go('/personal/information') }
      ).catch(
        err => {
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

