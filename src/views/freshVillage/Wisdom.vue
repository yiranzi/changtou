/**
 * Created by zhongyan on 2017/3/1.
 *
 */
<template>
  <Scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
    <div class="fresh-village-wisdom">
      <div class="close-icon-container" v-touch:tap="onCloseTap"><span class="close-icon"></span></div>
      <div>
        <div class="wisdom-top">
          <span class="wisdom-title">今日小智</span>
          <div class="content-title">{{question.wisdom.title}}</div>
        </div>
        <div class="wisdom-content">{{{wisdomContent}}}</div>
      </div>
      <!--<div class=><span class="parting-line"></span>好文共赏<span class="parting-line"></span></div>-->
    </div>
  </Scroller>
</template>
<script>
import Scroller from 'vux/scroller'
import {villageActions} from '../../vuex/actions'

export default {
  vuex: {
    actions: {
      getChapter: villageActions.getChapter,
      getQuestion: villageActions.getQuestion
    }
  },
  route: {
    data ({to: {params: {chapterNo, questionNo}}}) {
      this.setBackBtnToMap()
      this.chapter = this.getChapter(parseInt(chapterNo))
      this.question = this.getQuestion(this.chapter.questionArr, parseInt(questionNo))
      this.content = this.question.wisdom.content
      this.setScrollerHeight()
    },
    deactivate () {
      this.resetViewBackHandler()
    }
  },
  data () {
    return {
      scrollerHeight: '0px',
      chapter: {},
      question: {},
      content: ''
    }
  },
  computed: {
    /*小智的内容*/
    wisdomContent () {
      return this.content.replace(/\$#/g, '<div>').replace(/#\$/g, '</div>').replace(/&\*/g, '<p>').replace(/\*&/g, '</p>')
    }
  },
  methods: {
    /**
     * 解绑物理back键
     **/
    resetViewBackHandler () {
      this.$parent.viewBackHandler = null
    },
    /**
     * 设置物理返回键为隐藏浮层
     **/
    setBackBtnToMap () {
      this.$parent.viewBackHandler = this.onCloseTap
    },
    /*设置页面滑动高度*/
    setScrollerHeight () {
      const me = this
      setTimeout(
        function () {
          me.scrollerHeight = window.document.body.offsetHeight + 'px'
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 150
      )
    },
    onCloseTap () {
      this.$route.router.go('/village/map')
    }
  },
  components: {
    Scroller
  }
}
</script>
<style lang="less">
  .fresh-village-wisdom {
    position: relative;
    width: 100%;
    background-color: #fff;
    .close-icon-container {
      display: inline-block;
      position: absolute;
      top: .6rem;
      right: .75rem;
      width: 2rem;
      height: 2rem;
    }
    .close-icon:after{
      position: absolute;
      top: .6rem;
      right: .6rem;
      font-family: 'myicon';
      content: '\e90d';
      font-size: .75rem;
      color: #aaa;
    }
    .wisdom-top {
      width: 100%;
      height: 6.5rem;
      background: url("../../../static/image/freshVillage/wisdom.png") no-repeat;
      background-size: 100% 100%;
    }
    .wisdom-title {
      position: relative;
      top: .8rem;
      left: 1.75rem;
      font-size: .8rem;
      color: #0099ff;
    }
    .content-title {
      position: relative;
      top: .9rem;
      left: 1.75rem;
      font-size: .7rem;
      color: #666;
    }
    .wisdom-content {
      min-height: 26rem;
      font-size: .7rem;
      color: #888;
      padding: .5rem 1.75rem;
      div {
        margin: 1rem 0;
        text-indent: 2em;
      }
      p {
        margin: 0;
        text-indent: 2em;
      }
    }
    .parting-line {
      display: inline-block;
      vertical-align: middle;
      width: 2.25rem;
      margin: 0 .5rem;
      border-top: 1px solid #aaa;
    }

  }
</style>
