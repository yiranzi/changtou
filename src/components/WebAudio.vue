<template>
  <div>
    <div class="audio-box">
      <div class="btn" v-touch:tap="toggle">

        <img v-show="status !== 'play'" :src="'./static/image/audio/play.png'"
             alt="" class="btn-img play">

        <img v-show="status === 'play'" :src="'./static/image/audio/pause.png'"
             alt="" class="btn-img">
      </div>

      <div class="circleCtr" v-el:ctr
           v-bind:style="{ transform: ctrTranslate}"></div>

      <div class="progress-box" v-el:progress>
        <div class="progress" v-bind:style="{ width: ctrOffsetX + 'px' }"></div>
        <div class="cache"></div>
      </div>
      <div class="timer">&nbsp; {{currentTime}}/{{totalTime}}</div>
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
</style>

<script>
  import {convertAudioTimeToString} from '../util/convert'
  import {webAudio} from '../util/audio/web'
//  import HeaderComponent from './components/header.vue'
  export default {
    props: [
      'src',
      'isShow'
    ],

    data () {
      return {
        isInitListeners: false,
        intervalId: 0,
        currentTime: '00:00',
        totalTime: '00:00',
        ctrOffsetX: 0, //控制器移动的距离
        maxOffextX: 0, //最远移动距离
        ctrTranslate: '',
        status: 'pause' // {'play' | 'pause' | 'stop'}
      }
    },

    watch: {
      'src': function (val, oldVal) {
//        console.log('新消息', val)
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
      'ctrOffsetX': function (val, oldVal) {
//        const {ctr} = this.$els
        //设置控制器的位移
//        const transformStyleName = 'webkitTransform' in document.createElement('div').style ? 'webkitTransform' : 'transform'
////        console.log('前', ctr, ctr.attributes[1])
//        ctr.style[transformStyleName] = 'translate3d(' + (val || 0) + 'px, 0px, 0px'
//        ctr.style['transform'] = 'translate3d(' + (val || 0) + 'px, 0px, 0px'
        this.ctrTranslate = 'translate3d(' + (val || 0) + 'px, 0px, 0px)'
      },
      'isShow': function (newVal) {
        if (newVal && !this.isInitListeners) {
          this.isInitListeners = true
          this.addDragEvents()
          this.addAudioListens()
        }
      }
    },

    methods: {
      toggle () {
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
        this.ctrOffsetX = maxOffsetX * amplitude
      },

      /**
       * 根据移动相对距离设置控制器位移
       */
      ctrTranslateXByDeltaX (deltaX) {
        this.ctrOffsetX = deltaX
      },

      reset () {
        this.stopTimerTask()
        this.ctrTranslateXByDeltaX(0)
        this.currentTime = '00:00'
      },

      /**
       * 添加拖动事件
       */
      addDragEvents () {
        const {ctr, progress} = this.$els
//        console.log('progress', progress, progress.clientWidth)
//        setTimeout(function () {
//          console.log('xxxx', progress.clientWidth)
//        }, 1000)

        let originX = ctr.offsetLeft
        let maxOffsetX = progress.clientWidth
        let amplitude = 0 //当前进度(小数 0-1)

        ctr.addEventListener('touchstart', ({changedTouches}) => {
          this.stopTimerTask()
        })

        ctr.addEventListener('touchmove', ({changedTouches, target}) => {
          let deltaX = changedTouches[0].clientX - originX
          if (deltaX < 0) {
            deltaX = 0
          } else if (deltaX > maxOffsetX) {
            deltaX = maxOffsetX
          }

          this.ctrTranslateXByDeltaX(deltaX)
//          console.log('deltaX', deltaX, 'maxOffsetX', maxOffsetX)
          //获得进度
          amplitude = deltaX / maxOffsetX
          //设置时间轴
//          console.log('amplitude', amplitude)
          this.setTimeByAmplitude(amplitude)
        })

        ctr.addEventListener('touchend', ({changedTouches, target}) => {
          this.startTimerTask()
          webAudio.seekToAmplitude(amplitude)
//          console.log('touchend', originX)
        })
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

        webAudio.on(webAudio.events.playEnd, () => {
          me.status = 'pause'
          me.reset()
        })

        webAudio.on(webAudio.events.loadMediaDuration, () => {
          me.totalTime = convertAudioTimeToString(webAudio.duration)
        })
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

//    active () {
//      //初始化一些
//      //添加按钮拖动事件
//      this.addDragEvents()
//      this.addAudioListens()
//    },

    beforeDestroy () {
      //解绑页面和音频关联的所有事件
      webAudio.unAll()
    }
  }
</script>
