<template>
  <div class="question-naire-container">
    <ict-titlebar v-el:titlebar >想问</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
     <div class="question-detail-container">
    <div class="question-container">
    <p>亲爱的院生：</p>
    <p>
      为了方便大家解决学习过程中遇到的疑惑，帮助大家在投资学习之路上更好的成长；长投学堂APP正在针对“提问与讨论”功能进行调研，希望你能告诉小投你在学习中想问什么（可多选哦）
    </p>
    <p>参与调研的院生并成功提交的院生，将有机会第一时间参与“提问与讨论”功能的测试 ^-+  </p>
    </div>
    <div class="inner-for-padding"></div>
    <div class="question-option-container">
      <div class="option-item-container">
        <p class="option-item-title">我想问 : <a class="option-blue-text">问题类型</a> </p>
        <p class="option-item-content">
        <ict-option title="课程相关" :disabled="activeOpt" order="a#" option="A"></ict-option>
        <ict-option title="作业批改" :disabled="activeOpt" order="b#" option="A"></ict-option>
        <ict-option title="APP使用" :disabled="activeOpt" order="c#" option="A"></ict-option>
        <ict-option title="优惠信息" :disabled="activeOpt" order="d#" option="A"></ict-option>
        </p>
      </div>
      <div class="option-item-container">
        <p class="option-item-title">我想问 : <a class="option-blue-text">回答对象</a> </p>
        <p class="option-item-content">
          <ict-option title="师兄" :disabled="activeOpt" order="e#" option="B"></ict-option>
          <ict-option title="助教" :disabled="activeOpt" order="f#" option="B"></ict-option>
          <ict-option title="老师" :disabled="activeOpt" order="g#" option="B"></ict-option>
        </p>
      </div>
      <div class="option-item-container">
        <p class="option-item-title">我想问 : <a class="option-blue-text">提问机会</a> </p>
        <p class="option-item-content">
          <ict-option title="每门课免费3次" :disabled="activeOpt" order="h#" option="C"></ict-option>
          <ict-option title="付费提问" :disabled="activeOpt" order="i#" option="C"></ict-option>
          <ict-option title="完成任务获提问机会" :disabled="activeOpt" order="g#" option="C"></ict-option>
        </p>
      </div>
    </div>
   </div>
    </scroller>
    <ict-button type="default"  v-touch:tap="doSubmit" :disabled="!isAccordSubmit" v-el:ictbutton >提交</ict-button>
 </div>
</template>
<style lang="less">
  .question-naire-container{
    background: #fff;
    .question-detail-container{
      font-size: .7rem;
      .ict-btn{
        border-radius: 0;
      }
      .question-container{
        background: #f0eff5;
        color: #666;
        font-size: .65rem;
        padding: 1rem 1.25rem;
      }
      .inner-for-padding{
        width: 100%;
        height: 1.5rem;
        background: #fff;
      }
      .question-option-container{
        background: white;
        .option-item-title{
          text-align: center;
          font-size: .65rem;
          color: #aaa;
          margin-bottom: 1rem;
        }
        .option-item-title + p{
          text-align: center;
          margin-bottom: 2.5rem;
          font-size: .6rem;
          span{
            color: #666;
            width: 3.75rem;
            height: 1.35rem;
            border-radius: .675rem;
            border: 1px solid #eee;
            padding: .2rem .5rem;
            margin-right: .5rem;
          }
        }
        .option-item-title + p:last-child{
          margin-bottom: 2.32rem;
        }
      }
      .option-blue-text{
        color: #00b0f0;
      }
    }
  }
</style>
<script>
  import Swiper from 'vux/swiper'
  import SwiperItem from 'vux/swiper-item'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import IctOption from '../../components/questionnaire/IctOption.vue'
  import IctButton from '../../components/IctButton.vue'
  import Scroller from 'vux/scroller'
  import {questionNaireActions} from '../../vuex/actions'

export default {
  vuex: {
    actions: {
      submitQuestionNaire: questionNaireActions.submitQuestionNaire
    }
  },
  data () {
    return {
      answer: '',
      naireId: 0,
      activeList: [],
      activeOpt: false,
      btnActive: false,
      scrollerHeight: '0px'
    }
  },
  computed: {
    isAccordSubmit () {
      return this.activeList.indexOf('A') >= 0 && this.activeList.indexOf('B') >= 0 && this.activeList.indexOf('C') >= 0
    }
  },
  components: {
    Swiper,
    SwiperItem,
    IctTitlebar,
    Scroller,
    IctButton,
    IctOption
  },
  route: {
    data ({to: {params: {naireId}}}) {
      this.naireId = naireId
    },
    deactivate ({to, next}) {
      this.btnActive = false
      next()
    }
  },
  ready () {
    this.setScrollerHeight()
  },
  methods: {
    doSubmit () {
      let activeOptArr = document.getElementsByClassName('ict-item-active')
      let optLen = activeOptArr.length
      for (var i = 0; i < optLen; i++) {
        this.answer += activeOptArr[i].getAttribute('order')
      }
      this.answer = this.answer.substring(0, this.answer.length - 1)
      this.submitQuestionNaire(this.answer, Number(this.naireId)).then(
        () => {
         this.showToast({message: '提交成功'})
        },
        (err) => {
          console.log('err', err)
        }
      )
      window.history.back()
    },
     setScrollerHeight () {
      // 设置滚动条高度为 页面高度-titlebar高度-button的高度
      const me = this
      const titlebar = this.$els.titlebar
      const ictbutton = this.$els.ictbutton
      me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight - ictbutton.offsetHeight) + 'px'
      setTimeout(function () {
        me.$nextTick(() => {
          me.$refs.scroller.reset({
          top: 0
        })
      })
      }, 150)
    }
  },
  events: {
    addActiveList (option) {
      this.activeList.push(option)
    },
    reduceActiveList (option) {
      this.activeList.splice(this.activeList.indexOf(option), 1)
    }
  }
}
</script>
