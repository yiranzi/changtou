<template>
    <div class="building-entry">
      <img class="entry" v-touch:tap="goToBuilding" src="../../../static/image/building/building-entry.png">
    </div>
</template>
<style lang="less">
  .building-entry{
    .entry{
      position: fixed;
      right: 1rem;
      bottom: 3rem;
      width: 98/40rem;
      height: 98/40rem;
    }
  }
</style>

