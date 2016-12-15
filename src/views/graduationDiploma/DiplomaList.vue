/**
 * Created by jun on 2016/12/6.
 * 毕业证书列表
 */
<template>
    <div class="graduation-diploma-list">
      <ict-titlebar v-el:titlebar>毕业证书</ict-titlebar>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
        <div></div>
        <div v-if="diplomaList.length === 0" class="empty-list"></div>
        <div v-for="item in diplomaList">
          <div class="diploma-item" v-touch:tap="onDiplomaTap(item)">
            <img src="../../assets/styles/image/graduationDiploma/diploma-icon.png">
            <div class="subject-panel">
              <p class="subject-title">{{item.subjectName}}<span class="draw-icon" v-if="item.drawStatus === 'N'">抽奖</span></p>
              <p class="subject-rank">第{{item.rank}}名毕业</p>
            </div>
          </div>
        </div>
      </scroller>
    </div>
</template>
<script>
  import Scroller from 'vux/scroller'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {graduationDiplomaGetters} from '../../vuex/getters'
  import {graduationDiplomaActions} from '../../vuex/actions'
export default {
  vuex: {
    getters: {
      diplomaList: graduationDiplomaGetters.diplomaList
    },
    actions: {
      getDiplomaList: graduationDiplomaActions.getDiplomaList
    }
  },
  data () {
    return {
      scrollerHeight: '0px'
    }
  },
  route: {
    data () {
      this.getDiplomaList()
    }
  },
  ready () {
    this.setScrollerHeight()
  },
  methods: {
    setScrollerHeight () {
      const me = this
      me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.offsetHeight) + 'px'
      setTimeout(function () {
        me.$nextTick(() => {
          me.$refs.scroller.reset({
          top: 0
        })
      })
      }, 200)
    },
    onDiplomaTap (diploma) {
      this.$route.router.go(`/graduation/subject/diploma/${diploma.subjectId}`)
    }
  },
  components: {
    IctTitlebar,
    Scroller
  }
}
</script>
<style lang="less">
  .graduation-diploma-list{
    width: 100%;
    height: 100%;
    background: #fff;
    p{
      margin: 0;
    }
    .empty-list{
      width: 100%;
      height: 100%;
      /*background: url('empty.png') center center no-repeat;*/ //todo
      background-size: 50% 50%;
    }
    .diploma-item{
      position: relative;
      height: 220/40rem;
      padding: 26/40rem 50/40rem;
      box-sizing: border-box;
      border-bottom: 1px solid #f0eff5;
      img{
        position: absolute;
        width: 134/40rem;
        height: 168/40rem;
      }
      .subject-panel{
        position: relative;
        margin: 24/40rem 0 24/40rem 174/40rem;
        height: 120/40rem;
        .draw-icon{
          position: relative;
          left: 3px;
          top: -7px;
          display: inline-block;
          width: 1.5rem;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          border-radius: 13/2px;
          font-size: 18/40rem;
          color: #fff;
          background: #ff9800;
        }
        .subject-title{
          font-size: 30/40rem;
          color: #444;
        }
        .subject-rank{
          position: absolute;
          bottom: 0;
          font-size: 26/40rem;
          color: #999;
        }
      }
    }
  }
</style>
