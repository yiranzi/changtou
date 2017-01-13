<template>
  <div class="newer-strategy-2">
    <div>
      <ict-titlebar>新手攻略</ict-titlebar>
    </div>
    <div class="strategy-container">
      <div class="strategy-dialogue intro-1">
      </div>
      <div class="strategy-option">
        <div class="strategy-item-container">
          <div class="strategy-item strategy-item-1" v-touch:tap="gotoRudiments">如何开启财富自由之路</div>
          <div class="strategy-item strategy-item-2" v-touch:tap="gotoAip">如何躺着赚钱</div>
          <div class="strategy-item strategy-item-3" >手把手教你选基金手册</div>
          <div class="strategy-book-container" v-touch:tap="gotoReceiveBook">
            <div class="strategy-book"></div>
            <div class="strategy-receive-btn">限时免费领</div>
          </div>
        </div>
      </div>
      <div class="strategy-dialogue intro-2">
      </div>
    </div>
  </div>
</template>
<style lang="less">
  .newer-strategy-2{
    height: 100%;
    background-color: #00b0f0;
    .strategy-container{
      margin-left: 1rem;
      margin-top: 1.5rem;
      .strategy-option{
        .strategy-item-container {
          margin: 0 auto;
          background: url("../../../static/image/newerStrategy/page2Option.png") 0 0 no-repeat/90%;
          width: 17rem;
          height: 19.2rem;
          padding-top: 3rem;
          padding-left: 2rem;
          .strategy-item {
            width: 12.5rem;
            height: 2.1rem;
            margin-bottom: .6rem;
            font-size: .75rem;
            line-height: 1.8rem;
            text-align: left;
            color: #384879;
            font-weight: bold;
            padding-left: 2rem;
          }
          .strategy-item-1 {
            background: url("../../../static/image/newerStrategy/strategyBar1.png") 0 0 no-repeat/90%;
          }
          .strategy-item-2 {
            background: url("../../../static/image/newerStrategy/strategyBar2.png") 0 0 no-repeat/90%;
          }
          .strategy-item-3 {
            background: url("../../../static/image/newerStrategy/strategyBar3.png") 0 0 no-repeat/90%;
          }
          .strategy-book-container {
            margin: 0 auto;
            padding-left: 3.5rem;
            .strategy-book {
              background: url("../../../static/image/newerStrategy/page2BookEntry.png") 0 0 no-repeat/95%;
              width: 5.75rem;
              height: 5rem;
              margin-top: .75rem;
              margin-bottom: .6rem;
            }
            .strategy-receive-btn{
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
      .strategy-dialogue{
        width: 15.4rem;
        height: 3.75rem;
      }
      .intro-1{
        background: url("../../../static/image/newerStrategy/page2Intro1.png") 0 0 no-repeat/90%;
        margin-bottom: .5rem;
      }
      .intro-2{
        background: url("../../../static/image/newerStrategy/page2Intro2.png") 0 0 no-repeat/90%;
        position: relative;
        top: -2rem;
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
      }
    },
    components: {
      IctTitlebar,
      StrOption
    },
    methods: {
      gotoRudiments () {
        this.$route.router.go('/subject/detail/F/1/0')
      },
      gotoAip () {
        this.$route.router.go('/subject/detail/P/15/0')
      },
      gotoReceiveBook () {
        const bookId = 2
        this.$route.router.go(`/giftPackage/newerBookDetails/${bookId}`)
      }
    }
}
</script>
