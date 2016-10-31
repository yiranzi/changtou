/**
 * Created by jun on 2016/10/27.
 *
 */
<template>
    <div class="choice-answer">
      <span class="close-icon" v-touch:tap="onCloseTap"></span>
      <div class="choice-title">
        {{currQuestion.title}}
      </div>
      <div class="choice-options" v-for="option in currQuestion.content">
        {{option}}
      </div>
      <ict-button>{{btnText}}</ict-button>
    </div>
</template>
<script>
  import { choiceGetters } from '../../vuex/getters'
  import IctButton from '../../components/IctButton.vue'
export default {
  vuex: {
    getters: {
      currQuestion: choiceGetters.currQuestion,
      lessonId: choiceGetters.lessonId
    },
    actions: {

    }
  },
  data () {
    return {
      btnText: '下一题'
    }
  },
  computed: {

  },
  route: {

  },
  ready () {

  },
  methods: {
    onCloseTap () {
      window.history.back(-1)
    }
  },
  components: {
    IctButton
  }
}
</script>
<style lang="less">
  .choice-answer{
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 2.95rem;
    background: #fff;
    .close-icon:before{
      position: absolute;
      display: inline-block;
      top: 0;
      right: 0;
      padding: 1rem;
      font-family: 'myicon';
      content: '\e90d';
      font-size: .8rem!important;
      color: #aaa;
    }
    .choice-title{
      margin: 0 1rem 1rem;
      padding: 1rem;
      border-radius: 10px;
      font-size: .65rem;
      line-height: 1rem;
      background: #00b0f0;
      color: #fff;
    }
    .choice-options{
      position: relative;
      margin: 0 2rem .75rem;
      padding: .75rem 1rem;
      background: #f1f1f1;
      border-radius: 10px;
      font-size: .7rem;
      color: #444;
      line-height: .8rem;
    }
    .ict-btn{
      width: 7rem !important;
      margin: 0 auto 0;
      border-radius: 30px;
      background: #00b0f0;
      border: none;
    }
  }
</style>
