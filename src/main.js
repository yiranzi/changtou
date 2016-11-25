import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueTouch from 'vue-touch'
import VueResource from 'vue-resource'
import {appRouter} from './util/appRouter'
import {eventMap} from './frame/eventConfig'
require('es6-promise').polyfill()

Vue.use(VueTouch)
Vue.use(VueResource)

Vue.config.debug = process.env.NODE_ENV === 'dev'

// start run app
//if ((Device.platform === platformMap.WEB)) {
  // on develop environment
//  appRouter.start(App, 'app')
//  eventBus.emit(eventMap.APP_START)
//} else {
  // on production environment

  //const app = {
    // Application Constructor
    //initialize: function () {
    //  this.bindEvents()
    //},

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    //bindEvents: function () {
    //  document.addEventListener('deviceready', this.onDeviceReady, false)
    //},

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    //onDeviceReady: function () {
      //app.receivedEvent('deviceready');

      //eventBus.emit(eventMap.APP_START)

//=====手机=====
// const onDeviceReady = function () {
//  appRouter.start(App, 'app')
//  setTimeout(function () {
//    appRouter.app.$emit(eventMap.APP_START)
//  }, 50)
// }
// document.addEventListener('deviceready', onDeviceReady, false)

// =====网页=====
appRouter.start(App, 'app')
setTimeout(function () {
  appRouter.app.$emit(eventMap.APP_START)
}, 50)

    //},
    // Update DOM on a Received Event
    //receivedEvent: function (id) {
    //  var parentElement = document.getElementById(id)
    //  var listeningElement = parentElement.querySelector('.listening')
    //  var receivedElement = parentElement.querySelector('.received')
    //
    //  listeningElement.setAttribute('style', 'display:none;')
    //  receivedElement.setAttribute('style', 'display:block;')
    //
    //  console.log('Received Event: ' + id)
    //}
  //}

  //app.initialize()
//}
