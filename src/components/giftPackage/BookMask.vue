<template>
  <div class="book-container">
    <div class="book-chapter">
      <p class="book-chapter-title book-chapter-item">目录</p>
      <p class="book-chapter-item" v-for="bookItem in bookTitleListSub" v-touch:tap="gotoChapterDetails($index)">
        第{{$index+1}}章   {{bookItem}}
      </p>
      <p class="book-chapter-fold book-chapter-item" v-touch:tap="foldChapterList($event)" >收起</p>
    </div>
  </div>
</template>

<style lang="less">
  .book-container{
    position: absolute;
    top: 0rem;
    /* margin: 0 auto; */
    left: 0rem;
    width: 100%;
    .chapter-fold{
      display: none;
    }
    #mask{
      width: 100%;
      height: 50%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .ict-float-component{
      width: 100%;
      height: 50%;
      position: absolute;
      left: 50%;
      top: 38%;
    }
    .book-chapter{
      background: white !important;
      border-top:none !important;
      .book-chapter-title{
        background: white url("../../assets/styles/image/giftPackage/bookChapterIndex.png") 43% center no-repeat /4% !important;
        text-align: center;
        font-size: .75rem !important;
        color: #00b0f0 !important;
        height: 2.2rem;
        line-height: 2.2rem;
      }
      .book-chapter-fold{
        text-align: center;
        font-size: .75rem !important;
        color: #00b0f0 !important;
        height: 2.2rem;
        line-height: 2.2rem;
      }
      .book-chapter-item{
        border-bottom: 1px solid #f0eff5;
        font-size: .7rem;
        color: #666;
        padding-left: 1.25rem;
        height: 2.2rem;
        line-height: 2.2rem;
        background: white ;
      }
    }
  }
</style>
<script>
export default {
  props: {
    bookTitleListSub: Array
    },
  data () {
    return {
    }
  },
  methods: {
   foldChapterList ($event) {
    this.$dispatch('gotoSetMask')
   },
   gotoChapterDetails (currChapter) {
     // 向外派发事件
     console.log('currChapter1', currChapter)
     this.$dispatch('gotoChapterDetails', currChapter)
   }
  }
}
</script>

