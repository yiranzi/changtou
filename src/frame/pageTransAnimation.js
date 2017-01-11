/**
 * Created by zl on 16/11/18.
 *
 * 页面跳转动画(方向)控制
 */

/**
 * 取出 用户openId
 * 以免被清除
 */
const changTou = window.sessionStorage.getItem('wxOauth2')
const zhouLe = window.sessionStorage.getItem('zhouLe')

/**
 * 清除路由
 * @type {Storage}
 */
let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

/**
 * 清除session后
 * 设置 用户openId
 */
window.sessionStorage.setItem('wxOauth2', changTou)
window.sessionStorage.setItem('zhouLe', zhouLe)

/**
 *
 * @param router
 * @param commit
 */
const setRouterHook = (router, commit) => {
  router.beforeEach(({ to, from, next }) => {
    if (to.path === '/main') {
      // 若是进入导航页, 总是返回, 动画从左到右
      commit('UPDATE_DIRECTION', 'reverse')
    } else if (to.path === '/mycourse') {
      // 进入我的课程页面
      if (from.path && from.path === '/main') {
        // 从导航页进入, 动画从右到左
        commit('UPDATE_DIRECTION', 'forward')
      } else {
        commit('UPDATE_DIRECTION', 'reverse')
      }
    } else if (to.path && to.path === '/setting') {
      // 进入个人中心页面
      if (from.path && (from.path === '/main' || from.path === '/mycourse')) {
        // 从导航页或者我的课程进入, 动画从右到左
        commit('UPDATE_DIRECTION', 'forward')
      } else {
        commit('UPDATE_DIRECTION', 'reverse')
      }
    } else {
      // 其他非底栏页面统一处理
      const toIndex = history.getItem(to.path)
      const fromIndex = history.getItem(from.path)
      if (toIndex) {
        if (toIndex > fromIndex) {
          commit('UPDATE_DIRECTION', 'forward')
        } else {
          commit('UPDATE_DIRECTION', 'reverse')
        }
      } else {
        commit('UPDATE_DIRECTION', 'forward')
      }
      //commit('UPDATE_LOADING', true)
    }

    // 记录
    const toIndex = history.getItem(to.path)
    if (!toIndex) {
      ++historyCount
      history.setItem('count', historyCount)
      to.path !== '/' && history.setItem(to.path, historyCount)
    }

    setTimeout(next, 50)
  })

  //router.afterEach(() => {
  //  commit('UPDATE_LOADING', false)
  //})
}

export {
  setRouterHook
}
