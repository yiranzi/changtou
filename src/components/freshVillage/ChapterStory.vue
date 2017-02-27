/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
  <div class="chapter-story">
    <div class="chapter-top">
      <p class="story">小故事</p>
      <p class="story-text">然后预览网页效果，的人挺好的合同的复合弓对方过后对方过后单刀赴会个内容切换效果就完成了，当然想要更多个性化设置，flexslider提供了丰富的选项配置以及回调函数绝对可以满足大多数开发者需求。</p>
      <div class="task">
        <p class="task-title">任务</p>
        <div class="task-content">帮助小明想想怎么安排这笔遗产</div>
      </div>
    </div>
    <div class="next-btn">下一步</div>
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
  .chapter-story {
    .chapter-top {
      width: 14.5rem;
      height: 20rem;
      border-radius: 20px 20px 0 0;
      background-color: #fff;
      p {
        margin: 0;
      }
      .story {
        font-size: .8rem;
        font-weight: bold;
        color: #444;
        padding:1.5rem .9rem;
      }
      .story-text {
        font-size: .65rem;
        line-height: 1.1rem;
        color: #666;
        margin: 0 .9rem;
      }
      .task {
        background-color: #FFF9EB;
        color: #b07f50;
        margin: 1.3rem .9rem 0 ;
        padding: .5rem 0 .5rem .5rem;
        line-height: 1rem;
        &-title {
          font-size: .75rem;
          font-weight: bold;
        }
        &-content {
          line-height: 1.3rem;
          font-size: .65rem;
        }
      }
    }
    .next-btn {
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
