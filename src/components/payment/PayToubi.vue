/**
* Created by jun on 2016/9/29.
  订单 投币

  @example
  <!--<pay-toubi :value="100"></pay-toubi>-->

*/
<template>
  <div class="pay-toubi" v-if="show">
    使用投币抵用￥{{value}}
  </div>
</template>
<script>
  export default {
    props: {
      value: Number
    },
    computed: {
      show () {
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
    margin-top: 0.5rem;
    padding: 0 36/40rem 0 24/40rem;
    text-align: left;
    font-size: 30/40rem;
    color: #000;
    background: #fff;
  }
</style>
