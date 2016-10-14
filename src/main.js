//import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueTouch from 'vue-touch'
import VueResource from 'vue-resource'
import {configRouter} from './frame/routeConfig'
require('es6-promise').polyfill()

Vue.use(VueTouch)
Vue.use(VueResource)
Vue.use(VueRouter)

const appRouter = new VueRouter({
  hashbang: true
})

configRouter(appRouter)

Vue.config.debug = process.env.NODE_ENV === 'dev'

appRouter.start(App, 'app')

// start run app
if (process.env.NODE_ENV === 'development') {
  // on develop environment
  appRouter.start(App, 'app')
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

