/**
 * Created by zhongyan on 2017/3/1.
 *
 */
<template>
    <div class="fresh-village-wisdom">
      <span class="close-icon"></span>
      <div>
        <div class="wisdom-top">
          <span class="wisdom-title">今日小智</span>
          <div class="content-title">摆脱月光这个鬼</div>
        </div>
        <div class="wisdom-content">
            sadfgasdg
        </div>
      </div>
      <!--<div class=><span class="parting-line"></span>好文共赏<span class="parting-line"></span></div>-->
    </div>
</template>
<script>
export default {
  vuex: {
    getters: {

    },
    actions: {

    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  route: {

  },
  ready () {

  },
  methods: {

  },
  components: {

  }
}
</script>
<style lang="less">
  .fresh-village-wisdom {
    position: relative;
    width: 100%;
    height: 100%;
    .close-icon:after{
      position: absolute;
      top: 1.25rem;
      right: .75rem;
      font-family: 'myicon';
      content: '\e90d';
      font-size: .75rem;
      color: #aaa;
    }
    .wisdom-top {
      width: 100%;
      height: 6.5rem;
      background: url("../../../static/image/freshVillage/wisdom.png") no-repeat;
      background-size: 100% 100%;
    }
    .wisdom-title {
      position: relative;
      top: .8rem;
      left: 1.75rem;
      font-size: .8rem;
      color: #0099ff;
    }
    .content-title {
      position: relative;
      top: .9rem;
      left: 1.75rem;
      font-size: .7rem;
      color: #666;
    }
    .wisdom-content {
      font-size: .7rem;
      color: #888;
      background-color: #fff;
      padding: 1.5rem 1.75rem;
    }
    .parting-line {
      display: inline-block;
      vertical-align: middle;
      width: 2.25rem;
      margin: 0 .5rem;
      border-top: 1px solid #aaa;
    }

  }
</style>
