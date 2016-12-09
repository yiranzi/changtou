/**
 * Created by Administrator on 2016/8/21.
 */

/**
 *
 * @param dispatch
 * @param config
 *  type: '' 默认显示对勾 | text 不显示对勾
 */
export const showToast = ({ dispatch }, config = {msg: '', type: ''}) => {
  if (typeof config === 'string') {
    let msg = config
    config = {}
    config.msg = msg
  }
  config.status = true
  dispatch('UPDATE_TOAST', config)
}

export const showAlert = ({ dispatch }, config = {msg: ''}) => {
  if (typeof config === 'string') {
    let msg = config
    config = {}
    config.msg = msg
  }
  config.status = true
  dispatch('UPDATE_ALERT', config)
}

export const showConfirm = ({ dispatch }, config = {title: '', msg: ''}) => {
  config.status = true
  dispatch('UPDATE_CONFIRM', config)
}
