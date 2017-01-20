<template>
  <div class="newer-strategy-1">
    <div>
      <ict-titlebar>新手攻略</ict-titlebar>
    </div>
    <div class="strategy-container">
      <div class="strategy-intro">
      </div>
      <div class="strategy-option">
        <div class="option-container">
          <str-option title="股票" order="a#" option="A" :group="activeList"></str-option>
          <str-option title="基金" order="a#" option="A" :group="activeList"></str-option>
          <str-option title="理财产品"order="a#" option="A" :group="activeList"></str-option>
          <str-option id="option-nope" title="我没有买过以上产品" order="a#" option="B" :group="activeList"></str-option>
        </div>
        <div :class=" isBtnActive?'strategy-call-btn strategy-btn-active':'strategy-call-btn' " v-touch:tap="gotoStrategyPage2"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  .newer-strategy-1{
    height: 100%;
    background-color: #00b0f0;
    .strategy-container{
      margin-left: 1.3rem;
      .strategy-intro{
        background: url("../../../static/image/newerStrategy/page1Intro.png") 0 0 no-repeat/90%;
        width: 17rem;
        height: 9.275rem;
        margin-bottom: 1.25rem;
        padding: 0;
      }
      .strategy-option{
        padding-top: 4.3rem;
        margin: 0 auto;
        background: url("../../../static/image/newerStrategy/page1Option.png") 0 0 no-repeat/90%;
        width: 17rem;
        height: 16.925rem;
        .option-container{
          width: 100%;
          margin-left: 1rem;
          #option-nope{
            margin-top: 3rem;
            margin-bottom: 1rem;
            width: 11.125rem;
            height: 1rem;
            text-align: center;
          }
        }
        .strategy-call-btn{
          background: url("../../../static/image/newerStrategy/strategyBtnDis.png") 0 0 no-repeat/90%;
          width: 7.55rem;
          height: 3.225rem;
          margin: 0 auto;
        }
        .strategy-btn-active{
          background: url("../../../static/image/newerStrategy/strategyBtnAct.png") 0 0 no-repeat/90%;
        }
      }
    }
  }
</style>
<script>
import IctTitlebar from '../../components/IctTitleBar.vue'
import StrOption from '../../components/newerStrategy/StrOption.vue'
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
      data () {

      },
      deactivate ({to, next}) {
        this.isBtnActive = false
        this.activeOpt = false
        next()
      }
    },
    components: {
      IctTitlebar,
      StrOption
    },
    methods: {
     gotoStrategyPage2 () {
      if (this.isBtnActive) {
        this.$route.router.go('/newerStrategy/page/2')
      }
     }
    },
    events: {
      addActiveList (option) {
        this.activeList.push(option)
      },
      reduceActiveList (option) {
        this.activeList.splice(this.activeList.indexOf(option), 1)
      }
   }
 }
</script>


