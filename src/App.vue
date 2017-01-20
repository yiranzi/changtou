<template>
  <div id="app">
    <router-view class="ict-base-view" :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" keep-alive v-el:active-view></router-view>

    <!--bottom slot-->
    <tabbar class="ict_tabber" icon-class="vux-center" v-show="isTabbarView" slot="bottom" v-el:tab-bar>
      <tabbar-item v-link="{path:'/main'}" :selected="currTab === 0" v-touch:tap="currTab=0">
        <span class="home-icon" slot="icon"></span>
        <span class="ict_tabber-label"slot="label">首页</span>
      </tabbar-item>
      <tabbar-item v-link="{path:'/mycourse'}" :selected="currTab === 1" v-touch:tap="currTab=1">
        <span class="my-icon" slot="icon"></span>
        <span slot="label">我的课程</span>
      </tabbar-item>
      <tabbar-item v-link="{path:'/setting'}" :selected="currTab === 2" :badge="badgeNewMsgNum"v-touch:tap="currTab=2">
        <span class="setting-icon" slot="icon"></span>
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>

    <alert :show.sync="alertBox.show"
           :button-text="alertBox.btnText"
           @on-hide="hideAlert"
           class="ict-alert">{{alertBox.message}}</alert>
    <confirm
             :show.sync="confirmBox.show"
             :title="confirmBox.title"
             :confirm-text="confirmBox.okText"
             :cancel-text="confirmBox.cancelText"
             @on-confirm="confirmBox.okCallback"
             @on-cancel="confirmBox.cancelCallback">
      <p style="text-align:center;">{{{confirmBox.message}}}</p>
    </confirm>

    <div class="ict-toast" v-show.sync="toast.show">
      <div class="ict-toast-content">
        <span :class="{'success':toast.type === 'success'}"></span>
        {{toast.message}}
      </div>
    </div>

    <div id="mask"></div>
    <div id="routerMask"></div>

    <!--新手测试-->
    <!--<div class="newertest-pop" v-if="isShowNewTestPop">-->
      <!--<div class="newertest-pop-close" v-touch:tap="closeNewerTestPop"></div>-->
      <!--<div class="newertest-pop-img">-->
        <!--<img src="./assets/styles/image/newertest/tip/tipImg.png" style=" width: 16.7rem; height: 10.4rem;">-->
      <!--</div>-->
    <!--</div>-->

  </div>
</template>

<script>
  import store from './vuex/store'
  import {messageActions} from './vuex/actions'
  import {messageGetters, helpGetters} from './vuex/getters'
  import Alert from 'vux/alert'
  import Toast from 'vux/toast'
  import Confirm from 'vux/confirm'
  import {Tabbar, TabbarItem} from 'vux/tabbar'

  import mixinEvent from './mixinEvent'
  import mixinAjax from './mixinAjax'
  import mixinModal from './mixinModal'
  import mixinBackHandler from './mixinBackHandler'
  import mixinNetwork from './mixinNetwork'
  import mixinStatistics from './mixinStatistics'
  import mixinWxSdk from './mixinWxSdk'

  import {eventMap} from './frame/eventConfig'

  export default {
    mixins: [mixinEvent, mixinAjax, mixinModal, mixinBackHandler, mixinNetwork, mixinStatistics, mixinWxSdk],

    store,

    vuex: {
      getters: {
        route: (state) => state.route,
        direction: (state) => state.global.direction,
        newMsgNum: messageGetters.newMsgNum,
        newSuggestionNum: helpGetters.newSuggestionNum
      },

      actions: {
        addNewMessageNum: messageActions.addNewMessageNum
      }
    },

    data () {
      return {
        currTab: 0,
        tabList: [0, 1, 2]
      }
    },

    watch: {
      route (newRoute) {
        this.$dispatch(eventMap.VIEW_CHANGE, newRoute.path)
      }
    },

    computed: {
      badgeNewMsgNum () {
        let num = this.newSuggestionNum + this.newMsgNum
        return num ? (num + '') : ''
      },

      isTabbarView () {
        return this.route.path === '/main' || this.route.path === '/setting' || this.route.path === '/mycourse'
      }
    },

    created () {
//      this.showNewTestPopIf()
    },

    events: {
      [eventMap.ACTIVE_TAB] (itemIndex) {
        this.currTab = itemIndex
      }
    },

    methods: {
      /**
       * 接收消息, 显示消息提示
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
    /*font-family: "Microsoft YaHei" ! important;*/
    font-family:"Microsoft YaHei","微软雅黑",Arial,Helvetica,sans-serif,"宋体";
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

  .ict-base-view{
    height: 100%;
  }
  /**
  * vue-router transition
  */
  .vux-pop-out-transition,
  .vux-pop-in-transition {
    width: 100%;
    animation-duration: 0.3s;
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

  .weui_dialog_alert{
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
    height: 2.5rem;
    & &_item{
      padding-top: 2px;
      text-decoration: initial;
      .weui_tabbar_icon{
        margin: 0.2rem auto 0;
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
      margin: 0;
    }
    .weui_tabbar_item.weui_bar_item_on .weui_tabbar_label{
      margin: 0;
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
  .ict-float-mask{
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.6);
  }
  .ict-float-component{
    position: fixed;
    z-index: 5000;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .ict-toast{
    position: absolute;
    z-index: 50000;
    top: 30%;
    width: 100%;
    height: 0;
    text-align: center;
    .ict-toast-content{
      display: inline-block;
      font-size: 0.75rem;
      text-align: center;
      color: #fff;
      opacity: 0.8;
      border-radius: 10px;
      background-color: #000;
      p{
        margin: 0;
      }
      .success{
        position: relative;
        display: block;
        margin: 0 auto;
        width: 4rem;
        height: 4rem;
      }
      .success:before{
        position: absolute;
        display: block;
        width: 4rem;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        font-family: 'myicon';
        content: '\e914';
        font-size: 2.5rem !important;
      }
      padding: 0.5rem 1rem;
    }
  }
  .ict-loading-mask{
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
    opacity: 0.6;
  }
  .ict-loading-content{
    position: fixed;
    z-index: 5000;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 24/40rem;
    color: #aaa;
    p{
      margin: 20/40rem 0;
    }
  }
  .ict-loading-img{
    width: 4rem;
    height: 4rem;
  }
</style>
