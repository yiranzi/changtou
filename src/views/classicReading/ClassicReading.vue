<template>
    <div >
      <div class="module-title" v-el:titlebar>
        <ict-titlebar class="title-bar">大咖读经典</ict-titlebar>
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
            <div class="audio-list" v-for="testAudio in testAudioList "v-touch:tap="changeTestAudioPlayStatus(testAudio.id, testAudio.audioUrl)">
              <span :class="{ 'play-btn': (activeAudioId === testAudio.id),'pause-btn': (activeAudioId !== testAudio.id)}"></span> <!--播放按钮-->
              <div class="audio-detail">
                <div class="audio-title" :class="{'audio-title-playing-style': (activeAudioId === testAudio.id)}">0{{$index + 1}}{{testAudio.audioName}}</div>
                <div class="audio-info">
                  <span class="person-icon"></span><span>{{testAudio.playTimes}}</span><span class="time-icon"></span><span>{{testAudio.audioDuration}}</span><span class="update-time" v-show="todayTime !== testAudio.updateTime">{{testAudio.updateTime}}</span><span class="update-time" v-show="todayTime === testAudio.updateTime">今天</span>
                </div>
              </div>
            </div>
          </div>

          <div class="listening" v-if="lastedAudioList !== null">
            <div class="listening-title">
              <span></span> 最近更新 <span></span>
            </div>
            <div class="audio-list" v-for="lastedAudio in lastedAudioList" v-touch:tap="changeLatestAudioPlayStatus(lastedAudio.id)">
              <span :class="{ 'play-btn': (activeAudioId === lastedAudio.id),'pause-btn': (activeAudioId !== lastedAudio.id)}"></span> <!--播放按钮-->
              <div class="audio-detail">
                <div class="audio-title" :class="{'audio-title-playing-style': (activeAudioId === lastedAudio.id)}"><span v-show="(audioLength - $index) < 10">0</span>{{audioLength - $index}}{{lastedAudio.audioName}}</div>
                <div class="audio-info">
                  <span class="person-icon"></span><span>{{lastedAudio.playTimes}}</span><span class="time-icon"></span><span>{{lastedAudio.audioDuration}}</span><span class="update-time" v-show="todayTime !== lastedAudio.updateTime">{{lastedAudio.updateTime}}</span><span class="update-time" v-show="todayTime === lastedAudio.updateTime">今天</span>
                </div>
              </div>
            </div>
          </div>

          <div class="fans">
            <span></span><span>粉丝</span><span>{{fansNum}}</span>
            <div class="fans-list">
              <img class="fans-img" v-for="fansImg in fansImages" :src="fansImg"/>
              <img v-show="isLogin" class="fans-img" :src="avatar"/>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
</template>

<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import {userGetters, classicReadingGetters} from '../../vuex/getters'
  import {webAudio} from '../../util/audio/web'
  import {classicReadingActions} from '../../vuex/actions'

  export default {
    data () {
      return {
        classicId: 0,
        activeAudioId: -1,
        status: 'pause',
        audioUrl: ''
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
      classicIntro () {
        if (this.classicIntroText !== '') {
          return this.classicIntroText.split('#')[0]
        }
        return this.classicIntroText
      },
      updateMethod () {
        if (this.classicIntroText !== '') {
          return this.classicIntroText.split('#')[1]
        }
        return this.classicIntroText
      },
      fansNum () {
        if (this.isLogin) {
          return this.classicReadingDetails.fansNum + 1
        }
        return this.classicReadingDetails.fansNum
      },
      fansImages () {
        if (this.fansImgs.length < 2) {
          return this.fansImgs
        }
        const unorderedArray = this.fansImgs.sort(function (a, b) { return Math.random() > 0.5 ? -1 : 1 })
        if (unorderedArray.length < 5) {
          return unorderedArray
        } else {
          if (this.isLogin) {
            return unorderedArray.slice(0, 4)
          }
          return unorderedArray.slice(0, 5)
        }
      },
      testAudioList () {
        return this.audio.slice(0, 2)
      },
      lastedAudioList () {
        if (this.audio.length > 2) {
          const lastAudio = this.audio.slice(2)
          return lastAudio.reverse()
        }
        return null
      },
      audioLength () {
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
    route: {
      data ({to: {params}}) {
        this.classicId = params.classicId
        this.getClassicDetails(this.classicId).then(
          this.setScrollerHeight()
        )
      }
    },
    components: {
      IctTitlebar,
      Scroller
    },
    watch: {
      audioUrl (newValue, oldValue) {
        // 若是空音频文件, 不播放
        var regExp = new RegExp(/empty.mp3/)
        if (regExp.test(newValue)) {
          this.pause()
        //  this.isEmptyTipShow = true
       // } else {
       //   this.isEmptyTipShow = false
        }

        if (newValue && !this.isInitListeners) {
          this.isInitListeners = true
          this.addAudioListens()
          this.initStatus()
        }
        webAudio.create(newValue)
        //设置音频地址后, 200毫秒开始自动播放
        setTimeout(() => webAudio.play(), 200)
      }
    },
    methods: {
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
      changeTestAudioPlayStatus (id, audioUrl) {
        this.audioUrl = audioUrl
        if (this.activeAudioId !== id) {
          this.activeAudioId = id
          this.play()
          this.updatePlayedTime(this.classicId, id)
        } else {
          this.pause()
          this.activeAudioId = -1
        }
      },

      /*
      * 点击播放最近更新列表
      * */
      changeLatestAudioPlayStatus (id) {
        if (!this.isLogin) {
          this.$route.router.go('/entry')
        } else {
          if (this.activeAudioId !== id) {
            this.activeAudioId = id
            this.updatePlayedTime(this.classicId, id)
          } else {
            this.activeAudioId = -1
          }
        }
      },

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
        me.stopTimerTask()
        me.activeAudioId
        //     me.$dispatch('audioPlayEnd')
      })

//        webAudio.on(webAudio.events.loadMediaDuration, () => {
//          me.totalTime = convertAudioTimeToString(webAudio.duration)
//      })
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
      events: {
        'pause': function () {
          this.pause()
        },
        'play': function () {
          this.play()
        }
      }
    }
  }
</script>

<style lang="less" scoped> /*scoped属性，使得样式仅作用于此组件*/

.module-title {
  height: 3.2rem;
  width:100%;
  background-color: #00B0F0;
}
.title-bar{
  padding-top: 1rem;
}

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

  span:nth-child(1) {
    display: inline-block;
    width: .15rem;
    height:.9rem;
    vertical-align: middle;
    background-color: #00b0f0;
  }
  span:nth-child(2) {
    padding: 0 .4rem 0 .25rem;
    font-size: .65rem;
    color: #00b0f0;
  }
  span:nth-child(3) {
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
    padding-right: .75rem;
  }
}

.audio-list {
  margin: 0 1.25rem;
  padding-bottom: .7rem;
}
.play-btn::before {
  content: '\E928';
  color: #FFA12D;
  font-size: 1.5rem;
  font-family: 'myicon';
  vertical-align: middle;
}
.pause-btn::before {
  content: '\E927';
  color: #FFA12D;
  font-size: 1.5rem;
  font-family: 'myicon';
  vertical-align: middle;
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
  margin-bottom: .35rem;
}

.audio-title-playing-style {
  color: #FFA12D;
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
