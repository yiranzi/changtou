/**
 * Created by jun on 2016/10/26.
 *
 * 数据格式: 类似
 *
 * list: Array[]
 * {
     lessons: Array[5]
      {
         essayStatus: -1
         essayType: "N"
         hasChoice: "N"
         hasEssay: "N"
         isChoicePassed: "N"
         lessonId: 12
         sequence: 1
         subjectId: 1
         title: "入门第零课 为什么要财富自由？（免费）"
         type: "C"
      }
     status: "N"
     subjectId: 1
     title: "理财入门课"
   },
  {
    xxx
  }
  ...
 *
 *
 */
const state = {
  list: []
}

const mutations = {
  /**
   * 更新我的作业列表
   * @param state
   * @param list
   * @constructor
   */
  UPDATE_MY_HOMEWORK_LIST (state, list) {
    state.list = list
  }
}

export default {
  state,
  mutations
}
