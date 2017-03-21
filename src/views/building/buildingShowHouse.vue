<template>
  <div>
    种类
    <input v-model="goodsData.itemId">
  </div>
  <div>
    当前等级
    <input v-model="goodsData.useGoodsNum">
  </div>
  <div>
    最高等级
    <input v-model="goodsData.maxGoodsNum">
  </div>
    <div>
      <div v-touch:tap="showGrade">
        展示成绩
      </div>
      <div v-touch:tap="showChooseGift">
        选择礼物
      </div>
    </div>
  <div v-if="goodsData.useGoodsNum == 0">
    <span class="have-used">已使用</span>
  </div>
  <div v-else>
    <div v-if="goodsData.maxGoodsNum >= 0">
      <span class="to-use">使用</span>
      <span>当前是{{goodsData.useGoodsNum}}</span>
    </div>
    <div v-else>
      <span>lock</span>
      <p>需要解锁</p>
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
              gradeData: {
                testType: '选择题',
                grade: 5
              }
            }
        },
        components: {},
      methods: {
        showGrade () {
          this.showMask({
            component: 'building/gradeToBuild.vue',
            componentData: this.gradeData,
            hideOnMaskTap: true,
            callbackName: 'goToBuild',
            callbackFn: this.goToBuild.bind(this) //组件上的
          })
        },
        goToBuild () {
          console.log('go to build now')
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
        },
        //选择完背景后的回调函数
        ChangeGoods (choose) {
          if (choose !== 0) {
            this.choose = choose
            console.log('用户选择的是' + this.choose)
          } else {
            console.log('用户没有选择')
          }
        }
      }
    }
</script>
