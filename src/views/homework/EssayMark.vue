/**
 * Created by jun on 2016/10/27.
 *
 */
<template>
    <div class="essay-mark">
      <ict-titlebar></ict-titlebar>
      <div class="essay">
        <span class="edit-icon" v-touch:tap="editAnswer" v-if="isEditable">编辑</span>
        <div class="essay-info">
          <div class="score" v-bind:class="{'score-passed':!isEditable}">{{scoreNum}}</div>
          <div class="user-info">
            <p class="user-name">{{userName}}的作业</p>
            <p class="create-time">{{createTime}}提交</p>
          </div>
        </div>
        <div class="essay-answer">{{essayAnswer}}</div>
      </div>
      <div class="message">
        <p class="title">作业留言</p>
        <div v-for="remark in remarkList">
          <div class="user-info">
            <img src="../../assets/styles/image/homework/portrait.png">
            <div class="user-box">
              <p class="user-name">{{remark.userName}}</p>
              <p class="create-time">发表于{{remark.create_time}}</p>
            </div>
            <div class="content">{{remark.content}}</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import { userGetters, essayGetters } from '../../vuex/getters'
export default {
  vuex: {
    getters: {
      lessonId: essayGetters.essayLessonId,
      userName: userGetters.userName,
      articleId: essayGetters.articleId,
      essayAnswer: essayGetters.essayAnswer,
      createTime: essayGetters.createTime,
      remarkList: essayGetters.remarkList,
      score: essayGetters.score,
      status: essayGetters.status
    }
  },
  computed: {
    scoreNum () { //分数
      return this.status === 3 ? this.score : '!'
    },
    isEditable () { //是否可编辑
      return this.status !== 3
    }
  },
  methods: {
    /**
     * 点击编辑作业
     */
    editAnswer () {
      this.$route.router.go(`/homework/essay/answer/${this.lessonId}`)
    }
  },
  components: {
    IctTitlebar,
    Scroller
  }
}
</script>
<style lang="less">
  .essay-mark{
    width: 100%;
    height: 100%;
    background: #fff;
    p{
      margin: 0;
    }
    .essay{
      position: relative;
      padding: 1rem 1.2rem;
      border-bottom: 1px solid #ccc;
      .edit-icon{
        position: absolute;
        display: inline-block;
        right: 0;
        top: 0;
        padding: 1rem 1.2rem;
        font-size: 0.65rem;
        color: #00b0f0;
      }
      .essay-info{
        height: 2rem;
        line-height: 2rem;
        margin-bottom: 0.75rem;
        .score{
          vertical-align: middle;
          display: inline-block;
          width: 2rem;
          height: 2rem;
          margin-right: 0.75rem;
          line-height: 2rem;
          background: #ddd;
          font-size: 1.2rem;
          text-align: center;
          color: #fff;
        }
        .score-passed{
          background: #e04a32;
        }
        .user-info{
          vertical-align: middle;
          display: inline-block;
          .user-name{
            line-height: 1rem;
            font-size: 0.75rem;
            font-weight: bold;
            color: #222;
          }
          .create-time{
            line-height: 1rem;
            font-size: 0.75rem;
            color: #aaa;
          }
        }
      }
      .essay-answer{
        font-size: 0.7rem;
        color: #444;
        word-wrap: break-word;
      }
    }
    .message{
      padding: 1rem 1.2rem;
      .title{
        font-size: .75rem;
        font-weight: bold;
        color: #222;
        margin-bottom: .75rem;
      }
      .user-info{
        line-height: 2rem;
        margin-bottom: .75rem;
        img{
          vertical-align: middle;
          display: inline-block;
          width: 2rem;
          height: 2rem;
          margin-right: .75rem;
          border-radius: 50%;
        }
        .user-box{
          vertical-align: middle;
          display: inline-block;
          .user-name{
            font-size: .65rem;
            line-height: 1rem;
            color: #444;
          }
          .create-time{
            font-size: .65rem;
            line-height: 1rem;
            color: #aaa;
          }
        }
      }
      .content{
        margin-left: 3rem;
        margin-bottom: 1rem;
        font-size: .65rem;
        line-height: 1rem;
        color: #444;
      }
    }
  }
</style>
