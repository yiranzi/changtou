/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
    <div class="fresh-village-question-page">
      <div class="question-pic">
        <span class="question-title">思考一下</span><span class="close-icon"></span>
      </div>
      <div class="question-content">天啦，有钱啦！有钱了！自天啦，有钱啦！有钱了！自己最想怎么花？</div>
      <div class="choice-item">1.带着钱一起去环游世界</div>
      <div class="choice-item">1.带着钱一起去环游世界</div>
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
  .fresh-village-question-page {
    width: 14.5rem;
    height: 22rem;
    border-radius: 20px;
    background-color: #fff;
    .question-pic {
      width: 100%;
      height: 6.5rem;
      background: url("../../../static/image/freshVillage/chapter1-question.png") no-repeat;
      background-size: 100% 100%;
    }
    .question-title {
      display: inline-block;
      font-size: .8rem;
      font-weight: bold;
      color: #444;
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
    .question {
      &-content {
        padding: 1rem;
        font-size: .65rem;
        color: #888;
        line-height: 1rem;
        border-bottom: 1px solid #f0eff5;
      }
    }
    .choice-item {
      height: 2rem;
      padding: 0 1rem;
      line-height: 2rem;
      font-size: .65rem;
      color: #666;
      border-bottom: 1px solid #f0eff5;
    }
  }
</style>
