<template>
    <div class="building-rule">
      <ict-titlebar v-el:titlebar>造房攻略</ict-titlebar>
      <div class="main">
        <div class="top-txt">
          <div>
            <p>造房计划中,股票投资初级课每课的作业对应一件物品,完成作业即可为你的房子添砖加瓦哦~</p>
            <p>
              选择题3/4分——解锁<span>初级物品</span><br>
              选择题５分/问答题３分——解锁<span>中级物品</span><br>
              问答题４/5分——解锁<span>高级物品</span>
            </p>
            <p>回答题只有一次答题机会哦~</p>
          </div>
        </div>
        <div  class="mid-pic">
          <img src="../../../static/image/building/building-rule.png">
        </div>
        <div class="bottom-txt">
          <p>欢迎来到长投经典课程——股票初级课。投资之路如同盖楼，现实中，房价节节高，政策天天变。</p>
          <p>昨晚彻夜的游戏让你头昏脑涨，此刻蹲在厕所的你两脚发麻，但仍在积极地思考着人生。
          来到这个城市四年了，合租、月光的标签粘着你挥之不去。难道，这就是你的一生了吗？</p>
          <p>想在四环内买个一室一厅，已是遥不可及的梦想；但在长投，每个院生都会有一个自己的楼房，且看学完本课，你的房子，会是什么样……</p>
        </div>
      </div>
    </div>
</template>
<style lang="less">
  .building-rule{
    background-color: #fdfdfd;
    .main{
      padding: 1.5rem 1.75rem;
      p{
        margin: 0;
        font-size: 24/40rem;
      }
      .top-txt{
        p{
          margin: 0.6rem 0;
        }
        color: #444;
        span{
          font-weight: bold;
          color: #00b0f0;
        }
      }
      .mid-pic{
        margin-top: 2rem;
        text-align: center;
        img{
          width: 304/40rem;
          height: 186/40rem;
        }
      }
      .bottom-txt{
        p{
          margin-bottom: 1rem;
        }
        margin-top: 30/40rem;
        font-color: #888;
        line-height: 1rem;
      }
    }
  }
</style>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  export default {
      components: {
        IctTitlebar
      }
  }
</script>
