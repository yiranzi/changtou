<template>
    <div class="scroll-Container" v-if="text">
      <marquee class="scroll-Text">{{text}}</marquee>
    </div>
</template>

<script>
  export default {
    props: {
      text: String
    }
  }
</script>

<style>
    .scroll-Container{
      background: #fefef0;
      width: 100%;
      height : 35px;
    }

    .scroll-Text{
      color : #f74f01;
      font-size: .65rem;
      width:100% !important;
      -webkit-animation: moveIn 6s infinite;
      line-height: 35px;
      white-space:nowrap;
    }

</style>
