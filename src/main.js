import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueTouch from 'vue-touch'
import VueResource from 'vue-resource'
import {appRouter} from './util/appRouter'
import {eventMap} from './frame/eventConfig'
import ictData from './statistics/ictData'
import {debug} from './util/environment'
require('es6-promise').polyfill()

Vue.use(VueTouch)
Vue.use(VueResource)

Vue.config.debug = debug

ictData.init()

if (debug) {
  // 网页
  appRouter.start(App, 'app')
  setTimeout(function () {
    appRouter.app.$emit(eventMap.APP_START)
  }, 50)
} else {
  // 手机
  const onDeviceReady = function () {
    appRouter.start(App, 'app')
    setTimeout(function () {
      appRouter.app.$emit(eventMap.APP_START)
    }, 50)
  }
  document.addEventListener('deviceready', onDeviceReady, false)
}
