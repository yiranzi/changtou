/**
 * Created by jun on 2016/10/27.
 *
 */
<template>
  <div class="ict-actionsheet">
    <div class="ict_actionsheet_mask"
         :class="{'ict_actionsheet_fade_toggle': show}"
         :style="{display: show ? 'block' : 'none'}"
         v-touch:tap="onCloseTap"></div>
    <div class="ict_actionsheet" :class="{'ict_actionsheet_toggle': show}">
      <div class="ict_actionsheet_title">{{title}}<span class="close-icon" v-touch:tap="onCloseTap"></span></div>
      <slot></slot>
      <div class="ict_actionsheet_confirm" v-touch:tap="onConfirmTap">{{btnText}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: String,
    btnText: String
  },
  watch: {
    show (val) {
      if (val) {
        this.fixIos(-1)
      } else {
        var me = this
        setTimeout(() => {
          me.fixIos(100)
      }, 200)
      }
    },
    beforeDestroy () {
      this.fixIos(100)
    }
  },
  methods: {
    /**
     * 点击 关闭按钮
     */
    onCloseTap () {
      this.show = false
      this.$emit('close')
    },
    /**
     * 点击确认支付
     */
    onConfirmTap () {
      this.show = false
      this.$emit('confirm')
    },
    /**
     * iOS兼容处理
     */
    fixIos (zIndex) {
      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
        this.$tabbar.style.zIndex = zIndex
      }
    }
  }
}
</script>
<style lang="less">
  .ict-actionsheet{
    .ict_actionsheet_mask {
      display: none;
      position: fixed;
      z-index: 1000;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0,0,0,.6);
    }

    .ict_actionsheet{
      position: fixed;
      left: 0;
      bottom: 0;
      -webkit-transform: translateY(100%);
      transform: translateY(100%);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      z-index: 5000;
      width: 100%;
      background-color: #fff;
      -webkit-transition: -webkit-transform .3s;
      transition: transform .3s;

      //actionSheet aniamtion
      &_toggle{
        transform: translate(0, 0);
      }

      &_title{
        position: relative;
        height: 2.5rem;
        font-size: 0.85rem;
        color: #000;
        line-height: 2.5rem;
        text-align: center;
        .close-icon{
          &:before{
            position: absolute;
            width: 2.6rem;
            right: 0;
            text-align: center;
            font-family: 'myicon';
            content: '\e90d';
            font-size: 0.8rem !important;
          }
        }
      }

      &_title:before{
        content: " ";
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 0;
        border-bottom: 1px solid #f0eff5;
      }

      &_confirm {
        position: absolute;
        display: block;
        bottom: 0;
        width: 100%;
        height: 2.45rem;
        padding: 0;
        display: block;
        text-align: center;
        line-height: 2.45rem;
        background: #00b0f0;
        color: #fff;
        &:after {
          border: 0;
        }
      }
    }
  }
</style>
