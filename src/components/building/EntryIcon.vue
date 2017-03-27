<template>
    <div class="building-entry-icon">
      <img class="entry-icon" v-touch:tap="goToBuilding" src="../../../static/image/building/building-entry-icon.png">
    </div>
</template>
<style lang="less">
  .building-entry-icon{
    .entry-icon{
      position: fixed;
      right: 1rem;
      bottom: 3rem;
      width: 98/40rem;
      height: 98/40rem;
    }
  }
</style>

