/**
 * Created by jun on 2016/8/23.
 */
import {postWithoutAuth, postWithinAuth, getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
import {getLocalCache, clearLocalCache} from '../../util/cache'
//import {getLocalCache, setLocalCache} from '../../util/cache'
//import {setIconBadgeNumber} from '../../plugin/jpush'

//export const loadUserFromCache = ({ dispatch }) => {
//  const user = getLocalCache('frame-user')
//  user && dispatch('UPDATE_USER', user)
//}

/**
 * 全局更新 账户信息
 * @param dispatch
 * @param user
 */
const updateAppUser = (dispatch, user) => {
  // 分别设置  user，系统消息，策略产品权限，鼓励师权限信息
  if (user) {
    dispatch('USER_UPDATE', user)
    dispatch('MESSAGE_UPDATE_NEW_MSG_NUM', user.newMessageNum)
    // todo 设置鼓励师权限
    // todo 设置产品策略类权限
  }
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
        updateAppUser(dispatch, user)
        resolve(user)
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
  dispatch('USER_LOGOUT')
}

/**
 * 同步用户信息
 * @param dispatch
 */
export const syncUser = ({ dispatch }) => {
  const localUser = getLocalCache('frame-user')
  return new Promise(
    (resolve, reject) => {
      // 如果本地没有记录, 直接返回
      if (!localUser) {
        reject(null)
      } else {
        getWithinAuth(
          {
            url: getUrl('sync_user'),
            user: localUser
          }
        ).then(
          user => {
            updateAppUser(dispatch, user)
            resolve(user)
          },
          err => {
            clearLocalCache('frame-user')
            reject(err)
          }
        )
      }
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
      updateAppUser(dispatch, user)
      //resolve(user)
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
        updateAppUser(dispatch, user)
        resolve(user)
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
