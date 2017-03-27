/**
 * Created by jun on 2016/10/27.
 * 问答题 编辑页
 */
<template>
    <div class="essay-answer">
      <ict-titlebar :right-options="rightOptions" v-el:titlebar>
        <a slot="right">提交</a>
      </ict-titlebar>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
        <div>
          <div class="essay-content" :class="{'fold-essay':isFold}">{{{essayContent}}}</div>
          <textarea v-model="answer" placeholder="请写下你的作业内容" id="essay-textarea" @blur="onTextBlur()" @focus="onTextFocus()" v-el:textarea></textarea>
          <div class="draft-box">
            <span v-touch:tap="submitDraft" :class="{'draft-disabled': !canDraft}">存草稿</span>
            <span class="keyboard-icon" v-touch:tap="resumeKeyboard" v-show="isKeyBoardShow"></span>
          </div>
        </div>
      </scroller>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import xTextarea from 'vux/x-textarea'
  import {essayGetters} from '../../vuex/getters'
  import {essayActions, homeworkListActions, courseRecordActions} from '../../vuex/actions'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  import {setLocalCache, clearLocalCache} from '../../util/cache'
  // 页面原有高度, 用来处理键盘弹出事件
  const _originHtmlHeight = window.document.body.offsetHeight
  let isKeyboardPop = false

export default {
  vuex: {
    getters: {
      essayContent: essayGetters.essayQuestion,
      essayAnswer: essayGetters.essayAnswer,
      articleId: essayGetters.articleId
    },
    actions: {
      getQuestion: essayActions.getEssayQuestion,
      submitArticle: essayActions.submitArticle,
      syncHomeworkList: homeworkListActions.getHomeworkList,
      loadAllExpenseRecords: courseRecordActions.loadAllExpenseRecords
    }
  },
  data () {
    return {
      draftTimer: 0,  //存草稿定时器
      scrollerHeight: '450px',
      isKeyBoardShow: false,
      subjectId: 0,
      lessonId: 0,
      timer: 0,
      canDraft: false, //是否可以保存草稿
      rightOptions: { //titlebar
        callback: '',
        disabled: true
      },
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
    }
  },

  route: {
    data ({to: {params}}) {
      this.lessonId = params.lessonId
      this.subjectId = params.subjectId
      this.getQuestion(this.lessonId)
      this.answer = this.essayAnswer
      this.setScrollerHeight()
      this.addDraftListeners()
      this.startListenToHeightChange()
    },

    deactivate () {
      this.resetView()
    }
  },

  ready () {
    this.scrollerHeight = (window.document.body.offsetHeight - this.$els.titlebar.offsetHeight) + 'px'
  },

  methods: {
    /**
     * 保存草稿后,清除页面数据
     */
    resetView () {
      if (this.isAnswerChange && this.answer) {
        this.submitDraft()
      }

      this.isAnswerChange = false
      this.lessonId = 0
      this.isFold = false // 是否折叠题目
      this.textareaStyle = '' //textarea样式
      this.answer = '' // 填写的答案
      this.canDraft = false
      this.removeDraftListeners()
      this.stopListenToHeightChange()
    },

    /**
     * 监听页面,每30秒保存一次草稿
     */
    addDraftListeners () {
      this.draftTimer = setInterval(this.autoSaveDraft, 30000)
    },

    /**
     * 清除页面监听
     */
    removeDraftListeners () {
      clearInterval(this.draftTimer)
    },

    /**
     * 自动保存草稿
     */
    autoSaveDraft () {
      const essay = {
        articleId: this.articleId,
        content: this.answer,
        lessonId: this.lessonId,
        status: 1
      }

      setLocalCache('essay-draft', JSON.stringify(essay))
      this.showToast('你的草稿已保存')
    },

    /**
     * 设置滚动条高度
     */
    setScrollerHeight () {
      // 设置滚动条高度为 页面高度-titlebar高度-tabbar高度
      this.scrollerHeight = (window.document.body.offsetHeight - this.$els.titlebar.offsetHeight) + 'px'
      setTimeout(() => {
        this.$nextTick(() => {
        this.$refs.scroller.reset({
          top: 0
        })
      })
      }, 1000)
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
            this.showAlert({
              title: '作业已提交',
              message: `您的作业最快将在${markInfo.correction_date}被助教${markInfo.userName}批改。现在可以进行下一课内容的学习了`,
              btnText: '知道了'
            })
            this.rightOptions.disabled = false
          }
          this.loadAllExpenseRecords().then(
            this.syncHomeworkList()
          )
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

      this.autoSaveDraft()
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
          clearLocalCache('essay-draft')
          this.updateRecords()
          this.showToast('你的草稿已保存')
        }
      )
    },

    /**
     * 更新 作业进度
     */
    updateRecords () {
      this.loadAllExpenseRecords().then(
        this.syncHomeworkList()
      )
    },

    /**
     * 关闭 keyboard
     */
    resumeKeyboard () {
      this.isKeyBoardShow = false
      const textarea = this.$els.textarea
      textarea.blur()
    },

    /**
     * textarea 聚焦
     */
    onTextFocus () {
      this.isKeyBoardShow = true
    },

    /**
     * textarea 失焦
     */
    onTextBlur () {
      this.isKeyBoardShow = false
    },

    /**
     * 开始监听页面高度改变事件
     */
    startListenToHeightChange () {
      this.timer = setInterval(() => {
        // 键盘弹出并且页面高度没改变 (说明键盘已经隐藏)
        if (isKeyboardPop && _originHtmlHeight === window.document.body.offsetHeight) {
          this.resumeKeyboard()
        }
        isKeyboardPop = _originHtmlHeight !== window.document.body.offsetHeight
      }, 500)
    },

    /**
     * 停止监听页面高度改变事件
     */
    stopListenToHeightChange () {
      clearInterval(this.timer)
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
    width: 100%;
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
      p{
        overflow: hidden;
        text-overflow: ellipsis;
      }
      *{
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }

    textarea{
      display: block;
      width: 100%;
      height: 25rem;
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
      width: 100%;
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
