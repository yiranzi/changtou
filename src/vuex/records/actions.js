/**
 * Created by jun on 2016/8/23.
 */
import {postWithoutAuth, getWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
import {getLocalCache, setLocalCache} from '../../util/cache'

export const initUser = ({ dispatch }) => {
  const user = getLocalCache('frame-user')
  user && dispatch('LOGIN', user)
}

/**
 * 登录
 * @param dispatch
 * @param identity
 * @param plainPassword
 */
export const login = ({ dispatch }, identity, plainPassword) => {
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
      setLocalCache('frame-user', user)
      dispatch('LOGIN', user)
    },
    err => console.warn(err)
  )
}

/**
 * 同步用户信息
 * @param dispatch
 */
export const syncUser = ({ dispatch }) => {
  getWithinAuth(
    {
      url: getUrl('sync_user')
    }
  ).then(
    user => {
      setLocalCache('frame-user', user)
      dispatch('SYNC_USER', user)
    },
    err => console.warn(err)
  )
}

/**
 * 快速登录
 * @param dispatch
 * @param identity
 * @param plainPassword
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
      setLocalCache('frame-user', user)
      dispatch('FAST_LOGIN', user)
    },
    err => console.warn(err)
  )
}
