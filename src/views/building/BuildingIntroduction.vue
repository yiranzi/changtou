<template>
    <div class="building-introduction">
      <div class="background">
        <!--<ict-back-btn class="exit">X</ict-back-btn>-->
        <div class="exit" v-touch:tap="back">X</div>
        <img class="top-pic" src="../../../static/image/building/building-intro1.png">
        <div class="content">
          <p>欢迎来到长投经典课程——股票初级课。投资之路如同盖楼，现实中，房价节节高，政策天天变。</p>
          <p>昨晚彻夜的游戏让你头昏脑涨，此刻蹲在厕所的你两脚发麻，但仍在积极地思考着人生。来到这个城市四年了，合租、月光的标签粘着你挥之不去。难道，这就是你的一生了吗？</p>
          <p>想在四环内买个一室一厅，已是遥不可及的梦想；但在长投，每个院生都会有一个自己的楼房，且看学完本课，你的房子，会是什么样……</p>
        </div>
        <ict-button class="start-button" v-touch:tap="goToStartBuildHouse">开始造房</ict-button>
        <div class="bottom">
          <img class="bottom-img" src="../../../static/image/building/building-intro2.png">
        </div>
      </div>
    </div>
</template>

<style lang="less">
  .building-introduction{
    .background{
      position: relative;
      background-color: #fdfdfd;
      text-align: center;
      height: 100%;
      .exit{
        position: absolute;
        left: 1rem;
        top: 1.8rem;
        font-size: 1rem;
        border: 1px solid;
        width: 0.8rem;
        height: 0.8rem;
        color: #aaa;
        line-height: 0.8rem;
      }
      .top-pic{
        margin-top: 2rem;
        width: 10.5rem;
        height: 5.15rem;
      }
      .content{
        text-align: left;
        font-size: 26/40rem;
        margin: 1.35rem 1.75rem 0 1.75rem;
        color: #444;
        p{
          margin: 1rem 0 1rem 0 ;
        }
      }
      .start-button{
        margin-top: 60/40rem;
        border-radius: 1rem;
        height: 2rem;
        width: 340/40rem;
        background-color: #ff9800;
        color:#fff;
        font-size: 0.8rem;
      }
      .bottom{
        position:absolute;
        bottom: 0;
        height: 250/40rem;
        width: 100%;
        text-align: center;
        .bottom-img{
          width: 610/40rem;
          height:100%
        }
      }

    }
  }
</style>
<script>
  import IctButton from '../../components/IctButton.vue'
  import IctBackBtn from '../../components/IctCourseBackBtn.vue'
  export default {
      data () {
          return {
          }
      },
      components: {
        IctButton,
        IctBackBtn
      },
    methods: {
      back () {
        if (parseInt(window.sessionStorage.getItem('count')) <= 1) {
          this.$route.router.go('/main')
        } else {
          window.history.back()
        }
      },
      goToStartBuildHouse () {
          console.log('go building house')
      }
    }
  }
</script>
