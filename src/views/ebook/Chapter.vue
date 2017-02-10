/**
 * Created by jun on 2017/1/22.
 *
 */
<template>
    <div class="ebook-chapter">
      <ict-titlebar v-el:title-bar>阅读材料</ict-titlebar>
      <div class="tap-mask" :style="tapMaskTop">
        <div v-touch:tap="showCatalog" class="catalog-icon">
          <img src="../../assets/styles/image/giftPackage/indexBtn.png"/>
        </div>
        <div class="ebook-catalog" v-show="isCatalogShow" >
          <div class="catalog-mask" v-touch:tap="hideCatalog"></div>
          <div class="catalog-content">
            <p class="catalog-item catalog-title">目录</p>
            <p class="catalog-item" v-for="chapter in currChapters" v-touch:tap="goToChapter(chapter)">第{{$index+1}}章 {{chapter.name}}</p>
            <p class="catalog-item catalog-title" v-touch:tap="hideCatalog">收起</p>
          </div>
        </div>
        <div class="tap-area" v-touch:tap="goToPrePage"></div>
        <div class="tap-area" v-touch:tap="goToNextPage"></div>
      </div>
      <div class="ebook-content" v-if="book" v-el:ebook :style="ebookHeight"></div>
      <span class="pageNum">阅读进度 {{(percentage * 100).toFixed(1)}}%</span>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {ebookActions} from '../../vuex/actions'
  import {userGetters, ebookGetters} from '../../vuex/getters'
  import {setLocalCache, getLocalCache} from '../../util/cache'
export default {
  vuex: {
    actions: {
      bookArr: ebookActions.bookArr,
      bookChapters: ebookActions.bookChapters,
      updateBookProgress: ebookActions.updateBookProgress,
      getBookProgress: ebookActions.getBookProgress
    },
    getters: {
      login: userGetters.isLogin,
      bookProgress: ebookGetters.bookProgress
    }
  },
  data () {
    return {
      book: null,
      bookId: 0,  //书Id
      chapterId: 0, //章节Id
      catalog: [], //每一页的cfi和页码对应的数组
      titleHeight: 0,  //titleBar的高度
      percentage: 0, //当前进度
      isCatalogShow: false, //是否显示目录
      chapterPageNum: 0,
      spinePos: 0
    }
  },

  computed: {
    //点击切换页面的mask 的top值
    tapMaskTop () {
      return `top: ${(this.titleHeight)}px`
    },

    //book渲染容器的高度
    ebookHeight () {
      return `height: ${(window.document.body.offsetHeight - this.titleHeight)}px`
    },
    //电子书1 领取的周数
    book1CreateWeeksAmount () {
      return parseInt((new Date().getTime() - new Date(this.bookProgress.createTime.replace('-', '/')).getTime()) / (1000 * 3600 * 7 * 24))
    },
    //电子书1 章节数
    book1ChaptersAmount () {
      return this.bookChapters(1).length
    },
    //电子书1 可读章节数
    book1AvailableChapterNum () {
      return this.book1CreateWeeksAmount + 2 >= this.book1ChaptersAmount ? this.book1ChaptersAmount : this.book1CreateWeeksAmount + 2
    },
    //当前book的章节
    currChapters () {
      return parseInt(this.bookId) === 1 ? this.bookChapters(this.bookId).slice(0, this.book1AvailableChapterNum) : this.bookChapters(this.bookId)
    }
  },

  route: {
    data ({to: {params}}) {
      this.bookId = params.bookId
      this.chapterId = params.chapterId
      this.book = {}

      this.getBookProgress(this.bookId)

      setTimeout(
        this.initEBook,
        500
      )
    },

    deactivate () {
      this.book.destroy()
      this.book = null
    }
  },

  ready () {
    this.titleHeight = this.$els.titleBar.offsetHeight
  },

  methods: {
    /**
     * 初始化电子书
     */
    initEBook () {
      const bookChapterView = this
      //找到书名
      const bookName = this.bookArr(this.bookId).docName

      //注册epub
      this.book = window.ePub(`../../../static/ebooks/${bookName}/`, {
        restore: true
      })

      // 监听 翻页变化
      this.addPageChangeListener()

      // 监听 章节变化
      this.addChapterDisplayedListener()

      //渲染电子书
      this.book.renderTo(this.$els.ebook)

      this.showLoading()
      //为电子书初始化页码
      this.book.generatePagination().then(function () {
        bookChapterView.book.goto(bookChapterView.getHref(bookChapterView.chapterId))
        bookChapterView.hideLoading()
        bookChapterView.showTipMask()
      })
    },

    /**
     * 显示 阅读提示浮层
     */
    showTipMask () {
      if (!getLocalCache('ebook-tip-show')) {
        this.showMask({
          component: 'ebook/ReadTipMask.vue',
          hideOnMaskTap: true,
          callbackName: 'bookChapterTipTap',
          callbackFn: this.onTipTap.bind(this)
        })

        setLocalCache('ebook-tip-show', {
          show: true
        })
      }
    },

    /**
     * 阅读浮层 被点击
     */
    onTipTap () {
      this.hideMask.bind(this)
    },

    /**
     * 添加 翻页事件 监听
     */
    addPageChangeListener () {
      const me = this
      this.book.on('book:pageChanged', function (page) {
        me.percentage = page.percentage
      })
    },

    /**
     * 添加 章节渲染 监听
     */
    addChapterDisplayedListener () {
      this.book.on('renderer:chapterDisplayed', this.onChapterDisplayed.bind(this))
    },

    /**
     * 章节渲染 回调
     */
    onChapterDisplayed (chapter) {
      this.spinePos = chapter.spinePos

      if (parseInt(this.bookId) === 1 && chapter.spinePos === this.book1AvailableChapterNum - 1) {
        this.chapterPageNum = 1
      }

      //上传 阅读进度
      if (this.login) {
        this.updateBookProgress(this.bookId, chapter.spinePos + 1).then(
          this.getBookProgress(this.bookId)
        )
      }
    },

    /**
     * 返回chapterId对应的文件名
     */
    getHref (chapterId) {
      let idString = chapterId + ''
      let re = new RegExp(`\\d{${idString.length}}\\.`)
      let href = this.book.currentChapter.href || 'index_split_000.html'
      return href.replace(re, idString + '.')
    },

    /**
     * 跳转到上一页
     */
    goToPrePage () {
      if (parseInt(this.bookId) === 1 && this.spinePos === this.book1AvailableChapterNum - 1) {
        this.chapterPageNum -= 1
      }
      this.book.prevPage()
    },
    /**
     * 跳转到下一页
     */
    goToNextPage () {
      if (parseInt(this.bookId) === 1 && this.spinePos === this.book1AvailableChapterNum - 1) {
        if (this.chapterPageNum >= this.book.currentChapter.pages) {
          this.showToast('精彩内容,敬请期待~')
        } else {
          this.chapterPageNum += 1
          this.book.nextPage()
        }
      } else {
        this.book.nextPage()
      }
    },

    /**
     * 显示目录
     */
    showCatalog () {
      this.isCatalogShow = true
    },

    hideCatalog () {
      this.isCatalogShow = false
    },

    goToChapter (chapter) {
      this.book.goto(this.getHref(chapter.chapterId))
      this.hideCatalog()
    }
  },
  components: {
    IctTitlebar
  }
}
</script>
<style lang="less">
  .ebook-chapter{
    width: 100%;
    height:100%;
    background: #fff;
    p{
      margin: 0;
    }
    .tap-mask{
      width: 100%;
      height:100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
      font-size: 0;
      .catalog-icon{
        position: absolute;
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        top: 0;
        right: 0.5rem;
        z-index: 101;
        img{
          width: 1.5rem;
          height: 1.5rem;
          margin: 0.25rem;
        }
      }
      .tap-area{
        width: 50%;
        height: 100%;
        display: inline-block;
        vertical-align: top;
      }
      .ebook-catalog{
        .catalog-mask{
          width: 100%;
          height:100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 102;
          background: #000;
          opacity: 0.6;
        }
        .catalog-content{
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 103;
          background: #fff;
          .catalog-item{
            height: 88/40rem;
            line-height: 88/40rem;
            padding: 0 50/40rem;
            box-sizing: border-box;
            border-bottom: 1px solid #f0eff5;
            font-size: 28/40rem;
            color: #666;
          }
          .catalog-title{
            font-size: 30/40rem;
            color: #00b0f0;
            text-align: center;
          }
        }
      }
    }
    .ebook-content{
      width: 100%;
      padding: 2rem 1.25rem 1.25rem;
      box-sizing: border-box;
    }
    .pageNum{
      position: absolute;
      width: 100%;
      bottom: 0.5rem;
      left: 0;
      text-align: center;
      font-size: 24/40rem;
      color: #aaa;
    }
  }
</style>
