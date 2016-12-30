/**
 * Created by jun on 2016/11/24.
 *
 */
<template>
  <div class="d_help_self_service">
    <ict-titlebar v-el:titlebar>
      策略使用FAQ
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
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .d_help_self_service{
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
  export default {
    data () {
      return {
        helpList: [
        {
          q: '什么是多因子策略？',
          a: '多因子模型是根据诺贝尔经济奖得主尤金•法玛（EugeneF.Fama）教授和麻省理工学院的肯尼斯•弗伦奇(KennethFrench)教授提出的经典量化策略，对A股2700多只股票每周进行量化排名的模型。'
        },
        {
          q: '在A股多因子策略情况如何？',
          a: '多因子策略是利用多因子数据排名得出的策略方案。为了降低风险，我们剔除了ST、新股、绝大部分的创业板股票，根据多因子数据整合的多因子策略，从2006年到2015年，每年保持12%以上收益，10年增长了77倍，历史最大回撤仅18.9%。'
        },
        {
          q: '如何使用多因子策略数据？',
          a: '1、多因子策略每周五收盘晚上或周六数据处理后,公布本周排名前10只股票，VIP用户自行选择其中5~10支在第二周周一开盘后买入，或卖出历史排名股票，再换入新的排名股票，每周轮动操作。2、风险宝会根据风险每天上午开盘前（暂定6点）给出持仓或者空仓的建议，风险宝会在市场风险高的时候提示空仓；如果当日风险宝提示空仓，则当日集合竞价卖出所有股票，直到再次提示持仓时买入。'
        },
        {
          q: '如何使用每日多空提示？',
          a: '提示“今日建议空仓”时一定要空仓，按风险宝提示才能减少最大回撤！！从历史数据看，多因子策略每年持仓时间大约在4个月左右，“截断亏损，才能让赢利奔跑！”。'
        },
        {
          q: '多因子仓位如何分配？',
          a: '多因子策略仓位建议不要超过总资金的20%,后续长投会推出更多策略,请不要在单一策略上投入全部资金。另外如果选择5支股票的话，资金也至少要在3万以上。建议用户按自己的资金来选择策略。'
        },
        {	q: '换仓时会不会有市场冲击?',
          a: '从9: 30分,10点,11点,13点,14点,14点45分的模拟时点交易数据来看,下午换仓的收益比总体要减少25%~35%,建议上午换仓。'
        }
      ],
        scrollerHeight: '500px',
        currQuestionIndex: -1 //当前查看的问题集合
      }
    },

    watch: {
      'helpList': function () {
        const me = this
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
//              top: 0
          })
        })
        }, 300)
      }
    },

    ready () {
      this.scrollerHeight = (window.document.body.offsetHeight - this.$els.titlebar.offsetHeight) + 'px'
    },
    methods: {
      lookAnswer (index) {
        if (this.currQuestionIndex !== index) {
          this.currQuestionIndex = index
        } else {
          this.currQuestionIndex = -1
        }
      }
    },
    components: {
      IctTitlebar,
      Scroller
    }
  }
</script>
