/**
 * Created by zl on 16/11/18.
 *
 * 监听是否联网或者断网或者为 WLAN状态
 */

const mixin = {
  ready () {
    document.addEventListener('offline', this.offlineHandler.bind(this), false)
    document.addEventListener('online', this.onlineHandler.bind(this), false)
  },

  methods: {
    offlineHandler () {
      const networkState = window.navigator.connection.type
      // ('无网络')
      if (networkState === 'Connection.NONE' || networkState === 'Connection.UNKNOWN') {
        this.showToast({message: '您已断开网络连接'})       // point to the window ,we must bind(this) then point to Vue and find the method.
      //  console.log('this is none ', networkState)
      }
    },
    onlineHandler () {
      const networkState = window.navigator.connection.type
      //  判断当前为什么网络
      if (networkState === 'cell_4g' || networkState === 'cell_3g' || networkState === 'cell_2g') {
        this.showToast({message: '您当前为 4G/3G/2G ,请注意流量使用情况或可使用WIFI'})
      }
    }
  }
}

export default mixin
