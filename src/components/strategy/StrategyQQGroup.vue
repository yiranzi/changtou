<template>
      <div class="group-number-container" v-if="groupNumber">
        <span class="group-number">长投宝官方群 ：</span>
        <span class="group-number">{{groupNumber}}</span>
      </div>
</template>
<style>
</style>
<script>
  export default {
      props: {
        groupNumber: String
      }
  }
</script>
<style>
  .group-number-container{
    height : 35px;
    margin-left:10px;
  }
  .group-number{
    font-size: 0.65rem;
    color: #000000;
    line-height : 35px;
  }
</style>
