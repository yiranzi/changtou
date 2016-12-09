/**
 * Created by Administrator on 2016/8/21.
 */
const state = {
  isLoading: false,

  isConfirm: false,
  confirmMsg: '',
  confirmTitle: '',
  cancelText: '',
  confirmText: '',
  confirmHandler: () => {},
  cancelHandler: () => {},

  isAlert: false,
  alertMsg: '',

  isToast: false,
  toastMsg: '',
  toastType: '',

  direction: 'forward'
}

const mutations = {
  UPDATE_LOADING (state, {status, msg = ''}) {
    state.isLoading = status
    state.alertMsg = msg
  },
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  },
  UPDATE_ALERT (state, {status, msg = ''}) {
    state.isAlert = status
    state.alertMsg = msg
  },
  UPDATE_TOAST (state, {status, msg = '', type = ''}) {
    state.toastMsg = msg
    state.isToast = status
    state.toastType = type
  },
  UPDATE_CONFIRM (state, {status, cancelText = '取消', confirmText = '确定', title = '', msg = '',
    confirmHandler = () => {}, cancelHandler = () => {}}) {
    state.isConfirm = status
    state.cancelText = cancelText
    state.confirmText = confirmText
    state.confirmTitle = title
    state.confirmMsg = msg
    state.confirmHandler = confirmHandler
    state.cancelHandler = cancelHandler
  }
}

export default {
  state,
  mutations
}
