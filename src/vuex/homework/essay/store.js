/**
 * Created by jun on 2016/10/26.
 */
const state = {
  essayLessonId: '', // 问答题 lessonId
  essayType: '', // 问答题类型 null | S | H
  essayQuestion: '', // 问答题题目
  essayAnswer: '', //作业内容
  articleId: 0,
  createTime: '',  //提交时间
  remarkList: [], //留言列表
  score: 0, //作业分数
  status: '' //作业状态
}

const mutations = {
  /**
   * 更新 问答题
   * @param state
   * @param essay
   * @constructor
     */
  UPDATE_ESSAY (state, essay) {
    state.essayType = essay.assignmentType
    state.essayQuestion = essay.assignmentContent
  },
  /**
   * 更新 问答题 lessonId
   * @param state
   * @param lessonId
   * @constructor
     */
  UPDATE_ESSAY_LESSONID (state, lessonId) {
    state.essayLessonId = lessonId
  },

  /**
   * 更新 用户的作业信息
   * @param state
   * @param essay
   * @constructor
     */
  UPDATE_ESSAY_STATUS (state, essay) {
    state.essayAnswer = essay.content
    state.articleId = essay.articleId
    state.createTime = essay.create_time
    state.remarkList = essay.remarkList
    state.score = essay.score
    state.status = essay.status
  },

  /**
   * 更新 草稿内容
   * @param draft
   * @constructor
     */
  UPDATE_ESSAY_DRAFT (state, draft) {
    state.essayAnswer = draft.content
    state.articleId = draft.articleId
    state.essayLessonId = draft.lessonId
    state.createTime = draft.create_time
    state.essayQuestion = draft.assignment
  }
}

export default {
  state,
  mutations
}
