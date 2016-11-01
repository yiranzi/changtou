<template>
  <div class="ict-setting-view">
    <ict-titlebar :left-options="{showBack: false}">个人中心</ict-titlebar>
    <div class="ict-user-info">
      <img v-bind:src="avatarUrl" class="ict-user-avatar"/>
      <p class="ict-user-name">{{name}}</p>
      <div v-if="!isLogin" style="height: 1rem" class="spacer"></div>
      <flexbox v-if="!isLogin">
        <flexbox-item :span="1/10"></flexbox-item>
        <ict-button text="登录"
                    v-touch:tap="doLogin">
        </ict-button>
        <flexbox-item :span="1/10"></flexbox-item>
        <ict-button text="注册"
                    v-touch:tap="doRegister">
        </ict-button>
        <flexbox-item :span="1/10"></flexbox-item>
      </flexbox>
    </div>
    <ict-item title="个人资料"
              link="/personal/information"
              :disabled="!isLogin">
    </ict-item>
    <ict-item title="指数宝"
              v-if="isZSB"
              link="">
    </ict-item>
    <ict-item title="鼓励师首页"
              v-if="isSpire"
              link="">
    </ict-item>
    <div style="height: 1rem" class="spacer"></div>
    <ict-item title="系统消息"
              link="/system/message" v-touch:tap="viewSystemMessage">
      <badge :text="newMessageNumber" slot="badge" v-show="newMessageNumber"></badge>
    </ict-item>
    <ict-item title="意见反馈"
              link="/feedback">
    </ict-item>
    <ict-item title="关于我们"
              link="/contact/us">
    </ict-item>
    <div style="height: 1rem" class="spacer"></div>
    <ict-item title="设置"
              link="/configuration">
    </ict-item>
  </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import IctButton from '../../components/IctButton.vue'
  import IctItem from '../../components/IctItemButton.vue'
  import {Flexbox, FlexboxItem} from 'vux/flexbox'
  import {userGetters} from '../../vuex/getters'
  import {setLocalCache} from '../../util/cache'
  import {setIconBadgeNumber} from '../../plugin/jpush'
  import Badge from 'vux/badge'
  import store from '../../vuex/store'

  const commit = store.commit || store.dispatch
  export default {
    vuex: {
      getters: {
        isLogin: userGetters.isLogin,
        avatar: userGetters.avatar,
        userName: userGetters.userName,
        strategy: userGetters.strategy,
        newMessageNum: userGetters.newMessageNum
      }
    },
    computed: {
      newMessageNumber () {
        let number = this.newMessageNum + ''
        if (this.newMessageNum === 0) {
          number = ''
        }
        return number
      },
      isZSB () {
        return this.strategy && (this.strategy.strategyLevel === 'A')
      },
      isSpire () {

      },
      name () {
        return this.userName ? this.userName : '未登录'
      },
      avatarUrl () {
        return this.avatar ? this.avatar : './static/image/defaultAvatar.png'
      }
    },
    components: {
      IctTitlebar,
      IctButton,
      IctItem,
      Flexbox,
      FlexboxItem,
      Badge
    },
    methods: {
      doLogin: function () {
        this.$route.router.go('/entry')
      },
      doRegister: function () {
        this.$route.router.go('/register/start')
      },
      viewSystemMessage () {
        //重置消息数量
        if (this.newMessageNum) {
          setTimeout(function () {
            commit('USER_EMPTY_NEW_MESSAGE_NUM')
          }, 1000)
          setLocalCache('frame-user', {newMessageNum: 0})
        }
        //设置应用显示角标
        setIconBadgeNumber(0)
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/styles/icon.less";
  .ict-setting-view{
    p {
      margin: 0;
    }
    .ict-user-info {
      text-align: center;
      margin: 1rem;
      .ict-user-avatar {
        width: 3.4rem;
        height: 3.4rem;
        border-radius: 50%;
      }
    }
    .into-icon:before{
      font-family: 'myicon';
      content: '\e913';
      color: #898989;
    }
    .ict-btn{
      height: 1.8rem;
    }
  }
</style>
