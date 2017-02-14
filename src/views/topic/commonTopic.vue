<template>
  <div class="common-topic">
    <ict-back-btn></ict-back-btn>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight" style="background-color: #fff">
      <div>
        <div v-for="commonContent in commonTopicInfo.content">
          <img class="pic" v-bind:src="commonContent" />
        </div>
      </div>
    </scroller>
    <div class="bottom-area" v-show="isTopicLoaded && commonTopicInfo.price > 0">
      <!--<ict-button class="ict-button" :disabled="isBuy" v-bind:class="{'disable': isBuy}" v-touch:tap="toBuy" v-el:btn> //因长投卡去掉购买限制-->
      <ict-button class="ict-button"  v-bind:class="{'disable': isBuy}" v-touch:tap="toBuy" v-el:btn>
        立即购买<span class="price">￥{{commonTopicInfo.price}}</span>
      </ict-button>
      <!--<div class="ticket-tip" v-show="isBuy">你已成功购买{{commonTopicInfo.title}},不可重复购买</div> //因长投卡去掉购买限制-->
    </div>
  </div>
</template>
<style lang="less">
  .common-topic{
    width: 100%;
    height: 100%;
    .top-back-btn {
      position: absolute;
      height: 2rem;
      width: 2rem;
      top: 0.3rem;
      left: 1rem;
      z-index: 20;
    }
    .top-back-btn:before {
      position: absolute;
      display: inline-block;
      font-family: 'myicon';
      content: '\e91b';
      font-size: 1.6rem !important;
      line-height: 2rem;
      width: 2rem;
      color: #999;
    }
    .pic{
      width: 100%;
      display: block;
    }
    .bottom-area{
      position: absolute;
      bottom: 0;
      height: 2.2rem;
      width: 100%;
      font-family: '微软雅黑';

      .ticket-tip{
        width: 100%;
        position: absolute;
        top: -1.25rem;
        font-size: 0.45rem;
        color: #fff;
        background-color: #ff9800;
        line-height:  1.25rem;
        text-align: center;
      }
      .ict-button{
        border-radius: 0;
        height: 2.2rem;
      }
    }
  }
</style>
<script>
  import IctBackBtn from '../../components/IctCourseBackBtn.vue'
  import Scroller from 'vux/scroller'
  import IctButton from '../../components/IctButton.vue'
  import {commonTopicActions} from '../../vuex/actions'
  import {commonTopicGetters, userGetters} from '../../vuex/getters'
  import {eventMap} from '../../frame/eventConfig'
  import {statisticsMap} from '../../statistics/statisticsMap'
  export default {
    vuex: {
      actions: {
        loadCommonTopic: commonTopicActions.loadCommonTopic,
        isCommonTopicBuy: commonTopicActions.isCommonTopicBuy
      },
      getters: {
        isLogin: userGetters.isLogin,
        commonTopicInfo: commonTopicGetters.commonTopic,
        isBuyTopic: commonTopicGetters.isBuyTopic
      }
    },
    data () {
      return {
        scrollerHeight: '580px',
        isTopicLoaded: false,
        ctpId: this.$route.params.ctpId
      }
    },
    computed: {
      isBuy () {
        return this.isLogin ? this.isBuyTopic : false
      }
    },
    watch: {
      'commonTopicInfo.content' () {
        this.setScrollerHeight()
      }
    },
    route: {
      canActivate: function (transition) {
        if (/\/pay\/success\/CT\//.test(transition.from.path)) {
          transition.redirect('/mycourse')
        }
        transition.next()
      },
      data (transition) {
        const ctpId = transition.to.params.ctpId
        this.loadCommonTopic(ctpId).then(
          () => { this.isTopicLoaded = true }
        )
        if (this.isLogin) {
          this.isCommonTopicBuy(ctpId)
        }
      }
    },
    methods: {
      back () {
        window.history.back()
      },
      toBuy () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.TICKET_CONFIRM_TAP, {
          '商品名称': this.commonTopicInfo.title,
          '价格': this.commonTopicInfo.price
        })
        //跳转到订单页面
        const path = '/pay-CT-' + this.ctpId
        this.$route.router.on(path, {
          component: require('../pay/CommonTopicOrder.vue')
        })
        this.$route.router.go(path)
      },
      /**
       * 设置 滚动范围高度
       */
      setScrollerHeight () {
        const me = this
        setTimeout(function () {
          me.$nextTick(() => {
            me.scrollerHeight = window.document.body.offsetHeight - (me.commonTopicInfo.price > 0 ? me.$els.btn.offsetHeight : 0) + 'px'
          me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 1500)
      }
    },
    components: {
      Scroller,
      IctButton,
      IctBackBtn
    }
  }
</script>
