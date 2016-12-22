<template>
  <div class="principal-base reset-nike-name">
    <ict-titlebar>更改昵称</ict-titlebar>
    <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
      {{errTip}}
    </div>
    <ict-input
      :value.sync="nickName"
      placeholder="输入昵称"
      title="昵称">
    </ict-input>
      <div class="detail">
        1.支持4~12位数字、汉字(2~6位)、英文字母混编及纯汉字/纯英文组合；
        2.此昵称非会员名，仅做会员名片展示；
      </div>
      <div style="height: 3rem" class="spacer"></div>
    <div class="btn-box">
      <ict-button type="default"
                  :disabled="isDisabled"
                  @click="updateNickName"
                  text="提交">
      </ict-button>
    </div>
  </div>
</template>
<style lang="less">
  .reset-nike-name{
    width: 100%;
    height: 100%;
    .detail {
      width: 76%;
      margin: 1rem 12% 0;
      font-size: .5rem;
      color: #888;
    }
  }
</style>
<script>
import IctTitlebar from '../../components/IctTitleBar.vue'
import IctButton from '../../components/IctButton.vue'
import IctInput from '../../components/form/IctInput.vue'
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

  watch: {
    nickName: function () {
      this.errTip = ''
    }
  },

  route: {
      deactivate ({to, next}) {
          this.nickName = ''
          this.errTip = ''
          next()
      }
    },
 methods: {
    /**
     * 重置昵称
     */
    updateNickName () {
     this.resetNickName(this.nickName).then(
        () => { window.history.back() }
      ).catch(
        err => {
          this.errTip = err.message
        }
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

