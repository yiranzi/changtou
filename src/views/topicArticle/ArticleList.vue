<template>
  <div class="article-list">
    <!--标题-->
    <ict-titlebar v-el:titlebar>专题文章</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
      <div>
        <!--todo 看一下列表下的某个子标题url-->
        <div class= "list-top" style="background-image:url({{topicArticle.image}});">
          <!--<img v-bind:src="topicArticle.image"></img>-->
          <!--todo 查下这个图片如何保存.-->
          <p style="margin-top: 0.3rem;">{{topicArticle.topicArticleTitle}}</p>
          <p style="margin-top: 0.3rem;">{{topicArticle.topicArticleIntroduce}}</p>
        </div>
        <div class="list">
         <div class="line" v-for="article in topicArticle.articleList">
            <img v-touch:tap="goToArticleContent(article.articleId)" :src=article.articleImage>
            <!--todo 查下这个图片如何保存.-->
            <!--todo 跳转如何实现的-->
            <div class="article-info" v-touch:tap="goToArticleContent(article.articleId)">
              <p class="info-title">{{article.title}}</p>
              <p class="info-introduce">{{article.introduce}}</p>
            </div>
           <!--<span  class="article-info">123123</span>-->
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .article-list{
    background-color: #ffffff;
    p{
      margin: 0;
    }
    .list-top{
      text-align: center;
      height: 8rem;
      img{
        height: 8rem;
        width: 100%;
      }
      p{

      }
    }
    .list{
      .line{
        height: 5rem;
        font-size: 0;
        border-bottom: solid 1px black;
        img{
          width: 188/40rem;
          height: 136/40rem;
          margin-left: 30/40rem;
          display: inline-block;
          vertical-align: middle;
        }
          .article-info{
            display: inline-block;
            height: 100%;
            vertical-align: middle;
            margin-left: .5rem;
            .info-title{
              margin: 50/40rem 0 0.5rem 0;
              font-size: 32/40rem;
              color:#666;
            }
            .info-introduce{
              font-size: 28/40rem;
              color: #999;
            }
          }
        }
      }
    }
</style>
<script>
//  import {topicArticleGetters} from '../../vuex/getters'
  import {topicArticleActions} from '../../vuex/actions'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  export default {
      data () {
        return {
          scrollerHeight: '0px',
          topicArticle: {
            image: '../../../static/image/building/building-intro1.png',
            topicArticleTitle: '如何成为富人系列',
            topicArticleIntroduce: '快加入ict吧',
            articleList: [
              {
                articleId: 1,
                articleImage: '../../../static/image/building/building-intro2.png',
                introduce: '如何成为富人系列一',
                title: '时间量化1'
              },
              {
                articleId: 2,
                articleImage: '../../../static/image/building/building-intro2.png',
                introduce: '如何成为富人系列二',
                title: '时间量化2'

              }
            ]
          }
        }
      },
      vuex: {
      getters: {
//        topicArticle: topicArticleGetters.topi
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
          const path = `/topic-article/article/${articleId}`
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
      data ({to: {params: {topicId}}}) {
          console.log(topicId)
//        this.loadTopicArticle(interviewId)
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
