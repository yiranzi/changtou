<template>
    <div class="interview-list">
      <ict-titlebar v-el:titlebar>院生故事</ict-titlebar>
      <scroller :lock-x="true" scrollbar-y :bounce="true" v-ref:scroller :height="scrollerHeight">
        <div v-show="isLoadSuccess">
          <div class="content" v-for="item in interviewList" v-touch:tap="goToInterviewRecord(item.interviewId)">
            <img class="pic" v-bind:src="item.pic" />
            <div class="reading">{{item.readCount}}人读过</div>
          </div>
        </div>
        <div class="load-fail" v-show="!isLoadSuccess">
          <div>信息加载失败</div>
          <button v-touch:tap="loadInterviewList">请重新加载</button>
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
      border-bottom: 0.5rem #f0eff5 solid;
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
    .load-fail{
      width: 100%;
      height: 623px;
      background-color: #ffffff;
      text-align: center;
      padding-top: 40%;
    }
  }
</style>
<script>
  import Scroller from 'vux/scroller'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {interviewActions} from '../../vuex/actions'
  import {interviewGetters} from '../../vuex/getters'
  import {setLocalCache} from '../../util/cache'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  export default {
    vuex: {
      actions: {
        loadInterviewList: interviewActions.loadInterviewList
      },
      getters: {
        interviewList: interviewGetters.interviewList
      }
    },
    data () {
      return {
        scrollerHeight: '590px',
        isLoadSuccess: false
      }
    },
    watch: {
      'interviewList': function () {
        this.setScrollerHeight()
      }
    },
    route: {
      data () {
        const me = this
        return this.loadInterviewList().then(
          function () {
            setLocalCache('interview-number', {'interview-number': me.interviewList.length})
            return {
              isLoadSuccess: true
            }
          },
          function (err) {
            console.log('err', err)//获取信息错误
            return {
              isLoadSuccess: false
            }
          }
        )
      }
    },

    methods: {
      setScrollerHeight () {
        const me = this
        setTimeout(
          function () {
            me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.offsetHeight) + 'px'
            me.$nextTick(() => {
              me.$refs.scroller.reset({
                top: 0
              })
            })
          }, 500
        )
      },
      goToInterviewRecord (interviewId) {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.INTERVIEW, {
          '访谈Id': interviewId
        })
        this.$route.router.go(`/interview/interview-record/${interviewId}`)
      }
    },
    components: {
      IctTitlebar,
      Scroller
    }
  }
</script>
