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
        <ict-button type="default"  v-touch:tap="doLogin" :disabled="disabled">登陆</ict-button>

        <flexbox>
          <ict-button type="string" text="注册" v-touch:tap="doRegister"></ict-button>
          <flexbox-item></flexbox-item>
          <ict-button type="string" text="忘记密码" v-touch:tap="doResetPassword"></ict-button>
        </flexbox>

         <div class="third-party-container" v-if='isAuthPanelShow'>
           <div class="third-text-container">
             <i class="horizon-line"></i>
             <p class="third-text">第三方登录</p>
             <i class="horizon-line"></i>
           </div>
              <div class="third-icon icon-qq" :class='IconPosCen' v-if="showQQ" >
                <span class="third-icon-qq" v-touch:tap='onQQLoginTap'></span>
                QQ登录
              </div>
              <div class="third-icon icon-wx" :class='IconPosCen' v-if='showWx'>
                <span class="third-icon-wx" v-touch:tap='onWxLoginTap'></span>
                微信登录
              </div>
         </div>
      </flexbox-item>
      <flexbox-item :span="1/20"></flexbox-item>
    </flexbox>
  </div>
</template>
<style>
         .third-party-container{
            width:100%;
            margin-top: 8rem;
            font-size: 70%;
            margin-left: .8rem;
         }
         .horizon-line{
           display: inline-block;
           width: 30%;
           background:#BFB3B3;
           height: .05rem;
           vertical-align: middle;
         }
         .third-text{
           display: inline-block;
           margin-left: .5rem;
           margin-right: .5rem;
         }
         .third-icon{
           display: inline-block;
         }
         .third-icon span{
           display: block;
           width:2.4rem;
           height:2.4rem;
         }
         .third-icon-qq{
           background: url("../../assets/styles/image/loginView/QQ.png") no-repeat center center/90%;
         }
         .third-icon-wx{
           background: url("../../assets/styles/image/loginView/weixin.png") no-repeat center center/90%;
         }
         .icon-qq{
           margin-right: 8rem;
         }
         .icon-poscen{
           position: relative;
           left: 38%;
         }

</style>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import IctButton from '../../components/IctButton.vue'
  import {Flexbox, FlexboxItem} from 'vux/flexbox'
  import Group from 'vux/group'
  import XInput from 'vux/x-input'
  import {userGetters} from '../../vuex/getters'
  import {userActions} from '../../vuex/actions'
  import {eventMap} from '../../frame/eventConfig'
  import qqAuth from '../../plugin/thirdPartyQQ'
  import wxAuth from '../../plugin/thirdPartyWX'
  import {Device, platformMap} from '../../plugin/device'
  export default {
    vuex: {
      getters: {
        userName: userGetters.userName
      },
      actions: {
        login: userActions.login,
        loginByQQ: userActions.loginByQQ,
        loginByWx: userActions.loginByWx
      }
    },
    data () {
      return {
        plainPassword: '',
        identity: '',
        disabled: true,
        qqIcon: '',               // 是否居中
        wxIcon: '',                // 是否居中
        showQQ: true,               // 是否显示qq
        showWx: true,        //  是否显示微信
        IconPosCen: ''
      }
    },
    watch: {
      identity (newVal) {
        if (/\S/.test(newVal) && /\S/.test(this.plainPassword)) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      },
      plainPassword (newVal) {
        if (/\S/.test(this.identity) && /\S/.test(newVal)) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      }
    },
    route: {
      data (transition) {
        if (Device.platform === platformMap.IOS) {
          const checkList = []
          const me = this
          checkList.push(qqAuth.checkQQInstalled())
          checkList.push(wxAuth.checkWxInstalled())
          return Promise.all(checkList).then(function (reArr) {
            if (reArr[0] && reArr[1]) {
              me.IconPosCen = ''
            } else if (reArr[0] || reArr[1]) {
              me.IconPosCen = 'icon-poscen'
            } else {
              me.IconPosCen = ''
            }
            return {
              showQQ: reArr[0],
              showWx: reArr[1],
              IconPosCen: me.IconPosCen
            }
          })
        }
        }
    },
    computed: {
      isAuthPanelShow () {
         return this.showQQ || this.showWx
      },
      qqIcon () {
          return this.showQQ
      },
      wxIcon () {
          return this.showWx
      }
    },
    methods: {
//     isInstalledWX, isInstalledQQ,
      onQQLoginTap () {
        const me = this
        qqAuth.QQAuth().then(
            qqCode => {
                me.loginByQQ(qqCode).then(
                    user => {
                        me.$dispatch(eventMap.LOGIN_SUCCESS, user)
                        window.history.back()
                    }
                )
            }
        ).catch(
            err => console.dir(err)
        )
      },
      onWxLoginTap () {
        const me = this
        wxAuth.WxAuth().then(
          wxCode => {
            me.loginByWx(wxCode).then(
              user => {
                me.$dispatch(eventMap.LOGIN_SUCCESS, user)
                window.history.back()
              }
            )
          }
        ).catch(
          err => console.dir(err)
        )
      },
      doLogin () {
        this.disabled = true
        const me = this
        if (/\S/.test(this.identity) && /\S/.test(this.plainPassword)) {
          this.login(this.identity, this.plainPassword).then(
            (user) => {
            me.disabled = true
            me.$dispatch(eventMap.LOGIN_SUCCESS, user)
            window.history.back()
          }).catch(
              err => {
                  console.dir(err)
                me.disabled = false
            }
          )
        } else {
          me.disabled = true
        }
      },
      doRegister () {
        this.$route.router.go('/register/start')
      },
      doResetPassword () {
        this.$route.router.go('/reset/password/start')
      }
    },
    components: {
      IctTitlebar,
      IctButton,
      Flexbox,
      FlexboxItem,
      Group,
      XInput
    }
  }
</script>
