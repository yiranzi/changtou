/**
 * Created by jun on 2016/8/23.
 */
import {postWithoutAuth, postWithinAuth, getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
import {getLocalCache} from '../../util/cache'

export const initUser = ({ dispatch }) => {
  const user = getLocalCache('frame-user')
  user && dispatch('UPDATE_USER', user)
}

/**
 * 登录
 * @param dispatch
 * @param identity
 * @param plainPassword
 */
export const login = ({ dispatch }, identity, plainPassword) => {
  return new Promise(
    (resolve, reject) => {
    postWithoutAuth(
      {
        url: getUrl('principal_login'),
        data: {
          identity,
          plainPassword
        }
      }
    ).then(
      user => {
        dispatch('UPDATE_USER', user)
        resolve()
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 登出
 * @param dispatch
 */
export const logout = ({ dispatch }) => {
  dispatch('LOGOUT_USER')
}

/**
 * 同步用户信息
 * @param dispatch
 */
export const syncUser = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('sync_user')
        }
      ).then(
        user => {
          dispatch('UPDATE_USER', user)
          resolve()
        },
        err => {
          reject(err)
        }
      )
    }
  )
}

/**
 * 快速登录
 * @param dispatch
 * @param phone
 * @param validationCode
 */
export const fastLogin = ({ dispatch }, phone, validationCode) => {
  postWithoutAuth(
    {
      url: getUrl('principal_login'),
      data: {
        phone,
        validationCode
      }
    }
  ).then(
    user => {
      dispatch('UPDATE_USER', user)
    },
    err => console.warn(err)
  )
}

/**
 * 注册1 发送 用户名 密码
 * @param dispatch
 * @param phone
 * @param plainPassword
 */
export const registerStart = ({ dispatch }, phone, plainPassword) => {
  return new Promise(
    (resolve, reject) => {
      postWithoutAuth(
        {
          url: getUrl('register_post_pone'),
          data: {
            phone,
            plainPassword
          }
        }
      ).then(
        () => resolve(),
        err => {
          reject(err.message)
        }
      )
    })
}

/**
 * 注册2 发送  用户名 密码 验证码
 * @param dispatch
 * @param phone
 * @param plainPassword
 * @param validationCode
 */
export const registerEnd = ({ dispatch }, phone, plainPassword, validationCode) => {
  return new Promise(
    (resolve, reject) => {
    postWithoutAuth(
      {
        url: getUrl('register_post_password_app'),
        data: {
          phone,
          plainPassword,
          validationCode
        }
      }
    ).then(
      user => {
        dispatch('UPDATE_USER', user)
        resolve()
      },
      err => {
        reject(err.message)
      }
    )
  })
}

/**
 * 开始重置密码
 * @param dispatch
 * @param phone
 * @returns {Promise}
 */
export const resetPasswordStart = ({ dispatch }, phone) => {
  return new Promise(
    (resolve, reject) => {
    postWithoutAuth(
      {
        url: getUrl('reset_password_post_pone'),
        data: {
          phone
        }
      }
    ).then(
      res => {
        resolve()
      },
      err => {
        reject(err.message)
      }
    )
  })
}

/**
 * 重置密码 发送手机号，密码
 * @param dispatch
 * @param phone
 * @param validationCode
 * @returns {Promise}
 */
export const resetPassword = ({ dispatch }, phone, validationCode) => {
  return new Promise(
    (resolve, reject) => {
    postWithoutAuth(
      {
        url: getUrl('reset_password_post_code'),
        data: {
          phone,
          validationCode
        }
      }
    ).then(
      () => {
        resolve()
      },
      (err) => {
        reject(err.message)
      }
    )
  })
}

export const resetPasswordEnd = ({ dispatch }, phone, newPlainPassword) => {
  return new Promise(
    (resolve, reject) => {
    postWithoutAuth(
      {
        url: getUrl('reset_password_post_password'),
        data: {
          phone,
          newPlainPassword
        }
      }
    ).then(
      () => {
        resolve()
      },
      err => {
        reject(err.message)
      }
    )
  })
}

/**
 * 绑定手机号
 */
export const bindPhone = ({ dispatch }, phone) => {
  return new Promise(
    (resolve, reject) => {
      postWithoutAuth(
        {
          url: getUrl('bind_phone_post_pone'),
          data: {
            phone
          }
        }
      ).then(
        res => {
          resolve()
        },
        err => {
          reject(err.message)
        }
      )
    })
}

/**
 * 绑定手机号，发送验证码
 */
export const bindPhoneEnd = ({ dispatch }, phone, validationCode) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth(
        {
          url: getUrl('bind_phone_post_code'),
          data: {
            phone,
            validationCode
          }
        }
      ).then(
        () => {
          dispatch('UPDATE_PHONE', phone)
          resolve()
        },
        err => {
          reject(err.message)
        }
      )
    })
}

