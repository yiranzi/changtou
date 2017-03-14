/**
 * Created by jun on 2017/3/1.
 * 新手村 我要吐槽
 */
<template>
    <div class="village-advise">
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
        <div>
          <ict-titlebar v-el:title-bar>我要吐槽</ict-titlebar>
          <img src="../../../static/image/freshVillage/advise/advise-bg.png" class="advise-title-img">
          <div v-for="advise in adviseList" class="advise-panel">
            <img :src="advise.userPortrait" class="advise-user-portrait">
            <div class="advise-item">
              <p class="advise-item-user-name">{{advise.userName}}</p>
              <p class="advise-item-content">{{advise.content}}</p>
              <p class="advise-item-create-time">{{advise.createTime.replace('.0','')}}</p>
            </div>
          </div>
        </div>
      </scroller>
      <div class="goToAdvise" v-touch:tap="goToAdvise" v-el:go-advise>
        <div class="advise-input"><img src="../../../static/image/freshVillage/advise/advise-edit.png">各种收获槽点,不吐不快...</div>
      </div>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import {villageActions} from '../../vuex/actions'
  import {villageGetters, userGetters} from '../../vuex/getters'
export default {
  vuex: {
    getters: {
      adviseList: villageGetters.adviseList,
      isLogin: userGetters.isLogin
    },
    actions: {
      loadAdviseList: villageActions.getAdvise
    }
  },
  data () {
    return {
      scrollerHeight: '480px',
      size: 30
    }
  },
  watch: {
    adviseList (list) {
      if (list.length > 0) {
        this.setScrollerHeight()
      }
    }
  },
  route: {
    data () {
      this.loadAdviseList(1, this.size)
    }
  },
  methods: {
    /**
     * 设置滚动条高度
     */
    setScrollerHeight () {
      const me = this
      me.scrollerHeight = (window.document.body.offsetHeight - this.$els.goAdvise.offsetHeight) + 'px'
      setTimeout(function () {
        me.$nextTick(() => {
          me.$refs.scroller.reset({
            top: 0
          })
        })
      }, 150)
    },

    /**
     * 去提意见
     */
    goToAdvise () {
      this.$route.router.go(this.isLogin ? `/village/fill/content` : `/entry`)
    }
  },
  components: {
    IctTitlebar,
    Scroller
  }
}
</script>
<style lang="less">
  .village-advise{
    width: 100%;
    height: 100%;
    background: #fff;
    p{
      margin: 0;
    }
    .ict-titlebar-title{
      background: #fefe47;
      color: #000;
      .ict-titlebar .left-arrow:before{
        border-color: #000;
      }
    }
    .advise-title-img{
      width: 100%;
      height: 6.8rem;
      border-bottom: 5px solid #f0eff5;
    }
    .advise-panel{
      width: 100%;
      border-bottom: 1px solid #f0eff5;
      padding: 0.75rem 0 0.75rem 0.75rem;
      box-sizing: border-box;
    }
    .advise-user-portrait{
      width: 2.1rem;
      height: 2.1rem;
      border-radius: 50%;
      margin-right: .5rem;
      vertical-align: top;
    }
    .advise-item{
      display: inline-block;
      width: 14rem;
      vertical-align: top;
      &-user-name{
        font-size: 0.65rem;
        color: #aaa;
        margin-bottom: .5rem;
      }
      &-content{
        font-size: 0.7rem;
        color: #666;
        margin-bottom: .5rem;
      }
      &-create-time{
        font-size: 0.6rem;
        color: #aaa;
      }
    }
    .goToAdvise{
      width: 100%;
      height: 2.45rem;
      background: #f0eff5;
      position: absolute;
      bottom: 0;
      padding: 0.425rem 4%;
      text-align: center;
      box-sizing: border-box;
      .advise-input{
        width: 100%;
        height: 1.6rem;
        line-height: 1.6rem;
        border: 1px solid #ccc;
        border-radius: 0.8rem;
        font-size: 0.7rem;
        background: #fff;
        color: #ccc;
        text-align: left;
        img{
          width: 0.8rem;
          height: 0.8rem;
          margin-left: 0.75rem;
          vertical-align: middle;
        }
      }
    }
  }
</style>
