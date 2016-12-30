/**
*  专用于问卷调查的按钮，可以点击切换状态并且获取对应的选项ID :)
*/
<template>
  <div class="ict-item-questionnaire" :disabled="disabled" :class="{'ict-item-disabled': disabled, 'ict-item-active': btnActive}" v-touch:tap="onTap"
  :order="order" :option="option">
    {{title}}
  </div>
</template>
<script>
export default {
  props: {
    disabled: Boolean,
    title: String,
    order: String,
    option: String,
    btnActive: Boolean
  },
  methods: {
    onTap () {
      this.btnActive = !this.btnActive
      if (!this.btnActive) {
        this.$dispatch('reduceActiveList', this.option)
      } else {
        this.$dispatch('addActiveList', this.option)
      }
    }
  }
}
</script>
<style lang="less">
  .ict-item-questionnaire{
    color: #666;
    height: .8rem;
    border-radius: .675rem;
    border: 1px solid #eee;
    padding: .2rem .3rem;
    margin-right: .5rem;
    display: inline-block;
    line-height: .8rem;
  }
  .ict-item-active{
    color: white;
    background: #00b0f0;
  }
</style>
