<template>
  <div v-touch:tap="closeMask">
    <img src="../../../static/image/newerStrategy/shareFloatMask.png" style="height: 180%; width: 180%; margin: auto auto; display: block; margin-top: 10%; margin-left:-40%;"/>
  </div>
</template>
<style>
</style>
<script>
   export default {
     methods: {
       closeMask () {
         this.$dispatch('closeMask')
      }
   }
}
</script>
