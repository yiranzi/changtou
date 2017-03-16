<template>
  <div>
    {{itemId}}
  </div>
  <div>
    {{goodsData.maxGoodsNum}}
  </div>
  <div>
    {{goodsData.useGoodsNum}}
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
      props: [
        'goodsData'
      ],
      computed: {
          'itemId': function () {
            return this.goodsData.itemId
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
