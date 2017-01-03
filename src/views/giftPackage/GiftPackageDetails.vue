<template>
  <div class="gift-package-details">
    <ict-titlebar v-el:titlebar>
      伴学礼包
      <div slot="right" v-touch:tap="goToIndexPage" class="complete-btn">
        完成
      </div>
    </ict-titlebar>
    <scroller :lock-x="true" v-ref:scroller :height.sync="scrollerHeight">
    <div class="gift-container">
      <div class="gift-item-container">
        <h3>1/  <span>入门读物</span> </h3>
        <div class="gift-item gift-item-book">
          <span>大雄股市历险记</span> <span v-touch:tap="gotoBookDetails">立即阅读</span>
          <p class="gift-item-promotion">
            专为初学者准备的生动有趣的阅读材料。小伙伴们可以跟随大雄学习股票投资的经历，迈出学习理财的第一步。
          </p>
        </div>
        <div class="user-explain">
          <p>使用说明:</p>
          <p class="user-explain-item">
            1. 可在“我的课程”栏目下查看阅读材料《大雄股市历险记》
          </p>
          <p class="user-explain-item">
            2. 《大雄股市历险记》阅读权限在当前账号下永久有效
          </p>
        </div>
      </div>
      <div class="gift-item-container">
        <h3>2/ <span>积分抵用券</span></h3>
        <div class="gift-item gift-item-mark">
          <span>积分抵用券</span>
          <p class="gift-item-promotion">
            为鼓励小伙伴积累丰富的投资知识，赠送2000分新手积分抵用券。可在APP中购买课程支付时，抵扣20元。
          </p>
        </div>
        <div class="user-explain">
          <p>使用说明:</p>
          <p class="user-explain-item">
            1. 积分抵用券在首次下单时进行抵扣，不适用于购买实战策略类课程
          </p>
          <p class="user-explain-item">
            2. 可在“个人中心”----“优惠信息”查看已领取的积分抵用券
          </p>
          <p class="user-explain-item">
            3. 购买课程时，系统将自动匹配积分抵用券进行抵扣
          </p>
        </div>
      </div>
    </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .gift-package-details{
    background: white ;
    .left-arrow{
      display: none ;
    }
    .complete-btn{
      color:white ;
    }
    .gift-container {
      background: white;
      .gift-item-container{
        margin: 2rem 0;
      }
      .gift-item-mark {
        background: #d1f1f0 url("../../assets/styles/image/giftPackage/ICON-mark.png") no-repeat .75rem center/20% !important;
      }
      .gift-item-book {
        background: #d1f1f0 url("../../assets/styles/image/giftPackage/ICON-book.png") no-repeat .75rem center/20% !important;
      }
      .gift-item {
        width: 12.25rem;
        margin: .5rem auto;
        padding-left: 4.75rem;
        background: #d1f1f0;
        padding-top: .6rem;
        padding-bottom: .4rem;
        span:first-child {
          font-size: .75rem;
          color: #444;
          display: inline-block;
          margin-right: .4rem;
          font-weight: bold;
        }
        span:nth-child(2) {
          color: #00b0f0;
          font-size: .55rem;
          border: 1px solid #00b0f0;
          width: 2.75rem;
          height: .75rem;
          border-radius: 1.5rem;
        }
        .gift-item-promotion {
          font-size: .65rem;
          color: #888;
        }
      }
      .user-explain p:first-child{
        margin-bottom: 1rem;
      }
      .user-explain p {
        color: #aaa;
        font-size: .6rem;
        margin-left: 1.5rem;
      }
    }
    h3{
      color: #444;
      text-align: center;
      font-size: .85rem;
      span{
        font-size: .75rem;
      }
    }
  }
</style>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  export default {
    data () {
      return {
        scrollerHeight: '0px'
      }
    },
    ready () {
    this.setScrollerHeight()
    },
    components: {
      IctTitlebar,
      Scroller
    },
    methods: {
      goToIndexPage () {
      this.$route.router.go('/main')
    },
      gotoBookDetails () {
      this.$route.router.go('/giftPackage/newerBookDetails')
    },
      setScrollerHeight () {
        // 设置滚动条高度为 页面高度-titlebar高度-tabbar高度
        const me = this
        const {titlebar} = this.$els
        me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight) + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 150)
    }
  }
}
</script>
