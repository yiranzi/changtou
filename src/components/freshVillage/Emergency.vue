/**
 * Created by zhongyan on 2017/3/1.
 *
 */
<template>
    <div class="fresh-village-emergency">
      <div class="emergency-top">
        <span class="emergency-title">突发状况</span><span class="close-icon" v-touch:tap="onCloseTap"></span>
      </div>
      <div class="emergency-middle">
        <div class="emergency-content">{{componentData.emergencyStory}}</div>
        <div class="bottom-title">
          <span class="parting-line"></span>人生插曲<span class="parting-line"></span>
        </div>
        <div class="life-score"><span class="round"></span>生命值<span class="score">{{componentData.lifeScore}}</span></div>
      </div>
      <div class="confirm-btn" v-touch:tap="onConfirmTap">确定</div>
    </div>
</template>
<script>
export default {
  props: {
    componentData: Object
  },
  methods: {
    onCloseTap () {
      this.$dispatch('closeEmergency')
    },
    onConfirmTap () {
      this.$dispatch('closeEmergency')
    }
  }
}
</script>
<style lang="less">
  .fresh-village-emergency {
    width: 14.5rem;
    .emergency-top {
      width: 100%;
      border-radius: 20px 20px 0 0;
      height: 6.5rem;
      background: url("../../../static/image/freshVillage/emergency.png") no-repeat;
      background-size: 100% 100%;
    }
    .emergency-title {
      display: inline-block;
      font-size: .8rem;
      font-weight: bold;
      color: #78793f;
      margin: 1rem 0 0 1rem;
    }
    .close-icon:after {
      display: inline-block;
      position: absolute;
      right: 1rem;
      top: 1rem;
      font-family: 'myicon';
      content: '\e90d';
      color: #aaa;
      font-size: .8rem;
    }
    .emergency-middle {
      background-color: #fff;
      width: 100%;
      height: 13.5rem;
    }
    .emergency-content {
      padding: 1rem;
      font-size: .65rem;
      color: #666;
    }
    .bottom-title {
      text-align: center;
      margin: .75rem 0;
      font-size: .6rem;
      color: #aaa;
    }
    .parting-line {
      display: inline-block;
      margin: 0 .75rem;
      vertical-align: middle;
      width: 3.25rem;
      border-top: 1px solid #f0eff5;
    }
    .life-score {
      margin: 0 1.5rem;
      color: #888;
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
      color: #f12938;
    }
    .confirm-btn {
      text-align: center;
      height: 2rem;
      line-height: 2rem;
      font-size: .8rem;
      color: #fff;
      background-color: #8EAE05;
      border-radius: 0 0 20px 20px;
    }
  }
</style>
