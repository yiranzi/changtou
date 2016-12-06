<template>
    <div @='loadingClose'>
      <img src="../assets/styles/image/ajax/update.jpg" style="height: 180%; width: 180%; margin: auto auto; display: block; margin-top: 10%; margin-left:-40%;"/>
    </div>
</template>
<style>
</style>
<script>
   export default {
    methods: {
    loadingClose () {
        this.$dispatch('loadingClose')
      }
}
}
</script>
