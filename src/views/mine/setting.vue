<template>
  <div class="ict-setting-view">
    <ict-titlebar :left-options="{showBack: false}" v-el:titlebar>个人中心</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div>
        <div class="ict-user-info">
          <img v-bind:src="avatarUrl" class="ict-user-avatar" v-touch:tap="gotoPersonalInfo"/>
          <p class="ict-user-name" v-touch:tap="gotoPersonalInfo">
            {{name}}
            <span class="reset-nick-name" v-if="isLogin"></span>
          </p>
          <div v-if="!isLogin" style="height: 0.75rem" class="spacer"></div>
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
        <ict-item title="鼓励师首页" v-if="isSpire&&isLogin"></ict-item>
        <ict-item :title="(strategy && strategy.strategyLevel === 'A') ? '长投宝VIP版' : '长投宝专业版'"
                  :value="(!strategy || strategy.strategyLevel === 'C') ? '了解更多' : '有效期还剩'+strategy.strategyLeftDay+'天'"
                  v-touch:tap="onStrategyTap">
        </ict-item>
        <ict-item title="优惠信息"
                  link="/coupon/details"  v-if='isCouponShow'>
        </ict-item>
        <div style="height: 1rem" class="spacer"></div>
        <ict-item title="系统消息"
                  :disabled="!isLogin"
                  link="/system/message">
          <badge :text="badgeMessageNum" slot="badge" v-show="badgeMessageNum"></badge>
        </ict-item>
        <ict-item title="小投答疑"
                  link="/self/service">
          <badge :text="badgeSuggestionNum" slot="badge" v-show="badgeSuggestionNum"></badge>
        </ict-item>
        <ict-item title="关于我们"
                  link="/contact/us">
        </ict-item>
        <div style="height: 1rem" class="spacer"></div>
        <ict-item title="设置"
                  :disabled="!isLogin"
                  link="/configuration">
        </ict-item>
      </div>
    </scroller>
  </div>
</template>
<script>
  import Badge from 'vux/badge'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import IctButton from '../../components/IctButton.vue'
  import IctItem from '../../components/IctItemButton.vue'
  import {Flexbox, FlexboxItem} from 'vux/flexbox'
  import Scroller from 'vux/scroller'
  import {messageGetters, userGetters, helpGetters, mineGetters} from '../../vuex/getters'
  import {strategyLevel} from '../../frame/userLevelConfig'
  import {eventMap} from '../../frame/eventConfig'
  import {giftActions, mineActions} from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        loadingCouponList: giftActions.loadingCouponList,
        loadIsSpire: mineActions.loadIsSpire
      },
      getters: {
        isSpire: mineGetters.isSpire,
        isLogin: userGetters.isLogin,
        avatar: userGetters.avatar,
        userName: userGetters.userName,
        strategy: userGetters.strategy,
        newMessageNum: messageGetters.newMsgNum,
        newSuggestionNum: helpGetters.newSuggestionNum
      }
    },
    data () {
      return {
        isCouponShow: false,
        scrollerHeight: '480px'
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

      badgeSuggestionNum () {
        let number = this.newSuggestionNum + ''
        if (this.newSuggestionNum === 0) {
          number = ''
        }
        return number
      },
      name () {
        return this.userName ? this.userName : ''
      },
      avatarUrl () {
        return this.avatar ? this.avatar : './static/image/defaultAvatar.png'
      }
    },
    route: {
      data (transition) {
        this.$dispatch(eventMap.ACTIVE_TAB, 2)
        const me = this
        if (this.isLogin) {
          this.loadIsSpire()
          this.loadingCouponList().then(
          function (couponList) {
            if (parseInt(couponList.length) > 0) {
             me.isCouponShow = true
             me.setScrollerHeight()
            }
          }
         )
        }

        transition.next()
      }
    },
    methods: {
      doLogin () {
        this.$route.router.go('/entry')
      },

      doRegister () {
        this.$route.router.go('/register/start')
      },

      onStrategyTap () {
        if (!this.strategy || this.strategy.strategyLevel === strategyLevel.COMMON) {
          this.$route.router.go('/strategy/professional/intro')
        } else if (this.strategy.strategyLevel === strategyLevel.VIP) {
          this.$route.router.go('/strategy/vip/product')
        } else if (this.strategy.strategyLevel === strategyLevel.PRO) {
          this.$route.router.go('/strategy/professional/product')
        }
      },

      gotoPersonalInfo () {
        if (this.isLogin) {
          this.$route.router.go('/personal/information')
        }
      },

      /**
       * 设置滚动条高度
       */
      setScrollerHeight () {
        // 设置滚动条高度为 页面高度-titlebar高度-tabbar高度
        const me = this
        const {titlebar} = this.$els
        const {tabBar} = me.$parent.$els

        me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight -
          (tabBar ? tabBar.offsetHeight : 0)) + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 150)
      }
    },
    components: {
      IctTitlebar,
      IctButton,
      IctItem,
      Flexbox,
      FlexboxItem,
      Badge,
      Scroller
    }
  }
</script>
<style lang="less">
  @import "../../assets/styles/icon.less";
  .ict-setting-view{
    p {
      margin: 0;
    }
    .ict-item:active {
      background-color: #ccc;
      color:black;
    }
    .ict-user-name {
      position: relative;
      font-size: 0.8rem;
      .reset-nick-name {
        position: absolute;
        width: 1rem;
        height:1rem;
        top: 2px;
        margin-left: 0.2rem;
        display: inline-block;
        &:after{
          font-family: 'myicon';
          content: '\e926';
          font-size: 0.8rem;
          color: #aaa;
        }
      }
    }
    .ict-user-info {
      text-align: center;
      margin: 30/20rem 0 1rem;
      .ict-user-avatar {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
      }
    }
    .into-icon:before{
      font-family: 'myicon';
      content: '\e913';
      color: #898989;
    }
    .ict-btn{
      width: 6.5rem;
      height: 1.8rem;
      border: 1px solid #00b0f0;
      border-radius: 5px;
      background: #fff;
      min-height: 0;
      padding: 0;
      color: #00b0f0;
      font-size: 0.85rem;
    }
    .itemOnFocus{
      background-color: black;
      color: white;
    }
  }
</style>
