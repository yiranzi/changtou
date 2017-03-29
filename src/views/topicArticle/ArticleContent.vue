<template>
  <div class="article-content">
    <!--标题-->
    <ict-titlebar v-el:titlebar>专题文章</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
      <div class="content-dev">
        <div class= "top">
          <h1>{{articleContent.title}}</h1>
          <div class="writter">
            <img v-bind:src="articleContent.advisorImage"></img>
            <span>{{articleContent.advisorName}}</span>
          </div>
        </div>
        <div class="page" v-for="paragraph in articleContent.paragraph">
          <h2>{{paragraph.paragraphTitle}}</h2>
          <p v-for="subParagraph in paragraph.content" track-by="$index">{{subParagraph}}</p>
        </div>
        <div class="end">- END -</div>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .article-content{
    p{
      margin: 0;
    }
    .content-dev{
      padding: 50/40rem 70/40rem;
      background-color: #ffffff;
      .top{
        h1{
          margin: 0;
          font-size: 36/40rem;
          color: #666;
          font-weight: bold;
        }
        .writter{
          margin-top: 30/40rem;
          img{
            height: 64/40rem;
            width: 64/40rem;
            border-radius: 64/40rem;
            vertical-align: middle;
          }
          span{
            margin-left: .5rem;
            font-size: 26/40rem;
            color: #aaa;
            vertical-align: middle;
          }
        }
      }
      .page{
        h2{
          font-size: 32/40rem;
          text-align: center;
          margin: 2.5rem 0 50/40rem 0;
          color: #00b0f0;
        }
        p{
          line-height: 48/40rem;
          color: #888;
          font-size: 28/40rem;
          margin-bottom: 60/40rem;
        }
      }
      .end{
        font-size: 26/40rem;
        color: #aaa;
        margin-top: 100/40rem;
        padding-bottom: .5rem;
        text-align: center;
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
        ready () {
          this.mySplitTest()
        },
        data () {
            return {
              scrollerHeight: '0px',
              articleContent: {
                title: '你的投资有目标吗?',
                advisorImage: '../../../static/image/building/building-intro2.png',
                advisorName: '还妹子来hi',
                paragraph: [
                  {
                    paragraphTitle: '引言',
                    content: '将存款提升一倍？……这不是开玩笑！快来看看下面的实验：'
                  },
                  {
                    paragraphTitle: '时间量化实践',
                    content: ' 将存款提升一倍？……这不是开玩笑！快来看看下面的实验：#Dilip#Soman和Amar#Cheema是行为经' +
                    '济领域的专家，几年前，他们共同做了一个实验，通过策略，成功让低储蓄的人提升' +
                    '近一倍的存款。不过奇怪的是，这个有意思的理财研究在内地没有引起太多关注。#1.首' +
                    '先，他们帮所有实验对象设定存钱目标，每次领到收入后，就将规划好的金额放到信封' + '袋存起来。信封里的钱虽然可'
                  },
                  {
                    paragraphTitle: '时间量化实践',
                    content: ' 将存款提升一倍？……这不是开玩笑！快来看看下面的实验：#Dilip#Soman和Amar#Cheema是行为经' +
                    '济领域的专家，几年前，他们共同做了一个实验，通过策略，成功让低储蓄的人提升' +
                    '近一倍的存款。不过奇怪的是，这个有意思的理财研究在内地没有引起太多关注。#1.首' +
                    '先，他们帮所有实验对象设定存钱目标，每次领到收入后，就将规划好的金额放到信封' + '袋存起来。信封里的钱虽然可'
                  },
                  {
                    paragraphTitle: '时间量化实践',
                    content: ' 将存款提升一倍？……这不是开玩笑！快来看看下面的实验：#Dilip#Soman和Amar#Cheema是行为经' +
                    '济领域的专家，几年前，他们共同做了一个实验，通过策略，成功让低储蓄的人提升' +
                    '近一倍的存款。不过奇怪的是，这个有意思的理财研究在内地没有引起太多关注。#1.首' +
                    '先，他们帮所有实验对象设定存钱目标，每次领到收入后，就将规划好的金额放到信封' + '袋存起来。信封里的钱虽然可'
                  }
                ]
              }
            }
        },
      vuex: {
        getters: {
          articleContentTest: topicArticleGetters.articleContent
        },
        actions: {
          loadArticleContent: topicArticleActions.loadArticleContent
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
          }, 300)
        },
        /**
         * 分割字符串
         */
        mySplitTest () {
            console.log('split1')
          let paragraphs = this.articleContent.paragraph
          for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].content = paragraphs[i].content.split('#')
          }
        },
        splitParagraph () {
          console.log('split by ajax')
        }
      },
      components: {
        IctTitlebar,
        Scroller
      },
      route: {
        data ({to: {params: {articleId}}}) {
          console.log('content is ' + articleId)
          this.loadArticleContent(articleId).then(this.splitParagraph()).then(this.setScrollerHeight())
        }
      }
    }
</script>
