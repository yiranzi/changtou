/**
 * Created by jun on 2016/10/27.
 *
 */
<template>
    <ict-sheet title="课后作业" :show="show" btn-text="开始测试" @confirm="onConfirmTap" @close="onClose">
      <div class="choice-float">
        <span class="float-icon"></span>
        <div class="float-content">
          <p>课后测试</p>
          <div class="space"></div>
          <p>听完课，快来测测自己的掌握程度吧~</p>
          <p>通过测试即可前往学习下一课哦！</p>
          <div class="space"></div>
          <p>通过后还可前往知识点巩固，</p>
          <p>加深对知识点的理解和掌握程度呢~</p>
        </div>
      </div>
    </ict-sheet>
</template>
<script>
  import IctSheet from '../../components/IctActionSheet.vue'
export default {
  props: {
    show: Boolean
  },
  methods: {
    onClose () {
      this.$emit('close')
    },
    onConfirmTap () {
      this.show = false
      this.$emit('confirm')
      this.$route.router.go('/choice/answer')
    }
  },
  components: {
    IctSheet
  }
}
</script>
<style lang="less">
  .choice-float{
    position: relative;
    .float-icon:before{
      position: absolute;
      top: 0.85rem;
      left: 1rem;
      font-family: 'myicon';
      content: '\e920';
      font-size: 1.5rem !important;
    }
    .float-content{
      padding: 0.85rem 3rem 2.5rem;
      font-size: 0.65rem;
      color: #656565;
      margin-bottom: 2.2rem;
      .space{
        width: 100%;
        height:1.25rem;
      }
      p{
        margin: 0;
      }
    }
  }
</style>
