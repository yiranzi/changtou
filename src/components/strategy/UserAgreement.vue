/**
* 用户协议
*
*/
<template>
  <div class="user-agreement" v-el:agreement>
    <div class="user-agreement-title" v-el:title>用户协议<span class="close-icon" v-touch:tap="onCloseTap"></span></div>
    <scroller :scrollbar-y="true" :lock-x="true" :height.sync="scrollerHeight" v-ref:scroller>
      <div class="user-agreement-content">
        <p v-for="item in agreement">{{item}}</p>
      </div>
    </scroller>
    <ict-button class="user-agreement-agree" v-touch:tap="onAgreeTap" v-el:agree>同意</ict-button>
  </div>
</template>
<style lang="less">
  .user-agreement {
    width: 620/40rem;
    height: 908/40rem;
    background: #fff;
    border-radius: 10px;
    p {
      margin: 0;
    }
    &-title {
      position: relative;
      height: 3.25rem;
      border-radius: 10px 10px 0 0;
      background: #f8f8f8;
      line-height: 3.25rem;
      text-align: center;
      font-size: .8rem;
      color: #444;
      .close-icon {
        position: absolute;
        display: inline-block;
        top: 0;
        right: 0;
        line-height: 2.25rem;
        &:before {
          padding: .75rem;
          box-sizing: border-box;
          line-height: 2.25rem;
          font-family: 'myicon';
          content: '\e90d';
          font-size: .75rem !important;
          color: #aaa;
        }
      }
    }
    &-content {
      padding: 1rem;
      background: #fff;
      font-size: .6rem;
      color: #898989;
      box-sizing: content-box;
      p {
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
<script>
  import IctButton from '../IctButton.vue'
  import Scroller from 'vux/scroller'
  export default{
    data () {
      return {
        scrollerHeight: '0px',
        agreement: [
          '1.用户协议1',
          '2.用户协议2',
          '3.用户协议3',
          '4.用户协议4',
          '5.用户协议5'
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

      /**
       * 协议同意
       */
      onAgreeTap () {
        this.$dispatch('onAgreeTap')
      },

      /**
       * 关闭浮层
       */
      onCloseTap () {
        this.$dispatch('hideMask')
      }
    },
    components: {
      IctButton,
      Scroller
    }
  }
</script>
