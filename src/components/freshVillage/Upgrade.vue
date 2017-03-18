/**
* Created by zhongyan on 2017/3/1.
*
*/
<template>
  <div>
    <img class="cover-pic" src="../../assets/styles/image/freshVillage/upgrade.png"/>
    <div class="fresh-village-upgrade">
      <div class="upgrade-part-title">- 理财新手村 - </div>
      <div class="village-upgrade-close-container" v-touch:tap="updateRecord"><span class="close-icon"></span></div>
      <div class="village-upgrade-container" id="village-upgrade-detail">
        <div class="village-upgrade-detail">
          <img class="user-img" :src="avatarUrl"/>
          <div class="upgrade-title">- 理财能力升级 -</div>
          <div class="level">LV.{{componentData.chapterNo}}</div>
          <div class="bottom-title"><span class="parting-line"></span>获得奖励<span class="parting-line"></span></div>
          <div class="life-score"><span class="round"></span><span class="score-name">生命值</span><span class="score">+15</span></div>
        </div>
      </div>
      <div class="share-btn" v-touch:tap="toShare">去炫耀</div>
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
    ready () {
    },
    methods: {
      updateRecord () {
        this.$dispatch('onVillageUpgradeTap', 1)
      },
      toShare () {
        this.$dispatch('onVillageUpgradeTap', 2)
      }
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
  .village-upgrade-close-container {
    display: inline-block;
    position: absolute;
    width: 2rem;
    height: 2rem;
    z-index: 1;
    right: .2rem;
    top: 2.2rem;
    .close-icon:after {
      display: inline-block;
      position: absolute;
      right: .5rem;
      top: .5rem;
      font-family: 'myicon';
      content: '\e90d';
      color: #aaa;
      font-size: .9rem;
    }
  }
  .fresh-village-upgrade {
    position: relative;
    .upgrade-part-title {
      position: relative;
      top: -1.6rem;
      text-align: center;
      font-size: .9rem;
      font-weight: bold;
      color: #fff;
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
  .village-upgrade-container {
    padding-top: 1rem;
    position: relative;
  }
  .village-upgrade-detail {
    position: relative;
    padding: 1px;
    width: 12rem;
    height: 15rem;
    border-radius: 12px;
    background-color: #ca414b;
    vertical-align: middle;
    .user-img {
      display: block;
      margin: 1.25rem auto 0;
      width: 3.2rem;
      border-radius: 50%;
      border: 8px solid #b23842;
    }
    .upgrade-title {
      width: 6rem;
      height:1.3rem;
      line-height: 1.3rem;
      margin: 1rem auto 0;
      color: #fff;
      background-color: #8d2d34;
      font-size: .7rem;
      text-align: center;
      border-radius: .65rem;
    }
    .level {
      margin: .3rem auto 0;
      text-align: center;
      font-size: 2.5rem;
      color: #ffe52a;
      font-family: '窄体';
    }
    .score-name {
      display:inline-block;
      vertical-align:middle;
    }
    .bottom-title {
      margin-top: .8rem;
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
      display: inline-block;
      vertical-align: middle;
      margin: .3rem 2.25rem 0;
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
      margin: 0 0 0 3rem;
      font-size: .65rem;
      color: #ccc;
    }
  }
</style>
