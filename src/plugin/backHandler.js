/**
 * Created by jun on 2016/11/11.
 */

let backHandler = null
let doubleBack = false
let viewPath = ''
const backHandlerInit = () => {
  document.addEventListener('backbutton', backManager)
}

const backHandlerSet = (backHandlerFromView, path) => {
  viewPath = path
  backHandler = backHandlerFromView
}

const backManager = () => {
  if (viewPath === '/main' || viewPath === '/mycourse' || viewPath === '/setting') {
    if (doubleBack) {
      window.navigator.app.exitApp()
    } else {
      doubleBack = true
      setTimeout(() => {
        doubleBack = false
      }, 2000)
    }
  } else {
    backHandler()
  }
}

export {
  backHandlerInit,
  backHandlerSet
}

//Ext.define('education.util.plugin.BackHandler', {
//  alternateClassName: 'BackHandler',
//  singleton: true,
//
//  config: {
//    quitDesire: false
//  },
//
//  VIEW_HANDLER: 'backButtonHandler', //各个视图的物理键处理函数
//
//  /**
//   *
//   */
//  constructor: function(config){
//    this.initConfig(config);
//  },
//
//  /**
//   * back事件初始化
//   */
//  backHandlerInit: function(){
//
//  },
//
//  /**
//   * 后退处理
//   */
//  backHandler: function(){
//
//    if( BackHandler._isPreventDefault() ){
//      return;
//    }
//
//    if(UrlHistory.getUrlCount() === 1){
//      BackHandler.quitApp();
//    }else{
//      location.back();
//    }
//  },
//
//  /**
//   * 是否阻止默认事件
//   * @returns {boolean}
//   * @private
//   */
//  _isPreventDefault: function(){
//
//    //如果视图有自定义的物理键拦截动作，则优先执行。
//    var activeView = Cmp.getActiveView();
//    if( activeView && activeView[this.VIEW_HANDLER]){
//      if( activeView[this.VIEW_HANDLER].apply(activeView) ){
//        return true;
//      }
//    }
//
//    return false;
//  },
//
//  /**
//   * 退出app
//   */
//  quitApp: function(){
//    var me = this;
//    if(me.getQuitDesire()){
//      EventBus.fireEvent(eventMap.QUIT_APP);
//      navigator.app.exitApp();
//      me.setQuitDesire(false);
//    }else{
//      Msg.showFloatPanel('再按一次退出长投学堂',2000);
//      me.setQuitDesire(true);
//      setTimeout(function(){
//        me.setQuitDesire(false);
//      },2000);
//    }
//  }

//let confirmQuit = false
