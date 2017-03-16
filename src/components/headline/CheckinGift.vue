/**
* Created by zyr on 2017/3/11.
*  签到礼物
*/
<template>
  <img src="../../../static/image/headline/checkin-gift.png" style="width: 12rem;height: 16.25rem" v-touch:tap="onCloseTap">
</template>
<script>
  export default {
    methods: {
      onCloseTap () {
        this.$dispatch('hideMask')
      }
    }
  }
</script>
