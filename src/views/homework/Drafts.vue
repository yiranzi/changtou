/**
 * Created by jun on 2016/10/26.
 * 草稿箱
 */
<template>
    <div class="draft-box">
      <ict-titlebar>草稿箱</ict-titlebar>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller>
        <div v-if="isEmpty" class="empty-tip">
          <img src="/static/image/mine/noMessages.png">
        </div>
        <div v-if="!isEmpty">
          <div v-for="draft in draftList" class="draft-item">
            <div v-touch:tap="goToArticleEdit(draft)">
              <p class="title">{{draft.lessonTitle}}</p>
              <p class="content">{{draft.content}}</p>
              <p class="time">最后修改时间:{{draft.createTime}}</p>
            </div>
            <span class="delete" v-touch:tap="goToDeleteDraft(draft.articleId)">删除</span>
          </div>
        </div>
      </scroller>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import { essayActions } from '../../vuex/actions'
export default {
  vuex: {
    actions: {
      getArticle: essayActions.getArticle,
      getDrafts: essayActions.getDrafts,
      deleteDraft: essayActions.deleteDrafts,
      updateDraft: essayActions.updateDraft
    }
  },
  data () {
    return {
      scrollerHeight: '0px',
      draftList: []
    }
  },
  computed: {
    isEmpty () {
      return this.draftList.length <= 0
    }
  },
  route: {
    data () {
      const me = this
      this.getDrafts().then(
        draftList => {
          me.draftList = draftList
        }
      ).catch(
        err => console.warn(err)
      )
    }
  },
  ready () {
    const me = this
    setTimeout(function () {
      me.$nextTick(() => {
        me.$refs.scroller.reset({
        top: 0
      })
    })
    }, 300)
  },
  methods: {
    goToArticleEdit (draft) {
      this.updateDraft(draft)
      this.$route.router.go('/homework/essay/answer')
    },
    goToDeleteDraft (articleId) {
      const me = this
      this.deleteDraft(articleId).then(
        isDelete => {
          me.getDrafts().then(
            draftList => {
              me.draftList = draftList
            }
          ).catch(
              err => console.warn(err)
          )
        }
      ).catch(
        err => console.warn(err)
      )
    }
  },
  components: {
    IctTitlebar,
    Scroller
  }
}
</script>
<style lang="less">
  .draft-box{
    p{
      margin: 0;
    }
    .empty-tip{
      text-align: center;
      img{
        margin: 6.5rem auto 0;
        height: 6.05rem;
        width: 6.05rem;
        background-size: 100% 100%;
      }
    }
    .draft-item{
      background: #fff;
      padding: 0.9rem 0.6rem 0.65rem;
      margin-top: 0.4rem;
      &:nth-child(1){
        margin-top: 0;
      }
      .title{
        font-size: 0.75rem;
        color: #222;
        font-weight: bold;
      }
      .content{
        padding: 0.4rem 0 0;
        font-size: 0.65rem;
        color: #aaa;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .time{
        padding-top: 0.9rem;
        font-size: 0.65rem;
        color: #aaa;
      }
      .delete{
        position: absolute;
        padding: 0.5rem 1rem;
        right: 0;
        bottom: 0;
        font-size: 0.65rem;
        color: #007aff;
      }
    }
  }
</style>
