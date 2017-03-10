<template>
  <div>
    <!--标题-->
    <ict-titlebar v-el:titlebar>全部课程</ict-titlebar>
    <!--图片展示-->
    <div class= "course-type-top">
      <div class = "top-img"  :style="topPic[currTabIndex]"></div>
      <p class="type-intro-txt">{{introTxt1[currTabIndex]}}</p>
      <p class="type-intro-txt">{{introTxt2[currTabIndex]}}</p>
    </div>
    <div>
      <!--按钮栏-->
      <div v-show="1" style="height: 100%; background-color: #fff">
        <tab :line-width=1 active-color='#00b0f0' :index.sync="currTabIndex" >
          <tab-item class="vux-center" v-for="(key,item) in buttonsTxt" :selected="currTabIndex ===  key">{{item}}</tab-item>

        </tab>
        <div class ="class-class-buttons">
          <span  class = "icon" :class="iconsPic[currTabIndex]" :style="iconsPicClick[currTabIndex]" v-for="(index,classTypeName) in iconsPic"></span>
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
              currTabItem: 's', //选项卡当前选中项目 s表示简介, c表示目录
              currTabIndex: 0,
              topPic: [
                  {background: 'url(../../assets/styles/image/newertest/tip/tipImg.png)'},
                  {background: 'url(../../assets/styles/image/newertest/tip/tipImg.png)'}
                ],
              introTxt1: [
                '111',
                '222',
                '333'
              ],
              introTxt2: [
                '44444444',
                '5555555',
                '66666666666'
              ],
              buttonsTxt: ['精选', '美食', '电影', '酒店', '外卖'],
              iconsPic: [
                {background: 'url(../../assets/styles/image/newertest/tip/tipImg.png)'},
                {background: 'url(../../assets/styles/image/newertest/tip/tipImg.png)'}
              ],
              iconsPicClick: [
                {background: 'url(../../assets/styles/image/newertest/tip/tipImg.png)'},
                {background: 'url(../../assets/styles/image/newertest/tip/tipImg.png)'}
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
