/**
 * Created by Administrator on 2016/11/24.
 */

/**
 * 获取当前网络状态
 * @returns {*|null|string}
 */

const netState = () => {
//  let networkState = navigator.connection.type
  const states = {}

  states[Connection.UNKNOWN]  = 'Unknown connection'
  states[Connection.ETHERNET] = 'Ethernet connection'
  states[Connection.WIFI]     = 'WiFi connection'
  states[Connection.CELL_2G]  = 'Cell 2G connection'
  states[Connection.CELL_3G]  = 'Cell 3G connection'
  states[Connection.CELL_4G]  = 'Cell 4G connection'
  states[Connection.CELL]     = 'Cell generic connection'
  states[Connection.NONE]     = 'No network connection'

}


export {
  netState
}

