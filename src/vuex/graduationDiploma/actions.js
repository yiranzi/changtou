/**
 * Created by jun on 2016/12/7.
 */
import {getWithinAuth, postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取专业版介绍
 * @param dispatch
 * @returns {Promise}
 */
export const getDiplomaList = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('graduation_diploma_list')
        }
      ).then(
        list => {
          dispatch('GRADUATION_UPDATE_DIPLOMA_LIST', list)
          resolve(list)
        },
        err => {
          reject(err)
        }
      )
    }
  )
}

/**
 * 抽奖
 * @param dispatch
 * @param drawType
 * @param subjectId
 * @returns {Promise}
 */
export const getDraw = ({dispatch}, {drawType, subjectId}) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth(
        {
          url: getUrl('graduation_draw'),
          data: {
            drawType,
            subjectId,
            userId: 'dc602a74c0574092b7f2224078e1f313'
          }
        }
      ).then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
    }
  )
}
