import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueTouch from 'vue-touch'
import VueResource from 'vue-resource'
import {appRouter} from './util/appRouter'
//import {Device, platformMap} from './plugin/device'
import {eventMap} from './frame/eventConfig'
require('es6-promise').polyfill()

Vue.use(VueTouch)
Vue.use(VueResource)

Vue.config.debug = process.env.NODE_ENV === 'dev'

//const onDeviceReady = () => {
appRouter.start(App, 'app')
//window.navigator.splashscreen.hide()

setTimeout(function () {
  appRouter.app.$emit(eventMap.APP_START)
}, 50)

//if ((Device.platform !== platformMap.WEB)) {
//  app.onDeviceReady()
//}
//}

//document.addEventListener('deviceready', onDeviceReady, false)
