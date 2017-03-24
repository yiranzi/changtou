<template>
  <div class="grade-to-build">
    <div class="background">
      <div class="content">
        <p >恭喜你,{{componentData.testType}}{{componentData.grade}}分通过!</p>
      </div>
      <div class="buttonimg">
        <img src="../../assets/styles/image/homework/gradeResult/gradeBuildingButton.png" v-touch:tap="goToBuild">
      </div>

    </div>
  </div>
</template>
<style lang="less">
  .grade-to-build{
    .background{
      text-align: center;
      width: 10rem;
      height: 592/40rem;
      background: url("../../assets/styles/image/homework/gradeResult/gradeBuilding.png") center center no-repeat;
      background-size: cover;
      .content{
        position:absolute;
        top: 420/40rem;
        width: 100%;
        text-align: center;
        p{
          margin: 0;
          font-size: 24/40rem;
          color: #ff9800;
          font-weight: bold;
        }
      }
      .buttonimg{
        text-align: center;
        position:absolute;
        width: 100%;
        text-align: center;
        top: 12rem;
        img{
          width: 5rem;
          height: 70/40rem;
        }
      }
    }
  }
</style>
<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      componentData: Object
    },
    methods: {
      goToBuild () {
        this.$dispatch('goToBuild')
      }
    }
  }
</script>
