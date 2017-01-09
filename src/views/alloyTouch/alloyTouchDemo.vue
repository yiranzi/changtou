<template>
  <div class="alloyTouchDemo">
    <div id="fullpage" class="site__header">
      <div class="section">
        <div class="section-item-0">
        </div>
      </div>
      <div class="section">
        <div class="section-item-1">
        </div>
      </div>
      <div class="section">
        <div class="section-item-2">
        </div>
      </div>
      <div class="section">
        <div class="section-item-3">
        </div>
      </div>
      <div class="section">
        <div class="section-item-4">
        </div>
      </div>
      <div class="section">
        <div class="section-item-5">
        </div>
      </div>
      <div class="section">
        <div class="section-item-6">
        </div>
      </div>
      <div class="section">
        <div class="section-item-7">
        </div>
      </div>
      <div class="section">
        <div class="section-item-8">
        </div>
      </div>
      <div class="section section-last-page">
        <div class="section-item-9">
          <div class="section-title"></div>
          <div class="section-mid"></div>
          <div class="section-down"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">

  html,body{
    margin: 0;
    padding: 0;
    text-align: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  *{
    box-sizing: border-box;
  }

  #fullpage{
    /*visibility: hidden;*/
    .section{
      width: 100%;
      height: 100%;
      font-size: 24px;
      position: relative;
      background: url("../../assets/styles/image/alloyTouch/backgdData.jpg") 0% 0% no-repeat/100%;
      .section-item-0{
        background: url("../../assets/styles/image/alloyTouch/page1.png") center center no-repeat/90%;
        width: 8.825rem;
        height: 7.275rem;
        position: relative;
        top: 30%;
        left: 30%;
      }
      .section-item-1{
        background: url("../../assets/styles/image/alloyTouch/page2.png") center center no-repeat/90%;
        width: 15.025rem;
        height: 20.3rem;
        position: relative;
        top: 19%;
        left: 5%;
      }
      .section-item-2{
        background: url("../../assets/styles/image/alloyTouch/page3.png") center center no-repeat/90%;
        width: 14.25rem;
        height: 19.7rem;
        position: relative;
        top: 20%;
        left: 10%;
      }
      .section-item-3{
        background: url("../../assets/styles/image/alloyTouch/page4.png") center center no-repeat/90%;
        width: 14.825rem;
        height: 22.525rem;
        position: relative;
        top: 15%;
        left: 15%;
      }
      .section-item-4{
        background: url("../../assets/styles/image/alloyTouch/page5.png") center center no-repeat/90%;
        width: 15.85rem;
        height: 16.8rem;
        position: relative;
        top: 24%;
        left: 10%;
      }
      .section-item-5{
        background: url("../../assets/styles/image/alloyTouch/page6.png") center center no-repeat/90%;
        width: 15.55rem;
        height: 20.8rem;
        position: relative;
        top: 20%;
        left: 12%;
      }
      .section-item-6{
        background: url("../../assets/styles/image/alloyTouch/page7.png") center center no-repeat/90%;
        width: 18.75rem;
        height: 20.3rem;
        position: relative;
        top: 15%;
      }
      .section-item-7{
        background: url("../../assets/styles/image/alloyTouch/page8.png") center center no-repeat/90%;
        width: 16.65rem;
        height: 19.15rem;
        position: relative;
        top: 15%;
        left: 10%;
      }
      .section-item-8{
        background: url("../../assets/styles/image/alloyTouch/page9.png") center center no-repeat/90%;
        width: 16rem;
        height: 19.1rem;
        position: relative;
        top: 15%;
        left: 10%;
      }
    }
    .section-last-page{
      background: #fcf8f4 !important;
      .section-item-9{
        .section-title{
          background: url("../../assets/styles/image/alloyTouch/backCover1.png") center center no-repeat/90%;
          width: 18.75rem;
          height: 7.15rem;
          position: relative;
        }
        .section-mid{
          background: url("../../assets/styles/image/alloyTouch/backCover2.png") center center no-repeat/90%;
          width: 13.125rem;
          height: 3.25rem;
          position: relative;
          top: 51%;
          left: 13%;
          margin-bottom: 5rem;
          margin-top: 5rem;
        }
        .section-down{
          background: url("../../assets/styles/image/alloyTouch/backCover3.png") center center no-repeat/90%;
          width: 11.95rem;
          height: 2.2rem;
          position: relative;
          top: 62%;
          left: 16%;
        }
      }
    }
  }

  .site__header {
    /*-webkit-animation: bounceInUp 1s;*/
  }

  *{
    box-sizing: border-box;
  }
</style>
<script>
    import AlloyTouch from 'alloyTouch'
    import FullPage from '../../util/alloyTouch/alloy_touch.full_page.js'
    import ProgressBar from '../../util/alloyTouch/progress_bar.js'
    import alloy_touch from '../../util/alloyTouch/alloy_touch.js'
    export default {
       data () {
        return {
        }
       },
       ready () {
        this.init()
       },
       methods: {
        init () {
        window.alert('enter')
        var pb;
        console.log(AlloyTouch.FullPage)
        var fp =  new AlloyTouch.FullPage("#fullpage",{
            animationEnd:function () {
            },
            leavePage: function (index) {
               console.log("leave"+index)
            },
            beginToPage: function (index) {
               console.log("to"+index);
            }
        });
        },
       gotoIndex () {
        this.$route.router.go('/main')
       },
       gotoAgain () {
        window.history.reload()
       }
       }
     }
</script>

