<template>
    <div v-touch:tap="onCloseGetGiftFailedMask">
      <img class="get-gift-failed-img" src="../../assets/styles/image/giftPackage/getGiftFailed.png"/>
    </div>
</template>

<script>
  export default {
    methods: {
      onCloseGetGiftFailedMask () {
        this.$dispatch('hideGetGiftFailedMask')
      }
    }
  }

</script>

<style style="less">

  .get-gift-failed-img {
    display: inline-block;
    width: 14rem;
    height: 19.5rem;
  }
</style>
