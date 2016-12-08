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
          const newShowDiploma = list.find(
            function (diploma) {
              return !diploma.show
            }
          )
          const newDrawDiploma = list.find(
            function (diploma) {
              return diploma.drawStatus === 'N'
            }
          )
          dispatch('GRADUATION_UPDATE_SHOW_DIPLOMA', newShowDiploma)
          dispatch('GRADUATION_UPDATE_DRAW_DIPLOMA', newDrawDiploma)
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
            subjectId
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

/**
 * 获取 课程详情
 * @param dispatch
 * @param subjectId
 * @returns {Promise}
 */
export const getDiplomaDetails = ({dispatch}, subjectId) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('graduation_diploma_details').replace(':subjectId', subjectId)
        }
      ).then(
        details => {
          dispatch('GRADUATION_UPDATE_DIPLOMA_DETAILS', details)
          resolve(details)
        },
        err => {
          reject(err)
        }
      )
    }
  )
}
