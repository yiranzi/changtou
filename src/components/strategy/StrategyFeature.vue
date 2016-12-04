/**
 * Created by jun on 2016/11/14.
 *
 */
<template>
    <div class="strategy-feature">
      <strategy-header><slot></slot></strategy-header>
      <div class="feature-item" v-for="item in feature">
        <img class="feature-img" v-bind:src="item.imgUrl">
        <div class="feature-text">
          <p class="feature-title"><span>{{$index}}</span>{{item.title}}</p>
          <p class="feature-content">{{item.content}}</p>
        </div>
      </div>
    </div>
</template>
<script>
  import strategyHeader from './StrategyHeader.vue'
export default {
  props: {
    feature: Array
  },
  components: {
    strategyHeader
  }
}
</script>
<style lang="less">
  .strategy-feature{
    width: 14.75rem;
    margin: 0 2rem;
    padding-bottom: 0.5rem;
    text-align: left;
    .feature-item {
      margin-bottom: 1rem;
    }
    .feature-item:nth-child(2n+1) {
      position: relative;
      .feature-img {
        position: absolute;
        right: 0;
        margin: 0 0 0 1rem;
      }
    }
    .feature-item:last-child {
      margin-bottom: 0;
    }

    .feature-img {
      margin: 0 1rem 0 0;
      width: 3.85rem;
      height: 3.85rem;
      vertical-align: top;
      border-radius: 50%;
    }
    .feature-text {
      p{
        margin: 0;
      }
      width: 9.5rem;
      vertical-align: top;
      display: inline-block;
    }
    .feature-title {
      margin-bottom: 0.75rem;
      line-height: 1rem;
      font-size: 0.75rem;
      color: #00b0f0;
      span {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
        border-radius: 50%;
        background: #97ebff;
        text-align: center;
        color: #fff;
      }
    }
    .feature-content {
      font-size: 0.65rem;
      color: #898989;
    }
  }
</style>
