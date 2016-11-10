/**
 * Created by zl on 16/11/9.
 *
 * 全局的ajax 拦截 处理
 */
import {setAjaxInterceptors, responseCodeMap} from './frame/ajax'
//import {eventMap} from './frame/eventConfig'

const mixin = {
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
      console.log('request', req, req.method)
    },

    /**
     * 拦截响应
     * @param res
     */
    responIntercepter: function (res) {
      console.log('res', res)
      if (res.status === responseCodeMap.ERR) {
        //todo 显示浮框
      } else if (res.status === responseCodeMap.TIMEOUT) {
        // todo 超时
        // todo 向后台发送数据, 记录超时
      } else if (res.status === responseCodeMap.UNAUTHORIZED) {
        // todo 未授权,转去授权页面
        // 账户过期,请重新登录
        this.$route.router.go('/entry')
      }
    }
  }
}

export default mixin
