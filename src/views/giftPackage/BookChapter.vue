<template>
  <div class="chapter-detail-container">
    <ict-titlebar v-el:titlebar :left-options="leftOptions">阅读材料</ict-titlebar>
    <scroller :lock-x="true" v-ref:scroller :height.sync="scrollerHeight" class="scroller-container" :bounce='false' :lock-y="true">
      <div class="swiper-container">
        <swiper height="300px" :index.sync='lastReadPage' @on-index-change="bookChapterIndexChange" :duration=100>
          <swiper-item class="black" v-for="chapter in currBookChapter">
            <div class="book-use-top">
              <p class="chapter-line">{{{chapter.index}}} {{{chapter.title}}}</p>
            <div v-if="book_index === 0 ? true : false" class="chapter-info-container">  {{{chapter.index}}} {{{chapter.title}}}  </div>
            </div>
              <div class="book-content">
                {{{chapter.content}}}
              </div>
          </swiper-item>
        </swiper>
      </div>
      <div class="toggle-index-btn" v-touch:tap="gotoSetMask">
        <img src="../../assets/styles/image/giftPackage/indexBtn.png" width="3.25rem" height="3.15rem" />
      </div>
      <div id="mask" v-touch:tap="gotoSetMask" v-if="showIndexMask">
        <book-mask :book-title-list-sub="bookTitleList"></book-mask>
      </div>
      <p style="text-align:'right';" class="book-paganition">
        {{book_index+1}} / {{currBookChapter.length}}
      </p>
    </scroller>
  </div>
</template>
<style lang="less">
  .chapter-detail-container{
    *{
      margin: 0;
      padding: 0;
    }
    .ict-titlebar{
      z-index: 5001 !important;
      .left-arrow{
        margin-left: .5rem;
      }
    }
    .toggle-index-btn{
      position: fixed;
      left: 16rem;
      top: 1rem;
      img{
        width: 1.625rem;
        height: 1.575rem;
      }
    }
    .book-paganition{
      position: fixed;
      left: 83%;
      top: 27.5rem ;
      color: #ccc;
      font-size: .6rem;
      z-index: 400;
    }
    .swiper-container{
      background: white !important;
      .vux-slider{
        padding: 1.25rem 1.25rem 0 1.25rem;
        .vux-swiper{
          height:37rem !important;
          .chapter-line{
            font-size: .6rem;
            margin-bottom: 2rem;
            p{
              display: inline-block;
              color: #ccc !important;
            }
          }
          .chapter-info-container {color: #666;}
          .chapter-info-container p:first-child {
            font-size: .7rem;
            margin-bottom: .5rem;
          }
          .chapter-info-container p:last-child{
            font-size: .8rem;
            font-weight: bold;
            margin-bottom: .8rem;
          }
          .book-content{
            font-size: .7rem;
            color: #666;
            line-height: 1.2rem;
          }
          .book-bar{
            color: #666;
            font-weight: bold;
            font-size: .7rem;
            margin-bottom: .5rem;
          }
        }
        .vux-indicator{
          display: none;
        }
      }
    }
    #mask{
      background: rgba(0, 0, 0, 0.6);
      position:absolute;
      left:0;
      top:0;
      z-index:1000;
      width: 100%;
      height: 100%;
    }
    @media (min-height: 480px)  and (max-height: 480px) {
      .book-content{
        -webkit-transform: scaleY(.9);
        margin-top: -2rem;
      }
      .book-paganition{
        top: 63% !important;
      }
      .book-use-top{
        margin-top: -1.8rem;
      }
      .book-title:nth-child(3){
        margin-bottom: 1.5rem !important;
      }
    }
    @media (min-height: 568px)  and (max-height: 568px) {
      .book-title:nth-child(3){
        margin-bottom: .7rem !important;
      }
    }
    @media (min-height: 640px) and (max-height: 640px) {
      .book-paganition{
        top: 75% !important;
      }
      .book-title:nth-child(3){
        margin-bottom: .8rem !important;
      }
    }
    @media (min-height: 730px) and (max-height: 732px) {
      .book-paganition{
        top: 29.5rem !important;
      }
    }
    @media all and (min-height: 960px) {
      .book-content{
        font-size: .65rem !important;
      }
      .book-paganition{
        top: 71%;
      }
      .book-title:nth-child(3){
        margin-bottom: .5rem !important;
      }
    }
    @media (min-height: 1024px) and (max-height: 1366px) {
      .book-content{
        font-size: .5rem !important;
        p{
          line-height: 1rem;
        }
      }
      .book-paganition{
        top: 59%;
      }
      .book-title{
        margin-bottom: .5rem !important;
        font-size: .5rem !important;
      }
      .book-index{
        font-size: .45rem !important;
      }
    }
  }
</style>

<script>
  import Swiper from 'vux/swiper'
  import SwiperItem from 'vux/swiper-item'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import bookMask from '../../components/giftPackage/BookMask.vue'
  import Scroller from 'vux/scroller'
  import {giftActions} from '../../vuex/actions'
  import {setLocalCache, getLocalCache} from '../../util/cache'
  import backHandler from '../../plugin/backHandler'
  import book1 from '../../util/ebook/book1.js'
  import book2 from '../../util/ebook/book2.js'

export default {
   vuex: {
      getters: {
      },
      actions: {
        updateBookProgress: giftActions.updateBookProgress,
        getBookProgress: giftActions.getBookProgress
      }
   },
  components: {
    Swiper,
    SwiperItem,
    IctTitlebar,
    Scroller,
    bookMask
  },
  data () {
    return {
      book_index: 0,   // 此参数做翻页显示用
      currIndex: 0,
      bookIdentifyIndex: 0, // 用于存储当前书籍
      bookList: [book1, book2],  //用于存储不同的书籍模块
      showIndexMask: false,  // 显示目录章节
      bookChapterList: [],   // 用于存储书籍章节
      scrollerHeight: '0px',
      lastReadPage: 0,
      leftOptions: { //titlebar
          callback: this.updateChapterProgress,
          disabled: false,
          showBack: true
        },
      bookTitleList: [
        ['认识一个好老师',
        '了解是投资的基础',
        '赚多赚少大不同',
        '资产负债大盘点',
        '钱从哪儿来，又到哪去',
        '投资的路才刚刚开始'
      ],
      ['理财是一件迫在眉睫的事情',
       '初识基金',
       '如何找到好基金'
      ]]
    }
  },
  computed: {
    currBookChapter () {
      return this.bookChapterList[this.currIndex]
    }
  },
  route: {
      data ({to: {params: {currIndex, bookId}}, from}) {
        this.currIndex = currIndex
        this.bookId = bookId
        this.bookIdentifyIndex = this.bookList[this.bookId - 1]       //当前书籍
   //     console.log(this.bookIdentifyIndex.bookChapter1)
        //TODO by the bookId joint the different book
        this.bookChapterList = [this.bookIdentifyIndex.bookChapter1, this.bookIdentifyIndex.bookChapter2, this.bookIdentifyIndex.bookChapter3, this.bookIdentifyIndex.bookChapter4, this.bookIdentifyIndex.bookChapter5, this.bookIdentifyIndex.bookChapter6]
        console.log('list', this.bookChapterList)
        //TODO it may have some undefined key
        if (from.path && from.path.indexOf('mycourse') > -1) {
          setTimeout(function () {
          if (getLocalCache('last_read_page') !== null) {
            me.lastReadPage = parseInt(getLocalCache('last_read_page').pageNum - 1)
          } else {
            me.lastReadPage = 0
          }
        }, 300)
        } else {
         this.lastReadPage = 0
        }
        /**************************************/
        // 监听物理键back
        const me = this
        backHandler.setHandler(onBackKeyDown.bind(me))
        function onBackKeyDown () {
          me.updateChapterProgress()
          me.$route.router.go('/giftPackage/newerBookDetails')
          backHandler.resetHandler()
        }
        /**************************************/

        /**************************************/
        // 处理阅读进度
   //    const bookId = 1
       this.getBookProgress(this.bookId).then(
        res => {
          if (res === '' || res === undefined) {
            me.$route.router.go('/giftPackage/newerBookDetails')   //  为空 初始状态去详情页
          } else {
        let setChapterNum = parseInt(parseInt(new Date().getTime() - new Date(res.createTime).getTime()) / (1000 * 3600 * 7 * 24))
        if (setChapterNum < 1 && setChapterNum >= 0) {
           me.bookTitleList = me.bookTitleList[this.bookId - 1].splice(0, 1)
           console.log(me.bookTitleList)
          } else {
           me.bookTitleList = me.bookTitleList[this.bookId - 1].splice(0, setChapterNum)
           console.log(me.bookTitleList)
          }
        }
        }).catch(
        err => {
          console.log(err.message)
        }
      )
      /**************************************/
    }
  },
  ready () {
    this.setScrollerHeight()
  },
  methods: {
    /**
    *  更新阅读进度
    */
    updateChapterProgress () {
     const me = this
     const bookId = 1
     const sectionIndex = parseInt(this.currIndex) + 1
     this.updateBookProgress(bookId, sectionIndex).then(
      res => {
        setLocalCache('last_read_page', {pageNum: parseInt(me.book_index) + 1})
      }
     ).catch(
      err => {
        console.log(err.message)
      }
     )
     this.$route.router.go('/giftPackage/newerBookDetails')
    },
    bookChapterIndexChange (index) {
      this.book_index = index
    },
    setScrollerHeight () {
        // 设置滚动条高度为 页面高度-titlebar高度-tabbar高度
        const me = this
        const {titlebar} = this.$els
        me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight) + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 150)
    },
    /**
    *  去图书详细页
    */
    gotoBookDetail () {
      this.$route.router.go('giftPackage/newerBookDetails')
    },
    /**
    *  目录幕布
    */
    gotoSetMask () {
      this.showIndexMask = !this.showIndexMask
    }
  },
  events: {
    /**
     * 去另外的章节
     */
    'gotoChapterDetails': function (currChapter) {
      this.$route.router.go(`/giftPackage/bookChapter/${currChapter}`)
    }
  }
}
</script>
