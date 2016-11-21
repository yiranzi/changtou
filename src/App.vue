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
      <tabbar-item v-link="{path:'/setting'}" :selected="route.path === '/project/donate'" :badge="badgeNewMsgNum">
        <span class="setting-icon" slot="icon"></span>
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>

    <alert :show.sync="alertBox.show"
           :button-text="alertBox.btnText"
           class="ict-alert">{{alertBox.message}}</alert>
    <toast class="ict-toast"
           :show.sync="toast.show"
           :type="toast.type">{{toast.message}}</toast>
    <confirm :show.sync="confirmBox.show"
             :title="confirmBox.title"
             :confirm-text="confirmBox.okText"
             :cancel-text="confirmBox.cancelText"
             @on-confirm="confirmBox.okCallback"
             @on-cancel="confirmBox.cancelCallback">
      <p style="text-align:center;">{{{confirmBox.message}}}</p>
    </confirm>

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
  import {messageGetters} from './vuex/getters'
  import Alert from 'vux/alert'
  import Toast from 'vux/toast'
  import Confirm from 'vux/confirm'
  import {Tabbar, TabbarItem} from 'vux/tabbar'
  import {setLocalCache, getLocalCache} from './util/cache'

  import mixinEvent from './mixinEvent'
  import mixinAjax from './mixinAjax'
  import mixinModal from './mixinModal'
  import mixinBackHandler from './mixinBackHandler'

  export default {
    mixins: [mixinEvent, mixinAjax, mixinModal, mixinBackHandler],

    store,

    vuex: {
      getters: {
        route: (state) => state.route,
        direction: (state) => state.global.direction,
        newMsgNum: messageGetters.newMsgNum
      },

      actions: {
        addNewMessageNum: messageActions.addNewMessageNum
      }
    },

    data () {
      return {
        isShowNewTestPop: false
      }
    },

    computed: {
      badgeNewMsgNum () {
        return this.newMsgNum ? (this.newMsgNum + '') : ''
      },

      isTabbarView () {
        return this.route.path === '/main' || this.route.path === '/setting' || this.route.path === '/mycourse'
      }
    },

    created () {
      this.showNewTestPopIf()
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
      },

      //判断是否显示新手测试弹框
      showNewTestPopIf () {
        if (getLocalCache('first-test')) {
          this.isShowNewTestPop = false
        } else {
          this.isShowNewTestPop = true
        }
      },
      //关闭新手测试弹框
      closeNewerTestPop () {
        this.isShowNewTestPop = false
        setLocalCache('first-test', true)
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
