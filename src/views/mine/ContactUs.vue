<template>
    <div class="contact-us">
      <div>
        <ict-titlebar>关于我们</ict-titlebar>
      </div>

      <div class="app-logo">
        <img src='../../assets/styles/image/LOGO.png'>
      </div>
      <div class="item">
        <span>微信号</span>
        <span>长投学堂(ichangtou)</span>
      </div>
      <div class="item">
        <span>官方邮箱</span>
        <span>admin@ichangtou.com</span>
      </div>
      <div class="item">
        <span>版本信息</span>
        <span> {{ versionNum }} </span>
      </div>

      <div class="copyright">
        <p>Copyright©2012年—2016年</p>
        <p>长投网iChangtou.com版权所有</p>
      </div>

    </div>

</template>
<style lang="less">
  .contact-us{
    height: 100%;
    background-color: #f2f2f2;
    color: #898989;

    p{
      margin: 0;
    }

    .app-logo{
      width: 100%;
      height: 14.45rem;
      text-align: center;
      img{
        margin: 3rem 0;
        width: 10.5rem;
        height: 8.45rem;

      }
    }

    .item{
      width: 100%;
      line-height: 48/20rem;
      background-color: #fff;
      border-top: 1px solid #f0eff5;
      font-size: 0.7rem;
      position: relative;

      span:nth-child(1){
        color: #000;
        text-align: left;
        margin-left: 0.6rem;
      }

      span:nth-child(2){
        text-align: right;
        position: absolute;
        right: 0.6rem;
      }
    }
    .copyright{
      width: 100%;
      text-align: center;
      font-size: 0.6rem;
      position: absolute;
      bottom: 2.5rem;
    }
    /*iphone5*/
    @media all and (max-width: 320px) {
      .app-logo{
        width: 100%;
        height: 13.5rem;
        text-align: center;
        img{
          margin: 3rem 0;
          width: 10.5rem;
          height: 8.45rem;

        }
      }
      .copyright{
        width: 100%;
        text-align: center;
        font-size: 0.6rem;
        position: absolute;
        bottom: 2rem;
      }
    }

  }
</style>
<script>
import IctTitlebar from '../../components/IctTitleBar.vue'
import {versionNum} from '../../plugin/version'
  export default {
  data () {
    return {
      versionNum
    }
  },
  components: {
    IctTitlebar
  }
}

</script>
