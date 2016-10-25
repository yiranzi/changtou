/**
 * Created by jun on 2016/9/2.
 * 我的课程
 */

/**
 * 获取 推荐信息
 * @param state
 * @returns {string}
 */
export const recommend = (state) => {
  return state.myCourses.information
}

/**
 * 获取 我的课程列表
 * @param state
 * @returns {string}
 */
export const myCourseList = (state) => {
  return state.myCourses.myCourses
}

/**
 * 课程状态类型
 * @returns {{N: string, E: string, Y: string, I: string, P: string}}
 */
export const graduatedType = () => {
  return {
    N: '在读中',
    E: '课程过期',
    Y: '已毕业',
    I: '未激活',
    P: '暂停'
  }
}
