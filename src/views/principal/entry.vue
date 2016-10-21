<template>
  <div>
    <ict-titlebar>登陆</ict-titlebar>
    <flexbox>
      <flexbox-item :span="1/20"></flexbox-item>
      <flexbox-item>
        <group>
          <x-input title="用户名"
                   class="custom-input"
                   text-align="left"
                   placeholder="输入长投用户名/手机号"
                   :value.sync="identity" >
          </x-input>
          <x-input title="密码 "
                 class="custom-input"
                 text-align="left"
                 placeholder="输入密码"
                 :value.sync="plainPassword" >

          </x-input>
        </group>

        <div style="height: 4rem" class="spacer"></div>
        <ict-button type="default"  v-touch:tap="doLogin">登陆</ict-button>

        <flexbox>
          <ict-button type="string" text="注册" v-touch:tap="doRegister"></ict-button>
          <flexbox-item></flexbox-item>
          <ict-button type="string" text="忘记密码"  v-touch:tap="doResetPassword"></ict-button>
        </flexbox>

      </flexbox-item>
      <flexbox-item :span="1/20"></flexbox-item>
    </flexbox>
    <alert :show.sync="isAlert" button-text="知道了" class="ict-alert">{{alertMsg}}</alert>
  </div>
</template>
<style>
</style>
<script>
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import IctButton from '../../components/IctButton.vue'
  import {Flexbox, FlexboxItem} from 'vux/flexbox'
  import Group from 'vux/group'
  import XInput from 'vux/x-input'
  import {userGetters} from '../../vuex/getters'
  import {userActions} from '../../vuex/actions'
  import Alert from 'vux/alert'
  export default{
    vuex: {
      getters: {
        userName: userGetters.userName
      },
      actions: {
        login: userActions.login
      }
    },

    data () {
      return {
        isAlert: false,
        alertMsg: '',
        plainPassword: 'hujunlove',
        identity: '茗小铭'
      }
    },

    methods: {
      doLogin () {
//        window.history.go(-1)
        this.login(this.identity, this.plainPassword).then(
          () => this.$route.router.go('/setting'),
          err => this.showAlert(err.message)
        )
      },
      doRegister () {
        this.$route.router.go('/register/start')
      },
      doResetPassword () {
        this.$route.router.go('/reset/password/start')
      },
      showAlert (err) {
        this.alertMsg = err
        this.isAlert = true
      }
    },

    components: {
      IctTitlebar,
      IctButton,
      Flexbox,
      FlexboxItem,
      Group,
      XInput,
      Alert
    }
  }
</script>
