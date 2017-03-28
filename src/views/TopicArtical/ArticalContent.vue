<template>
  <div class="article-content">
    <!--标题-->
    <ict-titlebar v-el:titlebar>专题文章</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
      <div>
        <div class= "content-top">
          <h1>{{articleContent.title}}</h1>
          <div class="writter">
            <img v-bind:src="topicArticle.image"></img>
            <span></span>
          </div>
        </div>
        <div class="content" v-for="article in topicArticle.articleList">
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
  .article-content{
    .content-top{
      h1{

      }
      .writter{
        img{

        }
        span{

        }
      }
    }
    .content{

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
          articleContent: topicArticleGetters
        },
        actions: {
          loadArticleContent: topicArticleActions.loadTopicArticle
        }
      },
      methods: {
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
      components: {
        IctTitlebar,
        Scroller
      },
      route: {
        data ({to: {params: {interviewId}}}) {
          this.loadArticleContent(interviewId)
//          todo:看下这个ajax怎么传值获取.
          this.setScrollerHeight()
        }
      }
    }
</script>
