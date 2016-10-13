<template>
    <div class="interview-list">
      <ict-titlebar v-el:titlebar>院生故事</ict-titlebar>
      <scroller :lock-x="true" scrollbar-y :bounce="true" v-ref:scroller :height="scrollerHeight">
        <div>
          <div class="content" v-for="list in interviewList" v-touch:tap="toInterviewRecord(list.interviewId)">
            <img class="pic" v-bind:src="list.pic" />
            <div class="reading">{{list.readCount}}人读过</div>
          </div>
        </div>
      </scroller>
    </div>
</template>
<style lang="less">
  .interview-list{
    .content{
      width: 100%;
      padding: 0.75rem 1rem;
      background-color: #fff;
      border-bottom: 1rem #f0eff5 solid;
      position: relative;
      .pic{
        width: 16.75rem;
        height: 6.3rem;
        display: block;
      }
      .reading{
        width: 15.75rem;
        line-height: 1.5rem;
        padding: 0 0.5rem;
        position: absolute;
        bottom: 0.75rem;
        font-size: 0.6rem;
        background-color: #000;
        opacity: 0.5;
        color: #fff;
      }
    }
  }
</style>
<script>
  import Scroller from 'vux/scroller'
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import {interviewActions} from '../../vuex/actions'
  import {interviewGetters} from '../../vuex/getters'
  export default {
    vuex: {
      actions: {
        loadInterviewList: interviewActions.loadInterviewList
      },
      getters: {
        interviewList: interviewGetters.interviewList
      }
    },
    route: {
      data (transition) {
        this.loadInterviewList().then(
          function () {
            transition.next()
          },
          function (err) {
            console.log('err', err)//获取信息错误
          }
        )
      }
    },
    data () {
      return {
        scrollerHeight: '590px'
      }
    },
    watch: {
      'interviewList': function () {
        const me = this
        const {titlebar} = this.$els
        me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight) + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
//              top: 0
          })
        })
        }, 1500)
      }
    },
    methods: {
      toInterviewRecord (interviewId) {
        this.$route.router.go('/interview/interview-record/' + interviewId)
      }
    },
    components: {
      IctTitlebar,
      Scroller
    }
  }
</script>
