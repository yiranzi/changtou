<template>
    <div class="scroll-Container">

      <marquee class="scroll-Test"> {{ scrollText }}</marquee>
    </div>
</template>
<style>
</style>
<script>
    export default {
      data () {
        return {
          scrollText: 'Attention Make American Great Againgsdfgdsgsdgsdgsdggsdgdsgsd '
        }
      },
      components: {

      }
    }
</script>

<style>
    .scroll-Container{
        background: #fefef0;
      width: 100%;
      height : 1.75rem;
    }

    .scroll-Test{
      color : #f74f01;
      font-size: .65rem;
      width:100% !important;
      line-height: 1.5rem;
      white-space:nowrap;
    }
  .scroll-Text{
     color : #f74f01;
    font-size: .65rem;
    width:100% !important;
    -webkit-animation: moveIn 6s infinite;
    line-height: 1.5rem;
    white-space:nowrap;
  }


  @-webkit-keyframes moveIn {
    0%{
        -webkit-transform: translateX(0);
    }
    23%{
       -webkit-transform: translateX(-20.375rem);
    }
       100% {
          -webkit-transform: translateX(20rem);   /* 6.66 */
       }
  }


</style>
