<template>
  <div>
    <div v-show="isEmptyTipShow" class="audio-box" style="padding-left:1rem;font-size: 0.65rem; color: #fff;">本节无音频</div>
    <div class="audio-box" v-show="!isEmptyTipShow">
      <div class="btn" v-touch:tap="toggle">

        <img v-show="status !== 'play'" :src="'./static/image/audio/play.png'"
             alt="" class="btn-img play">

        <img v-show="status === 'play'" :src="'./static/image/audio/pause.png'"
             alt="" class="btn-img">
      </div>

      <div class="circleCtr" v-el:ctr
           v-bind:style="{ transform: ctrTranslate}"></div>

      <div class="progress-box" v-el:progress>
        <div class="progress" v-bind:style="{ width: ctrOffset + 'px' }"></div>
        <div class="cache"></div>
      </div>
      <div class="timer">&nbsp; {{currentTime}}/{{totalTime}}</div>
      <div v-touch:tap="onFullScreenTap" v-show="isFullScreen" class="full-screen-icon"></div>
    </div>
  </div>
</template>

<style lang="less">
  .audio-box {
     width: 100%;
     height: 88/40rem;
     display:flex;
     flex-direction: row;
     flex-wrap: nowrap;
     align-items: center;
     justify-content: space-between;
     background: #ccc;
     /*justify-content: center;*/
     /*.progress {*/

     /*}*/
   }

  .btn {
    width: 2rem;
    /*flex-grow: ;*/
    /*flex: none;*/
    .btn-img {
      position: relative;
      width: 55%;
      left: 33%;
      top: 2px;
    }

    .play {
      width: 60%;
    }
  }

  .circleCtr {
    height: 12px;
    width: 12px;
    /*position: absolute;*/
    border-radius: 6px;
    background: rgb(0, 176, 240);
    /*top: -8px;*/
  }

  .progress-box {
    /*felx: auto;*/
    height: 2px;
    /*position: relative;*/
    background: white;
    flex-grow: 1;


    .progress {
      height: 100%;
      background: #00b0f0;
    }

    .cache {
      height: 100%;
      position: relative;
      bottom: 2px;
      background: black;
      width: 0%;
    }
  }

  .timer {
    width: 4rem;
    font-size: 12/20rem;
    font-weight: bold;
    color: #fff
    /*felx: none;*/
  }

  .full-screen-icon{
    line-height: 40px;
    padding: 0 15px;
    &:before{
      font-family: 'myicon';
      content: '\e918';
      font-size: 1rem;
    }
  }
</style>

<script>
  import {convertAudioTimeToString} from '../util/convert'
  import {webAudio} from '../util/audio/web'
//  import HeaderComponent from './components/header.vue'
  export default {
    props: {
      direction: {
        default: 'horizon'
      },
      src: {
        default: ''
      }
    },

    data () {
      return {
        isEmptyTipShow: false,
        isInitListeners: false,
        intervalId: 0,
        currentTime: '00:00',
        totalTime: '00:00',
        ctrOffset: 0, //控制器移动的距离
        ctrTranslate: '',
        status: 'pause' // {'play' | 'pause' | 'stop'}
      }
    },

    computed: {
      isFullScreen () {
        return this.direction === 'horizon'
      }
    },

    watch: {
      'src': function (val, oldVal) {
        // 若是空音频文件, 不播放
        var regExp = new RegExp(/empty.mp3/)
        if (regExp.test(val)) {
          this.pause()
          this.isEmptyTipShow = true
        } else {
          this.isEmptyTipShow = false
        }

        if (val && !this.isInitListeners) {
          this.isInitListeners = true
          this.addDragEvents()
          this.addAudioListens()
          this.initStatus()
          this.startTimerTask()
        }

        webAudio.create(val)
        //设置音频地址后, 200毫秒开始自动播放
        setTimeout(() => webAudio.play(), 200)
      },

      'status': function (val, oldVal) {
        if (val === 'play') {
          this.startTimerTask()
        } else {
          this.stopTimerTask()
        }
      },

      'ctrOffset': function (val, oldVal) {
        this.ctrTranslate = 'translate3d(' + (val || 0) + 'px, 0px, 0px)'
      }
    },

    methods: {
      toggle () {
        console.log('x', this.status)
        if (this.status === 'play') {
          this.pause()
        } else if (this.status === 'pause') {
          this.play()
        }
      },

      play () {
        webAudio.play()
//        this.startTimerTask()
      },

      pause () {
        webAudio.pause()
//        this.stopTimerTask()
      },

      /**
       * 根据进度设置控制器位移
       */
      ctrTranslateXByAmplitude (amplitude) {
        const {progress: {clientWidth: maxOffsetX}} = this.$els
        this.ctrOffset = maxOffsetX * amplitude
      },

      /**
       * 根据移动相对距离设置控制器位移
       */
      ctrTranslateXByDelta (delta) {
        this.ctrOffset = delta
      },

      reset () {
        this.stopTimerTask()
        this.ctrTranslateXByDelta(0)
        this.currentTime = '00:00'
      },

      /**
       * 添加拖动事件
       */
      addDragEvents () {
        const {ctr, progress} = this.$els

        const origin = ctr.offsetLeft
        const maxOffset = progress.clientWidth
        let amplitude = 0 //当前进度(小数 0-1)

        ctr.addEventListener('touchstart', ({changedTouches}) => {
          this.stopTimerTask()
        })

        ctr.addEventListener('touchmove', ({changedTouches, target}) => {
          let delta = this.direction === 'horizon' ? (changedTouches[0].clientX - origin) : (changedTouches[0].clientY - origin)
          if (delta < 0) {
            delta = 0
          } else if (delta > maxOffset) {
            delta = maxOffset
          }

          this.ctrTranslateXByDelta(delta)
          //获得进度
          amplitude = delta / maxOffset
          //设置时间轴
          this.setTimeByAmplitude(amplitude)
        })

        ctr.addEventListener('touchend', ({changedTouches, target}) => {
          this.startTimerTask()
          webAudio.seekToAmplitude(amplitude)
        })
      },

      /**
       * 监听音频播放事件
       */
      addAudioListens () {
        console.log('add event')
        const me = this

        webAudio.on(webAudio.events.play, () => {
          me.status = 'play'
        })

        webAudio.on(webAudio.events.pause, () => {
          me.status = 'pause'
        })

        webAudio.on(webAudio.events.ended, () => {
          me.status = 'pause'
          me.reset()
          me.$dispatch('audioPlayEnd')
        })

        webAudio.on(webAudio.events.loadMediaDuration, () => {
          me.totalTime = convertAudioTimeToString(webAudio.duration)
        })
      },

      // 初始化音频状态
      initStatus () {
        this.status = webAudio.status
      },

      /**
       * 增加定时任务
       * 每一秒刷新更新页面
       */
      startTimerTask () {
        //先关闭上一个定时器
        this.stopTimerTask()

        const me = this
        this.intervalId = setInterval(() => {
            me.currentTime = convertAudioTimeToString(webAudio.currentTime)
            // 这里每次都设置总时间, 是因为手机端loadMediaDuration 事件触发有延迟, 所以加了一道保险
            me.totalTime = convertAudioTimeToString(webAudio.duration)
            me.ctrTranslateXByAmplitude(webAudio.amplitude)
          }, 1000)
      },

      /**
       * 停止定时任务
       */
      stopTimerTask () {
        clearInterval(this.intervalId)
      },

      /**
       * 通过进度设置时长
       * @param amplitude
       */
      setTimeByAmplitude (amplitude) {
        this.currentTime = convertAudioTimeToString(webAudio.duration * amplitude)
      },

      onFullScreenTap () {
        this.$dispatch('fullScreenTap')
      }
    },

    events: {
      'pause': function () {
        this.pause()
      },
      'play': function () {
        this.play()
      }
    },

    beforeDestroy () {
      // 注意, 这里逻辑暂时注释, 因为所有的音频控件只可能挂在同一个 audio 上, 不影响操作
      //解绑页面和音频关联的所有事件
//      webAudio.unAll()
    }
  }
</script>
