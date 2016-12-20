<template>
  <div class="question-detail-container">
    <ict-titlebar v-el:titlebar >想问</ict-titlebar>
    <div class="question-container">
    <p>亲爱的院生：</p>
    <p>为了方便大家解决学习过程中遇到的疑惑，帮助大家在投资学习之路上更好的成长；长投学堂APP正在针对“提问与讨论”功能进行调研，希望你能告诉小投你在学习中想问什么（可多选哦）
    </p>
    <p>参与调研的院生并成功提交的院生，将有机会第一时间参与“提问与讨论”功能的测试 ^-+  </p>
    </div>
    <div class="question-option-container">
      <div class="option-item-container">
        <p class="option-item-title">我想问 : <a class="option-blue-text">问题类型</a> </p>
        <p>
        <span class="option-item-detail">课程相关</span>
        <span class="option-item-detail">作业批改</span>
        <span class="option-item-detail">APP使用</span>
        <span class="option-item-detail">优惠信息</span>
        </p>
      </div>
      <div class="option-item-container">
        <p class="option-item-title">我想问 : <a class="option-blue-text">回答对象</a> </p>
        <p>
        <span class="option-item-detail">师兄</span>
        <span class="option-item-detail">助教</span>
        <span class="option-item-detail">老师</span>
        </p>
      </div>
      <div class="option-item-container">
        <p class="option-item-title">我想问 : <a class="option-blue-text">提问机会</a> </p>
        <p>
        <span class="option-item-detail">每门课免费3次</span>
        <span class="option-item-detail">付费提问</span>
        <span class="option-item-detail">完成任务获提问机会</span>
        </p>
      </div>

    </div>
  </div>
</template>
<style lang="less">
  .question-detail-container{
    .option-blue-text{
      color: blue;
    }
  }
</style>
<script>
  import Swiper from 'vux/swiper'
  import SwiperItem from 'vux/swiper-item'
  import IctTitlebar from '../../IctTitleBar.vue'
  import Scroller from 'vux/scroller'

export default {
  components: {
    Swiper,
    SwiperItem,
    IctTitlebar,
    Scroller
  },
  route: {
      data ({to: {params: {currIndex}}}) {
       this.currIndex = currIndex
      }
    },
  ready () {
    this.setScrollerHeight()
  },
  methods: {
    bookChapterIndexChange (index) {
      this.book_index = index
    },
    gotoChoseIndex () {
      this.showMask({
          component: 'giftPackage/toggleIndexChapter.vue',
          hideOnMaskTap: true,
          callbackName: 'gotoChapterDetails',
          callbackFn: this.gotoChapterDetails.bind(this)
      })
    },
    gotoChapterDetails (currIndex) {
      this.hideMask()
      this.$route.router.go(`/giftPackage/bookChapter/${currIndex}`)
    },
    setScrollerHeight () {
        // 设置滚动条高度为 页面高度-titlebar高度-tabbar高度
        const me = this
        const {titlebar} = this.$els
        me.scrollerHeight = (window.document.body.offsetHeight - titlebar.offsetHeight) + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 150)
    },
    gotoBookDetail () {
      this.$route.router.go('giftPackage/newerBookDetails')
    }
  },
  data () {
    return {
      book_index: 0,   // 此参数做翻页显示用
      currIndex: 0,
      bookChapterList: [bookChapter1, bookChapter2, bookChapter3, bookChapter4, bookChapter5, bookChapter6],
      scrollerHeight: '0px'
    }
  },
  computed: {
    currBookChapter () {
      return this.bookChapterList[this.currIndex]
    }
  }
}
