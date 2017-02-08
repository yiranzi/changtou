/**
 * Created by jun on 2017/1/24
 */

/**
 * 电子书1的进度
 * @param state
 * @returns {state.book1Progress|{bookId, createTime, sectionIndex, totalOwnerNum}|*}
 */
export const book1Progress = (state) => {
  return state.ebook.book1Progress
}

/**
 * 电子书2的进度
 * @param state
 * @returns {state.book2Progress|{bookId, createTime, sectionIndex, totalOwnerNum}|*}
 */
export const book2Progress = (state) => {
  return state.ebook.book2Progress
}
