import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueTouch from 'vue-touch'
import VueResource from 'vue-resource'
import {configRouter} from './frame/routeConfig'
import {Device, platformMap} from './plugin/device'
import eventBus from './util/eventBus'
import {eventMap} from './frame/eventConfig'
require('es6-promise').polyfill()

Vue.use(VueTouch)
Vue.use(VueResource)
Vue.use(VueRouter)

const appRouter = new VueRouter({
  hashbang: true
})

configRouter(appRouter)

/**
 *
 * @type {boolean}
 */
if (/pay-[A-Z]{1,2}-\d{1,2}/.test(window.location.href)) {
  let path = window.location.hash.substr(2)
  appRouter.on(path, {
    component: require('./views/pay/Order.vue')
  })
}

Vue.config.debug = process.env.NODE_ENV === 'dev'

// start run app
if ((Device.platform === platformMap.WEB)) {
  // on develop environment
  appRouter.start(App, 'app')
  eventBus.emit(eventMap.APP_START)
} else {
  // on production environment

  const app = {
    // Application Constructor
    initialize: function () {
      this.bindEvents()
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
      //app.receivedEvent('deviceready');
      eventBus.emit(eventMap.APP_START)
      appRouter.start(App, 'app')
      window.navigator.splashscreen.hide()
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
      var parentElement = document.getElementById(id)
      var listeningElement = parentElement.querySelector('.listening')
      var receivedElement = parentElement.querySelector('.received')

      listeningElement.setAttribute('style', 'display:none;')
      receivedElement.setAttribute('style', 'display:block;')

      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}
