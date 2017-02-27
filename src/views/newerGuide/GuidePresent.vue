<template>
  <div class="guide-present">
    <ict-titlebar v-el:titlebar>新手攻略</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
      <div>
        <img src="../../../static/image/newerGuide/present-top-tip.png" class="present-tip"/>
        <div class="strategy-option">
          <div class="strategy-item-container">
            <div class="strategy-item strategy-item-1" v-touch:tap="goToRudiments">如何开启财富自由之路</div>
            <div class="strategy-item strategy-item-2" v-touch:tap="goToAip">如何躺着赚钱</div>
            <div class="strategy-item strategy-item-3" >手把手教你选基金手册</div>
            <div class="strategy-book-container" v-touch:tap="goToReceiveBook">
              <div class="strategy-book"></div>
              <div class="strategy-receive-btn">{{receive}}</div>
            </div>
          </div>
          <div class="guide-audio-list">
            <p class="audio-list-title">听点理财知识</p>
            <div class="audio-list-content">
              <span class="auto-play" :class="{'pause': isPlayed}" v-touch:tap=autoPlay()></span>
              <div v-for="audio in audioList">
                <p class="audio-list-item" :class="{'audio-list-item-selected': isPlayed && audio.url === currAudioUrl}" v-touch:tap=onAudioTap(audio) >
                  <span class="play"></span>
                  <span class="audio-title" >{{audio.title}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <img src="../../../static/image/newerGuide/present-down-tip.png"  class="present-tip"/>
      </div>
    </scroller>
  </div>
</template>
<script>
import IctTitlebar from '../../components/IctTitleBar.vue'
import Scroller from 'vux/scroller'
import {ebookActions, newerGuide} from '../../vuex/actions'
import {userGetters} from '../../vuex/getters'
import {webAudio} from '../../util/audio/web'
  export default {
    vuex: {
      actions: {
        loadAudio: newerGuide.loadGuideAudio, //下载音频列表
        getBookProgress: ebookActions.getBookProgress   // 阅读进度
      },
      getters: {
        isLogin: userGetters.isLogin //是否登录
      }
    },
    data () {
      return {
        scrollerHeight: '580px',
        bookProgress: null, //阅读进度
        audioList: [], //音频列表
        currAudioUrl: '', //当前播放的audio
        isInitListeners: false, //是否初始化过音频播放
        status: 'pause', // {'play' | 'pause' | 'stop'} //当前audio的状态
        receive: ''  //是否限时免费领
      }
    },
    computed: {
      isPlayed () {
        return this.status === 'play'
      }
    },
    watch: {
      currAudioUrl (url) {
        if (url && !this.isInitListeners) {
          this.isInitListeners = true
          this.addAudioListens()
          this.initStatus()
        }

        webAudio.create(url)
        //设置音频地址后, 200毫秒开始自动播放
        setTimeout(() => webAudio.play(), 200)
      }
    },
    route: {
      data () {
        const bookId = 2
        const me = this
        this.loadAudio().then(
          (audioList) => {
            me.audioList = audioList
            me.setScrollerHeight()
           }
        )
        if (this.isLogin) {
          this.getBookProgress(bookId).then(
            function (progress) {
              me.bookProgress = progress
            }
          )
          if (this.getBookProgress) {
            this.receive = '立即查看'
          }
        } else {
          this.receive = '限时免费领'
        }
      },
      deactivate () {
        this.pause()
      }
    },
    methods: {
      setScrollerHeight () {
        const me = this
        setTimeout(function () {
          me.$nextTick(() => {
            me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.offsetHeight) + 'px'
            me.$refs.scroller.reset({
              top: 0
            })
          })
        }, 200)
      },
      /**
       * 跳转到 入门课
       */
      goToRudiments () {
        this.$route.router.go('/subject/detail/P/1/0')
      },
      /**
       * 跳转到 指数基金定投
       */
      goToAip () {
        this.$route.router.go('/subject/detail/P/15/0')
      },
      /**
       * 领取电子书
       */
      goToReceiveBook () {
        const bookId = 2
        const me = this
        if (this.isLogin) {
          // 已登录
          let currIndex = this.bookProgress ? parseInt(this.bookProgress.sectionIndex) : 0
          if (currIndex !== 0) {
            // 有进度 跳转到章节
            me.$route.router.go(`/ebook/chapter/${bookId}/${currIndex - 1}`)
          } else {
            // 无进度 跳转到介绍
            me.$route.router.go(`/ebook/detail/${bookId}`)
          }
          if (this.bookProgress) {
            //阅读过 显示立即查看
            this.receive = '立即查看'
          }
        } else {
          //未登录
          this.$route.router.go(`/ebook/detail/${bookId}`)
          this.receive = '限时免费领'
        }
      },

      /**
       * 监听音频播放事件
       */
      addAudioListens () {
        const me = this

        webAudio.on(webAudio.events.play, () => {
          me.status = 'play'
        })

        webAudio.on(webAudio.events.pause, () => {
          me.status = 'pause'
        })

        webAudio.on(webAudio.events.ended, () => {
          me.status = 'pause'
        })
      },

      /**
       *初始化音频状态
       */
      initStatus () {
        this.status = webAudio.status
      },

      /**
       * 点击音频
       * @param audio
       */
      onAudioTap (audio) {
        if (audio.url !== this.currAudioUrl) {
          this.currAudioUrl = audio.url
        }
        this.toggle()
      },

      toggle () {
        if (this.status === 'play') {
          this.pause()
        } else if (this.status === 'pause') {
          this.play()
        }
      },

      /**
       * 播放音频
       */
      play () {
        webAudio.play()
      },

      /**
       * 暂停音频
       */
      pause () {
        webAudio.pause()
      },

      /**
       * 自动播放音频
       */
      autoPlay () {
        if (!this.currAudioUrl) {
          this.currAudioUrl = this.audioList[0].url
        } else {
          this.toggle()
        }
      }
    },
    components: {
      IctTitlebar,
      Scroller
    }
  }
</script>
<style lang="less">
  .guide-present{
    height: 100%;
    background-color: #00b0f0;
    p{
      margin: 0;
    }
    .present-tip{
      width: 15.4rem;
      height: 3.75rem;
      margin: 40/40rem 50/40rem;
    }
    .strategy-option{
      text-align: center;
      .strategy-item-container {
        margin: 0 auto;
        background: url("../../../static/image/newerGuide/present-bg.png") 0 0 no-repeat;
        background-size: 100%;
        width: 680/40rem;
        height: 770/40rem;
        padding-top: 3rem;
        padding-left: 1rem;
        box-sizing: border-box;
        .strategy-item {
          width: 580/40rem;
          height: 84/40rem;
          margin-bottom: .6rem;
          font-size: .75rem;
          line-height: 2.1rem;
          text-align: left;
          color: #384879;
          font-weight: bold;
          padding-left: 2rem;
          box-sizing: border-box;
        }
        .strategy-item-1 {
          background: url("../../../static/image/newerGuide/present-bar1.png") 0 0 no-repeat;
          background-size: 100%;
        }
        .strategy-item-2 {
          background: url("../../../static/image/newerGuide/present-bar2.png") 0 0 no-repeat;
          background-size: 100%;
        }
        .strategy-item-3 {
          background: url("../../../static/image/newerGuide/present-bar3.png") 0 0 no-repeat;
          background-size: 100%;
        }
        .strategy-book-container {
          margin: 0 auto;
          padding: 30/40rem auto 0;
          box-sizing: border-box;
          display: inline-block;
          .strategy-book {
            background: url("../../../static/image/newerGuide/book2Cover.png") 0 0 no-repeat;
            background-size: 100% 100%;
            width: 241/40rem;
            height: 204/40rem;
            margin: 0 auto 24/40rem;
          }
          .strategy-receive-btn{
            margin: 0 auto;
            width: 6rem;
            height: 1.7rem;
            border-radius: 1.05rem;
            background: #feb649;
            color: white;
            font-size: .75rem;
            border: none;
            text-align: center;
            line-height: 1.7rem;
          }
          .strategy-receive-btn:active{
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
      }
    }
    .guide-audio-list{
      width: 90%;
      margin: 50/40rem 5%;
      padding: 1rem 0.75rem;
      box-sizing: border-box;
      background: #fff;
      text-align: left;
      .audio-list-title{
        font-size: 0.75rem;
        color: #444;
      }
      .audio-list-content{
        position: relative;
        font-size: 0.7rem;
        color: #aaa;
        margin-top: 0.75rem;
        &:before{
          content: ' ';
          display: inline-block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #f0eff5;
        }
        .auto-play{
          width: 3rem;
          height: 3rem;
          display: inline-block;
          position: absolute;
          top: 2rem;
          right: 1rem;
        }
        .auto-play:before{
          position: absolute;
          top: 0;
          left: 0;
          width: 3rem;
          height: 3rem;
          display: inline-block;
          color: #ff9800;
          font-family: 'myicon';
          font-size: 2.8rem;
          line-height: 3rem;
          content: '\E927';
        }
        .pause:before{
          content: '\E928';
        }
        .audio-list-item{
          padding-top: 0.75rem;
          box-sizing: border-box;
          .play:before{
            width: 0.7rem;
            height: 0.7rem;
            display: inline-block;
            font-family: 'myicon';
            content: '\E927';
            font-size: 0.7rem;
            line-height: 0.7rem;
          }

        }
        .audio-list-item-selected{
          color: #ff9800;
          .play:before{
            content: '\E928';
            color: #ff9800;
          }
        }
      }
    }
  }
</style>
