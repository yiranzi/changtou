/**
 * Created by jun on 2017/1/22.
 * 电子书介绍页
 */
<template>
    <div class="ebook-detail">
      <ict-titlebar v-el:titlebar :right-options="rightOptions">
        阅读材料
        <div slot="right" v-touch:tap="showActionSharePanel" v-if="isInApp && (parseInt(bookId) !== 1)">
          <img class="share-pic" src='../../assets/styles/image/share.png'>
        </div>
      </ict-titlebar>
      <div class="download-panel" v-touch:tap="downloadAPP" v-if="!isInApp" v-el:downloadpanel>
        <img src="../../../static/image/ebook/appdownload.png">
      </div>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
        <div>
          <div class="intro-panel">
            <img :src="intro && intro.img">
            <span class="title">{{intro ? intro.bookName : '材料名称'}}<span>连载中</span></span>
            <p class="intro">{{intro ? intro.bookIntro : '材料简介'}}</p>
            <span class="share-tip" v-touch:tap="showActionSharePanel" v-if="isInApp && (parseInt(bookId) !== 1)">通知你的小伙伴们一起来领取吧</span>
          </div>
          <div class="catalog-panel">
            <div class="catalog-content">
              <p class="catalog-item catalog-title">目录</p>
              <p class="catalog-item" v-for="chapter in currChapters" v-touch:tap="goToChapter(chapter)">第{{$index+1}}章 {{chapter.name}}</p>
            </div>
          </div>
        </div>
      </scroller>
      <page-share-float :show.sync="showShareFloat"  @confirm="cancelShare" v-touch:tap="onActionTap"></page-share-float>
    </div>
</template>
<script>
  import Scroller from 'vux/scroller'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import PageShareFloat from '../../components/share/PageShareFloat.vue'
  import {Device, platformMap} from '../../plugin/device'
  import {MSITE_URL} from '../../frame/serverConfig'
  import mixinPageShare from '../../mixinPageShare'
  import {getLocalCache, setLocalCache} from '../../util/cache'
  import {ebookActions} from '../../vuex/actions'
  import {ebookGetters, userGetters} from '../../vuex/getters'

  export default {
  mixins: [mixinPageShare],
  vuex: {
    actions: {
      bookArr: ebookActions.bookArr,
      bookChapters: ebookActions.bookChapters,
      getBookProgress: ebookActions.getBookProgress,
      getBook: ebookActions.getBook //领取电子书
    },
    getters: {
      isLogin: userGetters.isLogin,
      bookProgress: ebookGetters.bookProgress
    }
  },
  data () {
    return {
      rightOptions: {
        disabled: false
      },
      scrollerHeight: '580px',
      bookId: 0 //书Id
    }
  },
  computed: {
    intro () {
      return this.bookArr(this.bookId)
    },
    isInApp () {
      return (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS)
    },
    //电子书1 领取的周数
    book1CreateWeeksAmount () {
      return parseInt(this.bookId) === 1 ? parseInt((new Date().getTime() - new Date(this.bookProgress.createTime.replace('-', '/')).getTime()) / (1000 * 3600 * 7 * 24)) : 0
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
    watch: {
      currChapters () {
        this.setScrollerHeight()
      }
    },
  route: {
    data ({to: {params}}) {
      this.bookId = params.bookId
      if (this.isLogin) {
        this.getBookProgress(this.bookId)
      }
      if (parseInt(this.bookId) === 2) {
        this.setViewWxShareConfig()
        this.showBook2Mask()
      }
    },
    deactivate () {
      this.shareConfig = null
      this.onViewChange()
    }
  },
  methods: {
    /**
     * 设置分享选项
     */
    setViewWxShareConfig () {
      this.shareConfig = {
        title: this.intro.bookName,
        desc: this.intro.bookIntro,
        link: `${MSITE_URL}index.html#!/ebook/detail/${this.bookId}`,
        imgUrl: `${MSITE_URL}${this.intro.img}`
      }
      this.onViewChange()
    },

    /**
     * 显示电子书2 的领取浮层
     */
    showBook2Mask () {
      if (this.isLogin && !getLocalCache('ebook2-mask-show')) {
        //未领取
        this.showMask({
          component: 'ebook/Book2Mask.vue',
          hideOnMaskTap: true,
          callbackName: 'closeMask',
          callbackFn: this.onBook2MaskTap.bind(this)
        })
        setLocalCache('ebook2-mask-show', {
          show: true
        })
      }
    },

    /**
     * 电子书2的浮层 被点击
     */
    onBook2MaskTap () {
      this.getBook(this.bookId).then(
        this.hideMask.bind(this)
      )
    },

    setScrollerHeight () {
      const me = this
      setTimeout(function () {
        me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.offsetHeight - (me.$els.downloadpanel ? me.$els.downloadpanel.offsetHeight : 0)) + 'px'
        me.$nextTick(() => {
          me.$refs.scroller.reset({
            top: 0
          })
        })
      }, 300)
    },

    /**
     * 跳转到对应章节
     */
    goToChapter (chapter) {
      this.$route.router.go(`/ebook/chapter/${this.bookId}/${chapter.chapterId}`)
    },

      /**
       *下载app
       */
    downloadAPP () {
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.changtou.ichangtou'
    }
  },
  components: {
    IctTitlebar,
    Scroller,
    PageShareFloat
  }
}
</script>
<style lang="less">
  .ebook-detail{
    width: 100%;
    height: 100%;
    background: #fff;
    p{
      margin: 0;
    }
    .share-pic{
      width: 1.3rem;
      height: 1rem;
      margin-top: 0.65rem;
    }
    .download-panel{
      width: 100%;
      height: 5.5rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .intro-panel{
      width: 100%;
      padding: 70/40rem 50/40rem 30/40rem;
      box-sizing: border-box;
      border-bottom: 20/40rem solid #f0eff5;
      text-align: center;
      img{
        width: 230/40rem;
        height: 300/40rem;
        display: block;
        margin: 0 auto;
      }
      .title{
        position: relative;
        display: block;
        font-size: 30/40rem;
        margin: 50/40rem 0 40/40rem;
        text-align: center;
        color: #444;
        span{
          position: absolute;
          left: 70%;
          top: -0.5rem;
          width: 2.5rem;
          height: 1rem;
          line-height: 1rem;
          border:1px solid #00b0f0;
          font-size: 20/40rem;
          color: #00b0f0;
        }
      }
      .intro{
        font-size: 26/40rem;
        color: #888;
        text-align: left;
      }
      .share-tip{
        display: inline-block;
        height: 2rem;
        padding: 0 2rem;
        line-height: 2rem;
        background: #feb649;
        margin: 30/40rem auto 0;
        color: #fff;
        border-radius: 1rem;
        font-size: 0.75rem;
      }
    }
    .catalog-panel{
      .catalog-content{
        width: 100%;
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
</style>
