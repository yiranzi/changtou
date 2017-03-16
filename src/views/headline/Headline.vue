<template>
  <div class="headline">
    <ict-titlebar>
      头条精选
    </ict-titlebar>
    <p class="headline-checkin-title">- 连续7日送礼包 -</p>
    <div class="headline-checkin-progress">
      <div class="headline-checkin-progress-once" v-for="item in progressTotal">
        <span class="headline-checkin-progress-day">
          <img v-bind:src="item.src" style="width: .95rem;height: .95rem;">
          <p v-bind:style="{ color: item.color }">{{item.day}}日</p>
        </span>
        <span class="headline-checkin-progress-line">-</span>
      </div>
      <div class="headline-checkin-progress-gift">
        <img v-bind:src="progressGift.src" style="width: 1.3rem;height: 1.3rem;">
        <p v-bind:style="{ color: progressGift.color }">领礼包</p>
      </div>
    </div>
    <div class="headline-checkin-btn" v-touch:tap="onCheckin" v-if="!isCheckin">
      <img class="headline-checkin-btn-pic" src='../../../static/image/headline/headline-checkin-in.png'>
    </div>
    <div class="headline-article-title">{{headlineContent.title}}</div>
    <div class="headline-author">
      <div class="headline-author-head">
        <img v-bind:src="headlineContent.authorImage"  style="width: 100%;">
      </div>
      <div class="headline-author-name">{{headlineContent.authorName}}</div>
    </div>
    <div class="headline-article" v-for="item in headlineContent.paragraph">
      <div class="headline-article-content">{{item.content}}</div>
      <img v-bind:src="item.conImage" style="width: 12rem;height: 7rem;">
    </div>
    <div class="headline-end">- END -</div>
  </div>
</template>
<style lang="less">
  .headline{
    .headline-checkin-title{
      color: #aaa;
      font-size: 20/40rem;
      text-align: center;
      line-height: 60/40rem;
      margin: 0;
    }
    .headline-checkin-progress{
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
      .headline-checkin-progress-once{
        padding-top: 27/40rem;
        overflow: hidden;
        float: left;
        .headline-checkin-progress-day{
          float: left;
          width: 63/40rem;
        }
        .headline-checkin-progress-line{
          float: left;
          width: 30/40rem;
          color: #9d9d9d;
        }
      }
      .headline-checkin-progress-gift{
        padding-top: 24/40rem;
        float: left;
      }
    }
    .headline-checkin-btn{
      width: 190/40rem;
      height: 70/40rem;
      margin-left: 90/40rem;
      .headline-checkin-btn-pic{
        width: 100%;
      }
    }
    .headline-article-title{
      margin: 2rem 0 30/40rem 70/40rem;
      font-size: 36/40rem;
      color: #666;
      font-weight: bold;
    }
    .headline-author{
      margin-left: 70/40rem;
      overflow: hidden;
      .headline-author-head{
        width: 64/40rem;
        height: 64/40rem;
        border-radius: 50%;
        overflow: hidden;
        float: left;
      }
      .headline-author-name{
        float: left;
        font-size: 26/40rem;
        color: #aaa;
        line-height: 64/40rem;
        margin-left: 20/40rem;
      }
    }
    .headline-article{
      margin: 1rem 70/40rem 2.5rem;
      text-align: center;
      .headline-article-content{
        margin-bottom: 50/40rem;
        font-size: 28/40rem;
        color: #888;
        text-align: left;
        line-height: 48/40rem;
      }
    }
    .headline-end{
      font-size: 28/40rem;
      color: #aaa;
      text-align: center;
      margin-bottom: 2rem;
    }
  }
</style>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {headlineGetters, userGetters} from '../../vuex/getters'
  import {headlineActions} from '../../vuex/actions'

  export default {
    vuex: {
      actions: {
        getHeadlineContent: headlineActions.getHeadlineContent,  // 获取头条精选内容
        getCheckinData: headlineActions.getCheckinData,  // 获取用户签到信息
        checkinUpdate: headlineActions.checkinUpdate  //  用户进行签到
      },
      getters: {
        isLogin: userGetters.isLogin,  //是否登录
        headlineContent: headlineGetters.headlineContent,  // 头条精选内容
        userCheckinData: headlineGetters.userCheckinData  // 用户签到信息
      }
    },

    route: {
      data () {
        // 显示头条精选内容
        this.getHeadlineContent()
        // 判断是否登录
        if (this.isLogin) {  // 已登陆
          // 获取签到信息
          this.getCheckinData().then(() => {
            console.log(this.userCheckinData.count, '签到次数')
            console.log(this.userCheckinData.hasChecked, '当天是否签到')
            console.log(this.userCheckinData.isSeria, '是否连续签到')
            this.checkinCount = this.userCheckinData.count
            this.isCheckin = this.userCheckinData.hasChecked
            this.showCheckinProgress(this.checkinCount)
          })
        } else {  // 未登录
          this.isCheckin = false
          this.showCheckinProgress(0)  // 显示签到进度
        }
      }
    },

    data () {
      return {
        checkinCount: 0,
        isCheckin: false,
        progressTotal: [
          {day: '第1', color: '#ff9800', src: '../../../static/image/headline/headline-checkin-today.png'},
          {day: '第2', color: '#9d9d9d', src: '../../../static/image/headline/headline-checkin-uncheckin.png'},
          {day: '第3', color: '#9d9d9d', src: '../../../static/image/headline/headline-checkin-uncheckin.png'},
          {day: '第4', color: '#9d9d9d', src: '../../../static/image/headline/headline-checkin-uncheckin.png'},
          {day: '第5', color: '#9d9d9d', src: '../../../static/image/headline/headline-checkin-uncheckin.png'},
          {day: '第6', color: '#9d9d9d', src: '../../../static/image/headline/headline-checkin-uncheckin.png'}
        ],   // 前6天进度样式
        progressGift: {
          color: '#9d9d9d', src: '../../../static/image/headline/headline-checkin-gift-uncheckin.png'
        }  // 礼物样式
      }
    },

    methods: {
     /**
      * 显示签到进度
      */
      showCheckinProgress (dayIndex) {
        if (dayIndex === 7) {  // 签到次数为7天
          // 已打卡
          for (let i = 0; i < dayIndex - 1; i++) {
            this.progressTotal[i].color = '#ff9800'
            this.progressTotal[i].src = '../../../static/image/headline/headline-checkin-checkin.png'
          }
          // 显示礼物
          this.progressGift.color = '#ff9800'
          this.progressGift.src = '../../../static/image/headline/headline-checkin-gift-checkin.png'
        } else {   // 签到数小于7
          // 重置默认状态
          for (let i = 0; i < 6; i++) {
            this.progressTotal[i].color = '#9d9d9d'
            this.progressTotal[i].src = '../../../static/image/headline/headline-checkin-uncheckin.png'
          }
          // 已打卡
          if (dayIndex) {
            for (let i = 0; i < dayIndex; i++) {
              this.progressTotal[i].color = '#ff9800'
              this.progressTotal[i].src = '../../../static/image/headline/headline-checkin-checkin.png'
            }
          }
          // 要打卡
          if (dayIndex < 6) {
            // 签到小于6天
            if (this.isCheckin === false) {  // 未签到
              this.progressTotal[dayIndex].day = '今'
              this.progressTotal[dayIndex].color = '#ff9800'
              this.progressTotal[dayIndex].src = '../../../static/image/headline/headline-checkin-today.png'
            } else {     // 已签到
              this.progressTotal[dayIndex - 1].day = '今'
              this.progressTotal[dayIndex - 1].color = '#ff9800'
              this.progressTotal[dayIndex - 1].src = '../../../static/image/headline/headline-checkin-checkin.png'
            }
          } else {
            // 礼物
            if (this.isCheckin === false) {  // 未签到
              this.progressGift.color = '#ff9800'
              this.progressGift.src = '../../../static/image/headline/headline-checkin-gift-today.png'
            }
          }
        }
      },

      /**
      * 点击签到
      */
      onCheckin () {
        // 判断是否登录
        if (this.isLogin) {  // 已登录
          this.isCheckin = true
          this.checkinCount += 1
          this.showCheckinProgress(this.checkinCount)
          if (this.checkinCount === 7) {
            // 弹出gift浮层
            console.log('gift')
            this.showMask({
              component: 'headline/CheckinGift.vue',
              hideOnMaskTap: true
            })
            // 给后台传数据：该用户生命值加1000
          }
          this.checkinUpdate()
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
