<template>
  <div class="guide-present">
    <ict-titlebar v-el:title-bar>新手攻略</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
      <div>
        <img src="../../../static/image/newerGuide/present-top-tip.png" class="present-tip"/>
        <div class="strategy-option">
          <div class="strategy-item-container">
            <div class="strategy-item strategy-item-1" v-touch:tap="goToRudiments">如何开启财富自由之路</div>
            <div class="strategy-item strategy-item-2" v-touch:tap="goToAip">如何躺着赚钱</div>
            <div class="strategy-item strategy-item-3" >手把手教你选基金手册</div>
            <div class="strategy-book-container" v-touch:tap="goToReceiveBook">
              <div class="strategy-book"></div>
              <div class="strategy-receive-btn">限时免费领</div>
            </div>
          </div>
        </div>
        <img src="../../../static/image/newerGuide/present-down-tip.png"  class="present-tip"/>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .guide-present{
    height: 100%;
    background-color: #00b0f0;
    .present-tip{
      width: 15.4rem;
      height: 3.75rem;
      margin: 40/40rem 50/40rem;
    }
    .strategy-option{
      text-align: center;
      .strategy-item-container {
        margin: 0 auto;
        background: url("../../../static/image/newerStrategy/page2Option.png") 0 0 no-repeat;
        background-size: 100%;
        width: 680/40rem;
        height: 770/40rem;
        padding-top: 3rem;
        padding-left: 1rem;
        box-sizing: border-box;
        .strategy-item {
          width: 580/40rem;
          height: 84/40rem;
          margin-bottom: .6rem;
          font-size: .75rem;
          line-height: 2.1rem;
          text-align: left;
          color: #384879;
          font-weight: bold;
          padding-left: 2rem;
          box-sizing: border-box;
        }
        .strategy-item-1 {
          background: url("../../../static/image/newerStrategy/strategyBar1.png") 0 0 no-repeat;
          background-size: 100%;
        }
        .strategy-item-2 {
          background: url("../../../static/image/newerStrategy/strategyBar2.png") 0 0 no-repeat;
          background-size: 100%;
        }
        .strategy-item-3 {
          background: url("../../../static/image/newerStrategy/strategyBar3.png") 0 0 no-repeat;
          background-size: 100%;
        }
        .strategy-book-container {
          margin: 0 auto;
          padding: 30/40rem auto 0;
          box-sizing: border-box;
          display: inline-block;
          .strategy-book {
            background: url("../../../static/image/newerStrategy/page2BookEntry.png") 0 0 no-repeat;
            background-size: 100% 100%;
            width: 241/40rem;
            height: 204/40rem;
            margin: 0 auto 24/40rem;
          }
          .strategy-receive-btn{
            margin: 0 auto;
            width: 6rem;
            height: 1.7rem;
            border-radius: 1.05rem;
            background: #feb649;
            color: white;
            font-size: .75rem;
            border: none;
            text-align: center;
            line-height: 1.7rem;
          }
          .strategy-receive-btn:active{
            animation: breath 2s ease-in-out infinite;
          }
          @keyframes breath {
            from {
              opacity: .2;
              transform: scale(1.1);
            }
            50% {
              opacity: 1;
            }
            to {
              opacity: .2;
              transform: scale(1);
            }
          }
        }
      }
    }
  }
</style>
<script>
import IctTitlebar from '../../components/IctTitleBar.vue'
import Scroller from 'vux/scroller'
import StrOption from '../../components/newerStrategy/StrOption.vue'
  export default {
    data () {
      return {
        scrollerHeight: '580px'
      }
    },
    route: {
      data () {
        this.setScrollerHeight()
      }
    },
    methods: {
      setScrollerHeight () {
        const me = this
        setTimeout(function () {
          me.$nextTick(() => {
            me.scrollerHeight = (window.document.body.offsetHeight - me.$parent.$els.titleBar) + 'px'
            me.$refs.scroller.reset({
              top: 0
            })
          })
        }, 200)
      },
      goToRudiments () {
        this.$route.router.go('/subject/detail/F/1/0')
      },
      goToAip () {
        this.$route.router.go('/subject/detail/P/15/0')
      },
      goToReceiveBook () {
        const bookId = 2
        this.$route.router.go(`/giftPackage/newerBookDetails/${bookId}`)
      }
    },
    components: {
      IctTitlebar,
      StrOption,
      Scroller
    }
  }
</script>
