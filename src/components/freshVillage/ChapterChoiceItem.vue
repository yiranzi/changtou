/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
    <div class="chapter-choice-item">
      <p class="chapter-number">第一章</p>
      <p class="chapter-title">一封陌生人的来信</p>
      <img class="chapter-cover" src="../../../static/freshVillage/chapter1-cover.png"/>
      <div class="chapter-btn">GO</div>
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
  .chapter-choice-item {
    width: 14.5rem;
    height: 20.5rem;
    background-color: #f6f6f6;
    border-radius: 20px;
    text-align: center;
    p {
      margin: 0;
      font-size: .85rem;
      color: #444;
    }
    .chapter {
      &-number {
        padding-top: 1.75rem;
      }
      &-title {
        padding: .25rem 0 1.75rem;
      }
      &-cover {
        width:13rem;
        height: 10rem;
      }
      &-btn {
        font-size: .75rem;
        color: #fff;
        background-color: #ff9800;
        width: 6.5rem;
        height: 1.6rem;
        line-height: 1.6rem;
        border-radius: .8rem;
        margin: 1.3rem auto 0;
      }
    }

  }

</style>
