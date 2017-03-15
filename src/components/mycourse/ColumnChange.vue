<template>
    <div>
      <div>{{componentData}}</div>
      <div>{{componentData}}</div>
      <div>{{componentData}}</div>
      <div>{{123123}}</div>
      <ict-button v-touch:tap="onCloseTap">知道了</ict-button>
      <ict-button v-touch:tap="onContentChangeTap">去看看</ict-button>
    </div>
</template>
<style>
</style>
<script>
    import IctButton from '../IctButton.vue'
    export default {
      data () {
          return {}
      },
      components: {
        IctButton
      },
      methods: {
        onContentChangeTap () {
          this.$dispatch('onColumnChange')
        },
        onCloseTap () {
          this.$dispatch('hideMask')
        }
      },
      props: {
        componentData: String
      }
    }
</script>
