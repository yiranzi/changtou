/**
 * Created by jun on 2016/12/6.
 * 毕业证 详情
 */
<template>
    <div class="graduation-diploma">
      <ict-titlebar :right-options="rightOptions" v-el:titlebar>
        <a slot="right">完成</a>
      </ict-titlebar>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
        <div>
          <div class="subject-diploma">
            <p class="user-name">用户名</p>
            <p class="subject-name">课程名</p>
            <span class="graduation-date">2016.12.6</span>
          </div>
          <div>
            <p class="draw-title">－长投毕业激励金抽奖－</p>
            <div class="draw-panel" >
              <div class="animated-border animated-border-top"></div>
              <div class="animated-border animated-border-bottom"></div>
              <div class="animated-border animated-border-left"></div>
              <div class="animated-border animated-border-right"></div>
              <!--v-if="undraw/expired/failed" :class="{'undraw': '','expired':'','failed':''}"-->
              <span class="status-label expired"></span>
              <div class="type-panel conservative" v-touch:tap="onDrawTap('conservative')">
                <span></span>
                <p>保守型</p>
                <p>随机积分</p>
              </div>
              <div class="type-panel robustness" v-touch:tap="onDrawTap('robustness')">
                <span></span>
                <p>稳健性</p>
                <p>随机积分</p>
              </div>
              <div class="type-panel radical" v-touch:tap="onDrawTap('radical')">
                <span></span>
                <p>激进型</p>
                <p>随机积分</p>
              </div>
            </div>
            <div class="draw-stamps"><!--v-if="!undraw/expired/failed"-->
              <span class="status-label expired"></span>
              <p class="app-label">APP专享</p>
              <div class="stamps-info">
                <span class="amount">2500</span>
                <span class="name">
                  <p>积分</p>
                  <p>长投毕业鼓励金</p>
                </span>
              </div>
              <p class="valid-info">购买付费课程(策略类除外)可用<span class="valid-date">有效期至2016-12-06</span></p>
            </div>
            <div class="draw-explain">
              <p>抽奖说明及使用提示</p>
              <p>1. 课程毕业且在有效期内，即可获得一次长投激励金抽奖机会</p>
              <p>2. 抽奖获得的积分可在购买主线课、选修课时进行抵扣（不支持讲座、打新服务课、私塾课的抵扣），100积分=1元</p>
              <p>3. 抽奖积分有效期为从成功领取起7天</p>
              <p>4. 激励金不与其他优惠券叠加使用</p>
              <p>5. 使用抽奖积分抵扣购买课程，退款时只退现金，积分不退</p>
            </div>
          </div>
        </div>
      </scroller>
    </div>
</template>
<script>
  import Scroller from 'vux/scroller'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {graduationDiplomaActions} from '../../vuex/actions'

  export default {
  vuex: {
    getters: {

    },
    actions: {
      getDraw: graduationDiplomaActions.getDraw
    }
  },
  data () {
    return {
      scrollerHeight: '0px',
      subjectId: 0,
      rightOptions: { //titlebar
        callback: this.onFinishTap,
        disabled: false
      }
    }
  },
  computed: {

  },
  route: {
    data ({to: {params}}) {
      this.subjectId = params.subjectId
      this.setScrollerHeight()
    }
  },
  methods: {
    setScrollerHeight () {
      const me = this
      me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.offsetHeight) + 'px'
      setTimeout(function () {
        me.$nextTick(() => {
          me.$refs.scroller.reset({
          top: 0
        })
      })
      }, 200)
    },

    /**
     * 点击完成
     */
    onFinishTap () {
      window.history.back()
    },

    /**
     * 点击抽奖
     * @param type
     */
    onDrawTap (type) { //conservative  robustness  radical
      //可抽奖
      if ('可抽奖') {
        this.getDraw(
          {
            drawType: type,
            subjectId: this.subjectId
          }
        ).then(
          ({integral}) => {
            this.showMask({
              component: 'graduationDiploma/DrawVolume.vue',
              hideOnMaskTap: true,
              data: `${integral}`,
              callbackName: null,
              callbackFn: null
            })
          }
        )
      }
      //不可抽奖
      console.log('onDrawTap')
    }
  },
  components: {
    IctTitlebar,
    Scroller
  }
}
</script>
<style lang="less">
  .graduation-diploma{
    width: 100%;
    height: 100%;
    p{
      margin: 0;
    }
    .subject-diploma{
      position: relative;
      width: 674/40rem;
      height: 876/40rem;
      margin: 30/40rem auto 100/40rem;
      background: url('../../assets/styles/image/graduationDiploma/diploma.png') 50% 50% no-repeat;
      background-size: 100%;
      text-align: center;
      p{
        margin: 0;
      }
      .user-name{
        width: 100%;
        position: absolute;
        top: 392/40rem;
        left: 0;
        text-align: center;
        font-size: 48/40rem;
        font-weight: bolder;
        color: #b8996e;
      }
      .subject-name{
        width: 100%;
        position: absolute;
        top: 510/40rem;
        left: 0;
        text-align: center;
        font-size: 28/40rem;
        color: #666;
      }
      .graduation-date{
        position: absolute;
        top: 690/40rem;
        left: 138/40rem;
        font-size: 22/40rem;
        color: #222;
      }
    }
    .status-label{
      position: absolute;
      z-index: 3;
      display: block;
      width: 184/40rem;
      height: 126/40rem;
      top: -150/40rem;
      right: 53/40rem;
    }
    .expired{
      background: url('../../assets/styles/image/graduationDiploma/expired.png') 50% 50% no-repeat;
      background-size: 100% 100%;
    }
    .failed{
      background: url('../../assets/styles/image/graduationDiploma/failed.png') 50% 50% no-repeat;
      background-size: 100% 100%;
    }
    .invalid{
      background: url('../../assets/styles/image/graduationDiploma/invalid.png') 50% 50% no-repeat;
      background-size: 100% 100%;
    }
    .draw-title{
      width: 100%;
      text-align: center;
      font-size: 30/40rem;
      color: #888;
    }
    .draw-panel{
      position: relative;
      width: 640/40rem;
      height: 230/40rem;
      margin: 120/40rem auto 60/40rem;
      padding-top: 30/40rem;
      box-sizing: border-box;
      text-align: center;
      .type-panel{
        display: inline-block;
        position: relative;
        width: 180/40rem;
        height: 170/40rem;
        padding-top: 60/40rem;
        box-sizing: border-box;
        border-radius: 10px;
        text-align: center;
        span{
          position: absolute;
          display: block;
          width: 120/40rem;
          height: 120/40rem;
          z-index: 2;
          top: -90/40rem;
          left: 30/40rem;
          border-radius: 50%;
        }
        p{
          width: 100%;
        }
        p:nth-of-type(1){
          font-size: 28/40rem;
          text-decoration: underline;
        }
        p:nth-of-type(2){
          margin-top: 24/40rem;
          font-size: 22/40rem;
        }
      }
      .conservative{
        background: #d3ebfb;
        span{
          background: url('../../assets/styles/image/graduationDiploma/conservative.png') 50% 50% no-repeat;
          background-size: 100% 100%;
        }
        p:nth-of-type(1){
          color: #0c97ff;
        }
        p:nth-of-type(2){
          color: #83caff;
        }
      }
      .robustness{
        background: #fdf1d4;
        span{
          background: url('../../assets/styles/image/graduationDiploma/robustness.png') 50% 50% no-repeat;
          background-size: 100% 100%;
        }
        p:nth-of-type(1){
          color: #ffa902;
        }
        p:nth-of-type(2){
          color: #fbce68;
        }
      }
      .radical{
        background: #fee1e4;
        span{
          background: url('../../assets/styles/image/graduationDiploma/radical.png') 50% 50% no-repeat;
          background-size: 100% 100%;
        }
        p:nth-of-type(1){
          color: #de4931;
        }
        p:nth-of-type(2){
          color: #faa69a;
        }
      }
      .animated-border{
        position: absolute;
        background: url('../../assets/styles/image/graduationDiploma/border-horizon.png') 0 0;
        /*background-size: 100% 100%;*/
        animation-duration: 10s;
        -webkit-animation-duration: 10s;
        animation-delay: 0s;
        -webkit-animation-delay: 0s;
        animation-iteration-count: infinite;
        -webkit-animation-iteration-count: infinite;
        animation-fill-mode: backwards;
        -webkit-animation-fill-mode: backwards;
        animation-timing-function: linear;
        -webkit-animation-timing-function: linear;
      }
      .animated-border-top{
        top: -2px;
        left: 0;
        width: 100%;
        height: 4px;
        animation-name: runRight;
        -webkit-animation-name: runRight;
      }
      .animated-border-bottom{
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 4px;
        animation-name: runLeft;
        -webkit-animation-name: runLeft;
      }
      .animated-border-right{
        top: 0;
        right: -2px;
        height: 100%;
        width: 4px;
        background: url('../../assets/styles/image/graduationDiploma/border-vertial.png') 0 0;
        /*background-size: 100% 100%;*/
        animation-name: runBottom;
        -webkit-animation-name: runBottom;
      }
      .animated-border-left{
        top: 0;
        left: -2px;
        height: 100%;
        width: 4px;
        background: url('../../assets/styles/image/graduationDiploma/border-vertial.png') 0 0;
        /*background-size: 100% 100%;*/
        animation-name: runTop;
        -webkit-animation-name: runTop;
      }
    }
    .draw-disabled{
      border: 2px dotted #ddd;
      .conservative{
        background: #f2f2f2;
        span{
          background: url('../../assets/styles/image/graduationDiploma/conservative-disabled.png') 50% 50% no-repeat;
          background-size: 100% 100%;
        }
        p:nth-of-type(1){
          color: #aaa;
        }
        p:nth-of-type(2){
          color: #ddd;
        }
      }

      .robustness{
        background: #f2f2f2;
        span{
          background: url('../../assets/styles/image/graduationDiploma/robustness-disabled.png') 50% 50% no-repeat;
          background-size: 100% 100%;
        }
        p:nth-of-type(1){
          color: #aaa;
        }
        p:nth-of-type(2){
          color: #ddd;
        }
      }

      .radical{
        background: #f2f2f2;
        span{
          background: url('../../assets/styles/image/graduationDiploma/radical-disabled.png') 50% 50% no-repeat;
          background-size: 100% 100%;
        }
        p:nth-of-type(1){
          color: #aaa;
        }
        p:nth-of-type(2){
          color: #ddd;
        }
      }
    }
    .draw-stamps{
      position: relative;
      width: 660/40rem;
      height: 250/40rem;
      margin: 60/40rem auto;
      border: 1px solid #ddd;
      background: #fff;
      .status-label{
        top: 40/40rem;
        right: 40/40rem;
      }
      .app-label{
        padding: 0 20/40rem;
        box-sizing: border-box;
        line-height: 60/40rem;
        font-size: 28/40rem;
        text-align: right;
        color: #ddd;
      }
      .stamps-info{
        position: relative;
        padding: 0 40/40rem 40/40rem;
        box-sizing: border-box;
        &:after{
          position: absolute;
          content: ' ';
          display: block;
          width: 620/40rem;
          height: 1px;
          bottom: 0;
          left: 20/40rem;
          background: #f0eff5;
        }
        .amount{
          display: inline-block;
          line-height: 90/40rem;
          font-size: 90/40rem;
          color: #ff5055;
          font-weight: bolder;
        }
        .name{
          display: inline-block;
          p:nth-of-type(1){
            font-size: 30/40rem;
            color: #ffc833;
          }
          p:nth-of-type(2){
            font-size: 30/40rem;
            color: #666;
          }
        }
      }
      .valid-info{
        position: relative;
        padding: 0 20/40rem;
        box-sizing: border-box;
        line-height: 60/40rem;
        font-size: 22/40rem;
        color: #aaa;
      }
      .valid-date{
        position: absolute;
        right: 20/40rem;
      }
    }
    .draw-stamps-disabled{
      .stamps-info{
        .amount{
          color: #ddd;
        }
        .name{
          p:nth-of-type(1){
            color: #ddd;
          }
          p:nth-of-type(2){
            color: #ddd;
          }
        }
      }
      .valid-info{
        color: #ddd;
      }
    }
    .draw-explain{
      padding: 0 50/40rem 60/40rem;
      font-size: 24/40rem;
      color: #aaa;
      p:nth-of-type(1){
        font-size: 26/40rem;
        color: #888;
        margin-bottom: 30/40rem;
      }
    }
    @keyframs runRight {
      100% {
        background: url('../../assets/styles/image/graduationDiploma/border-horizon.png') 100% 0;
      }
    }
    @-webkit-keyframes runRight {
      100% {
        background: url('../../assets/styles/image/graduationDiploma/border-horizon.png') 100% 0;
      }
    }
    @keyframs runLeft {
      100% {
        background: url('../../assets/styles/image/graduationDiploma/border-horizon.png') -100% 0;
      }
    }
    @-webkit-keyframes runLeft {
      100% {
        background: url('../../assets/styles/image/graduationDiploma/border-horizon.png') -100% 0;
      }
    }
    @keyframs runBottom {
      100% {
        background: url('../../assets/styles/image/graduationDiploma/border-vertial.png') 0 100%;
      }
    }
    @-webkit-keyframes runBottom {
      100% {
        background: url('../../assets/styles/image/graduationDiploma/border-vertial.png') 0 100%;
      }
    }
    @keyframs runTop {
      100% {
        background: url('../../assets/styles/image/graduationDiploma/border-vertial.png') 0 -100%;
      }
    }
    @-webkit-keyframes runTop {
      100% {
        background: url('../../assets/styles/image/graduationDiploma/border-vertial.png') 0 -100%;
      }
    }
  }
</style>
