/**
* Created by jun on 2016/9/29.

@example
<pay-toubi :value="100"></pay-toubi>

*/
<template>
  <div class="pay-toubi" v-if="isShow">
    使用投币{{value}}抵用￥{{value}}
  </div>
</template>
<script>
  export default {
    props: {
      value: Number
    },
    computed: {
      isShow () {
        if (this.value > 0) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>
<style lang="less">
  .pay-toubi{
    height: 88/40rem;
    line-height: 88/40rem;
    padding: 0 36/40rem 0 24/40rem;
    text-align: left;
    font-size: 30/40rem;
    color: #000;
    background: #fff;
  }
</style>
