/**
 * Created by jun on 2017/02/17.
 */
import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
/**
 * 下载 入门指南 音频列表
 */
export const loadGuideAudio = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('guide_audio_list')
      }).then(
        function (audioList) {
          dispatch('LOAD_GUIDE_AUDIO', audioList)
          resolve(audioList)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
