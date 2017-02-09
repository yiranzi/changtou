/**
 * Created by jun on 2017/1/24
 */
const state = {
  bookProgress: {
    bookId: 1,
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
  LOAD_BOOK_PROGRESS (state, bookProgress) {
    state.bookProgress = bookProgress
  }
}

export default {
    state,
    mutations
}
