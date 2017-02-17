<template>
  <div v-touch:tap="closeMask" class="ebook2-detail-mask">
    <img src="../../../static/image/ebook/book2Mask.png"/>
  </div>
</template>
<script>
 export default {
   methods: {
     closeMask () {
       this.$dispatch('closeMask')
     }
   }
 }
</script>
<style lang="less">
.ebook2-detail-mask{
  width: 632/40rem;
  height: 489/40rem;
  img{
    width: 632/40rem;
    height: 489/40rem;
  }
}
</style>
