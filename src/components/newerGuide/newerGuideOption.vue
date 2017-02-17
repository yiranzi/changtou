/**
*  专用于新手攻略的按钮，可以点击切换状态 :)
*/
<template>
  <div class="newer-guide-item" :disabled="disabled" :class="{'ict-item-disabled': disabled, 'newer-guide-item-active': btnActive}" v-touch:tap="onTap"
       :order="order" :option="option" :group="group">
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
    btnActive: Boolean,
    group: Array
  },
  methods: {
    onTap () {
      if (this.option === 'B' && this.group.indexOf('B') < 0) {
        if (this.group.indexOf('A') >= 0) {
          return
        }
      }
      if (this.option === 'A' && this.group.indexOf('A') < 0) {
        if (this.group.indexOf('B') >= 0) {
          return
        }
      }
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
  .newer-guide-item{
    color: #384879;
    height: .8rem;
    border-radius: 1rem;
    border: 1px solid #384879;
    padding: .4rem .6rem;
    margin-right: 1rem;
    display: inline-block;
    line-height: .8rem;
    background: #f2f0ea;
    font-size: .75rem;
    font-weight: bold;
  }
  .newer-guide-item-active{
    color: white;
    background: #00b0f0;
  }
</style>
