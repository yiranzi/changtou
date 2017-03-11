<template>
  <div>
    <!--标题-->
    <ict-titlebar v-el:titlebar>全部课程</ict-titlebar>
    <!--图片展示-->
    <div class= "course-type-top">
      <img class = "top-img"  style="src:url(../../../static/image/navigator/fresh-village.png)"></img>
      <p class="type-intro-txt">{{introTxt1[currTabIndex]}}</p>
      <p class="type-intro-txt">{{introTxt2[currTabIndex]}}</p>
      <img class = "top-img"  style="src: url(../../assets/styles/image/navigator/guide.png)"></img>
      <div class = "top-img"  :style="topPic[currTabIndex]"></div>
    </div>
    <style>
      .class-buttons{
        height: 2.65rem;
      }
    </style>
    <div>
      <!--按钮栏-->
      <div class= "class-buttons" v-show="1" >
        <tab :line-width= 1.5rem active-color='#00b0f0' :index.sync="currTabIndex" >
          <tab-item class="vux-center" v-for="(key,item) in buttonsTxt" :selected="currTabIndex ===  key">{{item}}</tab-item>
        </tab>
        <div class ="class-class-buttons">
          <span  class = "icon" :class="iconsPic[currTabIndex]" :style="iconsPicClick[currTabIndex]" v-for="(index,classTypeName) in iconsPic"></span>
          <!--<span v-for="(index,classTypeName) in iconsPic" :style="[icon, currTabIndex === index ? iconsPicClick[currTabIndex] : iconsPic[currTabIndex]]"></span>-->
        </div>

        <!--&lt;!&ndash;简介&ndash;&gt;-->
        <course-list v-show='currTabIndex === 0' :class-type="courseList[currTabIndex]" :mytest="currTabIndex"></course-list>
        <course-list v-show='currTabIndex === 1' :class-type="courseList[currTabIndex]" :mytest="currTabIndex"></course-list>
        <course-list v-show='currTabIndex === 2' :class-type="courseList[currTabIndex]" :mytest="currTabIndex"></course-list>
        <course-list v-show='currTabIndex === 3' :class-type="courseList[currTabIndex]" :mytest="currTabIndex"></course-list>
      </div>
    </div>
  </div>
</template>
<style lang = "less">
  .course-type-top{
    height: 8.6rem;
    padding-top: 1rem;
    background-color: #fafafa;
    .type-intro-txt{
      maring: 0;
      text-align: center;
      font-size: 0.65rem;
      color: #999999;
    }
  }
  .top-img{
    height: 5.5rem;
    background: no-repeat center center;
  }

  .class-class-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .icon{
    }
  }

</style>
<script>
  import {Tab, TabItem} from 'vux/tab'
  import courseList from '../../components/ictCourseList.vue'
  import {courselistActions} from '../../vuex/actions'
  import {courselistGetters} from '../../vuex/getters'
  import IctTitlebar from '../../components/IctTitleBar.vue'
    export default {
      vuex: {
        getters: {
          courseList: courselistGetters.courseList
        },
        actions: {
          loadList: courselistActions.loadCourseList
        }
      },

      ready () {
        this.loadList().then(this.setScrollerHeight)
      },

        data () {
            return {
              currTabItem: 's', //测试git
              currTabIndex: 0,
              topPic: [
                  {background: 'url(../../assets/styles/image/courseList/classType/bigPic/bigpic_beginer.png)'},
                  {background: 'url(../../assets/styles/image/courseList/classType/bigPic/bigpic_fund.png)'}
                ],
              introTxt1: [
                '理财入门，从容前行',
                '步步为营，分析公司',
                '科学养基，稳稳的幸福',
                '生活理财，均衡配置'
              ],
              introTxt2: [
                '修炼正确的投资观念和思维方式',
                '成为穿越牛熊的价值投资人',
                '老司机领跑投资马拉松，带你赚钱带你飞',
                '了解生活中与理财相关的方方面面'
              ],
              buttonsTxt: ['入门', '股票', '基金', '生活'],
              iconsPic: [
                {background: 'url("../../../assets/styles/image/navigator/interview.png")'},
                {background: 'url("../../../assets/styles/image/navigator/interview.png")'}
              ],
              iconsPicClick: [
                {background: 'url("../../../assets/styles/image/navigator/interview.png")'},
                {background: 'url("../../../assets/styles/image/navigator/interview.png")'}
              ]
            }
        },

      components: {
        Tab,
        TabItem,
        courseList,
        IctTitlebar
      }
    }
</script>
