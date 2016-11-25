/**
* Created by jun on 2016/11/22.
*
*/
<template>
  <div class="strategy-agreement" v-el:agreement>
    <div class="strategy-agreement-title" v-el:title>服务协议</div>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div class="strategy-agreement-content">
        <p v-for="item in agreement">{{item}}</p>
      </div>
    </scroller>
    <ict-button class="strategy-agreement-agree" v-touch:tap="onAgreeTap" v-el:agree>同意</ict-button>
  </div>
</template>
<script>
  import IctButton from '../IctButton.vue'
  import Scroller from 'vux/scroller'
  export default {
    data () {
      return {
        scrollerHeight: '0px',
        agreement: [
          '1.长投学堂推出长投宝专业版及长投宝VIP版，是为用户提供的资讯服务。在任何情况下，平台中的信息或所表达的意见并不构成所述股票及基金买卖的出价或询价。过往业绩并不代表将来业绩。',
          '2.在任何情况下，我司不就本资讯服务的任何内容对任何投资做出任何形式的担保。长投学堂不参与、涉及任何客户自身的投资行为。',
          '3.用户使用长投宝资讯服务后，其股票及基金投资账户的投资风险完全由用户本人承担，请务必树立长期科学的投资意识，正确认识各种投资标的的风险和优势所在。',
          '4.长投宝资讯服务所载信息或所表示的意见，仅供本平台的注册用户、付费用户及VIP用户作为投资参考，专号专享信息，长投宝并不构成对任何人的投资建议，任何根据长投宝资讯服务做出的投资决策应该盈亏自负。',
          '5.长投宝资讯服务的版权归本公司所有，未经本公司事先书面授权，长投宝资讯服务的任何信息均不得以制作任何形式的拷贝，或以一号多用、账号共享的形式再次分发或传递给其他人，对于以上行为所造成的所有后果，均由用户或信息传递者负全部责任。'
        ]
      }
    },
    ready () {
      this.setScrollerHeight()
    },
    methods: {
      /**
       * 设置滚动框高度
       */
      setScrollerHeight () {
        const me = this
        me.scrollerHeight = me.$els.agreement.offsetHeight - me.$els.title.offsetHeight - me.$els.agree.offsetHeight + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 200)
      },
      onAgreeTap () {
        this.$dispatch('onAgreeTap')
      }
    },
    components: {
      IctButton,
      Scroller
    }
  }
</script>
<style lang="less">
  .strategy-agreement{
    width: 620/40rem;
    height: 908/40rem;
    background: #fff;
    border-radius: 10px;
    p{
      margin: 0;
    }
    &-title{
      position: relative;
      height: 3.25rem;
      border-radius: 10px 10px 0 0;
      background: #f8f8f8;
      line-height: 3.25rem;
      text-align: center;
      font-size: 0.8rem;
      color: #444;
    }
    &-content{
      padding: 1rem;
      background: #fff;
      font-size: 0.6rem;
      color: #898989;
      box-sizing: content-box;
      p{
        margin-bottom: 1rem;
      }
    }
    &-agree.ict-btn{
      width: 100%;
      margin: 0;
      border-radius: 0 0 10px 10px;
      border-top: 1px solid #ddd;
      background: #f8f8f8;
      color: #00b0f0;
    }
  }
</style>
