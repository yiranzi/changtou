<template>
  <div class="book-info" style="height: 100%;">
    <ict-titlebar v-el:titlebar :left-options="leftOptions">
      阅读材料
      <div slot="right" v-touch:tap="showActionSharePanel" v-if="this.bookId === '2' ? true : false">
        <img class="share-pic" src='../../assets/styles/image/share.png'>
      </div>
    </ict-titlebar>
    <div class="app-download-mask" v-touch:tap="gotoDownloadApp" v-if="!isInApp" v-el:app-download></div>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div class="set-height" style="height: 100%;">
      <div class="book-info-container">
        <img class="book-avatar" :src="bookIntroList.img" width="230" height="300">
        <p class="book-name">{{bookIntroList.bookName}}</p>
        <p class="book-status">{{bookStatus}}</p>
        <div class="book-intro">
          {{bookIntroList.bookIntro}}
        </div>
        <div class="strategy-receive-btn" v-if="this.bookId === '2' ? true : false" v-touch:tap="showActionSharePanel">通知你的小伙伴们一起领取吧</div>
      </div>
      <div class="book-chapter">
        <p class="book-chapter-item book-chapter-title">目录</p>
        <p class="book-chapter-item" v-for="bookItem in bookTitleList" v-touch:tap="gotoChapterDetails($index)"
        >第{{$index+1}}章  {{bookItem}}</p>
      </div>
     </div>

    </scroller>
    <share-float :show.sync="showShareFloat"  @confirm="cancelShare" v-touch:tap="onActionTap"></share-float>
  </div>
</template>

<style lang="less">
    .book-info {
      p{
        margin: 0;
      }
      background: white !important;
      .share-pic {
        width: 1.3rem;
        height: 1rem;
        margin-top: 0.65rem;
      }
      .app-download-mask {
        background: url("../../../static/image/newerStrategy/appdownload.png") 0 0 no-repeat;
        background-size: 100%;
        width: 18.75rem;
        height: 5.5rem;
      }
      .set-height {
        padding-bottom: 1.4rem;
        .book-info-container {
          padding-top: 1.75rem;
          box-sizing: border-box;
          text-align: center;
          position: relative;
          .book-avatar {
            width: 5.75rem;
            height: 7.5rem;
          }
          .book-name {
            font-size: .75rem;
            color: #444;
            margin-top: 1.25rem;
          }
          .book-status {
            width: 2rem;
            height: .8rem;
            font-size: 60%;
            color: #00b0f0;
            border: 1px solid #00b0f0;
            position: absolute;
            top: 10.5rem;
            left: 12.5rem;
            line-height: .8rem;
          }
          .book-intro {
            margin: 1rem 1.25rem 1rem 1.25rem;
            color: #888;
            font-size: .65rem;
            text-align: left;
          }
          .strategy-receive-btn {
            width: 13rem;
            height: 1.7rem;
            border-radius: 1.05rem;
            background: #feb649;
            color: white;
            font-size: .75rem;
            border: none;
            text-align: center;
            line-height: 1.7rem;
            margin-bottom: .4rem;
            margin-left: 3rem;
          }
          .strategy-receive-btn:active {
            animation: breath 2s ease-in-out infinite;
          }
          @keyframes breath {
            from {
              opacity: .2;
              transform: scale(1.1);
            }
            50% {
              opacity: 1;
            }
            to {
              opacity: .2;
              transform: scale(1);
            }
          }
        }
        .book-chapter {
          background: white !important;
          border-top: .5rem solid #f0eff5;
          .book-chapter-item {
            border-bottom: 1px solid #f0eff5;
            font-size: .7rem;
            color: #666;
            padding-left: 1.25rem;
            height: 2.2rem;
            line-height: 2.2rem;
          }
          .book-chapter-title {
            background: url("../../assets/styles/image/giftPackage/bookChapterIndex.png") 46% center no-repeat;
            background-size: 0.75rem 0.7rem;
            text-align: center;
            font-size: .75rem;
            color: #00b0f0;
            height: 2.2rem;
            line-height: 2.2rem;
          }
        }
      }
    }
</style>
<script>
import IctTitlebar from '../../components/IctTitleBar.vue'
import Scroller from 'vux/scroller'
import {giftActions} from '../../vuex/actions'
import backHandler from '../../plugin/backHandler'
import Actionsheet from 'vux/actionsheet'
import ShareFloat from '../interview/InterviewFloat.vue'
import {eventMap} from '../../frame/eventConfig'
import {statisticsMap} from '../../statistics/statisticsMap'
import {Device, platformMap} from '../../plugin/device'

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
      showShareFloat: false,

      scrollerHeight: '0px',
      bookId: 0,        // 书籍标志
      bookTitleList: [  // 存储不同的书籍章节信息
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
      ]],
      bookIntroList: [ // 存储不同书籍的介绍信息
       {
        'bookName': '大雄股市历险记',
        'bookIntro': '大雄萌发学习股票投资的念头，可是这个念头差点被曾经投资失败的爸爸妈妈扼杀在摇篮里。幸好神通广大的小叮当支持大雄，为大雄找了一个神秘的老师',
        'img': '../../assets/styles/image/giftPackage/bookCover.png'
       },
       {
        'bookName': '手把手教你选基金',
        'bookIntro': '不久前我们另一本基金宝典受到了各位小伙伴们热情的欢迎，小伙伴们纷纷表示对基金的知识非常感兴趣，想要进一步系统的学习基金投资的有关知识。应大家的强烈要求，我们快马加鞭，呕心沥血，日夜兼程，又为大家带来了这本《零基础小白的基金探索之旅》，小伙伴们是不是很惊喜呢！',
        'img': '../../../static/image/newerStrategy/bookCover1.png'
       }
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
      if (parseInt(this.bookTitleList.length) === 6 && this.bookId === 1) {
        return '连载完'
      } else if (parseInt(this.bookTitleList.length) === 3 && this.bookId === 2) {
        return '连载完'
      } else {
        return '连载中'
      }
    },
    isInApp () {
      // 若当前平台为 m 站 则显示 “提示下载图”
      return (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS)
    }
  },
  route: {
    data ({to: {params: {bookId}}, from}) {
       const me = this
       this.bookId = bookId  // TODO should pass a bookId
       console.log('bookId', bookId)
       this.bookIntroList = this.bookIntroList[this.bookId - 1]  // set the appropriate intro
       ///////////////////////////////////////////////////////
       // 用于显示页面浮窗
       this.showMask({
          component: 'newerStrategy/bookDetailsMask.vue',
          hideOnMaskTap: true,
          callbackName: 'closeMask',
          callbackFn: closeMask.bind(this)
       })
       function closeMask () {
        this.isMaskShow = false
        this.hideMask()
       }
       // 用于获取领取礼包(即电子书)的创建时间
         // 监听物理键back
        backHandler.setHandler(onBackKeyDown.bind(me))
        function onBackKeyDown () {
          me.$route.router.go('/mycourse')
          backHandler.resetHandler()
        }
       ////////////////////////////////////////////////////////
       me.bookTitleList = me.bookTitleList[this.bookId - 1].splice(0, 2)   //TODO just a test
       this.getBookProgress(this.bookId).then(
         res => {
           if (res) {
             let setChapterNum = parseInt((parseInt(new Date().getTime()) - parseInt(new Date(res.createTime).getTime() - (1000 * 3600 * 7 * 24))) / (1000 * 3600 * 7 * 24))   // 一周的毫秒数 每一周放置一章
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
      //////////////////////////////////////////////////////////
    }
  },
  ready () {
    this.setScrollerHeight()
  },
  components: {
    IctTitlebar,
    Scroller,
    Actionsheet,
    ShareFloat
  },
  methods: {
    /**
    *  去对应的章节数
    */
    gotoChapterDetails (currIndex) {
     this.$route.router.go(`/giftPackage/bookChapter/${this.bookId}/${currIndex}`)
    },
    /**
    *  去下载 App
    */
    gotoDownloadApp () {

    },
    setScrollerHeight () {
        // 设置滚动条高度为 页面高度-titlebar高度
        const me = this
        const {titlebar, appDownload} = this.$els
        if (!this.isInApp) {
          me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight - appDownload.offsetHeight) + 'px'
        } else {
          me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight) + 'px'
        }
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
    },
    showActionSharePanel () {
      this.showShareFloat = true
    },
    onActionTap (event) {
      this.showShareFloat = false
      switch (event.target.className) {
        case 'wechat':
          this.shareToFriend() // 分享朋友
          break
        case 'timeline':
          this.shareToFriendCircle() //分享到朋友圈
          break
        case 'qq':
          this.shareToQQ() // 分享朋友
          break
        case 'weibo':
          this.shareToWeibo() //分享到朋友圈
          break
        default:
              break
      }
  },
  //分享朋友
  shareToFriend () {
    const me = this
    window.Wechat.share({
        message: {
          title: me.interviewRecord.title, // 分享标题
          description: '',
          thumb: me.interviewRecord.paragraph[0].image, // 分享图标
          media: {
            type: window.Wechat.Type.WEBPAGE,
            webpageUrl: 'http://h5.ichangtou.com/mapp/index.html#interview/content/' + me.interviewRecord.interviewId
          }
        },
        scene: window.Wechat.Scene.SESSION
      },
      function () {
        me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
          '访谈Id': me.interviewRecord.interviewId,
          '分享渠道': '微信-会话'
        })
        me.showToast('分享成功')
      },
      function (reason) {
        if (reason === '用户点击取消并返回') {

        } else {
          me.showAlert({title: '分享失败', message: reason})
        }
      }
    )
  },

  //分享到朋友圈
  shareToFriendCircle () {
    const me = this
    window.Wechat.share({
      message: {
        title: me.interviewRecord.title, // 分享标题
        description: '',
        thumb: me.interviewRecord.paragraph[0].image, // 分享图标
        media: {
          type: window.Wechat.Type.WEBPAGE,
          webpageUrl: 'http://h5.ichangtou.com/mapp/index.html#interview/content/' + me.interviewRecord.interviewId
        }
      },
      scene: window.Wechat.Scene.TIMELINE // share to Timeline
    },
      function () {
        me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
          '访谈Id': me.interviewRecord.interviewId,
          '分享渠道': '微信-朋友圈'
        })
        me.showToast('分享成功')
      },
      function (reason) {
        if (reason === '用户点击取消并返回') {

        } else {
          me.showAlert({title: '分享失败', message: reason})
        }
      }
    )
  },
  /**
   * 分享到QQ
   */
  shareToQQ () {
    if (window.YCQQ) {
      const me = this
      var args = {}
      args.url = 'http://h5.ichangtou.com/mapp/index.html#interview/content/' + me.interviewRecord.interviewId
      args.title = me.interviewRecord.title
      args.description = ''
      args.imageUrl = me.interviewRecord.paragraph[0].image
      args.appName = '长投学堂'
      window.YCQQ.shareToQQ(
        function () {
          me.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW_SHARE_TAP, {
            '访谈Id': me.interviewRecord.interviewId,
            '分享渠道': 'QQ'
          })
          me.showToast('分享成功')
        },
        function (failReason) {
          if (failReason === 'cancelled by user') {

          } else {
            me.showAlert({title: '分享失败', message: failReason})
          }
        },
        args
      )
    }
  },
  /**
   * 分享到微博
   */
  shareToWeibo () {
    if (window.YCWeibo) {
      const me = this
      var args = {}
      args.url = 'http://h5.ichangtou.com/mapp/index.html#interview/content/' + me.interviewRecord.interviewId
      args.title = me.interviewRecord.title + 'title'
      args.description = '长投学堂' + 'description'
      args.imageUrl = me.interviewRecord.paragraph[0].image
      args.defaultText = me.interviewRecord.title + 'defaultText'
      window.YCWeibo.shareToWeibo(
        function () {
          me.showToast('分享成功')
        },
        function (failReason) {
          if (failReason === 'cancel by user') {

          } else {
            me.showAlert({title: '分享失败', message: failReason})
          }
        },
        args
      )
    }
  },

  /**
   * 取消分享
   */
  cancelShare () {
    this.showShareFloat = false
    }
  }
}
</script>
