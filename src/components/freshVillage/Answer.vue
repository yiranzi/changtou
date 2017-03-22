/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
    <div class="fresh-village-answer-result">
      <div class="answer-result">
        <span class="title">思考一下</span>
        <div class="village-close-icon-container" v-touch:tap="onCloseTap"><span class="close-icon"></span></div>
      </div>
      <div class="result-middle">
        <div class="result-explain">{{componentData.feedback}}</div>
        <div class="result-title">
          <span class="parting-line"></span>选择结果<span class="parting-line"></span>
        </div>
        <div class="life-score"><span class="round"></span><span class="socre-name">生命值</span><span class="score">+{{componentData.lifeScore}}</span></div>
      </div>
      <div class="confirm-btn" v-touch:tap="next">懂了</div>
    </div>
</template>
<script>
export default {
  props: {
    componentData: Object
  },
  methods: {
    onCloseTap () {
      this.$dispatch('hideMask')
    },
    next () {
      this.$dispatch('showExpands', this.componentData.type)
    }
  }
}
</script>
<style lang="less">
  .fresh-village-answer-result {
    width: 14.5rem;
    .answer-result {
      width: 100%;
      border-radius: 20px 20px 0 0;
      height: 6.5rem;
      background: url("../../../static/image/freshVillage/chapter1-question.png") no-repeat;
      background-size: 100% 100%;
    }
    .title {
      display: inline-block;
      font-size: .8rem;
      font-weight: bold;
      color: #444;
      margin: 1rem 0 0 1rem;
    }
    .result-middle {
      background-color: #fff;
      width: 100%;
      min-height: 13.5rem;
    }
    .result-explain{
      padding: 1rem;
      font-size: .65rem;
      color: #666;
    }
    .result-title {
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
      padding: 0 1.5rem 1rem;
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
    .score-name{
      vertical-align:middle;
    }
    .score {
      display: inline-block;
      vertical-align: middle;
      margin-left: 6.5rem;
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
