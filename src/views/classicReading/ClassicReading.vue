<template>
    <div >
      <div v-el:titlebar>
        <div style="height: 20px;background-color: #00b0f0" v-show="isIos"></div>
        <div class="ict-titlebar" style="height: 44px">
          <div class="ict-titlebar-left" v-touch:tap="onTitleBack">
            <div class="left-arrow"></div>
          </div>
          <h1 class="ict-titlebar-title" ><span :transition="transition">大咖读经典</span></h1>
        </div>
      </div>


      <Scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
        <div>
          <div class="classic-intro-area">
            <div class="classic-content">
              <img class="classic-cover" :src="classicReadingDetails.pic"/>
              <div class="classic-info">
                <p class="classic-name">{{classicReadingDetails.classicsName}}</p>
                <p class="classic-detail">主播：{{classicReadingDetails.anchor}}</p>
                <p class="classic-detail">播放：{{classicReadingDetails.playTimes}}次</p>
              </div>
            </div>
            <div class="classic-complementing">
              <p>{{classicIntro}}</p>
              <p>节目每{{updateMethod}}<p>
            </div>
          </div>

          <div class="listening">
            <div class="listening-title"><span></span> 试听 <span></span></div>
            <div class="audio-list" :class="{'playing-style' : (isPlayed && audioUrl === audio.audioUrl)}" v-for="audio in testAudioList "v-touch:tap="onAudioTap(audio.id, audio.audioUrl)">
              <span class="pause-btn"></span> <!--播放按钮-->
              <div class="audio-detail">
                <p class="audio-title">0{{$index + 1}}{{audio.audioName}}</p>
                <div class="audio-info">
                  <span class="person-icon"></span><span>{{audio.playTimes}}</span><span class="time-icon"></span><span>{{audio.audioDuration}}</span><span class="update-time" v-show="todayTime !== audio.updateTime">{{audio.updateTime}}</span><span class="update-time" v-show="todayTime === audio.updateTime">今天</span>
                </div>
              </div>
            </div>
          </div>

          <div class="listening" v-if="latestAudioList !== null">
            <div class="listening-title"><span></span> 最近更新 <span></span></div>
            <div class="audio-list" :class="{'playing-style' : (isPlayed && audioUrl === audio.audioUrl)}" v-for="audio in latestAudioList" v-touch:tap="onLatestAudioTap(audio.id, audio.audioUrl)">
              <span class="pause-btn"></span> <!--播放按钮-->
              <div class="audio-detail">
                <p class="audio-title"><span v-show="(audioAmount - $index) < 10">0</span>{{audioAmount - $index}}{{audio.audioName}}</p>
                <div class="audio-info">
                  <span class="person-icon"></span><span>{{audio.playTimes}}</span><span class="time-icon"></span><span>{{audio.audioDuration}}</span><span class="update-time" v-show="todayTime !== audio.updateTime">{{audio.updateTime}}</span><span class="update-time" v-show="todayTime === audio.updateTime">今天</span>
                </div>
              </div>
            </div>
          </div>

          <div class="fans">
            <span class="line-before-title"></span><span class="fans-title">粉丝</span><span class="fans-num">{{fansNum}}</span>
            <div class="fans-list">
              <img class="fans-img" v-for="fansImg in fansImages" :src="fansImg"/>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
</template>

<script>
  import Scroller from 'vux/scroller'
  import {userGetters, classicReadingGetters} from '../../vuex/getters'
  import {webAudio} from '../../util/audio/web'
  import {classicReadingActions} from '../../vuex/actions'
  import { Device, platformMap } from '../../plugin/device'

  export default {
    data () {
      return {
        scrollerHeight: '580px',
        classicId: 0,
        status: 'pause',
        isInitListeners: false,
        audioUrl: '',
        fromUrl: '',
        isIos: Device.platform === platformMap.IOS
      }
    },
    vuex: {
      getters: {
        classicReadingDetails: classicReadingGetters.classicReadingDetails,
        audio: classicReadingGetters.audio,
        classicIntroText: classicReadingGetters.classicIntroText,
        fansImgs: classicReadingGetters.fansImgs,
        isLogin: userGetters.isLogin,
        avatar: userGetters.avatar
      },
      actions: {
        getClassicDetails: classicReadingActions.loadClassicReadingDetails,
        updatePlayedTime: classicReadingActions.updatePlayedTime
      }
    },
    computed: {
      isPlayed () {
        return this.status === 'play'
      },
      classicIntro () {
        if (this.classicIntroText !== '') {
          return this.classicIntroText.split('#')[0]
        } else {
          return this.classicIntroText
        }
      },
      updateMethod () {
        if (this.classicIntroText !== '') {
          return this.classicIntroText.split('#')[1]
        } else {
          return this.classicIntroText
        }
      },
      fansNum () {
        if (this.isLogin) {
          return this.classicReadingDetails.fansNum + 1
        } else {
          return this.classicReadingDetails.fansNum
        }
      },
      fansImages () {
        const unorderedArray = this.fansImgs.sort(function (a, b) { return Math.random() > 0.5 ? -1 : 1 })
        if (this.isLogin) {
          return unorderedArray.slice(0, 4).concat([this.avatar])
        } else {
        return unorderedArray.slice(0, 5)
        }
      },
      testAudioList () {
        return this.audio.slice(0, 2)
      },
      latestAudioList () {
        if (this.audio.length > 2) {
          const lastAudio = this.audio.slice(2)
          return lastAudio.reverse()
        } else {
          return null
        }
      },

      /*专辑音频个数*/

      audioAmount () {
        return this.audio.length
      },

      //获取当前日期
      todayTime () {
        const date = new Date()
        const year = date.getFullYear()
        let day = date.getDate()
        if (day < 10) {
          day = `0${day}`
        }
        let month = date.getMonth() + 1
        if (month < 10) {
          month = `0${month}`
        }
        const result = `${year}-${month}-${day}`
        return result
      }
    },
    watch: {
      audioUrl (newValue, oldValue) {
        if (newValue && !this.isInitListeners) {
          this.isInitListeners = true
          this.addAudioListens()
          this.initStatus()        /*初次渲染界面,初始化音频状态*/
        }
        webAudio.create(newValue)
        //设置音频地址后, 200毫秒开始自动播放
        setTimeout(() => {
          webAudio.play()
        }, 200)
      }
    },
    route: {
      data ({to: {params}, from}) {
        this.fromUrl = from.path
        this.classicId = params.classicId
        this.setViewBackHandler()
        this.getClassicDetails(this.classicId).then(
          this.setScrollerHeight()
        )
      },
      deactivate () {
        this.pause()
      }
    },
    methods: {
      /**
       * 设置物理键back
       */
      setViewBackHandler () {
        console.log('setViewBackHandler')
        this.viewBackHandler = this.onTitleBack
      },

      setScrollerHeight () {
        const me = this
        setTimeout(
          function () {
            me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.offsetHeight) + 'px'
            me.$nextTick(() => {
              me.$refs.scroller.reset({
              top: 0
            })
          })
          }, 500
        )
      },

      /*
      * 点击播放试听列表
      * */
      onAudioTap (id, audioUrl) {
        if (this.audioUrl !== audioUrl) { //点击新的音频
          this.audioUrl = audioUrl
          this.updatePlayedTime(this.classicId, id)    //更新音频播放次数
        } else { //点击原来的音频
          this.toggle()
        }
      },

      toggle () {
        if (this.status === 'play') {
          this.pause()
        } else if (this.status === 'pause') {
          this.play()
        }
      },

      /*
      * 点击播放最近更新列表,只有登录后才能听此部分
      * */
      onLatestAudioTap (id, audioUrl) {
        if (!this.isLogin) {
          this.$route.router.go('/entry')
        } else {
          this.onAudioTap(id, audioUrl)
        }
      },

      /*
      *监听播放状态
      **/

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
      play () {
        webAudio.play()
      },
      pause () {
        webAudio.pause()
      },

      // 初始化音频状态
      initStatus () {
        this.status = webAudio.status
      },
      onTitleBack () {
        if (/\/start/.test(this.fromUrl)) {
          this.$route.router.replace('/main')
        } else {
          window.history.back()
        }
      }
    },
    components: {
      Scroller
    }
  }
</script>

<style lang="less" scoped> /*scoped属性，使得样式仅作用于此组件*/

.classic-intro-area {
  width:100%;
  background-color: #fff;
  p {
    margin: 0;
  }
  .classic {
    &-content {
      padding: .75rem 1.25rem;
      border-bottom: 1px solid #f0eff5;
      box-sizing: border-box;
    }
    &-cover {
      width: 4.2rem;
      height: 5.5rem;
    }
    &-info {
      margin-top: .4rem;
      margin-left: .7rem;
      display: inline-block;
      vertical-align: top;
      line-height: 1.35rem;
    }
    &-name {
      font-size: .75rem;
      color: #444;
    }
    &-detail {
      font-size: .65rem;
      color: #aaa;
    }
    &-complementing {
      font-size: .6rem;
      color: #666;
      margin: 0 1.25rem;
      p {
        padding-top: 1rem;
      }
    }
  }

}

.listening {
  margin-top: .5rem;
  background-color: #fff;
  font-size: .7rem;
  .listening {
    &-title {
      font-size: .7rem;
      color: #666;
      text-align: center;
      padding: .8rem 0;
      span {
        display: inline-block;
        vertical-align: middle;
        width: 1.25rem;
        height: 0;
        border-top: 1px solid #ccc;
      }
    }
  }
}

.fans{
  background-color: #fff;
  padding-left: 1.5rem;

  .line-before-title {
    display: inline-block;
    width: .15rem;
    height:.9rem;
    vertical-align: middle;
    background-color: #00b0f0;
  }
  &-title {
    padding: 0 .4rem 0 .25rem;
    font-size: .65rem;
    color: #00b0f0;
  }
  &-num {
    color: #ccc;
    font-size: .6rem;
  }
  &-list {
    padding: .75rem 0;
  }
  &-img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    margin-right: .75rem;
  }
}

.audio-list {
  margin: 0 1.25rem;
  padding-bottom: .7rem;

}

.pause-btn::before {
  content: '\E927';
  color: #FFA12D;
  font-size: 1.5rem;
  font-family: 'myicon';
  vertical-align: middle;
}

.playing-style {
  p {
    color: #FFA12D;
  }

  > span::before {
    content: '\E928';
    color: #FFA12D;
    font-size: 1.5rem;
    font-family: 'myicon';
    vertical-align: middle;
  }
}


.person-icon::before {
  content: '\E92C';
  color: #ccc;
  font-size: .7rem;
  font-family: 'myicon';
}

.audio-detail {
  display: inline-block;
  margin-left: .3rem;
  vertical-align: middle;
}
.audio-title {
  font-size: .7rem;
  color: #666;
  margin: 0 0 .35rem 0;
}

.audio-info {
  font-size: .6rem;
  color: #ccc;
  span {
    padding-right: .3rem;
  }
  .update-time{
    position: absolute;
    right: 1.25rem;
  }
}
.time-icon::before {
  content: '\E906';
  color: #ccc;
  font-size: .6rem;
  font-family: 'myicon';
}

</style>
