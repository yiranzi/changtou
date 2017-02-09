/**
 * Created by jun on 2017/1/24
 */
import {getWithinAuth, putWithinAuth, postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

//全部电子书章节信息
const allBookChapters = [
  [
    {
      name: '认识一个好老师',
      chapterId: 0
    },
    {
      name: '了解是投资的基础',
      chapterId: 1
    },
    {
      name: '赚多赚少大不同',
      chapterId: 2
    },
    {
      name: '资产负债大盘点',
      chapterId: 3
    },
    {
      name: '钱从哪儿来，又到哪去',
      chapterId: 4
    },
    {
      name: '投资的路才刚刚开始',
      chapterId: 5
    }
  ],
  [
    {
      name: '理财是一件迫在眉睫的事情',
      chapterId: 0
    },
    {
      name: '初识基金',
      chapterId: 2
    },
    {
      name: '如何找到好基金',
      chapterId: 3
    }
  ]
]

//全部电子书 id和name对应关系
const allBookArr = [
  {
    bookName: '大雄股市历险记',
    bookIntro: '大雄萌发学习股票投资的念头，可是这个念头差点被曾经投资失败的爸爸妈妈扼杀在摇篮里。幸好神通广大的小叮当支持大雄，为大雄找了一个神秘的老师',
    img: '../../../static/image/ebook/bookCover1.png',
    bookId: 1,
    docName: 'NobitaAdventure'
  },
  {
    bookName: '手把手教你选基金',
    bookIntro: '不久前我们另一本基金宝典受到了各位小伙伴们热情的欢迎，小伙伴们纷纷表示对基金的知识非常感兴趣，想要进一步系统的学习基金投资的有关知识。应大家的强烈要求，我们快马加鞭，呕心沥血，日夜兼程，又为大家带来了这本《零基础小白的基金探索之旅》，小伙伴们是不是很惊喜呢！',
    img: '../../../static/image/ebook/bookCover2.png',
    bookId: 2,
    docName: 'MutualFundsBasics'
  }
]

//获取电子书 id和name对应关系
export const bookArr = ({dispatch}, bookId) => {
  return allBookArr.find(
    function (book) {
      return parseInt(book.bookId) === parseInt(bookId)
    }
  )
}

// 获取书籍的章节列表
export const bookChapters = ({dispatch}, bookId) => {
  return allBookChapters[parseInt(bookId) - 1]
}

/**
 * 获取电子书阅读进度
 * '/e-book/record/:bookId'
 * get/book/progress
 */
export const getBookProgress = ({ dispatch }, bookId) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('get/book/progress').replace(':bookId', bookId)
      }).then(
        function (message) {   // 信息: Id, createTime, Chapter
          dispatch('LOAD_BOOK_PROGRESS', message)
          resolve(message)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 更新电子书阅读进度
 * /:bookId/:sectionIndex
 * update/book/progress
 */
export const updateBookProgress = ({ dispatch }, bookId, sectionIndex) => {
  return new Promise(
    (resolve, reject) => {
      putWithinAuth({
        url: getUrl('update/book/progress').replace(':bookId', bookId).replace(':sectionIndex', sectionIndex)
      }).then(
        function (message) {
          resolve(message)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 领取电子书
 * @param dispatch
 * @param bookId
 * @returns {Promise}
 */
export const getBook = ({ dispatch }, bookId) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth({
        url: getUrl('get/ebook').replace(':bookId', bookId)
      }).then(
        function (message) {
          resolve(message)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
