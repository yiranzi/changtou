<template>
    <div>
      <!--简介和目录-->
      <div v-show="1" style="height: 100%; background-color: #fff">
        <div>
          <tab :line-width=2 active-color='#00b0f0' :index.sync="currTabIndex">
            <tab-item class="vux-center" :selected="currTabItem === 's'">生活</tab-item>
            <tab-item class="vux-center" :selected="currTabItem === 'c'">理财</tab-item>
          </tab>
        </div>

        <!--&lt;!&ndash;简介&ndash;&gt;-->
        <course-list v-show='currTabIndex === 0' :lessonType="loadList[currTabIndex]" :type="currTabIndex"></course-list>
        <course-list v-show='currTabIndex === 1' :lessonType="loadList[currTabIndex]" :type="currTabIndex"></course-list>
      </div>
    </div>
</template>
<style>
</style>
<script>
  import {Tab, TabItem} from 'vux/tab'
  import courseList from '../../components/ictCourseList.vue'
  import {courselistActions} from '../../vuex/actions'
  import {courselistGetters} from '../../vuex/getters'
    export default {

      vuex: {
        getters: {
          courseList: courselistGetters.courseList
        },
        actions: {
          loadList: courselistActions.loadCourseList
        }
      },
      route: {
        data () {
            console.log('进入界面，刷新数据')
            this.loadList()
        }
      },
        data () {
            return {
              currTabItem: 's', //选项卡当前选中项目 s表示简介, c表示目录
              currTabIndex: 0
            }
        },

      components: {
        Tab,
        TabItem,
        courseList
      },
      watch: {
        currTabItem: function () {
            if (this.currTabItem === 's') {
              this.currTabIndex = 0
              console.log(courseList)
              console.log(courseList[this.currTabIndex])
            } else {
              this.currTabIndex = 1
              console.log(courseList)
              console.log(courseList[this.currTabIndex])
            }
        }
      }

    }
</script>
