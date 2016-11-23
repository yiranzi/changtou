/**
 * Created by jun on 2016/8/31.
 * 按钮
 * type: default, 默认按钮
          string, 无背景文字按钮
          title, titlebar上的按钮
          mini, 和input在同一行的按钮
 */
<template>
  <button  class="ict-btn" :class="classes" :disabled="disabled">
    {{text}}<slot></slot>
  </button>
</template>
<script>
  export default {
    props: {
      type: {
        default: 'default'
      },
      disabled: Boolean,
      text: String
    },
    computed: {
      classes () {
        return [
          {
            'ict-btn-disabled': this.disabled
          },
          `ict-btn-${this.type}`
        ]
      }
    }
  }
</script>
<style lang="less">
  @height-ict-button: 2.2rem;
  @font-ict-button: 0.9rem;
  @radius-ict-border: 5px;

  //background color
  @color-default-normal-background: #00b0f0;
  @color-default-disabled-background: #ddd;
  @color-default-pressed-background: #007ba8;
  @color-title-button-background: transparent;
  @color-string-button-background: transparent;

  //font color
  @color-default-normal-text-color: #fff;
  @color-default-disabled-text-color: #b5b5b5;
  @color-default-pressed-text-color: #898989;

  @color-string-normal-text-color: #00b0f0;
  @color-string-disabled-text-color: #bbb;
  @color-string-pressed-text-color: #007ba8;

  .ict-btn {
    position: relative;
    width: 100%;
    height: @height-ict-button;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    font-size: @font-ict-button;
    text-align: center;
    text-decoration: none;
    border: 0;
    border-radius: @radius-ict-border;
    overflow: hidden;
    color: @color-default-normal-text-color;
    background-color: @color-default-normal-background;

    &:not(.ict-btn-disabled):visited {
      color: @color-default-pressed-text-color;
    }
    &:not(.ict-btn-disabled):active {
      color: @color-default-pressed-text-color;
      background-color: @color-default-pressed-background;
    }
  }

  &.ict-btn-mini {
    display: inline-block;
  }

  //default btn
  .ict-btn-default {
    color: @color-default-normal-text-color;
    background-color: @color-default-normal-background;

    &:not(.ict-btn-disabled):visited {
      color: @color-default-pressed-text-color;
    }
    &:not(.ict-btn-disabled):active {
      color: @color-default-pressed-text-color;
      background-color: @color-default-pressed-background;
    }
  }

  //string btn
  .ict-btn-string {
    color: @color-string-normal-text-color;
    background-color: @color-string-button-background;

    &:not(.ict-btn-disabled):visited {
      color: @color-string-pressed-text-color;
      background-color: @color-string-button-background;
    }
    &:not(.ict-btn-disabled):active {
      color: @color-string-pressed-text-color;
      background-color: @color-string-button-background;
    }
  }

  //title btn
  .ict-btn-title {
    color: @color-default-normal-text-color;
    background-color: @color-title-button-background;

    &:not(.ict-btn-disabled):visited {
      color: @color-default-pressed-text-color;
      background-color: @color-title-button-background;
    }
    &:not(.ict-btn-disabled):active {
      color: @color-default-pressed-text-color;
      background-color: @color-title-button-background;
    }
  }

  //disabled
  .ict-btn-disabled {
    &.ict-btn-default{
      color: @color-default-disabled-text-color;
      background-color: @color-default-disabled-background;
    }
    &.ict-btn-string {
      color: @color-string-disabled-text-color;
      background-color: @color-string-button-background;
    }
    &.ict-btn-title {
      color: @color-default-disabled-text-color;
      background-color: @color-title-button-background;
    }
  }

  button, input {
    &.ict-btn {
      width: 100%;
      border-width: 0;
      outline: 0;
      -webkit-appearance: none;
      &:focus {
        outline: 0;
      }
    }
    &.ict-btn-inline,&.ict-btn-mini {
      width: auto;
    }
  }
</style>
