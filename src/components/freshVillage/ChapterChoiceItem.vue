/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
    <div class="chapter-choice-item">
      <p class="chapter-number">第{{chapterCharacterNum}}章</p>
      <p class="chapter-title">{{chapterCardInfo.title}}</p>{{index}}
      <img class="chapter-cover" :src="chapterCardInfo.cover"/>
      <div class="chapter-btn" :style="startBtnStyle" v-touch:tap="enterChapter(chapterCardInfo.chapterNo)">START</div>
    </div>
</template>
<script>
export default {
  props: {
    chapterCardInfo: Object,
    presentChapter: Object
  },
  computed: {
    /*将章节号转换为汉字*/
    chapterCharacterNum () {
      const characterArray = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
      return characterArray[this.chapterCardInfo.chapterNo - 1]
    },
    /*进入按钮样式的控制*/
    startBtnStyle () {
      let startBtnStyle = ''
      if (this.chapterCardInfo.chapterNo === 3) {  // 开放到第二节
        startBtnStyle = 'background-color: #f7f5f7; color: #f7f5f7'  // 白色隐身背景
      } else {
        if (this.chapterCardInfo.chapterNo <= this.presentChapter.chapterNo) {
          startBtnStyle = 'background-color: #ff9800;' // 橙色激活背景
        } else {
          if (this.presentChapter.chapterNo === 0 && this.chapterCardInfo.chapterNo === 1) {
            startBtnStyle = 'background-color: #ff9800;'
            console.log(3)
          } else if ((this.presentChapter.questionNo === 6 || this.presentChapter.questionNo === 7) && (this.presentChapter.chapterNo + 1 === this.chapterCardInfo.chapterNo)) {
            startBtnStyle = 'background-color: #ff9800;'
          } else {
            startBtnStyle = 'background-color: #c0c0c0;' // 灰色未激活背景
          }
        }
      }
      return startBtnStyle
    }
  },
  watch: {
    presentChapter (newValue, oldValue) {
      console.log('watch', newValue, oldValue)
    }
  },
  methods: {
    /*
     * 点击进入按钮操作
     * */
    enterChapter (chapterNo) {
      this.$dispatch('village-enter-chapter', chapterNo)
    }
  }
}
</script>
<style lang="less">
  .chapter-choice-item {
    width: 14.5rem;
    height: 20.5rem;
    background-color: #f6f6f6;
    border-radius: 20px;
    text-align: center;
    p {
      margin: 0;
      font-size: .85rem;
      color: #444;
    }
    .chapter {
      &-number {
        padding-top: 1.75rem;
      }
      &-title {
        padding: .25rem 0 1.75rem;
      }
      &-cover {
        width:13rem;
        height: 10rem;
      }
      &-btn {
        font-size: .75rem;
        color: #fff;
        background-color: #ff9800;
        width: 6.5rem;
        height: 1.6rem;
        line-height: 1.6rem;
        border-radius: .8rem;
        margin: 1.3rem auto 0;
      }
      &-btn-gray {
        background-color: #c0c0c0;
      }
      &-btn-white {
        background-color: #fff;
      }
    }

  }

</style>
