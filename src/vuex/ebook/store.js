/**
 * Created by jun on 2017/1/24
 */
const state = {
  bookProgress: []
}
const mutations = {
  LOAD_BOOK_PROGRESS (state, {bookId, bookProgress}) {
    let bookIndex = state.bookProgress.findIndex(function (book) {
      return parseInt(book.bookId) === parseInt(bookId)
    })
    if (bookIndex < 0) {
      state.bookProgress.push({
        bookId,
        bookProgress
      })
    } else {
      state.bookProgress[bookIndex] = {
        bookId,
        bookProgress
      }
    }
  }
}

export default {
    state,
    mutations
}
