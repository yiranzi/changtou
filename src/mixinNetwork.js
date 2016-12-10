/**
 * Created by ritsuyan on 16/11/18.
 *
 * 监听是否联网或者断网或者为 Wifi 状态
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
      if (networkState === 'none' || networkState === 'unknown') {
        this.showToast({message: '您已断开网络连接'})
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
