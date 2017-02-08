/**
 * Created by jun on 2017/1/24
 */
const state = {
  book1Progress: {
    bookId: 1,
    createTime: '',
    sectionIndex: 0,
    totalOwnerNum: 0
  },
  book2Progress: {
    bookId: 2,
    createTime: '',
    sectionIndex: 0,
    totalOwnerNum: 0
  }
}

const mutations = {
  /**
   *
   * @param state
   * @param bookProgress
   * @constructor
     */
  LOAD_BOOK1_PROGRESS (state, bookProgress) {
    state.book1Progress = bookProgress
  },
  /**
   *
   * @param state
   * @param bookProgress
   * @constructor
     */
  LOAD_BOOK2_PROGRESS (state, bookProgress) {
    state.book2Progress = bookProgress
  }
}

export default {
    state,
    mutations
}
