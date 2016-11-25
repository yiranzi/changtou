/**
 * Created by zl on 16/10/31.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import {configRouter} from '../frame/routeConfig'
import {goodsType} from '../util/pay/dealHelper'
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
  let type = path.split('-')[1]
  if (type === goodsType.PRO_STRATEGY) {
    appRouter.on(path, {
      component: require('../views/pay/ProStrategyOrder.vue')
    })
  } else if (type === goodsType.VIP_STRATEGY) {
    appRouter.on(path, {
      component: require('../views/pay/VipStrategyOrder.vue')
    })
  } else if (type === goodsType.SUBJECT) {
    appRouter.on(path, {
      component: require('../views/pay/SubjectOrder.vue')
    })
  } else if (type === goodsType.COMMON_TOPIC) {
    appRouter.on(path, {
      component: require('../views/pay/CommonTopicOrder.vue')
    })
  } else if (type === goodsType.SPEC_TOPIC) {
    appRouter.on(path, {
      component: require('../views/pay/SpecTopicOrder.vue')
    })
  } else if (type === goodsType.POSTPONE) {
    appRouter.on(path, {
      component: require('../views/pay/PostponeOrder.vue')
    })
  }
}

//Object.defineProperty(appRouter, 'vm', { get: function () { return this.app } })

export {
  appRouter
}
