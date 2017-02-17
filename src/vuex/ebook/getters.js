/**
 * Created by jun on 2017/1/24
 */

/**
 * 电子书的进度
 * @param state
 * @returns {state.book1Progress|{bookId, createTime, sectionIndex, totalOwnerNum}|*}
 */
export const bookProgress = (state) => {
  return state.ebook.bookProgress
}
