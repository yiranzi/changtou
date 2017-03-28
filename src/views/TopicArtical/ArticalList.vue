<template>
  <div class="article-list">
    <!--标题-->
    <ict-titlebar v-el:titlebar>专题文章</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
      <div>
        <!--todo 看一下列表下的某个子标题url-->
        <div class= "list-top">
          <img v-bind:src="topicArticle.image"></img>
          <!--todo 查下这个图片如何保存.-->
          <p style="margin-top: 0.3rem;">{{topicArticle.topicTitle}}</p>
        </div>
        <div class="list" v-for="article in topicArticle.articleList">
          <img v-touch:tap="goToArticleContent(article.articleId)" :src=article.articleImage>
          <!--todo 查下这个图片如何保存.-->
          <!--todo 跳转如何实现的-->
          <div class="article-info" v-touch:tap="goToArticleContent(article.articleId)">
            <p class="info-title">{{article.title}}</p>
            <p class="info-introduce">{{article.introduce}}</p>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .article-list{
    .list-top{
      img{

      }
      p{

      }
    }
    .list{
      img{

      }
      .article-info{
        .info-title{

        }
        .info-introduce{

        }
      }
    }
  }
</style>
<script>
  import {topicArticleGetters} from '../../vuex/getters'
  import {topicArticleActions} from '../../vuex/actions'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  export default {
      data () {
        return {
          scrollerHeight: '0px'
        }
      },

      vuex: {
      getters: {
        topicArticle: topicArticleGetters.topi
      },
      actions: {
        loadTopicArticle: topicArticleActions.loadTopicArticle
      }
    },
      ready () {
        this.loadTopicArticle()
      },
      methods: {
        goToArticleContent (interviewId) {
//          this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW, {
//            '访谈Id': interviewId
//          })
          const path = `/topic-article/${articleId}`
          this.$route.router.go(path)
        },
        /**
         * 设置滚动高度
         */
        setScrollerHeight () {
          const me = this
          setTimeout(function () {
            me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.clientHeight) + 'px'
            me.$nextTick(() => {
              me.$refs.scroller.reset({
                top: 0
              })
            })
          }, 100)
        }
      },
      route: {
        data () {
          this.setScrollerHeight()
        }
      },
      components: {
        IctTitlebar,
        Scroller
      }
    }
</script>
