/**
 * Created by jun on 2016/10/27.
 * 问答题 编辑页
 */
<template>
    <div class="essay-answer">
      <ict-titlebar :right-options="rightOptions" v-el:titlebar>
        <a slot="right">提交</a>
      </ict-titlebar>
        <div class="essay-content" v-el:question :class="{'fold-essay':isFold}">{{{essayContent}}}
          <span v-touch:tap="onFoldTap" class="fold-icon">{{foldText}}</span>
        </div>
      <textarea v-model="answer" placeholder="作业将自动保存" :style="textareaStyle" id="essay-textarea"></textarea>
        <div v-el:draftbar class="draft-box">
          <span v-touch:tap="submitDraft">存草稿</span>
          <span class="keyboard-icon" v-touch:tap="resumeKeyboard"></span>
        </div>
      <alert :show.sync="isAlert" button-text="知道了" class="ict-alert" @on-hide="alertHandler">{{alertMsg}}</alert>
      <toast :show.sync="isToast" class="ict-toast" :type="toastType">{{toastMsg}}</toast>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import xTextarea from 'vux/x-textarea'
  import Alert from 'vux/alert'
  import Toast from 'vux/toast'
  import { essayGetters } from '../../vuex/getters'
  import { essayActions } from '../../vuex/actions'
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
      lessonId: 0,
      isToast: false,
      toastMsg: '',
      isAlert: false,
      alertMsg: '',
      rightOptions: { //titlebar
        callback: '',
        disabled: true
      },
      foldText: '收起', //折叠 文案
      isFold: false, // 是否折叠题目
      textareaStyle: '', //textarea样式
      answer: this.essayAnswer, // 填写的答案
      alertHandler: () => {}
    }
  },
  watch: {
    'answer' (answer) {
      if (/\S/.test(answer)) {
        //非空合法内容
        this.rightOptions = {
          callback: this.submitEssay,
          disabled: false
        }
      } else {
        this.rightOptions.disabled = true
      }
      this.resizeTextarea()
    }
  },
  route: {
    data ({to: {params}}) {
      this.lessonId = params.lessonId
      this.getQuestion(this.lessonId)
      setTimeout(
        this.resizeTextarea,
        300
      )
    }
  },
  beforeDestroy () {
    this.submitDraft()
  },
  methods: {
    /**
     * 计算textarea 高度
     */
    resizeTextarea () {
      const html = document.getElementsByTagName('html')[0]
      const { titlebar, question, draftbar } = this.$els
      const height = html.offsetHeight - titlebar.clientHeight - question.clientHeight - draftbar.clientHeight
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
            this.alertHandler = this.onAlertHide
            this.alertMsg = `您的作业最快将在${markInfo.correction_date}被助教${markInfo.userName}批改。现在可以进行下一课内容的学习了`
            this.isAlert = true
            this.rightOptions.disabled = false
          } else {
            window.history.back()
          }
        }).catch(
        err => {
          console.log(err)
          this.rightOptions.disabled = false
        }
      )
    },

      /**
       * 保存草稿
       */
    submitDraft () {
      const essay = {
        articleId: this.articleId,
        content: this.answer,
        lessonId: this.lessonId,
        status: 1
      }
      this.submitArticle(essay).then(
        result => {
          this.articleId = result.articleId
          this.toastMsg = '你的草稿已保存'
          this.isToast = true
        }).catch(
        err => console.log(err)
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
    xTextarea,
    Alert,
    Toast
  }
}
</script>
<style lang="less">
  .essay-answer{
    height: 100%;

    .fold-essay{
      p{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .essay-content{
      position: relative;
      padding: 0.75rem 0.6rem;
      background: #f0eff5;
      font-size: 0.65rem;
      color: #656565;
      ul{
        margin-left: -2rem;
      }
      p{
        margin: 0;
      }
      .fold-icon{
        display: block;
        font-size: 0.65rem;
        color: #00b0f0;
        text-align: right;
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
