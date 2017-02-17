/**
 * Created by jun on 2017/2/10.
 * 电子书 阅读指南
 */
<template>
  <div v-touch:tap="onBookChapterTipMaskTap" class="book-chapter-tip-mask">
    <img src="../../../static/image/ebook/ebook-tip.png"/>
  </div>
</template>
<script>
export default {
  methods: {
    onBookChapterTipMaskTap () {
      this.$dispatch('bookChapterTipTap')
    }
  }
}
</script>
<style lang="less">
  .book-chapter-tip-mask{
    width: 573/40rem;
    height: 704/40rem;
    img{
      width: 573/40rem;
      height: 704/40rem;
    }
  }
</style>
