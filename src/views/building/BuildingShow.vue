<template>
  <div class="building-show">
    <div class="building-show-title">
      <div class="building-show-close" v-touch:tap="onCancel"></div>
      造房计划
      <div class="building-show-rule">规则</div>
    </div>
    <div class="building-show-entirety">
      <div class="building-show-single">
        <img src="../../../static/image/building/building-show-unlocked-1-1.png" style="width: 100%;">
        <div class="building-show-goods-state">
          <img src="../../../static/image/building/building-show-locked.png" style="width: 100%;">
        </div>
      </div>
    </div>
    <div class="building-show-point">
      <div class="building-show-course-point-title">造房最重要的呢是什么？</div>
      <div class="building-show-course-point-content">在股票投资初级课•造房计划中，根据<span>第一课</span>的作业情况，将有机会选择你心仪的<span>造房地段</span>哦~~</div>
      <div class="building-show-unlocked-point">解锁物品规则：<br>选择题3/4分——解锁初级物品<br>选择题５分/问答题３分——解锁中级物品<br>问答题４/5分——解锁高级物品</div>
    </div>
    <div class="start-study-btn">开始学习</div>
  </div>
</template>
<style lang="less">
  .building-show{
    background: #fff;
    .building-show-title{
      text-align: center;
      line-height: 84/40rem;
      color: #666;
      font-size: 34/40rem;
      padding: 1.2rem 0 46/40rem;
      position: relative;
      .building-show-close {
        width: 2rem;
        height: 2rem;
        position: absolute;
        left: 0.4rem;
      }
      .building-show-close:before {
        width: 0.8rem;
        line-height: 0.8rem;
        font-family: 'myicon';
        content: '\e90d';
        font-size: 0.8rem;
        text-align: center;
        color: #aaa;
      }
      .building-show-rule{
        font-size: 28/40rem;
        color: #888;
        line-height: 84/40rem;
        position: absolute;
        top: 1.2rem;
        right: 0.8rem;
      }
    }
    .building-show-entirety{
      overflow: hidden;
      position: relative;
      .building-show-single{
        width: 750/40rem;
        height: 300/40rem;
        box-sizing: border-box;
        border: 6/40rem #ccc dashed;
        overflow: hidden;
        display: flex;
        align-items:center;
        justify-content: center;
        position: relative;
        .building-show-goods-state{
          width: 66/40rem;
          height: 128/40rem;
          position: absolute;
        }
      }
    }
    .building-show-point{
      padding: 0 70/40rem 0;
      margin: 60/40rem 0 80/40rem;
      font-size: 26/40rem;
      color: #666;
      span{
        color: #0066ff;
      }
      .building-show-course-point-content{
        margin: 60/40rem 0;
      }
      .building-show-unlocked-point{
        color: #888;
      }
    }
    .start-study-btn{
      width: 340/40rem;
      height: 80/40rem;
      background: #ff9800;
      border-radius: 1rem;
      margin: 0 auto;
      text-align: center;
      line-height: 80/40rem;
      color: #fff;
      font-size: 32/40rem;
    }
  }
</style>
<script>
  import IctCloseBtn from '../../components/IctCloseBtn.vue'
  //import buildingActions from '../../vuex/actions'
  //import {buildingGetters, userGetters} from '../../vuex/getters'
  import userGetters from '../../vuex/getters'

  export default {
    vuex: {
      actions: {
      },
      getters: {
        isLogin: userGetters.isLogin
      }
    },

    route: {
      data () {
        return {

        }
      }
    },

    data () {
      return {

      }
    },

    methods: {
      onCancel () {
        window.history.back()
      }
    },

    components: {
      IctCloseBtn
    }
  }
</script>
