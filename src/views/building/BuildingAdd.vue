<template>
  <div class="building-add">
    <div class="building-add-title" v-el:titlebar>
      <div class="building-add-close" v-touch:tap="onCancel"></div>
      造房计划
      <div class="building-add-rule" v-touch:tap="goToBuildingRule">攻略</div>
    </div>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div>
        <div class="building-add-entirety" v-bind:style="{ height: buildingHeight + 'rem' }">
          <div class="building-add-house-bg" v-if="showHouseBackground">
            <img src="../../../static/image/building/building-show-house-bg.png" style="width: 100%;">
          </div>
          <div class="building-add-single" v-bind:class="[item.buildingClass, item.isUsed ? noBorder : '']" v-for="item in courseBuilding" v-show="item.isUnlocked === 1" v-touch:tap="goToSelectBuilding($index)">
            <img v-bind:src="item.buildingPic" style="width: 100%;">
            <div class="building-add-goods-state" v-if="item.isUsed === 0">
              <img src="../../../static/image/building/building-show-unlocked.png" style="width: 100%;">
            </div>
          </div>
        </div>
        <div class="building-add-article" v-for="article in selectArticle" v-show="$index === notUsedGoodsIndex">
          <div class="building-add-article-content">锵锵锵，恭喜你解锁了第<span>{{article.courseIndex}}</span>件物品<br>点击“+”为你的房子添砖加瓦吧</div>
          <div class="building-add-article-title">
            <span v-for="item in article.pointTitle">{{item}}<br></span>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .building-add{
    background: #fff;
    .building-add-title{
      text-align: center;
      line-height: 84/40rem;
      color: #666;
      font-size: 34/40rem;
      padding: 1.2rem 0 46/40rem;
      position: relative;
      .building-add-close {
        width: 2rem;
        height: 2rem;
        position: absolute;
        left: 0.4rem;
      }
      .building-add-close:before {
        width: 0.8rem;
        line-height: 0.8rem;
        font-family: 'myicon';
        content: '\e90d';
        font-size: 0.8rem;
        text-align: center;
        color: #aaa;
      }
      .building-add-rule{
        font-size: 28/40rem;
        color: #888;
        line-height: 84/40rem;
        position: absolute;
        top: 1.2rem;
        right: 0.8rem;
      }
    }
    .building-add-entirety{
      overflow: hidden;
      position: relative;
      .building-add-house-bg{
        width: 630/40rem;
        height: 206/40rem;
        margin-left: -315/40rem;
        position: absolute;
        left: 50%;
        top: 338/40rem;
      }
      .building-add-single{
        width: 750/40rem;
        height: 300/40rem;
        box-sizing: border-box;
        border: 6/40rem #ccc dashed;
        overflow: hidden;
        display: flex;
        align-items:center;
        justify-content: center;
        position: absolute;
        .building-add-goods-state{
          width: 66/40rem;
          height: 128/40rem;
          position: absolute;
          display: flex;
          align-items:center;
          justify-content: center;
        }
      }
      .building-add-single-no-border{
        border: none;
      }
      .building-add-single-location{
        top: 0;
      }
      .building-add-single-house{
        width: 360/40rem;
        height: 260/40rem;
        margin-left: -180/40rem;
        top: 130/40rem;
        left: 50%;
      }
      .building-add-single-butler{
        width: 100/40rem;
        height: 220/40rem;
        top: 311/40rem;
        left: 224/40rem;
      }
      .building-add-single-pet{
        width: 130/40rem;
        height: 130/40rem;
        top: 402/40rem;
        left: 108/40rem;
      }
      .building-add-single-transportation{
        width: 310/40rem;
        height: 130/40rem;
        top: 402/40rem;
        left: 416/40rem;
      }
      .building-add-single-sight{
        width: 750/40rem;
        height: 140/40rem;
        top: 570/40rem;
      }
    }
    .building-add-article{
      padding: 0 70/40rem 0;
      margin: 60/40rem 0 80/40rem;
      font-size: 26/40rem;
      color: #666;
      text-align: center;
      .building-add-article-content{
        margin: 60/40rem 0;
      }
      .building-add-unlocked-article{
        color: #888;
      }
    }
    .start-study-btn{
      width: 340/40rem;
      height: 80/40rem;
      background: #ff9800;
      border-radius: 1rem;
      margin: 0 auto;
      text-align: center;
      line-height: 80/40rem;
      color: #fff;
      font-size: 32/40rem;
    }
  }
</style>
<script>
  import IctCloseBtn from '../../components/IctCloseBtn.vue'
  import Scroller from 'vux/scroller'
  import {buildingActions} from '../../vuex/actions'
  import {buildingGetters} from '../../vuex/getters'

  export default {
    vuex: {
      actions: {
        getBuildingGoodsStatus: buildingActions.getBuildingGoodsStatus,
        updataBuildingGoodsStatus: buildingActions.updataBuildingGoodsStatus
      },
      getters: {
        buildingGoodsStatus: buildingGetters.buildingGoodsStatus,
        buildingUpdata: buildingGetters.buildingUpdata
      }
    },

    route: {
      data () {
        this.setScrollerHeight()
        // 显示课程状态
        this.showSubjectStatus()
      }
    },

    data () {
      return {
        scrollerHeight: '0px',
        buildingHeight: '7.5', // 整个building的高度
        unlockedCount: 1, // 解锁物品的个数
        notUsedGoodsIndex: 0, // 未使用并最先解锁的物品的index
        showHouseBackground: false, // 房子背景的显示
        noBorder: 'building-add-single-no-border', // 已使用去掉边框
        courseBuilding: [
          {buildingClass: 'building-add-single-location', buildingPic: './static/image/building/building-show-locked-1-1.png', isUnlocked: 1, isUsed: 0},
          {buildingClass: 'building-add-single-house', buildingPic: './static/image/building/building-show-locked-2-1.png', isUnlocked: 0, isUsed: 0},
          {buildingClass: 'building-add-single-butler', buildingPic: './static/image/building/building-show-locked-3-1.png', isUnlocked: 0, isUsed: 0},
          {buildingClass: 'building-add-single-pet', buildingPic: './static/image/building/building-show-locked-4-1.png', isUnlocked: 0, isUsed: 0},
          {buildingClass: 'building-add-single-transportation', buildingPic: './static/image/building/building-show-locked-5-1.png', isUnlocked: 1, isUsed: 0},
          {buildingClass: 'building-add-single-sight', buildingPic: './static/image/building/building-show-locked-6-1.png', isUnlocked: 0, isUsed: 0}
        ], // 课程建筑(1表示已解锁或者被使用,0表示未解锁或者未使用)
        selectArticle: [
          {courseIndex: '一', pointTitle: ['买房最重要的是什么？location！location！location！', '万事开头难，好的地段是决定你房屋价值的重要指标？']},
          {courseIndex: '二', pointTitle: ['位置是有了，但你的房屋会有多大呢？', '你是想住一栋三层别墅，还是一间胶囊公寓？']},
          {courseIndex: '三', pointTitle: ['这么漂亮的房子，怎么能没人打理呢？', '是时候彰显一下你的身份了！且看看你这一课的表现，能让你雇佣一个什么样的管家吧！']},
          {courseIndex: '四', pointTitle: ['房子越来越热闹了有木有？！', '这次将迎来一个新的小伙伴——你的宠物。猜一猜，你的房子里，会有一个什么样的小动物呢？']},
          {courseIndex: '五', pointTitle: ['有钱人的标配还差了什么？没错！就是车子！', '来看看你的成绩，能带给你一辆什么样的座驾吧！']},
          {courseIndex: '六', pointTitle: ['有树，可以遮天蔽日，休憩乘凉；', '有花，可以释放芬芳，沁人心脾；', '那么，你的“小窝”会有什么样的绿化美景呢？']}
        ]  // 选择物品课程文案
      }
    },

    computed: {
      buildingHeight () {
        if (this.unlockedCount === 1) {
          return '7.5'
        } else if (this.unlockedCount === 2 || this.unlockedCount === 3 || this.unlockedCount === 4 || this.unlockedCount === 5) {
          return '14'
        } else if (this.unlockedCount === 6) {
          return '17.75'
        }
      }
    },

    methods: {
      /**
       * 显示课程状态
       **/
      showSubjectStatus () {
        // 获取物品状态
        //this.getBuildingGoodsStatus(4).then(() => {
          //let goods = this.buildingGoodsStatus.goods
          let unlockedGoodsCount = 0
          let goods = [
            {maxGoodsNum: 1, useGoodsNum: 1},
            {maxGoodsNum: 3, useGoodsNum: 1},
            {maxGoodsNum: 2, useGoodsNum: 0},
            {maxGoodsNum: 0, useGoodsNum: 0},
            {maxGoodsNum: 0, useGoodsNum: 0},
            {maxGoodsNum: 0, useGoodsNum: 0}
          ]
          // 物品显示状态
          for (let i = 0; i < this.courseBuilding.length; i++) {
            this.courseBuilding[i].buildingPic = `./static/image/building/building-show-locked-${i + 1}-1.png`
            if (goods[i].maxGoodsNum !== 0) { // 物品已解锁
              this.courseBuilding[i].isUnlocked = 1
              if (goods[i].useGoodsNum !== 0) { // 物品已使用
                this.courseBuilding[i].isUsed = 1
                this.courseBuilding[i].buildingPic = `./static/image/building/building-show-unlocked-${i + 1}-${goods[i].useGoodsNum}.png`
                if (i === 1) {
                  this.showHouseBackground = true
                }
              } else { // 物品未使用
                this.courseBuilding[i].isUsed = 0
              }
              unlockedGoodsCount += 1
            } else { // 物品未解锁
              this.courseBuilding[i].isUnlocked = 0
            }
          }
          this.unlockedCount = unlockedGoodsCount
          // 找出未使用的最先的物品的index
          for (let i = 0; i < this.courseBuilding.length; i++) {
            if (goods[i].maxGoodsNum !== 0) { // 物品已解锁
              if (goods[i].useGoodsNum === 0) { // 物品已使用
                this.notUsedGoodsIndex = i
                break
              }
            }
          }
        //})
      },

      /**
       * 显示选择物品浮层
       **/
      goToSelectBuilding (index) {
        console.log(index)
        //const me = this
        /*
        let selectBuilding = {}
        // 获取物品状态
        this.getBuildingGoodsStatus(4).then(() => {
          selectBuilding.goodsType = index
          selectBuilding.maxGoodsNum = me.buildingGoodsStatus.goods[index].maxGoodsNum
          selectBuilding.useGoodsNum = me.buildingGoodsStatus.goods[index].useGoodsNum
          // 显示浮层
          me.showMask({
            component: 'ChooseGoods.vue',
            componentData: selectBuilding,
            callbackName: 'goToBuildingShow',
            callbackFn: this.goToBuildingShow.bind(this)
          })
        })
        */
      },

      /**
       * 去开始学习的展示页(使用物品)
       **/
      goToBuildingShow (index, useGoods) {
        this.getBuildingGoodsStatus(4).then(() => {
          let unlockedGoodsCount = 0 // 已解锁的物品数
          let usedGoodsCount = 0 // 已使用的物品数
          //let goods = this.buildingGoodsStatus.goods
          let goods = [
            {maxGoodsNum: 1, useGoodsNum: 1},
            {maxGoodsNum: 2, useGoodsNum: 1},
            {maxGoodsNum: 3, useGoodsNum: 0},
            {maxGoodsNum: 0, useGoodsNum: 0},
            {maxGoodsNum: 0, useGoodsNum: 0},
            {maxGoodsNum: 0, useGoodsNum: 0}
          ]
          //goods[index].useGoodsNum = useGoods
          // 获取解锁物品和使用物品个数
          for (let i = 0; i < goods.length; i++) {
            if (goods[i].maxGoodsNum !== 0) { // 物品已解锁
              if (goods[i].useGoodsNum !== 0) { // 物品已使用
                usedGoodsCount += 1
              }
              unlockedGoodsCount += 1
            }
          }
          if (usedGoodsCount === unlockedGoodsCount) {
            this.$route.router.go('/building/BuildingShow')
          } else {
            this.showSubjectStatus()
          }
          //this.updataBuildingGoodsStatus(4, goods)
        })
      },

      /**
       * 关闭页面
       **/
      onCancel () {
        window.history.back()
      },

      /**
       * 规则
       **/
      goToBuildingRule () {
        this.$route.router.go('/building/BuildingRule')
      },

      /**
       * 设置滚动高度
       */
      setScrollerHeight () {
        const me = this
        setTimeout(function () {
          me.scrollerHeight = window.document.body.offsetHeight + 'px'
          me.$nextTick(() => {
            me.$refs.scroller.reset({
              top: 0
            })
          })
        }, 300)
      }
    },

    components: {
      IctCloseBtn,
      Scroller
    }
  }
</script>
