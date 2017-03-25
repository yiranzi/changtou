<template>
  <div class="building-show">
    <div class="building-show-title" v-el:titlebar>
      <div class="building-show-close" v-touch:tap="onCancel"></div>
      造房计划
      <div class="building-show-rule" v-touch:tap="goToBuildingRule">攻略</div>
    </div>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div>
        <div class="building-show-entirety" v-bind:style="{ height: buildingHeight + 'rem' }">
          <div class="building-show-house-bg" v-if="usedGoodsCount >= 2">
            <img src="../../../static/image/building/building-show-house-bg.png" style="width: 100%;">
          </div>
          <div class="building-show-single" v-bind:class="[item.buildingClass, item.isUsed ? noBorder : '']" v-for="item in courseBuilding" v-show="$index < studyCourseCount" >
            <img v-bind:src="item.buildingPic" style="width: 100%;">
            <div class="building-show-goods-state" v-if="item.isUnlocked === 0">
              <img src="../../../static/image/building/building-show-locked.png" style="width: 100%;">
            </div>
          </div>
        </div>
        <div class="building-show-article" v-for="article in sdutyArticle" v-show="$index === (studyCourseCount - 1) && !subjectGraduation">
          <div class="building-show-article-title">{{article.pointTitle}}</div>
          <div class="building-show-article-content">在股票投资初级课•造房计划中，根据第<span>{{article.courseIndex}}</span>课的作业情况，将有机会选择你心仪的<span>{{article.buildingText}}</span>哦~~</div>
          <div class="building-show-unlocked-artilce" v-if="studyCourseCount === 1">解锁物品规则：<br>选择题3/4分——解锁初级物品<br>选择题5分/问答题3分——解锁中级物品<br>问答题4/5分——解锁高级物品</div>
        </div>
        <div class="building-show-graduation-article" v-show="subjectGraduation">
          <div>恭喜你！</div>
          <div class="building-show-graduation-article-wrap">经过不懈努力，通过了初级课！</div>
          <div>怎么样，对自己的结果，你还满意吗？</div>
          <div>更多有趣内容即将解锁，期待你的到来！</div>
        </div>
        <div class="start-study-btn" v-if="showStartStudy" v-touch:tap="goToStudy">开始学习</div>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .building-show{
    background: #fff;
    .building-show-title{
      text-align: center;
      line-height: 84/40rem;
      color: #666;
      font-size: 34/40rem;
      padding: 1.2rem 0 46/40rem;
      position: relative;
      .building-show-close {
        width: 2rem;
        height: 2rem;
        position: absolute;
        left: 0.4rem;
      }
      .building-show-close:before {
        width: 0.8rem;
        line-height: 0.8rem;
        font-family: 'myicon';
        content: '\e90d';
        font-size: 0.8rem;
        text-align: center;
        color: #aaa;
      }
      .building-show-rule{
        font-size: 28/40rem;
        color: #888;
        line-height: 84/40rem;
        position: absolute;
        top: 1.2rem;
        right: 0.8rem;
      }
    }
    .building-show-entirety{
      overflow: hidden;
      position: relative;
      .building-show-house-bg{
        width: 630/40rem;
        height: 206/40rem;
        margin-left: -315/40rem;
        position: absolute;
        left: 50%;
        top: 338/40rem;
      }
      .building-show-single{
        width: 750/40rem;
        height: 300/40rem;
        box-sizing: border-box;
        border: 6/40rem #ccc dashed;
        overflow: hidden;
        display: flex;
        align-items:center;
        justify-content: center;
        position: absolute;
        .building-show-goods-state{
          width: 66/40rem;
          height: 128/40rem;
          position: absolute;
          display: flex;
          align-items:center;
          justify-content: center;
        }
      }
      .building-show-single-no-border{
        border: none;
      }
      .building-show-single-location{
        top: 0;
      }
      .building-show-single-house{
        width: 360/40rem;
        height: 260/40rem;
        margin-left: -180/40rem;
        top: 130/40rem;
        left: 50%;
      }
      .building-show-single-butler{
        width: 100/40rem;
        height: 220/40rem;
        top: 311/40rem;
        left: 224/40rem;
      }
      .building-show-single-pet{
        width: 130/40rem;
        height: 130/40rem;
        top: 402/40rem;
        left: 108/40rem;
      }
      .building-show-single-transportation{
        width: 310/40rem;
        height: 130/40rem;
        top: 402/40rem;
        left: 416/40rem;
      }
      .building-show-single-sight{
        width: 750/40rem;
        height: 140/40rem;
        top: 570/40rem;
      }
    }
    .building-show-article{
      padding: 0 70/40rem 0;
      margin: 60/40rem 0 80/40rem;
      font-size: 26/40rem;
      color: #666;
      .building-show-article-content{
        margin: 60/40rem 0;
      }
      .building-show-unlocked-article{
        color: #888;
      }
    }
    .building-show-graduation-article{
      padding: 0 70/40rem 0;
      margin: 60/40rem 0 80/40rem;
      font-size: 26/40rem;
      color: #666;
      text-align: center;
      .building-show-graduation-article-wrap{
        margin-bottom: 60/40rem;
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
  import {buildingActions, courseRecordActions} from '../../vuex/actions'
  import Scroller from 'vux/scroller'
  import {userGetters, courseRecordsGetters, choiceGetters, buildingGetters} from '../../vuex/getters'
  import {setLocalCache} from '../../util/cache'

  export default {
    vuex: {
      actions: {
        loadAllExpenseRecords: courseRecordActions.loadAllExpenseRecords,
        getBuildingGoodsStatus: buildingActions.getBuildingGoodsStatus,
        updataBuildingGoodsStatus: buildingActions.updataBuildingGoodsStatus
      },
      getters: {
        isLogin: userGetters.isLogin,
        expenseRecordsArr: courseRecordsGetters.expenseRecords,
        report: choiceGetters.report,
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
        currSubjectStatus: {}, // 初级课程的状态 (有则购买，为空则未购买)
        studyCourseCount: 1, // 可学课程数(从1开始)
        subjectGraduation: false, // 初级课程是否毕业
        usedGoodsCount: 0, // 使用物品的个数
        showStartStudy: true, // 显示开始学习按钮
        noBorder: 'building-show-single-no-border', // 已使用去掉边框
        courseBuilding: [
          {buildingClass: 'building-show-single-location', buildingPic: './static/image/building/building-show-locked-1-1.png', isUnlocked: 0, isUsed: 0},
          {buildingClass: 'building-show-single-house', buildingPic: './static/image/building/building-show-locked-2-1.png', isUnlocked: 0, isUsed: 0},
          {buildingClass: 'building-show-single-butler', buildingPic: './static/image/building/building-show-locked-3-1.png', isUnlocked: 0, isUsed: 0},
          {buildingClass: 'building-show-single-pet', buildingPic: './static/image/building/building-show-locked-4-1.png', isUnlocked: 0, isUsed: 0},
          {buildingClass: 'building-show-single-transportation', buildingPic: './static/image/building/building-show-locked-5-1.png', isUnlocked: 0, isUsed: 0},
          {buildingClass: 'building-show-single-sight', buildingPic: './static/image/building/building-show-locked-6-1.png', isUnlocked: 0, isUsed: 0}
        ], // 课程建筑(1表示已解锁或者被使用,0表示未解锁或者未使用)
        sdutyArticle: [ // 开始学习课程文案
          {courseIndex: '一', buildingText: '造房地段', pointTitle: '造房最重要的呢是什么？'},
          {courseIndex: '二', buildingText: '房屋大小', pointTitle: '位置是有了，但你的房屋会有多大呢？'},
          {courseIndex: '三', buildingText: '管家人选', pointTitle: '这么漂亮的房子，怎么能没人打理呢？'},
          {courseIndex: '四', buildingText: '小宠物', pointTitle: '房子越来越热闹了有木有？！'},
          {courseIndex: '五', buildingText: '交通工具', pointTitle: '有钱人的标配还差了什么？没错！就是车子！'},
          {courseIndex: '六', buildingText: '景观绿化', pointTitle: '房子周围光秃秃的，一点都不美观嘛！'}
        ],
        selectArticle: [  // 选择物品课程文案
          {courseIndex: '一', pointTitle: ['买房最重要的是什么？location！location！location！', '万事开头难，好的地段是决定你房屋价值的重要指标？']},
          {courseIndex: '二', pointTitle: ['位置是有了，但你的房屋会有多大呢？', '你是想住一栋三层别墅，还是一间胶囊公寓？']},
          {courseIndex: '三', pointTitle: ['这么漂亮的房子，怎么能没人打理呢？', '是时候彰显一下你的身份了！且看看你这一课的表现，能让你雇佣一个什么样的管家吧！']},
          {courseIndex: '四', pointTitle: ['房子越来越热闹了有木有？！', '这次将迎来一个新的小伙伴——你的宠物。猜一猜，你的房子里，会有一个什么样的小动物呢？']},
          {courseIndex: '五', pointTitle: ['有钱人的标配还差了什么？没错！就是车子！', '来看看你的成绩，能带给你一辆什么样的座驾吧！']},
          {courseIndex: '六', pointTitle: ['有树，可以遮天蔽日，休憩乘凉；', '有花，可以释放芬芳，沁人心脾；', '那么，你的“小窝”会有什么样的绿化美景呢？']}
        ]
      }
    },

    computed: {
      buildingHeight () {
        if (this.studyCourseCount === 1) {
          return '7.5'
        } else if (this.studyCourseCount === 2 || this.studyCourseCount === 3 || this.studyCourseCount === 4 || this.studyCourseCount === 5) {
          return '14'
        } else if (this.studyCourseCount === 6) {
          return '17.75'
        }
      }
    },

    methods: {
      /**
       * 显示课程状态
       **/
      showSubjectStatus () {
        // 初始化(默认样式)
        let goodsInitial = [
            {maxGoodsNum: 0, useGoodsNum: 0},
            {maxGoodsNum: 0, useGoodsNum: 0},
            {maxGoodsNum: 0, useGoodsNum: 0},
            {maxGoodsNum: 0, useGoodsNum: 0},
            {maxGoodsNum: 0, useGoodsNum: 0},
            {maxGoodsNum: 0, useGoodsNum: 0}
          ]
        let subjectStatusInitial = 'I'
        this.subjectGraduation = false
        this.showGoodsStatus(goodsInitial, subjectStatusInitial)
        // 判断是否登录
        if (this.isLogin) { // 已登录
          // 判断购买状态
          this.loadAllExpenseRecords().then(() => {
            console.log(this.expenseRecordsArr, 'expenseRecordsArr')
            this.currSubjectStatus = this.expenseRecordsArr.find(subject => (subject.subjectId) === 4).lessonSet
            console.log(this.currSubjectStatus, 'lessonSet')
            if (this.currSubjectStatus) {  // 已购买
              //获取该课程状态信息
              this.getBuildingGoodsStatus(4).then(() => {
                let goods = this.buildingGoodsStatus
                console.log(goods)
                for (let i = 0; i < 6; i++) {
                  let goodsObj = {}
                  goodsObj.maxGoodsNum = 0
                  goodsObj.useGoodsNum = 0
                  if (!goods[i]) {
                    goods[i] = goodsObj
                  }
                }
                // 判断课程状态
                switch (this.currSubjectStatus.graduated) {
                  case 'I':
                    console.log('未激活')
                    //this.showGoodsStatus(goods)
                    this.studyCourseCount = 1
                    this.showStartStudy = true
                    break
                  case 'N':
                    console.log('在读')
                    this.showGoodsStatus(goods)
                    break
                  case 'P':
                    console.log('暂停')
                    this.showGoodsStatus(goods)
                    break
                  case 'E':
                    console.log('过期')
                    this.showGoodsStatus(goods)
                    break
                  case 'Y':
                    console.log('毕业')
                    this.showGoodsStatus(goods)
                    break
                  default:
                    break
                }
              })
            } else { // 未购买
              this.showBuyPoint()
            }
          })
        } else { // 未登录
          this.showLoginPoint()
        }
      },

      /**
       *  显示物品状态
       **/
      showGoodsStatus (goods) {
        let usedCount = 0  // 暂时记录使用的次数
        for (let i = 0; i < goods.length; i++) {
          this.courseBuilding[i].buildingPic = `./static/image/building/building-show-locked-${i + 1}-1.png`
          if (goods[i].maxGoodsNum !== 0) { // 物品已解锁
            this.courseBuilding[i].isUnlocked = 1
            this.courseBuilding[i].isUsed = 1
            if (goods[i].useGoodsNum !== 0) { // 物品已被用户选择使用
              this.courseBuilding[i].buildingPic = `./static/image/building/building-show-unlocked-${i + 1}-${goods[i].useGoodsNum}.png`
              usedCount += 1
              this.usedGoodsCount = usedCount
            } else { // 物品未被用户选择使用
              this.courseBuilding[i].buildingPic = `./static/image/building/building-show-unlocked-${i + 1}-${goods[i].maxGoodsNum}.png`
            }
          } else { // 物品未解锁
            this.courseBuilding[i].isUnlocked = 0
            this.courseBuilding[i].isUsed = 0
          }
        }
        if (usedCount === 6) { // 完成
          this.studyCourseCount = usedCount + 1
          this.subjectGraduation = true
          this.showStartStudy = false
        } else {
          this.studyCourseCount = usedCount + 1
          this.showStartStudy = true
        }
      },

      /**
       * 开始学习
       **/
      goToStudy () {
        setLocalCache('curr-course-status', {subjectStatusPoint: this.currSubjectStatus.graduated})
        this.$route.router.go('/subject/detail/P/4/0')
      },

      /**
       * 提示登录
       **/
      showLoginPoint () {
        const me = this
        const msg = '<p>已购买股票投资初级课的用户登录后可参加造房计划</p>'
        // 这里加入延迟是防止出现msg被点透的情况
        setTimeout(function () {
          me.showConfirm({
            title: '',
            message: msg,
            okText: '登录',
            cancelText: '再看看',
            okCallback: me.goToLogin.bind(me)
          })
        }, 100)
      },

      /**
       * 登录
       **/
      goToLogin () {
        this.$route.router.go('/entry')
      },

      /**
       * 提示购买
       **/
      showBuyPoint () {
        const me = this
        const activeHandler = function () {
          const path = `/pay-S-${4}`
          me.$route.router.on(path, {
            component: require('../pay/SubjectOrder.vue')
          })
          me.$route.router.go(path)
        }
        const msg = '<p>您尚未购买股票投资初级课，购买后可参加造房计划</p>'
        // 这里加入延迟是防止出现msg被点透的情况
        setTimeout(function () {
          me.showConfirm({
            title: '',
            message: msg,
            okText: '前往购买',
            cancelText: '再看看',
            okCallback: activeHandler
          })
        }, 100)
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
