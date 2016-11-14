/**
 * Created by jun on 2016/8/23.
 * 服务器请求
 */

import Vue from 'vue'
import {API_TOKEN, CONTENT_TYPE} from './serverConfig'
import store from '../vuex/store'

const userStore = store.state.user

/**
 *
 * @param url
 * @param options
 * @returns {Promise}
 */
const getWithoutAuth = ({url, options = {}}) => {
  options.headers = {
    'X-iChangtou-Json-Api-Token': API_TOKEN,
    'Content-Type': CONTENT_TYPE
  }

  return new Promise((resolve, reject) => {
    Vue.http.get(url, options).then(
      (response) => {
        resolve(response.data)
      },
      (response) => {
        reject(response.data)
      }
    )
  })
}

/**
 *
 * @param url
 * @param options
 * @param user
 * @returns {Promise}
 */
const getWithinAuth = ({url, options = {}, user = userStore}) => {
  return new Promise((resolve, reject) => {
    if (!user.isLogin && !user.userId) {
      reject('请先登录')
      return null
    }

    options.headers = {
      'X-iChangtou-Json-Api-Token': API_TOKEN,
      'Content-Type': CONTENT_TYPE,
      'X-iChangtou-Json-Api-Session': user.sessionId,
      'X-iChangtou-Json-Api-User': user.userId
    }

    Vue.http.get(url, options).then(
      (response) => {
        resolve(response.data)
      },
      (response) => {
        reject(response.data)
      }
    )
  })
}

/**
 *
 * @param url
 * @param options
 * @param data
 * @returns {Promise}
 */
const postWithoutAuth = ({url, options = {}, data}) => {
  options.headers = {
    'X-iChangtou-Json-Api-Token': API_TOKEN,
    'Content-Type': CONTENT_TYPE
  }

  return new Promise((resolve, reject) => {
    Vue.http.post(url, data, options).then(
      (response) => {
        resolve(response.data)
      },
      (response) => {
        reject(response.data)
      }
    )
  })
}

/**
 *
 * @type {Function}
 */
const postWithinAuth = ({url, options = {}, data, user = userStore}) => {
  return new Promise((resolve, reject) => {
    if (!user.isLogin && !user.userId) {
      reject('请先登录')
      return null
    }

    options.headers = {
      'X-iChangTou-Json-Api-Token': API_TOKEN,
      'Content-Type': CONTENT_TYPE,
      'X-iChangTou-Json-Api-Session': user.sessionId,
      'X-iChangTou-Json-Api-User': user.userId
    }

    Vue.http.post(url, data, options).then(
      (response) => {
        resolve(response.data)
      },
      (response) => {
        reject(response.data)
      }
    )
  })
}

/**
 *
 * @type {Function}
 */
const putWithinAuth = ({url, options = {}, data, user = userStore}) => {
  return new Promise((resolve, reject) => {
    if (!user.isLogin && !user.userId) {
      reject('请先登录')
      return null
    }

    options.headers = {
      'X-iChangTou-Json-Api-Token': API_TOKEN,
      'Content-Type': CONTENT_TYPE,
      'X-iChangTou-Json-Api-Session': user.sessionId,
      'X-iChangTou-Json-Api-User': user.userId
    }

    Vue.http.put(url, data, options).then(
      (response) => {
        resolve(response.data)
      },
      (response) => {
        reject(response.data)
      }
    )
  })
}

//======================== 拦截器,处理ajax请求=================================
/**
 *
 * @param requestInterceptor
 * @param responseInterceptor
 */
const setAjaxInterceptors = function (requestInterceptor, responseInterceptor) {
  Vue.http.interceptors.push((request, next) => {
    // modify request
    //request.method = 'POST';
    requestInterceptor(request)

    next((response) => {
      responseInterceptor(response)
      // modify response
      //response.body = '...';
    })
  })
}

const responseCodeMap = {
  OK: 200,
  ERR: 400,
  UNAUTHORIZED: 401,
  TIMEOUT: 0
}

/**
 *
 * @type {Function}
 */
const deleteWithinAuth = ({url, options = {}, user = userStore}) => {
  return new Promise((resolve, reject) => {
    if (!user.isLogin) {
      reject('请先登录')
    }

    options.headers = {
      'X-iChangTou-Json-Api-Token': API_TOKEN,
      'Content-Type': CONTENT_TYPE,
      'X-iChangTou-Json-Api-Session': user.sessionId,
      'X-iChangTou-Json-Api-User': user.userId
    }

    Vue.http.delete(url, options).then(
      (response) => {
        resolve(response.data)
      },
      (response) => {
        reject(response.data)
      }
    )
  })
}

export {
  postWithinAuth,
  postWithoutAuth,
  getWithinAuth,
  getWithoutAuth,
  putWithinAuth,
  setAjaxInterceptors,
  responseCodeMap,
  deleteWithinAuth
}
