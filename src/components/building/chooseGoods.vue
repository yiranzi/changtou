<template>
  <div>
    {{componentData}}
  </div>
  <div>
    {{itemId}}
  </div>
  <div>
    {{componentData.maxGoodsNum}}
  </div>
  <div>
    {{componentData.useGoodsNum}}
  </div>
  <div  v-touch:tap="onChooseGood">返回玩家选择</div>
</template>
<style>
</style>
<script>
    export default {
      data () {
          return {
              choose: 1
          }
      },
      props: {
        componentData: Object
      },
//

      computed: {
          'itemId': function () {
            return this.componentData.itemId
          }
      },
      methods: {
        onChooseGood () {
          this.$dispatch('ChangeGoods', this.choose)
        }
      },
      components: {

      }

    }
</script>
