<template>
  <div>
    <ict-titlebar v-el:titlebar>造房展示页面</ict-titlebar>
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
      <div v-touch:tap="showBuildingRule">
        查看规则
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
    <div class="entry"></div>
  </div>
</template>
<style>

</style>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
    export default {
        data () {
            return {
              //这个是用户的回调
              choose: 0,
              //传给我的数据是一个数组
              goodsData: {
                itemId: 2,
                maxGoodsNum: 1,
                useGoodsNum: 1
              },
              gradeData: {
                testType: '选择题',
                grade: 5
              }
            }
        },
        components: {
          IctTitlebar
        },
      methods: {
        showBuildingRule () {
          this.$route.router.go('/building/rule')
        },
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
        ChangeGoods (goodsData) {
          console.log('用户选择的是' + goodsData.useGoodsNum)
          console.log('用户的物品类别是' + goodsData.itemID)
        }
      }
    }
</script>
