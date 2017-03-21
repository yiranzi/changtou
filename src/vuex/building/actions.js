/**
 * Created by zyr on 2017.3.16
 * 造房子
 */
import {getWithinAuth, postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

/**
 * 获取物品状态
 * @param dispatch
 */
export const getBuildingGoodsStatus = ({ dispatch }, subjectId) => {
  return new Promise((resolve, reject) => {
    getWithinAuth({
      url: getUrl('building_goods_status').replace(':subjectId', subjectId)
    }).then(
      data => {
        dispatch('BUILDING_GOODS_STATUS', data)
        resolve(data)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 更新物品状态
 * @param dispatch
 */
export const updataBuildingGoodsStatus = ({ dispatch }, subjectId, goods) => {
  console.log(goods)
  return new Promise((resolve, reject) => {
    postWithinAuth(
      {
        url: getUrl('building_goods_status').replace(':subjectId', subjectId),
        data: {
          goods
        }
      }
    ).then(
      data => {
        dispatch('BUILDING_UPDATA', data)
        resolve(data)
      },
      err => {
        reject(err)
      }
    )
  })
}
