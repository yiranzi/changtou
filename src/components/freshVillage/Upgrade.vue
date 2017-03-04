/**
 * Created by zhongyan on 2017/3/1.
 *
 */
<template>
  <div>
  <img class="cover-pic" src="../../assets/styles/image/freshVillage/upgrade.png"/>
    <div class="fresh-village-upgrade">
      <div class="upgrade-part-title">- 理财新手村 - </div>

      <div class="upgrade-detail">
        <img class="user-img" :src="avatarUrl"/>
        <div class="upgrade-title">- 理财能力升级 -</div>
        <div class="level">LV.{{componentData.chapterNo}}</div>
        <div class="bottom-title"><span class="parting-line"></span>获得奖励<span class="parting-line"></span></div>
        <div class="life-score"><span class="round"></span>生命值<span class="score">+15</span></div>
      </div>
      <div class="share-btn">去炫耀</div>
    </div>
    </div>
</template>
<script>
  export default {
    props: {
      componentData: Object
    },
    computed: {
      avatarUrl () {
        return this.componentData.avatar ? this.componentData.avatar : './static/image/defaultAvatar.png'
      }
    },
    methods: {
    }
  }
</script>
<style lang="less">
  .cover-pic {
    position: absolute;
    top: -6.7rem;
    left: -3.4rem;
    z-index: 1;
    width: 157%;
  }
  .fresh-village-upgrade {
    position: relative;
    .upgrade-part-title {
      position: relative;
      top: -2.6rem;
      text-align: center;
      font-size: .9rem;
      font-weight: bold;
      color: #fff;
    }
    .upgrade-detail {
      position: relative;
      width: 12rem;
      height: 15rem;
      border-radius: 20px;
      background-color: #ca414b;
    }
    .user-img {
      display: block;
      position: relative;
      top: 1.25rem;
      margin: 0 auto;
      width: 3.2rem;
      border-radius: 50%;
      border: 8px solid #b23842;
    }
    .upgrade-title {
      position: relative;
      top: 1.7rem;
      width: 6rem;
      height:1.3rem;
      line-height: 1.3rem;
      margin: 0 auto;
      color: #fff;
      background-color: #8d2d34;
      font-size: .7rem;
      text-align: center;
      border-radius: .65rem;
    }
    .level {
      position: relative;
      top: 1.6rem;
      margin: 0 auto;
      text-align: center;
      font-size: 2.5rem;
      color: #ffe52a;
      font-family: '窄体';
    }
    .bottom-title {
      position: relative;
      top: 3rem;
      text-align: center;
      font-size: .6rem;
      color: #79272d;
    }
    .parting-line {
      display: inline-block;
      vertical-align: middle;
      width: 2.25rem;
      border-top: 1px solid #79272d;
      margin: 0 .5rem;
    }
    .life-score {
      position: relative;
      bottom: -3.4rem;
      margin: 0 2.25rem;
      color: #ccc;
      font-size: .65rem;
    }
    .round {
      display: inline-block;
      vertical-align: middle;
      width: .75rem;
      height: .75rem;
      border-radius: 50%;
      background-color: #8EAE05;
      margin-right: .5rem;
    }
    .score {
      display: inline-block;
      vertical-align: middle;
      float: right;
      font-size: .65rem;
      color: #ccc;
    }
    .share-btn {
      margin: 1.5rem auto 0;
      width: 8.5rem;
      height: 1.95rem;
      line-height: 1.95rem;
      text-align: center;
      border: 2px solid #fff;
      font-size: .8rem;
      font-weight: bold;
      color: #fff;
      border-radius: 39px;
    }
  }
</style>
