<template>
    <div>
      <div v-touch:tap="showGrade">
        展示成绩
      </div>
      <div v-touch:tap="showChooseGift">
        选择礼物
      </div>
    </div>
</template>
<style>
</style>
<script>
    export default {
        data () {
            return {
              //这个是用户的回调
              choose: 0,
              //传给我的数据是一个数组
              goodsData: {
                itemId: 0,
                maxGoodsNum: 2,
                useGoodsNum: 0
              },
              goodsData: {
                grade: 5,
              }
            }
        },
        components: {},
      methods: {
        showGrade () {
          component: 'building/gradeToBuild.vue',
          componentData: this.goodsData,
          hideOnMaskTap: true,
          callbackName: 'ChangeGoods',
          callbackFn: this.ChangeGoods.bind(this) //组件上的
        }
        //选择完背景后的回调函数
        ChangeGoods (choose) {
          if (choose !== 0) {
              this.choose = choose
            console.log('用户选择的是' + this.choose)
          } else {
            console.log('用户没有选择')
          }
        },
        showGrade () {
          console.log('还没有成绩')
        },
        showChooseGift () {
          console.log('选择物品界面')
          this.showMask({
            component: 'building/chooseGoods.vue',
            componentData: this.goodsData,
            hideOnMaskTap: true,
            callbackName: 'ChangeGoods',
            callbackFn: this.ChangeGoods.bind(this) //组件上的
          })
        }
      }
    }
</script>
