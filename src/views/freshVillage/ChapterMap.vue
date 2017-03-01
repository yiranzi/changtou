/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
  <div>
    <div v-show="!showWisdom" class="chapter-map" :class="bgStyle">
      <div class="other-element" v-show="false">
        <span class="chapter-title">第一章 一封来自陌生人的来信</span><span class="close-icon"></span>
        <img class="discuss" src="../../assets/styles/image/freshVillage/discuss.png"/>
        <img class="back-chapter" src="../../assets/styles/image/freshVillage/back.png"/>
        <div class="go-btn" :class="next-btn"></div>
      </div>

      <!--<div class="level level-sixth"></div>-->
      <!--<div class="level level-fifth"></div>-->
      <!--<div class="level level-fouth"></div>-->
      <!--<div class="level level-third"></div>-->
      <!--<div class="level level-second"></div>-->
      <!--<div class="level level-first"></div>-->
    </div>
    <wisdom v-show="showWisdom"></wisdom>
</div>
</template>
<script>
  import {userGetters} from '../../vuex/getters'
  import wisdom from './Wisdom.vue'
 // import chapterChoice from '../../components/freshVillage/ChapterChoice.vue'

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
      activeChapterNo: 1,
      showWisdom: false
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
    //  this.showChapterStory()
     // this.showQuestion()
     // this.showAnswerResult()
    //  this.showProverbs ()
     // this.showUpgrade ()
     // this.showEmergency ()
     // this.showProverbs()
      //this.showEmergency()
      this.showUpgrade()
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
        hideOnMaskTap: true,
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
    showProverbs () {
      this.showMask({
        component: 'freshVillage/Proverbs.vue',
        hideOnMaskTap: true,
        callbackName: 'getResult',
        callbackFn: this.getResult.bind(this) //组件上的
      })
    },
    showEmergency () {
      this.showMask({
        component: 'freshVillage/Emergency.vue',
        hideOnMaskTap: true,
        callbackName: 'getResult',
        callbackFn: this.getResult.bind(this) //组件上的
      })
    },
    showUpgrade () {
      this.showMask({
        component: 'freshVillage/Upgrade.vue',
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
  //  chapterChoice,
    wisdom
  }
}
</script>
<style lang="less">
  .chapter-map {
    position: relative;
    width: 100%;
    height: 100%;
    .level {
      position: absolute;
      background-color: red;
      width: 2.1rem;
      height: 2.1rem;
      &-sixth {
        left: 7.7rem;
        top: 6.1rem;
      }
      &-fifth {
        left: 8.96rem;
        top: 11.4rem;
      }
      &-fouth {
        left: 6.7rem;
        top: 16.6rem;
      }
      &-third {
        left: 9.4rem;
        bottom: 9.7rem;
      }
      &-second {
        left: 8.9rem;
        bottom: 4.8rem;
      }
      &-first {
        left: 6.8rem;
        bottom: .2rem;
      }
    }
  }
  .chapter1-bg {
    background: url('../../../static/image/freshVillage/chapter1-bg.png') no-repeat;
    background-size: 100% 100%;
  }
  .other-element {
    width: 100%;
    height: 100%;

    .chapter-title {
      display: inline-block;
      position: absolute;
      top: 1rem;
      left: .75rem;
      padding: 0 .75rem;
      height: 1.5rem;
      line-height: 1.5rem;
      border-radius: .75rem;
      font-size: .7rem;
      background-color: #fff;
      opacity: .7;
      color: #888;
    }
    .close-icon:after{
      position: absolute;
      top: 1.3rem;
      right: .75rem;
      font-family: 'myicon';
      content: '\e90d';
      font-size: .9rem;
      color: #fff;
    }
    .discuss {
      position: absolute;
      top: 3.5rem;
      left: .75rem;
      width: 3.1rem;
      height: 3.5rem;
      margin-left: .75rem;
    }
    .back-chapter {
      position: absolute;
      left: 1rem;
      bottom: 1rem;
      display: inline-block;
      width: 1.6rem;
      height: 1.6rem;
    }
    .go-btn {
      position: absolute;
      bottom: .5rem;
      right: 3rem;
      width: 3.6rem;
      height: 3.75rem;
      background: url('../../assets/styles/image/freshVillage/go.png') no-repeat;
      background-size: contain;
    }
    .next-btn {
      background: url('../../assets/styles/image/freshVillage/next.png') no-repeat;
      background-size: contain;
    }
  }



</style>
