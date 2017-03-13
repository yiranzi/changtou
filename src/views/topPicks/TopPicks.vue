<template>
  <div class="top-picks">
    <ict-titlebar>
      头条精选
    </ict-titlebar>
    <p class="top-picks-sign-title">- 连续7日送礼包 -</p>
    <div class="top-picks-sign-progress">
      <div class="top-picks-sign-progress-once" v-for="item in progressTotal">
        <span class="top-picks-sign-progress-day">
          <img v-bind:src="item.src" style="width: .95rem;height: .95rem;">
          <p v-bind:style="{ color: item.color }">{{item.day}}日</p>
        </span>
        <span class="top-picks-sign-progress-line">-</span>
      </div>
      <div class="top-picks-sign-progress-gift">
        <img v-bind:src="progressGift.src" style="width: 1.3rem;height: 1.3rem;">
        <p v-bind:style="{ color: progressGift.color }">领礼包</p>
      </div>
    </div>
    <div class="top-picks-sign-btn" v-touch:tap="onSignIn" v-if="!isSign">
      <img class="top-picks-sign-btn-pic" src='../../../static/image/topPicks/top-picks-sign-in.png'>
    </div>
    <div class="top-picks-article-title">你的投资有目标吗？</div>
    <div class="top-picks-author">
      <div class="top-picks-author-head">
        <img src="../../../static/image/topPicks/sign-gift.png"  style="width: 100%;">
      </div>
      <div class="top-picks-author-name">嗨妹子来hi</div>
    </div>
    <div class="top-picks-article">
      <div class="top-picks-article-content">很多人上来就会问我一句：现在买什么投资好？我通常会反问：你的目标是什么？如果没有投资目标，我会无法回答。</div>
      <img src="../../../static/image/topPicks/sign-gift.png" style="width: 12rem;height: 7rem;">
    </div>
    <div class="top-picks-end">- END -</div>
  </div>
</template>
<style lang="less">
  .top-picks{
    .ict-titlebar{
      padding-top: 40/40rem;
      height: 128/40rem;
      .ict-titlebar-left{
        top: 40/40rem;
      }
    }
    .top-picks-sign-title{
      color: #aaa;
      font-size: 20/40rem;
      text-align: center;
      line-height: 60/40rem;
      margin: 0;
    }
    .top-picks-sign-progress{
      width: 680/40rem;
      height: 130/40rem;
      background: #fdf6e8;
      border-radius: 12/40rem;
      margin: 0 auto;
      padding-left: 27/40rem;
      box-sizing: border-box;
      text-align: center;
      p{
        margin: 0;
        color: #9d9d9d;
        font-size: 18/40rem;
      }
      .top-picks-sign-progress-once{
        padding-top: 27/40rem;
        overflow: hidden;
        float: left;
        .top-picks-sign-progress-day{
          float: left;
          width: 63/40rem;
        }
        .top-picks-sign-progress-line{
          float: left;
          width: 30/40rem;
          color: #9d9d9d;
        }
      }
      .top-picks-sign-progress-gift{
        padding-top: 24/40rem;
        float: left;
      }
    }
    .top-picks-sign-btn{
      width: 190/40rem;
      height: 70/40rem;
      margin-left: 90/40rem;
      .top-picks-sign-btn-pic{
        width: 100%;
      }
    }
    .top-picks-article-title{
      margin: 2rem 0 30/40rem 70/40rem;
      font-size: 36/40rem;
      color: #666;
      font-weight: bold;
    }
    .top-picks-author{
      margin-left: 70/40rem;
      overflow: hidden;
      .top-picks-author-head{
        width: 64/40rem;
        height: 64/40rem;
        border-radius: 50%;
        overflow: hidden;
        float: left;
      }
      .top-picks-author-name{
        float: left;
        font-size: 26/40rem;
        color: #aaa;
        line-height: 64/40rem;
        margin-left: 20/40rem;
      }
    }
    .top-picks-article{
      margin: 1rem 70/40rem 2.5rem;
      text-align: center;
      .top-picks-article-content{
        margin-bottom: 50/40rem;
        font-size: 28/40rem;
        color: #888;
        text-align: left;
        line-height: 48/40rem;
      }
    }
    .top-picks-end{
      font-size: 28/40rem;
      color: #aaa;
      text-align: center;
      margin-bottom: 2rem;
    }
  }
</style>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {topPicksGetters, userGetters} from '../../vuex/getters'
  import {topPicksActions} from '../../vuex/actions'

  export default {
    vuex: {
      actions: {
        getTopPicksList: topPicksActions.getTopPicksList,  // 获取头条精选内容
        getUserSignState: topPicksActions.getUserSignState,  // 获取用户当天是否签到
        getUserSignCount: topPicksActions.getUserSignCount,  // 获取用户签到天数
        signUpdate: topPicksActions.signUpdate  //  用户签到
      },
      getters: {
        topPicksList: topPicksGetters.topPicksList,  // 头条精选内容
        isLogin: userGetters.isLogin,  //是否登录
        userIsSign: topPicksGetters.userIsSign,  // 用户当天是否签到
        userSignCount: topPicksGetters.userSignCount  // 用户签到天数
      }
    },

    route: {
      data () {
        // 显示头条精选内容
        /*
        this.getTopPicksList().then(() => {
          console.log(this.topPicksList)
        })
        */
        //  读取签到状态
        this.getUserSignState().then(() => {
          this.isSign = this.userIsSign  //  获取当天是否签到
          this.signCount = this.userSignCount  // 获取连续签到次数
          //判断是否登录
          if (this.isLogin) {  // 已登陆
            this.showSignProgress(this.signCount)  // 显示签到进度
          } else {  // 未登录
            this.showSignProgress(0)  // 显示签到进度
          }
        })
      }
    },

    data () {
      return {
        isSign: false,  // 判断今天是否签到过
        signCount: 0,  // 连续签到的次数
        progressTotal: [
          {day: '第1', color: '#ff9800', src: '../../../static/image/topPicks/top-picks-sign-doing.png'},
          {day: '第2', color: '#9d9d9d', src: '../../../static/image/topPicks/top-picks-sign-before.png'},
          {day: '第3', color: '#9d9d9d', src: '../../../static/image/topPicks/top-picks-sign-before.png'},
          {day: '第4', color: '#9d9d9d', src: '../../../static/image/topPicks/top-picks-sign-before.png'},
          {day: '第5', color: '#9d9d9d', src: '../../../static/image/topPicks/top-picks-sign-before.png'},
          {day: '第6', color: '#9d9d9d', src: '../../../static/image/topPicks/top-picks-sign-before.png'}
        ],   // 前6天进度样式
        progressGift: {
          color: '#9d9d9d', src: '../../../static/image/topPicks/top-picks-sign-gift-before.png'
        }  // 礼物样式
      }
    },

    methods: {
     /**
      * 显示签到进度
      */
      showSignProgress (dayIndex) {
        if (dayIndex === 7) {  // 签到次数为7天
          // 已打卡
          for (let i = 0; i < dayIndex - 1; i++) {
            this.progressTotal[i].color = '#ff9800'
            this.progressTotal[i].src = '../../../static/image/topPicks/top-picks-sign-after.png'
          }
          // 显示礼物
          this.progressGift.color = '#ff9800'
          this.progressGift.src = '../../../static/image/topPicks/top-picks-sign-gift-after.png'
        } else {   // 签到数小于7
          // 已打卡
          if (dayIndex) {
            for (let i = 0; i < dayIndex; i++) {
              this.progressTotal[i].color = '#ff9800'
              this.progressTotal[i].src = '../../../static/image/topPicks/top-picks-sign-after.png'
            }
          }
          // 要打卡
          if (dayIndex < 6) {
            // 签到小于6天
            if (this.isSign === false) {  // 未签到
              this.progressTotal[dayIndex].day = '今'
              this.progressTotal[dayIndex].color = '#ff9800'
              this.progressTotal[dayIndex].src = '../../../static/image/topPicks/top-picks-sign-doing.png'
            } else {     // 已签到
              this.progressTotal[dayIndex - 1].color = '#ff9800'
              this.progressTotal[dayIndex - 1].src = '../../../static/image/topPicks/top-picks-sign-after.png'
            }
          } else {
            // 礼物
            if (this.isSign === false) {  // 未签到
              this.progressGift.color = '#ff9800'
              this.progressGift.src = '../../../static/image/topPicks/top-picks-sign-gift-doing.png'
            }
          }
        }
      },

      /**
      * 点击签到
      */
      onSignIn () {
        // 判断是否登录
        if (this.isLogin) {  // 已登录
          this.signCount += 1  // 签到次数加一
          if (this.signCount === 7) {
            // 弹出gift浮层
            console.log('gift')
            this.showMask({
              component: 'topPicks/SignGift.vue',
              hideOnMaskTap: true
            })
            // 给后台传数据：该用户生命值加1000
          }
          this.signUpdate()
          this.isSign = true  // 签过到
          this.showSignProgress(this.signCount)
        } else {  // 未登录
          this.$route.router.go('/entry')
        }
      }
    },

    components: {
      IctTitlebar
    }
  }
</script>
