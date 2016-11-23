/**
 * Created by zl on 16/8/28.
 *
 * 网络播放器逻辑
 *  使用对象 window.Audio
 */

/**
 * 播放器状态
 * @type {{play: string, pause: string, playing: string, loadMediaDuration: string, loadEnd: string, playEnd: string}}
 */
const events = {
  play: 'play',
  pause: 'pause',
  playing: 'playing',
  ended: 'ended', //播放结束
  loadMediaDuration: 'loadedmetadata', //成功换取音频长度
  loadEnd: 'canplaythrough' //全部加载完毕
}

/**
 * 媒体对象
 * @type {window.Audio}
 */
const $media = new window.Audio()

/**
 *
 * @param src
 * @param media
 */
const create = (src, media = $media) => {
  if (media.src !== src) {
    media.src = src
  }
}

/**
 *
 * @param media
 */
const play = (media = $media) => media.play()

/**
 *
 * @param media
 */
const pause = (media = $media) => media.pause()

/**
 * 跳转到指定的时间轴
 * @param time
 * @param media
 * @returns {boolean}
 */
const seekToTime = (time, media = $media) => {
  //可以在拖动的范围内
  if (media && media.seekable.end(0) >= time) {
    media.currentTime = time
    return true
  } else {
    return false
  }
}

/**
 * 跳转到指定进度
 * @param amplitude
 * @param media
 * @returns {boolean}
 */
const seekToAmplitude = (amplitude, media = $media) => {
  if (media && media.duration > 0 && media.seekable.end(0) >= amplitude * media.duration) {
    media.currentTime = amplitude * media.duration
    return true
  } else {
    return false
  }
}

/**
 * 所有绑定的事件
 * @type {Array}
 */
const $handlers = []

/**
 * 绑定事件
 * @param event
 * @param handler
 * @param media
 */
const on = (event, handler, media = $media, handlers = $handlers) => {
  media.addEventListener(event, handler, false)
  handlers.push({event, handler})
}

/**
 * 解绑所有外界事件
 * @param handlers
 * @param media
 */
const unAll = (media = $media, handlers = $handlers) => {
  handlers.forEach(({event, handler}) => {
    media && media.removeListeners(event, handler)
  })
  handlers = []
}

/**
 * 当前音频状态
 * @type {string}
 */
//const statusMap = {
//  play: 'play',
//  pause: 'pause',
//  playing: 'playing',
//  ended: 'ended', //播放结束
//  loadMediaDuration: 'loadedmetadata', //成功换取音频长度
//  loadEnd: 'canplaythrough' //全部加载完毕
//}
//
//let status = ''
//
//$media.addEventListener()

export const webAudio = {
  media: $media,
  play,
  pause,
  seekToAmplitude,
  seekToTime,
  on,
  unAll,
  create,
  events,

  /**
   * 获取缓冲进度
   * @returns {number}
     */
  get cacheAmplitude () {
    return this.media.buffered.end(this.media.buffered.length - 1) / this.media.duration
  },

  /**
   * 获取当前进度
   * @returns {number}
     */
  get amplitude () {
    return this.media.currentTime / this.media.duration
  },

  /**
   * 获取音频当前时间
   * @returns {*}
     */
  get currentTime () {
    return this.media.currentTime
  },

  /**
   * 获取音频时长
   * @returns {number}
     */
  get duration () {
    return isNaN(this.media.duration) ? 0 : this.media.duration
  }
}
