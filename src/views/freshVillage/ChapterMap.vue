/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
    <div class="chapter-map" :class="bgStyle">
    </div>
</template>
<script>
  import {userGetters} from '../../vuex/getters'

  export default {
  vuex: {
    getters: {
      isLogin: userGetters.isLogin
    },
    actions: {

    }
  },
  data () {
    return {
      activeChapterNo: 1
    }
  },
  computed: {
    bgStyle () {
      if (this.activeChapterNo === 1) {
        return 'chapter1-bg'
      }
    }
  },
  watch: {

  },
  route: {
    data () {
     // this.showChapterChoice()
     // this.showChapterStory()
     // this.showQuestion()
      this.showAnswerResult()
    }

  },
  ready () {
  },
  methods: {
    showChapterChoice () {
      this.showMask({
        component: 'freshVillage/ChapterChoice.vue',
        hideOnMaskTap: false,
        callbackName: 'showStory',
        callbackFn: this.showStory.bind(this)
      })
    },
    showStory () {
      console.log('aaaaa')
   //   this.activeChapterNo = activeChapterNo
    },
    showChapterStory () {
      this.showMask({
        component: 'freshVillage/ChapterStory.vue',
        hideOnMaskTap: false,
        callbackName: 'getResult',
        callbackFn: this.getResult.bind(this) //组件上的
      })
    },
    showQuestion () {
      this.showMask({
        component: 'freshVillage/Question.vue',
        hideOnMaskTap: false,
        callbackName: 'getResult',
        callbackFn: this.getResult.bind(this) //组件上的
      })
    },
    showAnswerResult () {
      this.showMask({
        component: 'freshVillage/AnswerResult.vue',
        hideOnMaskTap: false,
        callbackName: 'getResult',
        callbackFn: this.getResult.bind(this) //组件上的
      })
    },
    getResult () {
      console.log('getResult')
    }

  },
  components: {
  }
}
</script>
<style lang="less">
  .chapter-map {
    width: 100%;
    height: 100%;
  }
  .chapter1-bg{
    background: url('../../../static/freshVillage/chapter1-bg.png') no-repeat;
    background-size: 100% 100%;
  }
</style>
