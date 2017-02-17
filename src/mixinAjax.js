/**
 * Created by zl on 16/11/9.
 *
 * 全局的ajax 拦截 处理
 */
import {setAjaxInterceptors, responseCodeMap} from './frame/ajax'
import {Jpush} from './plugin/jpush'
import {userActions} from './vuex/actions'
//import {eventMap} from './frame/eventConfig'

const mixin = {
  vuex: {
    actions: {
      logout: userActions.logout
    }
  },

  created () {
    // 配置ajax拦截请求
    setAjaxInterceptors(this.requestIntercepter, this.responIntercepter)
  },

  methods: {
    /**
     *  拦截请求
     * @param req
     */
    requestIntercepter: function (req) {
      // todo nothing
      //console.log('request', req, req.method)
    },
    isSystemUpdate: function (reJsonData) {
      if (reJsonData.up || reJsonData.up === '_sys_now') {
        return true
      }
    },
    showSystempUpdatePage: function () {
      this.showMask({
        component: 'SystemUpdate.vue',
        hideOnMaskTap: true,
        callbackName: 'loadingClose',
        callbackFn: setTimeout(this.loadingClose.bind(this), 30000)
      })
    },
    loadingClose () {
      this.isMaskShow = false
      this.hideMask()
    },

    /**
     * 拦截响应
     * @param res
     */
    responIntercepter: function (res) {
      // 若返回值不是object, 强制转换
      if (this.isSystemUpdate(res.data)) {
        // TODO 终结ajax请求
        this.showSystempUpdatePage()
      }
      if (typeof res.data === 'string') {
        try {
          res.data = JSON.parse(res.data)
        } catch (e) {
          //todo 上传此错误
        }
      }

      if (res.status === responseCodeMap.ERR) {
        //todo 显示浮框
      } else if (res.status === responseCodeMap.TIMEOUT) {
        // todo 超时
        // todo 向后台发送数据, 记录超时
      } else if (res.status === responseCodeMap.UNAUTHORIZED) {
        // todo 未授权,转去授权页面
        // 账户过期,请重新登录
        this.logout().then(function () {
          Jpush.setAlias('00')
        })
        this.showToast({message: '账户过期,请重新登录'})
        this.$route.router.go('/entry')
      }
    }
  }
}

export default mixin
