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
      this.showChapterChoice()
   //   this.showQuestion()
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
    showQuestion () {
      this.showMask({
        component: '../../components/freshVillage/QuestionPage.vue',
        hideOnMaskTap: true,
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
    background: url('../../../static/freshVillage/chapter1_bg.png') no-repeat;
    background-size: 100% 100%;
  }
</style>
