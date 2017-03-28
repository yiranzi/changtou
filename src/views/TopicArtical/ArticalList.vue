<template>
  <div class="artical-list">
    <!--标题-->
    <ict-titlebar v-el:titlebar>专题文章</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
      <div>
        <div class= "list-top">
          <img v-bind:src="topicArtical.pic"></img>
          <!--todo 查下这个图片如何保存.-->
          <p style="margin-top: 0.3rem;">{{topicArtical.title}}</p>
        </div>
        <div class="list" v-for="artical in topicArtical.articalList">
          <img v-touch:tap="goToArticalContent(artical.articalId)" v-bind:src=artical.pic>
          <!--todo 查下这个图片如何保存.-->
          <!--todo 跳转如何实现的-->
          <div class="artical-info" v-touch:tap="goToArticalContent(artical.articalId)">
            <p class="info-title">{{artical.title}}</p>
            <p class="info-description">{{artical.description}}</p>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .artical-list{
    .list-top{
      img{

      },
      p{

      }
    }
    .list{
      img{

      },
      .artical-info{
        .info-title{

        },
        .info-description{

        }
      }
    }
  }
</style>
<script>
  import {topicArticalGetters} from '../../vuex/getters'
  import {topicArticalActions} from '../../vuex/actions'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  export default {
      data () {
      return {
        scrollerHeight: '0px'
      }
    },
      vuex: {
      getter: {
        topicArtical: topicArticalGetters
      },
      actions: {
        loadTopicArtical: topicArticalActions.loadTopicArtical
      }
    },
      ready () {
        this.loadTopicArtical()
      },
      methods: {
        goToArticalContent (articalId) {
          const path = `/topic-artical/${articalId}`
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
      runte: {
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
