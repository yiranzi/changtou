/**
 * Created by jun on 2016/9/1.
 * 类似个人中心 的条目 按钮
 */
<template>
  <div class="ict-item" :disabled="disabled" :class="{'ict-item-disabled': disabled, 'ict-item-active': btnActive}" v-touch:tap="onClick">
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
  data () {
    return {
      btnActive: false //是否被点击
    }
  },
  methods: {
    onClick () {
      if (!this.disabled) {
        this.btnActive = true
        setTimeout(
          () => { this.btnActive = false },
          100
        )
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
    padding: 0 1rem;
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
      padding-right: 1.5rem;
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
      border-bottom: 1px solid #f0eff5;
      color: #ccc;
    }
  }
  .ict-item-active{
    background-color: #000;
    opacity: 0.3;
    color: #fff;
    .ict-item-title,.ict-item-value,&:after {
      color: #fff;
    }
  }

  .ict-item-value.with-arrow:after {
    content: " ";
    display: inline-block;
    transform: rotate(45deg);
    height: 12px;
    width: 12px;
    border-width: 1px 1px 0 0;
    border-color: @color-ict-item-value-font;
    border-style: solid;
    position: absolute;
    right: 1.5rem;
    top: 0.7rem;
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
