/**
titlebar
@example
  <!--<ict-titlebar :right-options="rightOptions">
    意见反馈
    <a slot="right" v-touch:tap="isShow">提交</a>
  </ict-titlebar>-->

  rightOptions: {
    disabled: true,
    callback: this.doSave
  }
**/
<template>
  <div>
    <div style="height: 20px;background-color: #00b0f0" v-show="isIos"></div>
    <!--<div class="ict-titlebar" style="height: 44px">-->
    <div class="ict-titlebar">
      <div class="ict-titlebar-left" v-touch:tap="leftTapCallback">
        <div class="left-arrow" v-show="isBackShow"></div>
        <slot name="left" ></slot>
      </div>

      <h1 class="ict-titlebar-title" ><span v-show="title" :transition="transition">{{ title }}</span><slot></slot></h1>

      <div class="ict-titlebar-right" v-touch:tap="rightTapCallback" v-bind:class="{'disabled': isRightDisabled}">
        <slot name="right" ></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { Device, platformMap } from '../plugin/device'
  export default {
    props: {
      title: String,
      leftOptions: {
        type: Object,
        callback: Function,
        disabled: Boolean,
        showBack: Boolean
      },
      rightOptions: {
        type: Object,
        callback: Function,
        disabled: Boolean
      }
    },

    data () {
      return {
        isIos: Device.platform === platformMap.IOS
      }
    },

    computed: {
      isBackShow () {
        return this.leftOptions ? this.leftOptions.showBack : true
      },
      isRightDisabled () {
        return this.rightOptions ? this.rightOptions.disabled : true
      }
    },

    methods: {
      /**
       * 左侧按钮的回调
       */
      leftTapCallback () {
        this.$emit('back')
        if (this.leftOptions && this.leftOptions.callback) {
          this.leftOptions.callback()
        } else {
          if (parseInt(window.sessionStorage.getItem('count')) <= 1) {
            this.$route.router.go('/main')
          } else {
            window.history.back()
          }
        }
      },
      /**
       * 右侧按钮的回调
       */
      rightTapCallback () {
        if (!(this.rightOptions ? this.rightOptions.disabled : true)) {
          if (this.rightOptions && this.rightOptions.callback) {
            this.rightOptions.callback()
          }
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/styles/color.less";

  .ict-titlebar {
    position: relative;
    box-sizing: border-box;
    height: 44px;
    line-height: 44px;
    background-color: #00b0f0;
    &-left,&-right{
      position: absolute;
      top: 0;
      display: block;
      padding: 0 0.6rem;
      font-size: 14px;
      color: #fff;
    }
    &-left{
      left: 0;
    }
    &-right{
      right: 0;
    }
    &-right.disabled{
      color: #bbb;
    }
    .left-arrow{
      display: inline-block;
      position: relative;
      width: 1rem;
      height: 1rem;
      vertical-align: middle;
      &:before{
        width: 12px;
        height: 12px;
        position: absolute;
        left: 8px;
        top: 2px;
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
        -webkit-transform: rotate(315deg);
        transform: rotate(315deg);
        content: "";
      }
    }
    &-title{
      margin: 0;
      text-align: center;
      font-size: 34/40rem;
      font-weight: 400;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
    }
  }

</style>
