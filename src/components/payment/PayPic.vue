/**
 * Created by jun on 2016/10/20.
 *
 */
<template>
    <div class="pay-pic" v-if="show">
      <img :src="pic">
    </div>
</template>
<script>
export default {
  props: {
    show: Boolean,
    pic: String
  }
}
</script>
<style lang="less">
  .pay-pic{
    height: 420/40rem;
    line-height: 420/40rem;
    text-align: center;
    background: #fff;
    img{
      width: 470/35rem;
      height: 306/35rem;
      vertical-align: middle;
    }
  }
</style>
