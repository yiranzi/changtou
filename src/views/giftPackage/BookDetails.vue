<template>
  <div class="book-info" style="height: 100%;">
    <ict-titlebar v-el:titlebar :left-options="leftOptions">阅读材料</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div class="set-height" style="height: 100%;">
      <div class="book-info-container">
        <img class="book-avatar" src="../../assets/styles/image/giftPackage/bookCover.png" width="230" height="300">
        <p class="book-name">大雄股市历险记</p>
        <p class="book-status">{{bookStatus}}</p>
        <div class="book-intro">
          大雄萌发学习股票投资的念头，可是这个念头差点被曾经投资失败的爸爸妈妈扼杀在摇篮里。幸好神通广大的小叮当支持大雄，为大雄找了一个神秘的老师。
        </div>
      </div>
      <div class="book-chapter">
        <p class="book-chapter-title book-chapter-item">目录</p>
        <p class="book-chapter-item" v-for="bookItem in bookTitleList" v-touch:tap="gotoChapterDetails($index)"
        >第{{$index+1}}章  {{bookItem}}</p>
      </div>
     </div>
    </scroller>
  </div>
</template>

<style lang="less">
    .book-info{
      background: white !important;
    }
    .set-height{
      padding-bottom: 1.4rem;
      .book-info-container{
        margin-top: 1.75rem;
        text-align: center;
        .book-avatar{
          width: 5.75rem;
          height: 7.5rem;
        }
        .book-name{
          font-size: .75rem;
          color: #444;
          margin-top: 1.25rem;
        }
        .book-status{
          width: 3rem;
          height:.8rem;
          font-size: 60%;
          color:#00b0f0;
          border: 1px solid #00b0f0;
          position: absolute;
          top: 8rem;
          left: 12.2rem;
          line-height: .8rem;
        }
        .book-intro{
          margin:1rem 1.25rem 1.5rem 1.25rem;
          color: #888;
          font-size: .65rem;
        }
      }
      .book-chapter{
        background: white !important;
        border-top: .5rem solid #f0eff5;
        .book-chapter-title{
          background: url("../../assets/styles/image/giftPackage/bookChapterIndex.png") 43% center no-repeat /4%;
          text-align: center;
          font-size: .75rem;
          color: #00b0f0;
          height: 2.2rem;
          line-height: 2.2rem;
        }
        .book-chapter-item{
          border-bottom: 1px solid #f0eff5;
          font-size: .7rem;
          color: #666;
          padding-left: 1.25rem;
          height: 2.2rem;
          line-height: 2.2rem;
        }
      }
    }

</style>
<script>
import IctTitlebar from '../../components/IctTitleBar.vue'
import Scroller from 'vux/scroller'
import {giftActions} from '../../vuex/actions'
import backHandler from '../../plugin/backHandler'
export default {
  vuex: {
    getters: {
    },
    actions: {
      getBookProgress: giftActions.getBookProgress   // 得到上次阅读进度的时间然后对比当前时间，渲染章节列表
    }
  },
  data () {
    return {
      scrollerHeight: '0px',
      bookTitleList: [
        '认识一个好老师',
        '了解是投资的基础',
        '赚多赚少大不同',
        '资产负债大盘点',
        '钱从哪儿来，又到哪去',
        '投资的路才刚刚开始'
        ],
      leftOptions: { //titlebar
          callback: this.backtoMyCourse,
          disabled: false,
          showBack: true
        }
    }
  },
  computed: {
    bookStatus () {
      if (parseInt(this.bookTitleList.length) === 6) {
        return '已完结'
      } else {
        return '连载中'
      }
    }
  },
  route: {
    data () {
       const me = this
       const bookId = 1
       // 用于获取领取礼包(即电子书)的创建时间
         // 监听物理键back
        backHandler.setHandler(onBackKeyDown.bind(me))
        function onBackKeyDown () {
          me.$route.router.go('/mycourse')
          backHandler.resetHandler()
        }
       ////////////////////////////////////////////////////////
       this.getBookProgress(bookId).then(
         res => {
           if (res) {
             let setChapterNum = parseInt((parseInt(new Date().getTime()) - parseInt(new Date(res.createTime).getTime())) / (1000 * 3600 * 7 * 24))   // 一周的毫秒数 每一周放置一章
                if (setChapterNum < 1 && setChapterNum >= 0) {
                  me.bookTitleList = me.bookTitleList.splice(0, 1)
                } else {
                  me.bookTitleList = me.bookTitleList.splice(0, setChapterNum)
                }
              }
        }).catch(
        err => {
          console.log(err.message)
        }
      )
    }
  },
  ready () {
    this.setScrollerHeight()
  },
  components: {
    IctTitlebar,
    Scroller
  },
  methods: {
    /**
    *  去对应的章节数
    */
    gotoChapterDetails (currIndex) {
     this.$route.router.go(`/giftPackage/bookChapter/${currIndex}`)
    },
    setScrollerHeight () {
        // 设置滚动条高度为 页面高度-titlebar高度
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
    backtoMyCourse () {
      this.$route.router.go('/mycourse')
    }
  }
}
</script>
