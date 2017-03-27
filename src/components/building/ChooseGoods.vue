<template>
  <div class="choose-goods">
    <swiper v-ref:swiper height="100px" :auto='false' class="goods-choose-swiper" dots-class="dots-class"   >
      <swiper-item class="item-white" v-for="title in introTxt[itemId]">
        <p class="title">{{title}}</p>
        <div class="centerpic" v-if="maxGoodsNum < $index">
          <img class="pic" :src="lockedPic[itemId][$index]">
          <img class="choose-or-lock" :src="choose[0]">
          <div class="bottom-div">
            <div class="lock-txt">
              <p v-if="$index == 1">{{lockTxt2[$index]}}</p>
              <p v-if="$index == 2">{{lockTxt2[$index]}}</p>
              <span>选择题、问答题均取第一次作答成绩，珍惜答题机会</span>
            </div>
          </div>
        </div>
        <div class="centerpic" v-else>
          <img class="pic"  :src="unlockedPic[itemId][$index]">
          <div v-show="useGoodsNum == $index">
            <img class="choose-or-lock" :src="choose[1]">
            <div class="bottom-div">
              <span class="button have-used">已使用</span>
            </div>
          </div>
          <div class="bottom-div" v-else>
            <span class="button use" v-touch:tap="onChooseGood($index)">使用</span>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<style lang="less">

  .choose-goods {
    p{
      margin: 0;
    }
    position: relative;
    .goods-choose-swiper {
      height: 820/40rem !important;
      width: 600/40rem;
      .vux-swiper {
        height: 750/40rem !important;
        border-radius: 0.5rem;
        width: 100%;
        background: #fff;
      }
      .dots-class {
        left: 5.5rem !important;
      }
      .vux-icon-dot {
        background-color: #fff !important;
        opacity: 0.5;
        width: .5rem !important;
        height: .5rem !important;
        border-radius: .25rem !important;
        margin-right: .6rem;
      }
      .vux-icon-dot.active {
        background-color: orange !important;
        opacity: 1;
      }
      .item-white {
        text-align: center;
        .title {
          font-size: 30/40rem;
          color: #666;
          font-weight: bold;
          margin-top: 70/40rem;
          width: 100%;
          text-align: center;
        }
        .centerpic{
          position: absolute;
          top: 340/40rem;
          transform: translateY(-50%);
          height: 400/40rem;
          width: 100%;
          .pic{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-height: 400/40rem;
            max-width: 100%;
          }
          .choose-or-lock{
            position: absolute;
            height: 90/40rem;
            width: 90/40rem;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .bottom-div{
          position: absolute;
          top: 440/40rem;
          text-align: center;
          width: 100%;
          height: 64/40rem;
          line-height: 64/40rem;
          .lock-txt {
            p{
              margin-bottom: .5rem;
            }
            line-height: .7rem;
            border: 2px solid #FFFFFF;
            color: #888;
            font-size: 26/40rem;
          }
          .button {
            display: inline-block;
            border-radius: 32/40rem;
            width: 260/40rem;
            font-size: 30/40rem;
            font-weight: bold;
          }
          .use {
            border: 2px solid #ff9800;
            color: #ff9800;
          }
          .have-used {
            border: 2px solid #eee;
            color: #ddd;
          }
        }
      }
    }
  }
</style>
<script>
  import Swiper from 'vux/swiper'
  import SwiperItem from 'vux/swiper-item'
  export default {
    data () {
      return {
        //大图文本行2
        lockTxt2: [
          '选择题3分以上即可解锁该物品',
          '选择题5分或问答题3分以上即可解锁该物品',
          '问答题4分以上即可解锁该物品'
        ],
        choose: [
          './static/image/building/choose/lock.png',
          './static/image/building/choose/using.png'
        ],
        unlockedPic: [
          [
            './static/image/building/item/building-show-unlocked-1-1.png',
            './static/image/building/item/building-show-unlocked-1-2.png',
            './static/image/building/item/building-show-unlocked-1-3.png'
          ],
          [
            './static/image/building/item/building-show-unlocked-2-1.png',
            './static/image/building/item/building-show-unlocked-2-2.png',
            './static/image/building/item/building-show-unlocked-2-3.png'
          ],
          [
            './static/image/building/item/building-show-unlocked-3-1.png',
            './static/image/building/item/building-show-unlocked-3-2.png',
            './static/image/building/item/building-show-unlocked-3-3.png'
          ],
          [
            './static/image/building/item/building-show-unlocked-4-1.png',
            './static/image/building/item/building-show-unlocked-4-2.png',
            './static/image/building/item/building-show-unlocked-4-3.png'
          ],
          [
            './static/image/building/item/building-show-unlocked-5-1.png',
            './static/image/building/item/building-show-unlocked-5-2.png',
            './static/image/building/item/building-show-unlocked-5-3.png'
          ],
          [
            './static/image/building/item/building-show-unlocked-6-1.png',
            './static/image/building/item/building-show-unlocked-6-2.png',
            './static/image/building/item/building-show-unlocked-6-3.png'
          ]
        ],
        lockedPic: [
          [
            './static/image/building/item/building-show-locked-1-1.png',
            './static/image/building/item/building-show-locked-1-2.png',
            './static/image/building/item/building-show-locked-1-3.png'
          ],
          [
            './static/image/building/item/building-show-locked-2-1.png',
            './static/image/building/item/building-show-locked-2-2.png',
            './static/image/building/item/building-show-locked-2-3.png'
          ],
          [
            './static/image/building/item/building-show-locked-3-1.png',
            './static/image/building/item/building-show-locked-3-2.png',
            './static/image/building/item/building-show-locked-3-3.png'
          ],
          [
            './static/image/building/item/building-show-locked-4-1.png',
            './static/image/building/item/building-show-locked-4-2.png',
            './static/image/building/item/building-show-locked-4-3.png'
          ],
          [
            './static/image/building/item/building-show-locked-5-1.png',
            './static/image/building/item/building-show-locked-5-2.png',
            './static/image/building/item/building-show-locked-5-3.png'
          ],
          [
            './static/image/building/item/building-show-locked-6-1.png',
            './static/image/building/item/building-show-locked-6-2.png',
            './static/image/building/item/building-show-locked-6-3.png'
          ]
        ],
        //大图文本行1
        introTxt: [
          [
            '荒无人烟的七环外',
            '临近地铁站、公交站的居民区',
            '市中心CBD'
          ],
          [
            '20平米的单间',
            '90平米的三室一厅',
            '300平米的独栋别墅'
          ],
          [
            '钟点工阿姨',
            '年轻专业的菲佣',
            '操一口伦敦腔英式管家'
          ],
          [
            '呆萌的青蛙',
            '鸡贼的仓鼠',
            '优雅的贵宾犬'
          ],
          [
            '自行车',
            '日系丰田',
            '兰博基尼豪车'
          ],
          [
            '一往无际的野草',
            '低矮的灌木丛',
            '有花有树，整片森林都是你的！'
          ]
        ]
      }
    },
    props: {
      componentData: Object
    },
    computed: {
      'itemId': function () {
        return this.componentData.itemId
      },
      'maxGoodsNum': function () {
        return this.componentData.maxGoodsNum - 1
      },
      'useGoodsNum': function () {
        return this.componentData.useGoodsNum - 1
      }
    },
    /*
     *点击mask的时候触发事件
     * dispatch数据给父节点(只能传递一个参数)
     */
    events: {
      'on-mask-tap' () {
        this.onMaskHide()
      }
    },
    methods: {
      onChooseGood (chooseId) {
        this.componentData.useGoodsNum = chooseId + 1
      },
      onMaskHide () {
        this.$dispatch('changeGoods', this.componentData)
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>
