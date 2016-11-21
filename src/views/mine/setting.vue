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
    <ict-item :title="(strategy && strategy.strategyLevel === 'A') ? '长投宝VIP版' : '长投宝专业版'"
              :value="(!strategy || strategy.strategyLevel === 'C') ? '了解更多' : '有效期还剩'+strategy.strategyLeftDay+'天'"
              v-touch:tap="onStrategyTap">
    </ict-item>
    <ict-item title="个人资料"
              link="/personal/information"
              :disabled="!isLogin">
    </ict-item>
    <ict-item title="鼓励师首页"
              v-if="isSpire"
              link="">
    </ict-item>
    <div style="height: 1rem" class="spacer"></div>
    <ict-item title="系统消息"
              link="/system/message">
      <badge :text="badgeMessageNum" slot="badge" v-show="badgeMessageNum"></badge>
    </ict-item>
    <ict-item title="小投答疑"
              link="/self/service">
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
  import Badge from 'vux/badge'
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import IctButton from '../../components/IctButton.vue'
  import IctItem from '../../components/IctItemButton.vue'
  import {Flexbox, FlexboxItem} from 'vux/flexbox'
  import {messageGetters, userGetters} from '../../vuex/getters'
  import {jpushAddOpenHandler} from '../../vuex/jpush/actions'

  export default {
    vuex: {
      actions: {
        jpushAddOpenHandler
      },
      getters: {
        isLogin: userGetters.isLogin,
        avatar: userGetters.avatar,
        userName: userGetters.userName,
        strategy: userGetters.strategy,
        newMessageNum: messageGetters.newMsgNum
      }
    },
    computed: {
      badgeMessageNum () {
        let number = this.newMessageNum + ''
        if (this.newMessageNum === 0) {
          number = ''
        }
        return number
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

    methods: {
      doLogin   () {
        this.$route.router.go('/entry')
      },
      doRegister () {
        this.$route.router.go('/register/start')
      },
      onStrategyTap () {
        if (!this.strategy || this.strategy.strategyLevel === 'C') {
          this.$route.router.go('/strategy/professional/intro')
        } else if (this.strategy.strategyLevel === 'A') {
          this.$route.router.go('/strategy/vip/product')
        } else if (this.strategy.strategyLevel === 'B') {
          this.$route.router.go('/strategy/professional/product')
        }
      }
    },
    components: {
      IctTitlebar,
      IctButton,
      IctItem,
      Flexbox,
      FlexboxItem,
      Badge
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
