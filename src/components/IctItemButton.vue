/**
 * Created by jun on 2016/9/1.
 * 类似个人中心 的条目 按钮
 */
<template>
  <div class="ict-item" :disabled="disabled" :class="{'ict-item-disabled': disabled}" v-touch:tap="onClick">
    <div class="ict-item-title">
      <p>
        {{title}}
        <slot name="after-title"></slot>
        <slot name="badge"></slot>
      </p>
    </div>
    <div class="ict-item-value with-arrow" >
      {{value}}
      <slot name="value"></slot>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    value: [String, Number],
    isLink: String,
    disabled: Boolean,
    primary: {
      type: String,
      default: 'title'
    },
    link: {
      type: [String, Object]
    }
  },
  methods: {
    onClick () {
      if (!this.disabled) {
        this.$route.router.go(this.link)
      }
    }
  }
}
</script>
<style lang="less">
  @height-ict-item: 2.2rem;
  @size-ict-item-title-font: 0.7rem;
  @size-ict-item-value-font: 0.6rem;

  @color-ict-item-normal-background: #fff;

  @color-ict-item-normal-font: #000;
  @color-ict-item-disabled-font: #ddd;
  @color-ict-item-value-font: #898989;

  .ict-item{
    height: @height-ict-item;
    position: relative;
    display: flex;
    align-items: center;
    line-height: @height-ict-item;
    padding: 0 0.6rem 0 1.2rem;
    background: @color-ict-item-normal-background;
    .ict-item-title{
      flex: 1;
      text-align: left;
      font-size: @size-ict-item-title-font;
      color: @color-ict-item-normal-font;
    }
    .ict-item-value{
      flex: 1;
      text-align: right;
      padding-right: 1rem;
      font-size: @size-ict-item-value-font;
      color: @color-ict-item-value-font;
    }
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #ccc;
      color: #ccc;
      transform-origin: 0 100%;
      transform: translate3d(1rem, 0, 0) scaleY(0.5);
    }
  }

  .ict-item-value.with-arrow:after {
    content: " ";
    display: inline-block;
    transform: rotate(45deg);
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: @color-ict-item-value-font;
    border-style: solid;
    position: absolute;
    right: 1rem;
    top: 0.9rem;
    margin-left: .3em;
  }

  .ict-item-disabled{
    background: @color-ict-item-normal-background;
    .ict-item-title{
      color: @color-ict-item-disabled-font;
    }
    .ict-item-value.with-arrow:after {
      border-color: @color-ict-item-disabled-font;
    }
  }
</style>
