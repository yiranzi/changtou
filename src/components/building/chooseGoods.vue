<template>
  <swiper v-ref:swiper height="100px" :auto='false' class="gift-mask-swiper1" dots-class="dots-class"   >
    <swiper-item class="item-white" v-for="(key,item) in items">
      <div v-if="componentData.useGoodsNum == key">
        <span class="have-used">已使用</span>
      </div>
      <div v-else>
        <div v-if="componentData.maxGoodsNum >= key">
          <span class="to-use">使用</span>
          <span>当前是{{componentData.useGoodsNum}}</span>
        </div>
        <div v-else>
          <span>lock</span>
          <p v-if="key == 1">{{lockTxt2[key]}}</p>
          <p v-if="key == 2">{{lockTxt2[key]}}</p>
        </div>
      </div>
      <p>{{introTxt[itemId][componentData.useGoodsNum]}}</p>
      <img v-bind:src="topPic[componentData.useGoodsNum]" width="230" height="138" v-bind:style="imgStyle">
      <div  v-touch:tap="onChooseGood">返回玩家选择</div>
    </swiper-item>
  </swiper>
  <div>
    {{choose}}
  </div>
  <div>
    种类{{itemId}}
  </div>
  <div>
    当前{{componentData.useGoodsNum}}
  </div>
  <div>
    最高{{componentData.maxGoodsNum}}
  </div>

</template>
<style lang="less">
  .gift-mask-swiper1{
    height: 18rem !important;
    width: 14.5rem;
    .vux-swiper{
      height: 16rem !important;
      border-radius: 5%;
      width: 100%;
      background: #fff;
    }
    .dots-class{
      left: 5.5rem !important;
    }
    .vux-icon-dot {
      background-color: #fff!important;
      opacity: 0.5;
      width: .5rem !important;
      height: .5rem !important;
      border-radius: .25rem !important;
      margin-right: .6rem;
    }
    .vux-icon-dot.active{
      background-color: orange !important;
      opacity: 1;
    }
    .item-white{
      text-align: center;
      width: 14.5rem;
      p{
        font-family: initial;
        font-size: 1.5rem;
        color: #444;
      }
      p:first-child{
        margin-bottom: .1rem;
        font-weight: bold;
        font-size: 1.2rem;
        margin-top: .5rem;
      }
      p:nth-child(2){
        margin-top: 0;
        font-size: .7rem;
        margin-bottom: 1.5rem;
      }
    }
    .receive-gift-btn{
      border: 2px solid #FF3C3C;
      border-radius: 2rem;
      width: 65%;
      margin-left: 17%;
      height: 1.5rem;
      font-size: .8rem !important;
      line-height: 1.5rem;
      color: #ff3c3c;
      top: 12.5rem;
      text-align: center;
      position: absolute !important;
    }
  }
</style>
<script>
  import Swiper from 'vux/swiper'
  import SwiperItem from 'vux/swiper-item'
    export default {
      data () {
          return {
            choose: 1,
            items: [1, 2, 3],
            //大图文本行2
            lockTxt2: [
              '',
              '回答再多一些吧',
              '简答题都回答了就好了'
            ],
            topPic: [
              [
                '../../../static/image/classType/bigPic/bigpic_beginer.png',
                '../../../static/image/classType/bigPic/bigpic_stock.png',
                '../../../static/image/classType/bigPic/bigpic_fund.png'
              ],
              [
                '../../../static/image/classType/bigPic/bigpic_beginer.png',
                '../../../static/image/classType/bigPic/bigpic_stock.png',
                '../../../static/image/classType/bigPic/bigpic_fund.png'
              ],
              [
                '../../../static/image/classType/bigPic/bigpic_beginer.png',
                '../../../static/image/classType/bigPic/bigpic_stock.png',
                '../../../static/image/classType/bigPic/bigpic_fund.png'
              ],
              [
                '../../../static/image/classType/bigPic/bigpic_beginer.png',
                '../../../static/image/classType/bigPic/bigpic_stock.png',
                '../../../static/image/classType/bigPic/bigpic_fund.png'
              ],
              [
                '../../../static/image/classType/bigPic/bigpic_beginer.png',
                '../../../static/image/classType/bigPic/bigpic_stock.png',
                '../../../static/image/classType/bigPic/bigpic_fund.png'
              ],
              [
                '../../../static/image/classType/bigPic/bigpic_beginer.png',
                '../../../static/image/classType/bigPic/bigpic_stock.png',
                '../../../static/image/classType/bigPic/bigpic_fund.png'
              ]
            ],
            //大图文本行1
            introTxt: [
              [
                '理财入门，从容前行',
                '步步为营，分析公司',
                '科学养基，稳稳的幸福'
              ],
              [
                '理财入门，从容前行2',
                '步步为营，分析公司2',
                '科学养基，稳稳的幸福2'
              ],
              [
                '理财入门，从容前行',
                '步步为营，分析公司',
                '科学养基，稳稳的幸福'
              ],
              [
                '理财入门，从容前行2',
                '步步为营，分析公司2',
                '科学养基，稳稳的幸福2'
              ],
              [
                '理财入门，从容前行',
                '步步为营，分析公司',
                '科学养基，稳稳的幸福'
              ],
              [
                '理财入门，从容前行2',
                '步步为营，分析公司2',
                '科学养基，稳稳的幸福2'
              ],
              [
                '理财入门，从容前行',
                '步步为营，分析公司',
                '科学养基，稳稳的幸福'
              ],
              [
                '理财入门，从容前行2',
                '步步为营，分析公司2',
                '科学养基，稳稳的幸福2'
              ]
            ]
          }
      },
      props: {
        componentData: Object
      },
//

      computed: {
          'itemId': function () {
            return this.componentData.itemId
          }
      },
      methods: {
        onChooseGood () {
          this.$dispatch('ChangeGoods', this.choose)
        }
      },
      components: {
        Swiper,
        SwiperItem
      }

    }
</script>
