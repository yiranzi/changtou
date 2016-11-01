import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueTouch from 'vue-touch'
import VueResource from 'vue-resource'
import {appRouter} from './util/appRouter'
import {Device, platformMap} from './plugin/device'
//import eventBus from './util/eventBus'
import {eventMap} from './frame/eventConfig'
import {init} from './plugin/jpush'
require('es6-promise').polyfill()

Vue.use(VueTouch)
Vue.use(VueResource)

Vue.config.debug = process.env.NODE_ENV === 'dev'

const app = {
  onDeviceReady: function () {
    //app.receivedEvent('deviceready')
    window.navigator.splashscreen.hide()
    init()  //消息推送 Jpush
  },

  receivedEvent: function (id) {
    var parentElement = document.getElementById(id)
    var listeningElement = parentElement.querySelector('.listening')
    var receivedElement = parentElement.querySelector('.received')

    listeningElement.setAttribute('style', 'display:none;')
    receivedElement.setAttribute('style', 'display:block;')

    console.log('Received Event: ' + id)
  }
}

const onDeviceReady = () => {
  appRouter.start(App, 'app')
  eventBus.emit(eventMap.APP_START)

  if ((Device.platform !== platformMap.WEB)) {
    app.onDeviceReady()
  }
}

document.addEventListener('deviceready', onDeviceReady, false)
