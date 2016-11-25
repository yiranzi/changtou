<template>
    <div class="scroll-Container">
      <marquee class="scroll-Text"> {{ scrollText }}</marquee>
    </div>
</template>
<style>
</style>
<script>
    export default {
      data () {
        return {
          scrollText: '[公告] : 这是一条测试滚动公告 '
        }
      }
    }
</script>

<style>
    .scroll-Container{
      background: #fefef0;
      width: 100%;
      height : 1.75rem;
    }

    .scroll-Text{
      color : #f74f01;
      font-size: .65rem;
      width:100% !important;
      -webkit-animation: moveIn 6s infinite;
      line-height: 1.5rem;
      white-space:nowrap;
    }

</style>
