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

      },
      methods: {
        goToArticleContent (articleId) {
//          this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW, {
//            '访谈Id': interviewId
//          })
          const path = `/topic-article/${articleId}`
//          todo:这边的跳转看一下
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
      data ({to: {params: {interviewId}}}) {
        this.loadTopicArticle(interviewId)
//        this.loadArticleContent(interviewId).then(() => {
//          for (let i = 0; i < this.articleContent.length; i++) {
//            this.articleContent[i].content = this.articleContent[i].content.split('#')
//          }
//        })
//          todo:看下这个ajax怎么传值获取.
        this.setScrollerHeight()
      }
    },
      components: {
        IctTitlebar,
        Scroller
      }
    }
</script>
