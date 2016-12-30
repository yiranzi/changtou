/**
 * Created by jun on 2016/10/26.
 * 草稿箱
 */
<template>
    <div class="draft-box">
      <ict-titlebar>草稿箱</ict-titlebar>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller>
        <div v-if="isEmpty" class="empty-tip">
          <img src="../../../static/image/mine/empty-box.png"/>
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
  import {essayActions} from '../../vuex/actions'
  import {courseRecordsGetters} from '../../vuex/getters'

  export default {
  vuex: {
    actions: {
      getArticle: essayActions.getArticle,
      getDrafts: essayActions.getDrafts,
      deleteDraft: essayActions.deleteDrafts,
      updateDraft: essayActions.updateDraft
    },
    getters: {
      expenseRecords: courseRecordsGetters.expenseRecords //付费课程记录
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
      let subjectId = 0
      for (var i = 0, length = this.expenseRecords.length; i < length; i++) {
        if (subjectId) {
          break
        }
        const lessonIds = this.expenseRecords[i].lessonSet.lessonIds
        if (lessonIds) {
          for (var j = 0, idsLength = lessonIds.length; j < idsLength; j++) {
            if (parseInt(lessonIds[j]) === parseInt(draft.lessonId)) {
              subjectId = this.expenseRecords[i].subjectId
              break
            }
          }
        }
      }
      this.$route.router.go(`/homework/essay/answer/${subjectId}/${draft.lessonId}`)
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
      width: 100%;
      text-align: center;
      padding-top: 5rem;
      img{
        height: 6.05rem;
        width: 6.05rem;
      }
    }
    .draft-item{
      position: relative;
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
