/**
 * Created by jun on 2016/9/2.
 */

const state = {
  information: '',
  myCourses: [],
  accumulateTime: 0
}

const mutations = {

  /**
   * 更新 我的课程
   * @param state
   * @param courses
   * @constructor
   */
  UPDATE_MY_COURSES (state, courses) {
    state.information = courses.information
    state.myCourses = courses.myCourses
  },

  UPDATE_ACCUMULATE_TIME (state, time) {
    state.accumulateTime = time
  }
}

export default {
  state,
  mutations
}
