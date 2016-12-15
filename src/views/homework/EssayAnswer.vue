/**
 * Created by jun on 2016/10/27.
 * 问答题 编辑页
 */
<template>
    <div class="essay-answer">
      <ict-titlebar :right-options="rightOptions" v-el:titlebar>
        <a slot="right">提交</a>
      </ict-titlebar>
      <div class="essay-content" v-el:question :class="{'fold-essay':isFold}">{{{essayContent}}}</div>
      <p class="fold-panel" v-el:fold><span v-touch:tap="onFoldTap" class="fold-icon">{{foldText}}</span></p>
      <textarea v-model="answer" placeholder="作业将自动保存" :style="textareaStyle" id="essay-textarea"></textarea>
        <div v-el:draftbar class="draft-box">
          <span v-touch:tap="submitDraft" :class="{'draft-disabled': !canDraft}">存草稿</span>
          <span class="keyboard-icon" v-touch:tap="resumeKeyboard"></span>
        </div>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import xTextarea from 'vux/x-textarea'
  import { essayGetters } from '../../vuex/getters'
  import { essayActions } from '../../vuex/actions'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
export default {
  vuex: {
    getters: {
      essayContent: essayGetters.essayQuestion,
      essayAnswer: essayGetters.essayAnswer,
      articleId: essayGetters.articleId
    },
    actions: {
      getQuestion: essayActions.getEssayQuestion,
      submitArticle: essayActions.submitArticle
    }
  },
  data () {
    return {
      canDraft: false, //是否可以保存草稿
      lessonId: 0,
      rightOptions: { //titlebar
        callback: '',
        disabled: true
      },
      foldText: '收起', //折叠 文案
      isFold: false, // 是否折叠题目
      textareaStyle: '', //textarea样式
      answer: '', // 填写的答案
      isAnswerChange: false //作业或草稿是否有关系,有更新退出时保存草稿
    }
  },
  watch: {
    'answer' (answer) {
      if (/\S/.test(answer)) {
        //非空合法内容
        if (this.essayAnswer) {
          // 修改草稿
          this.isAnswerChange = answer !== this.essayAnswer
        } else {
          // 新写作业
          this.isAnswerChange = true
        }
        this.canDraft = true
        this.rightOptions = {
          callback: this.submitEssay,
          disabled: false
        }
      } else {
        this.canDraft = false
        this.rightOptions.disabled = true
      }
      this.resizeTextarea()
    }
  },
  route: {
    data ({to: {params}}) {
      this.lessonId = params.lessonId
      this.getQuestion(this.lessonId)
      this.answer = this.essayAnswer
      setTimeout(
        this.resizeTextarea,
        300
      )
    },
    deactivate () {
      if (this.isAnswerChange && this.essayAnswer) {
        this.submitDraft()
      }
      this.isAnswerChange = false
      this.lessonId = 0
      this.foldText = '收起' //折叠 文案
      this.isFold = false // 是否折叠题目
      this.textareaStyle = '' //textarea样式
      this.answer = '' // 填写的答案
      this.canDraft = false
    }
  },
  methods: {
    /**
     * 计算textarea 高度
     */
    resizeTextarea () {
      const html = document.getElementsByTagName('html')[0]
      const height = html.offsetHeight - this.$els.titlebar.clientHeight - this.$els.question.clientHeight - this.$els.fold.clientHeight - this.$els.draftbar.clientHeight
      this.textareaStyle = `height:${height}px;`
    },

    /**
     * 点击 收起题目
     */
    onFoldTap () {
      this.isFold = !this.isFold
      this.foldText = this.isFold ? '展开' : '收起'
      setTimeout(
        this.resizeTextarea,
        50
      )
    },

    /**
     * 提交作业
     */
    submitEssay () {
      this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.SUBMIT_HOMEWORK, {
        lessonId: this.lessonId
      })
      this.isAnswerChange = false
      this.rightOptions.disabled = true
      const essayContent = {
        articleId: this.articleId,
        content: this.answer,
        lessonId: this.lessonId,
        status: 0
      }
      this.submitArticle(essayContent).then(
        markInfo => {
          if (markInfo.correction_date) {
            this.showAlert(`您的作业最快将在${markInfo.correction_date}被助教${markInfo.userName}批改。现在可以进行下一课内容的学习了`)
            this.rightOptions.disabled = false
          }
          window.history.back()
        }).catch(
        () => {
          this.rightOptions.disabled = false
        }
      )
    },

      /**
       * 保存草稿
       */
    submitDraft () {
      if (!this.canDraft) {
        return
      }
      this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.SAVE_DRAFT, {
        lessonId: this.lessonId
      })
      this.isAnswerChange = false
      const essay = {
        articleId: this.articleId,
        content: this.answer,
        lessonId: this.lessonId,
        status: 1
      }
      this.submitArticle(essay).then(
        result => {
          this.showToast('你的草稿已保存')
        }
      )
    },

    onAlertHide () {
      window.history.back()
    },

    /**
     * 关闭 keyboard
     */
    resumeKeyboard () {
      const textarea = document.getElementById('essay-textarea')
      textarea.blur()
      setTimeout(
        this.resizeTextarea,
        50
      )
    }
  },
  components: {
    IctTitlebar,
    Scroller,
    xTextarea
  }
}
</script>
<style lang="less">
  .essay-answer{
    height: 100%;
    p{
      margin: 0;
    }
    .fold-essay{
      height: 0.8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .essay-content{
      padding: 0.75rem 0.6rem 0;
      background: #f0eff5;
      font-size: 0.65rem;
      color: #656565;
      *{
        margin: 0;
        padding: 0;
      }
    }
    .fold-panel{
      position: relative;
      width: 100%;
      height: 60/40rem;
      background: #f0eff5;
      .fold-icon{
        position: absolute;
        padding: 0 0.5rem;
        line-height: 60/40rem;
        right: 0;
        bottom: 0;
        display: block;
        font-size: 0.65rem;
        color: #00b0f0;
        background: #f0eff5;
      }
    }
    textarea{
      display: block;
      width: 100%;
      margin: 0;
      border: 0;
      padding: 0.5rem;
      box-sizing: border-box;
      outline: 0;
      font-family: '\5FAE\8F6F\96C5\9ED1' !important;
      font-size: 0.7rem;
      color: #000;
    }

    .draft-box{
      position: relative;
      height: 2.2rem;
      line-height: 2.2rem;
      padding: 0;
      margin: 0;
      border: none;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      background: #f9f9f9;
      font-size: 0.7rem;
      color: #009aff;

      span{
        display: inline-block;
        padding: 0 1rem;
        text-align: center;
      }
      .draft-disabled{
        color: #898989;
      }
      .keyboard-icon:before{
        position: absolute;
        right: 0;
        bottom: 0;
        display: inline-block;
        padding: 0 1rem;
        text-align: center;
        font-family: 'myicon';
        content: '\e915';
        font-size: 0.8rem;
      }
    }
  }
</style>
