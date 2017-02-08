/**
 * Created by jun on 2017/1/22.
 *
 */
<template>
    <div class="ebook-detail">
      <ict-titlebar v-el:titlebar :right-options="rightOptions">
        阅读材料
        <div slot="right" v-touch:tap="showActionSharePanel" v-if="isInApp">
          <img class="share-pic" src='../../assets/styles/image/share.png'>
        </div>
      </ict-titlebar>
      <div class="download-panel" v-touch:tap="showSharePanel" v-touch:tap="downloadAPP" v-if="!isInApp" v-el:downloadpanel>
        <img src="../../../static/image/newerStrategy/appdownload.png">
      </div>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
        <div>
          <div class="intro-panel">
            <img :src="intro && intro.img">
            <span class="title">{{intro ? intro.bookName : '材料名称'}}<span>连载中</span></span>
            <p class="intro">{{intro ? intro.bookIntro : '材料简介'}}</p>
            <span class="share-tip" v-touch:tap="showActionSharePanel" v-if="isInApp">通知你的小伙伴们一起来领取吧</span>
          </div>
          <div class="catalog-panel">
            <div class="catalog-content">
              <p class="catalog-item catalog-title">目录</p>
              <p class="catalog-item" v-for="chapter in currChapters" v-touch:tap="goToChapter(chapter)">第{{$index+1}}章 {{chapter.name}}</p>
            </div>
          </div>
        </div>
      </scroller>
      <share-float :show.sync="showShareFloat"  @confirm="cancelShare" v-touch:tap="onActionTap"></share-float>
    </div>
</template>
<script>
  import Scroller from 'vux/scroller'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {ebookActions} from '../../vuex/actions'
  import ShareFloat from '../interview/InterviewFloat.vue'
  import {Device, platformMap} from '../../plugin/device'
  import {MSITE_URL} from '../../frame/serverConfig'
  import mixinShare from '../../mixinShare'
export default {
  mixins: [mixinShare],
  vuex: {
    getters: {

    },
    actions: {
      bookArr: ebookActions.bookArr,
      bookChapters: ebookActions.bookChapters
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
    currChapters () {
      return this.bookChapters(this.bookId)
    },
    isInApp () {
      return (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS)
    }
  },
  watch: {

  },
  route: {
    data ({to: {params}}) {
      this.bookId = params.bookId
      this.setViewWxShareConfig()
    },
    deactivate () {
      this.shareConfig = null
      this.onViewChange()
    }
  },
  ready () {
    this.setScrollerHeight()
  },
  methods: {
    setViewWxShareConfig () {
      this.shareConfig = {
        title: this.intro.bookName,
        desc: this.intro.bookIntro,
        link: `${MSITE_URL}index.html#!${this.$route.router.path}`,
        imgUrl: `${MSITE_URL}index.html#!/${this.intro.img.substring(9)}`
      }
      this.onViewChange()
    },

    setScrollerHeight () {
      const me = this
      setTimeout(function () {
        me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.offsetHeight - me.$els.downloadpanel.offsetHeight) + 'px'
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
    ShareFloat
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
          width: 2rem;
          height: 32/40rem;
          line-height: 32/40rem;
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
