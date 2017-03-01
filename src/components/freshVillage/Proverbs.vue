/**
 * Created by zhongyan on 2017/3/1.
 *
 */
<template>
    <div class="fresh-village-proverbs">
      <span class="close-icon"></span>
      <div class="proberbs">
        <div class="proverbs-top">
          <div class="proverbs-title">投资箴言</div>
          <div class="proverbs-text">积累点滴阅读经典</div>
        </div>
        <div class="proverbs-content">
          <p>阿斯顿发安格萨斯噶萨斯噶噶阿斯顿发突然遇见软件热体育热体育体育人员与人</p>
          <div class="proverbs-auth">---查理·芒格</div>
        </div>
      </div>
      <div class="share-btn">分享至·朋友圈</div>
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
  .fresh-village-proverbs {
    height: 22rem;
    background-color: #fff;
    border-radius: 20px;
    .close-icon:after{
      display: inline-block;
      position: absolute;
      right: 1rem;
      top: 1rem;
      font-family: 'myicon';
      content: '\e90d';
      color: #aaa;
      font-size: .8rem;
    }
    .proverbs {
      &-top {
        width: 14.5rem;
        height: 6.5rem;
        background: url("../../../static/image/freshVillage/proverbs.png") no-repeat;
        background-size: 100% 100%;
      }
      &-title {
        color: #0099ff;
        font-size: .8rem;
        padding: 1rem 1rem .6rem;
      }
      &-text {
        font-size: .65rem;
        color: #888;
        padding-left: 1rem;
      }
      &-content {
        margin: 1.5rem 1rem;
        p {
          margin: 0;
          padding-bottom: 1.5rem;
          font-size: .65rem;
          color: #666;
        }
        .proverbs-auth {
          float:right;
          font-size: .65rem;
          color: #666;
        }
      }
    }
    .share-btn {
      position: absolute;
      left: 4rem;
      bottom: 1.75rem;
      width: 6.5rem;
      height: 1.35rem;
      line-height: 1.35rem;
      color: #05af10;
      text-align: center;
      font-size: .65rem;
      border-radius: 27px;
      border: 1px solid #05af10;

    }
  }
</style>
