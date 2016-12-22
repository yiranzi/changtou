<template>
  <div class="help_self_service">
    <ict-titlebar v-el:titlebar>
      小投答疑
      <div slot="right" v-touch:tap="goToManualService">
        <img class="msg_pic" src='../../assets/styles/image/help/MSG.png'>
        <span class="badge offset-position" v-if="badgeNum">{{badgeNum}}</span>
      </div>
    </ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight" style="background-color: #fff">
      <div class="help_self_service_content">
        <div class="self_service_tip"></div>
        <div class="question_tip">你是否遇到了以下问题</div>
        <div v-for="questionArr in helpList">
          <div class="question_box">
            <div class="question" v-touch:tap="lookAnswer($index)">Q  :  {{questionArr.q}}</div>
            <div class="answer" v-show="$index === currQuestionIndex">A  :  {{questionArr.a}}</div>
          </div>
        </div>
        <!--<div style="height: 1rem; width: 100%"></div>-->
      </div>
    </scroller>
    <div class="ask_more_questions" v-el:btn>
      <span>还有其他问题</span>
      <span v-touch:tap="goToManualService">向我提问</span>
    </div>
  </div>
</template>
<style lang="less">
  .help_self_service{
    width: 100%;
    .right_unable{
      disabled: false;
      color: #fff;
    }
    .msg_pic{
      width: 1.5rem;
      height: 1.5rem;
      vertical-align: middle;
      color: #fff;
    }
    .badge {
      display: inline-block;
      text-align: center;
      background: #f74c31;
      color: #fff;
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      border-radius: 8px;
      padding: 0 6px;
      background-clip: padding-box;
    }
    .offset-position {
      position: relative;
      right: 14px;
    }
    .help_self_service_content{
      background-color: #f0eff5;
    }
    .self_service_tip{
      width: 100%;
      height: 5rem;
      background: url("../../assets/styles/image/help/xiaotou.png");
      background-size: 100% 100%;
    }
    .question_tip{
      line-height: 1.75rem;
      margin-top: 0.5rem;
      padding-left: 0.9rem;
      border: 1px solid #f0eff5;
      font-size: 0.6rem;
      background-color: #fff;
      color: #bbb;
    }
    .question_box{
      border: 1px solid #f0eff5;
      background-color: #fff;
      .question{
        padding: 1rem 0.9rem 0.75rem 0.9rem;
        color: #444;
        font-size: 0.7rem;
      }
      .answer{
        padding: 0rem 0.9rem 1rem 0.9rem;
        color: #898989;
        font-size: 0.65rem;
      }
    }

    .ask_more_questions{
      position: relative;
      width: 90.4%;
      height: 2.45rem;
      line-height: 2.45rem;
      padding: 0 0.9rem;
      border-top: 1px solid #ddd;
      background-color: #f0eff5;
      span:nth-child(1){
        color: #aaa;
        font-size: 0.7rem;
      }
      span:nth-child(2){
        position: absolute;
        right: 0.9rem;
        color: #007aff;
        font-size: 0.75rem;
      }
    }
  }
</style>
<script>
  import Scroller from 'vux/scroller'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {helpActions} from '../../vuex/actions'
  import {helpGetters} from '../../vuex/getters'

  export default {
    vuex: {
      actions: {
        loadQAList: helpActions.loadQAList
      },
      getters: {
        helpList: helpGetters.QAList,
        newSuggestionNum: helpGetters.newSuggestionNum
      }
    },

    data () {
      return {
        scrollerHeight: '500px',
        currQuestionIndex: -1 //当前查看的问题集合
      }
    },

    computed: {
      /**
       * 小红点
       * @returns {string}
       */
      badgeNum () {
        return this.newSuggestionNum ? this.newSuggestionNum + '' : ''
      }
    },

    route: {
      data (transition) {
        const me = this
        me.loadQAList().then(
          function () {
            me.refreshScroller()
            transition.next()
          }
        )
      }
    },

    methods: {
      lookAnswer (index) {
        const me = this
        if (this.currQuestionIndex !== index) {
          this.currQuestionIndex = index
          if (index === (this.helpList.length - 1)) {
            this.$nextTick(() => {
              setTimeout(() => {
                me.$refs.scroller._xscroll.resetSize()
              }, 50)
            })
          }
        } else {
          this.currQuestionIndex = -1
        }
      },

      /**
       * 调整到你问我答
       */
      goToManualService () {
        this.$route.router.go('/manual/service')
      },

      refreshScroller () {
        const me = this
        setTimeout(function () {
          me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.offsetHeight - me.$els.btn.offsetHeight) + 'px'
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 500)
      }
    },
    components: {
      IctTitlebar,
      Scroller
    }
  }
</script>
