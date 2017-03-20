<template>
  <div class="building-show">
    <div class="building-show-title" v-el:titlebar>
      <div class="building-show-close" v-touch:tap="onCancel"></div>
      造房计划
      <div class="building-show-rule">规则</div>
    </div>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div>
        <div class="building-show-entirety">
          <div class="building-show-single" v-bind:class="item.buildingClass" v-for="item in courseBuilding" v-if="$index <= currCourseIndex">
            <img v-bind:src="item.buildingPic" style="width: 100%;">
            <div class="building-show-goods-state" v-if="$index <= currCourseIndex">
              <img v-bind:src="$index < currCourseIndex ? item.unlocked : item.locked" style="width: 100%;">
            </div>
          </div>
        </div>
        <div class="building-show-point" v-for="article in courseArticle" v-if="$index === (currCourseIndex-1)">
          <div class="building-show-course-point-title">{{article.pointTitle}}</div>
          <div class="building-show-course-point-content">在股票投资初级课•造房计划中，根据<span>{{article.courseIndex}}</span>的作业情况，将有机会选择你心仪的<span>{{article.buildingText}}</span>哦~~</div>
          <div class="building-show-unlocked-point" v-if="showUnlockedPoint">解锁物品规则：<br>选择题3/4分——解锁初级物品<br>选择题５分/问答题３分——解锁中级物品<br>问答题４/5分——解锁高级物品</div>
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
      height: auto;
      max-height: 710/40rem;
      overflow: hidden;
      position: relative;
      .building-show-single{
        width: 750/40rem;
        height: 300/40rem;
        box-sizing: border-box;
        border: 6/40rem #ccc dashed;
        overflow: hidden;
        display: flex;
        align-items:center;
        justify-content: center;
        position: relative;
        .building-show-goods-state{
          width: 66/40rem;
          height: 128/40rem;
          position: absolute;
        }
      }
      .building-show-single-location{
        top: 0;
      }
      .building-show-single-house{
        width: 360/40rem;
        height: 260/40rem;
        margin: 0 auto;
        top: -170/40rem;
      }
      .building-show-single-butler{
        width: 100/40rem;
        height: 220/40rem;
        top: -240/40rem;
        left: 224/40rem;
      }
      .building-show-single-pet{
        width: 130/40rem;
        height: 130/40rem;
        top: -370/40rem;
        left: 108/40rem;
      }
      .building-show-single-transportation{
        width: 310/40rem;
        height: 130/40rem;
        top: -500/40rem;
        left: 416/40rem;
      }
      .building-show-single-sight{
        width: 750/40rem;
        height: 140/40rem;
        top: -470/40rem;
      }
    }
    .building-show-point{
      padding: 0 70/40rem 0;
      margin: 60/40rem 0 80/40rem;
      font-size: 26/40rem;
      color: #666;
      span{
        color: #0066ff;
      }
      .building-show-course-point-content{
        margin: 60/40rem 0;
        span{
          color: #0066ff;
        }
      }
      .building-show-unlocked-point{
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
  //import buildingActions from '../../vuex/actions'
  import {userGetters, courseRecordsGetters} from '../../vuex/getters' //buildingGetters
  import {setLocalCache} from '../../util/cache'

  export default {
    vuex: {
      actions: {

      },
      getters: {
        isLogin: userGetters.isLogin,
        expenseRecordsArr: courseRecordsGetters.expenseRecords
      }
    },

    route: {
      data () {
        this.showSubjectStatus()
      }
    },

    data () {
      return {
        scrollerHeight: '0px',
        showStartStudy: true,  // 开始学习按钮是否显示
        currSubjectStatus: {},  // 初级课程的状态
        currCourseIndex: 1,  // 当前是第几课
        showUnlockedPoint: true, // 解锁提示是否显示
        courseBuilding: [
          {buildingClass: 'building-show-single-location', buildingPic: './static/image/building/building-show-locked-1-1.png', locked: './static/image/building/building-show-locked.png', unlocked: './static/image/building/building-show-unlocked.png'},
          {buildingClass: 'building-show-single-house', buildingPic: './static/image/building/building-show-locked-2-1.png', locked: './static/image/building/building-show-locked.png', unlocked: './static/image/building/building-show-unlocked.png'},
          {buildingClass: 'building-show-single-butler', buildingPic: './static/image/building/building-show-locked-3-1.png', locked: './static/image/building/building-show-locked.png', unlocked: './static/image/building/building-show-unlocked.png'},
          {buildingClass: 'building-show-single-pet', buildingPic: './static/image/building/building-show-locked-4-1.png', locked: './static/image/building/building-show-locked.png', unlocked: './static/image/building/building-show-unlocked.png'},
          {buildingClass: 'building-show-single-transportation', buildingPic: './static/image/building/building-show-locked-5-1.png', locked: './static/image/building/building-show-locked.png', unlocked: './static/image/building/building-show-unlocked.png'},
          {buildingClass: 'building-show-single-sight', buildingPic: './static/image/building/building-show-locked-6-1.png', locked: './static/image/building/building-show-locked.png', unlocked: './static/image/building/building-show-unlocked.png'}
        ], // 课程建筑
        courseArticle: [
          {courseIndex: '第一课', buildingText: '造房地段', pointTitle: '造房最重要的呢是什么？'},
          {courseIndex: '第二课', buildingText: '房屋大小', pointTitle: '位置是有了，但你的房屋会有多大呢？'},
          {courseIndex: '第三课', buildingText: '管家人选', pointTitle: '这么漂亮的房子，怎么能没人打理呢？'},
          {courseIndex: '第四课', buildingText: '小宠物', pointTitle: '房子越来越热闹了有木有？！'},
          {courseIndex: '第五课', buildingText: '交通工具', pointTitle: '有钱人的标配还差了什么？没错！就是车子！'},
          {courseIndex: '第六课', buildingText: '景观绿化', pointTitle: '房子周围光秃秃的，一点都不美观嘛！'}
        ]  // 课程文案
      }
    },

    methods: {
      /**
       * 关闭页面
       **/
      onCancel () {
        window.history.back()
      },

      /**
       * 设置滚动高度
       */
      setScrollerHeight () {
        const me = this
        setTimeout(function () {
          me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.clientHeight) + 'px'
          me.$nextTick(() => {
            me.$refs.scroller.reset({
              top: 0
            })
          })
        }, 300)
      },

      /**
       * 显示课程状态
       **/
      showSubjectStatus () {
        this.currSubjectStatus = this.expenseRecordsArr.find(subject => (subject.subjectId) === 4).lessonSet
        // 判断是否登录
        if (this.isLogin) { // 已登录
          // 判断购买状态
          if (this.currSubjectStatus) {  // 已购买
            // 获取显示第几课的文案
            this.currCourseIndex = this.currSubjectStatus.lessonIds.length
            // 判断是否完成
            if (this.currCourseIndex === 6) { // 课程已完成

            } else { // 课程未完成
              if (this.currCourseIndex !== 1) { // 判断是否显示解锁提示
                this.showUnlockedPoint = false
              }
            }
            // 判断课程状态
            console.log(this.currSubjectStatus.graduated)
            switch (this.currSubjectStatus.graduated) {
              case 'I':
                console.log('未激活')
                this.notActive()
                break
              case 'N':
                console.log('在读')
                this.studying()
                break
              case 'P':
                console.log('暂停')
                this.paused()
                break
              case 'E':
                console.log('过期')
                this.overdue()
                break
              case 'Y':
                console.log('毕业')
                this.graduation()
                break
              default:
                break
            }
          } else { // 未购买
            console.log('提示购买')
          }
        } else { // 未登录
          console.log('提示登录')
        }
      },

      /**
       * 未激活
       **/
      notActive () {

      },

      /**
       * 在读
       **/
      studying () {

      },

      /**
       * 暂停
       **/
      paused () {
      },

      /**
       * 过期
       **/
      overdue () {

      },

      /**
       * 毕业
       **/
      graduation () {
        this.showStartStudy = false //不显示开始学习按钮
      },

      /**
       * 开始学习
       **/
      goToStudy () {
        this.showStartStudy = false //不显示开始学习按钮
        setLocalCache('curr-course-status', {subjectStatusPrompt: this.currSubjectStatus.graduated})
      }
    },

    components: {
      IctCloseBtn
    }
  }
</script>
