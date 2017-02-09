<template>
  <div v-touch:tap="closeMask" class="guide-book">
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
.guide-book{
  width: 632/40rem;
  height: 489/40rem;
  img{
    width: 632/40rem;
    height: 489/40rem;
  }
}
</style>
