<template>
  <div id="app">
    <router-view class="view" :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" keep-alive></router-view>

    <!--bottom slot-->
    <tabbar class="ict_tabber" icon-class="vux-center" v-show="isTabbarView" slot="bottom" v-el:tab-bar>
      <tabbar-item v-link="{path:'/main'}" :selected="route.path === '/main'">
        <span class="home-icon" slot="icon"></span>
        <span class="ict_tabber-label"slot="label">首页</span>
      </tabbar-item>
      <tabbar-item v-link="{path:'/mycourse'}" :selected="isDemo" >
        <span class="my-icon" slot="icon"></span>
        <span slot="label">我的课程</span>
      </tabbar-item>
      <tabbar-item v-link="{path:'/setting'}" :selected="route.path === '/project/donate'" :badge="badgeNewMessageNum">
        <span class="setting-icon" slot="icon"></span>
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>

    <!--global-->
    <alert :show.sync="isAlert" button-text="知道了" class="ict-alert">{{alertMsg}}</alert>
    <toast :show.sync="isToast" class="ict-toast" :type="toastType">{{toastMsg}}</toast>
    <confirm :show.sync="isConfirm"
             :title="confirmTitle"
             :confirm-text="confirmText"
             :cancel-text="cancelText"
             @on-confirm="onAction('confirm')"
             @on-cancel="onAction('cancel')">
      <p style="text-align:center;">{{{confirmMsg}}}</p>
    </confirm>
  </div>
</template>

<script>
  import store from './vuex/store'
  import {userActions} from './vuex/actions'
  import Alert from 'vux/alert'
  import Toast from 'vux/toast'
  import Confirm from 'vux/confirm'
  import {Tabbar, TabbarItem} from 'vux/tabbar'
  import {userGetters} from './vuex/getters'
  import mixins from './vuex/mixins'

  export default {
    mixins: mixins,

    store,

    vuex: {
      getters: {
        route: (state) => state.route,
        direction: (state) => state.direction,
        newMessageNum: userGetters.newMessageNum
      },
      actions: {
        initUser: userActions.initUser,
        addNewMessageNum: userActions.addNewMessageNum,
        resetNewMessageNum: userActions.resetNewMessageNum
      }
    },

    data () {
      return store.state.global
    },
    created () {
      //初始化，加载用户
      this.initUser()
    },

    computed: {
      badgeNewMessageNum () {
        let number = this.newMessageNum + ''
        if (this.newMessageNum === 0) {
          number = ''
        }
        return number
      },
      isTabbarView () {
        return this.route.path === '/main' || this.route.path === '/setting' || this.route.path === '/mycourse'
      }
    },

    methods: {
      /**
       * 接收消息
       */
      onReceiveNotification () {
        this.addNewMessageNum()
      },

      onAction (type) {
        if (type === 'confirm') {
          this.confirmHandler()
        } else if (type === 'cancel') {
          this.cancelHandler()
        }
      }
    },

    components: {
      Alert,
      Toast,
      Tabbar,
      TabbarItem,
      Confirm
    }
  }
</script>

<style lang="less">
  @import "assets/styles/animate.less";
  html {
    height: 100%;
    font-family: "Microsoft YaHei" ! important;
    overflow-x: hidden;
  }

  body {
    display: flex;
    background: #f0eff5;
    /*align-items: center;*/
    /*justify-content: center;*/
    height: 100%;
    width: 100%;
    margin: 0;
  }

  #app {
    width: 100%;
    height: 100%;
  }


  /**
  * vue-router transition
  */
  .vux-pop-out-transition,
  .vux-pop-in-transition {
    width: 100%;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    backface-visibility: hidden;
  }
  .vux-pop-out-enter,
  .vux-pop-out-leave,
  .vux-pop-in-enter,
  .vux-pop-in-leave {
    will-change: transform;
    height: 100%;
    position: absolute;
    left: 0;
  }
  .vux-pop-out-enter {
    animation-name: popInLeft;
  }
  .vux-pop-out-leave {
    animation-name: popOutRight;
  }
  .vux-pop-in-enter {
    perspective: 1000;
    animation-name: popInRight;
  }
  .vux-pop-in-leave {
    animation-name: popOutLeft;
  }
  @keyframes popInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes popOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes popInRight {
    from {
      transform: translate3d(100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes popOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(100%, 0, 0);
    }
  }

  .weui_dialog_confirm{
    .weui_dialog{
      border-radius: 10px;
      .weui_dialog_hd{
        padding: 36/40rem 0 0 ;
      }
      .weui_dialog_title{
        line-height: 82/40rem;
        font-size: 34/40rem;
        color: #000;
      }
      .weui_dialog_bd{
        padding: 24/40rem 1rem 48/40rem;
        font-size: 30/40rem;
        color: #000;
        p{
          margin: 0;
        }
      }
      .weui_dialog_ft{
        font-size: 34/40rem;
        margin-top: 0;
      }
    }
    .weui_btn_dialog.default {
      line-height: 100/40rem;
      color: #007aff;
    }
    .weui_btn_dialog.primary{
      line-height: 100/40rem;
      color: #007aff;
    }
  }

  .weui_tabbar{
    &_item{
      text-decoration: initial;
      .weui_tabbar_icon{
        display: block;
        width: 1.4rem;
        height: 1.4rem;
        text-align: center;
      }

      .weui_tabbar_label{
        font-size: 0.5rem;
        line-height: 0.7rem;
        color: #7a7a7a;
      }
    }
    .weui_tabbar_item .weui_tabbar_label{
      margin: 0 0 0.5rem;
    }
    .weui_tabbar_item.weui_bar_item_on .weui_tabbar_label{
      margin: 0 0 0.5rem;
      font-size: 0.5rem;
      line-height: 0.7rem;
      color: #409af4;
    }
  }


  .ict-tabber{
    &-icon{
      display: block;
      width: 1.4rem;
      height: 1.4rem;
    }
  }
  .home-icon:before{
    color: #7a7a7a;
    font-family: 'myicon';
    font-size: 1.1rem;
    line-height: 1.4rem;
    content: '\e900';
  }
  .weui_tabbar_item.weui_bar_item_on .home-icon:before {
    content: '\e901';
    color: #409af4;
  }
  .my-icon:before{
    color: #7a7a7a;
    font-family: 'myicon';
    font-size: 1.1rem;
    line-height: 1.4rem;
    content: '\e902';
  }
  .weui_tabbar_item.weui_bar_item_on .my-icon:before{
    content: '\e903';
    color: #409af4;
  }
  .setting-icon:before{
    color: #7a7a7a;
    font-family: 'myicon';
    font-size: 1.1rem;
    line-height: 1.4rem;
    content: '\e904';
  }
  .weui_tabbar_item.weui_bar_item_on .setting-icon:before{
    content: '\e905';
    color: #409af4;
  }

</style>
