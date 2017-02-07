/**
 * 入门指南 答题页
 *
**/
<template>
  <div class="guide-test">
    <div>
      <ict-titlebar>新手攻略</ict-titlebar>
    </div>
    <img src="../../../static/image/newerGuide/test-tip.png" class="test-tip">
    <div class="strategy-option">
      <div class="option-container">
        <str-option title="股票" order="a#" option="A" :group="activeList"></str-option>
        <str-option title="基金" order="a#" option="A" :group="activeList"></str-option>
        <str-option title="理财产品"order="a#" option="A" :group="activeList"></str-option>
        <str-option id="option-nope" title="我没有买过以上产品" order="a#" option="B" :group="activeList"></str-option>
      </div>
      <div :class=" isBtnActive?'strategy-call-btn strategy-btn-active':'strategy-call-btn' " v-touch:tap="goToGuidePresent"></div>
    </div>
    </div>
</template>
<style lang="less">
  .guide-test{
    height: 100%;
    background-color: #00b0f0;
    .test-tip{
      display: block;
      width: 680/40rem;
      height: 370/40rem;
      margin: 0.8rem auto 50/40rem;
      padding: 0;
    }
    .strategy-option{
      width: 680/40rem;
      height: 676/40rem;
      margin: 0 auto;
      padding: 4.3rem 0 0 1rem;
      box-sizing: border-box;
      background: url('../../../static/image/newerGuide/test-bg.png') center center no-repeat;
      background-size: 100% 100%;
      .option-container{
        text-align: center;
        #option-nope{
          margin-top: 3rem;
          margin-bottom: 1rem;
          width: 11.125rem;
          height: 1rem;
          text-align: center;
        }
      }
      .strategy-call-btn{
        background: url("../../../static/image/newerGuide/test-confirm-btn-disabled.png") 0 0 no-repeat;
        background-size: 100% 100%;
        width: 7.55rem;
        height: 3.225rem;
        margin: 0 auto;
      }
      .strategy-btn-active{
        background: url("../../../static/image/newerGuide/test-confirm-btn.png") 0 0 no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>
<script>
import IctTitlebar from '../../components/IctTitleBar.vue'
import StrOption from '../../components/newerStrategy/StrOption.vue'
import {setLocalCache} from '../../util/cache'
  export default {
    data () {
      return {
        activeList: []
      }
    },
    computed: {
      isBtnActive () {
        return this.activeList.indexOf('A') >= 0 || this.activeList.indexOf('B') >= 0
      }
    },
    route: {
      deactivate () {
        this.isBtnActive = false
        this.activeOpt = false
      }
    },
    events: {
      addActiveList (option) {
        this.activeList.push(option)
      },
      reduceActiveList (option) {
        this.activeList.splice(this.activeList.indexOf(option), 1)
      }
    },
    methods: {
     goToGuidePresent () {
      if (this.isBtnActive) {
        setLocalCache('guide-answered', {'answered': true})
        this.$route.router.go('/guide/present')
      }
     }
    },
    components: {
      IctTitlebar,
      StrOption
    }
 }
</script>


