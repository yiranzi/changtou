/**
 * Created by zl on 16/10/31.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import {configRouter} from '../frame/routeConfig'

Vue.use(VueRouter)

let appRouter = new VueRouter({
  hashbang: true
})

configRouter(appRouter)

/**
 * 动态添加路由
 * @type {boolean}
 */
if (/pay-[A-Z]{1,2}-\d{1,2}/.test(window.location.href)) {
  let path = window.location.hash.substr(2)
  appRouter.on(path, {
    component: require('../views/pay/Order.vue')
  })
}

console.log('appRouter.app', appRouter.app)
let rootVm = appRouter.app

export {
  appRouter,
  rootVm
}
