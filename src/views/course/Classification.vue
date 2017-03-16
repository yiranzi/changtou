<template>
  <div class="course-classification">
    <!--标题-->
    <ict-titlebar v-el:titlebar>课程分类</ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
      <div>
          <!--图片展示-->
          <div class= "course-type-top">
            <img v-bind:src="topPic[currTabIndex]"></img>
            <p style="margin-top: 0.3rem;">{{introTxt1[currTabIndex]}}</p>
            <p>{{introTxt2[currTabIndex]}}</p>
            <div class = "top-img"  :style="topPic[currTabIndex]"></div>
          </div>
          <!--按钮栏-->
          <div class= "class-type-buttons">
            <tab class="mycenter fix-vuex-height" :line-width= 1rem active-color='#00b0f0' :index.sync ="currTabIndex" >
              <div class="mycenter" v-for="(key,item) in buttonsTxt" :selected="currTabIndex ===  key">
                  <tab-item class="fix-vuex-line-height mycenter">
                    <div>
                      <img class = "class-button-icon" v-show ="currTabIndex == key" v-bind:src="iconsPicClick[key]"></img>
                      <img class = "class-button-icon" v-show ="currTabIndex != key" v-bind:src="iconsPic[key]"></img>
                    </div>
                    <span class = "class-button-txt">{{item}}</span>
                  </tab-item>
                  <!--<span class="line mycenter" v-if="key!==3"></span>-->
              </div>
            </tab>
          </div>
          <!--课程分类内容-->
          <div>
            <course-classification-list v-for="(key,item) in courseClassification" v-show='currTabIndex === key' :course-data="courseClassification[currTabIndex]"></course-classification-list>
          </div>
        </div>
    </scroller>
  </div>
</template>
<style lang = "less">
  .course-classification{
    .mycenter{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }
    .course-type-top{
      height: 8.1rem;
      padding-top: 1rem;
      background-color: #fafafa;
      img{
        width: 6.9rem;
        height: 4.2rem;
        display:flex;
        justify-content:center;
        margin: auto auto;
        text-align: center;
      }
      p {
        margin: 0;
        text-align: center;
        font-size: 0.65rem;
        color: #999999;
      }
    }
    .top-img{
      height: 5.5rem;
      background: no-repeat center center;
    }
    .class-type-buttons{
      height: 2.6rem;
      padding:0 1.5rem;
      background-color: #fff;
      .fix-vuex-height
      {
        height: 2.6rem;
        .fix-vuex-line-height{
          line-height: 1.1rem;
        }
        .line{
          /*vertical-align: middle;*/
          display:inline-block;
          width: 0.025rem;
          height: 1.75rem;
          background-color: #f0f0f0;
          /*margin: auto auto;*/
          /*line-height: 100%;*/
        }
      }
      .class-button-icon{
        width: 0.95rem;
        height: 0.95rem;
      }
      .class-button-txt{
        font-size: 0.8rem;
      }
    }
  }
</style>

<script>
  import {Tab, TabItem} from 'vux/tab'
  import courseClassificationList from '../../components/ClassificationList.vue'
  import {courselistActions} from '../../vuex/actions'
  import {courselistGetters} from '../../vuex/getters'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'

    export default {
      vuex: {
        getters: {
          courseClassification: courselistGetters.courseClassification
        },
        actions: {
          loadClassification: courselistActions.loadClassification
        }
      },
//      切换的时候重新设置高度
      watch: {
          'currTabIndex': function () {
            this.setScrollerHeight()
          }
      },
      methods: {
        /**
         * 设置滚动高度
         */
        setScrollerHeight () {
          const me = this
          setTimeout(function () {
            me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.offsetHeight) + 'px'
            me.$nextTick(() => {
              me.$refs.scroller.reset({
                top: 0
              })
            })
          }, 300)
        }
      },
      ready () {
        this.loadClassification()
        },
      route: {
        data () {
          this.currTabIndex = 0
          this.setScrollerHeight()
        }
      },
      data () {
            return {
              scrollerHeight: '0px',
              currTabIndex: 0,
              //大图
              topPic: [
                '../../../static/image/classType/bigPic/bigpic_beginer.png',
                '../../../static/image/classType/bigPic/bigpic_stock.png',
                '../../../static/image/classType/bigPic/bigpic_fund.png',
                '../../../static/image/classType/bigPic/bigpic_live.png'
                ],
              //大图文本行1
              introTxt1: [
                '理财入门，从容前行',
                '步步为营，分析公司',
                '科学养基，稳稳的幸福',
                '生活理财，均衡配置'
              ],
              //大图文本行2
              introTxt2: [
                '修炼正确的投资观念和思维方式',
                '成为穿越牛熊的价值投资人',
                '老司机领跑投资马拉松，带你赚钱带你飞',
                '了解生活中与理财相关的方方面面'
              ],
              //分类按钮文本
              buttonsTxt: ['入门', '股票', '基金', '生活'],
              //分类按钮图标
              iconsPic: [
                '../../../static/image/classType/icon/beginer.png',
                '../../../static/image/classType/icon/stock.png',
                '../../../static/image/classType/icon/live.png',
                '../../../static/image/classType/icon/fund.png'
              ],
              //分类按钮图标激活
              iconsPicClick: [
                '../../../static/image/classType/icon/beginer_a.png',
                '../../../static/image/classType/icon/stock_a.png',
                '../../../static/image/classType/icon/live_a.png',
                '../../../static/image/classType/icon/fund_a.png'
              ]
            }
        },
      components: {
        Tab,
        TabItem,
        courseClassificationList,
        IctTitlebar,
        Scroller
      }
    }
</script>
