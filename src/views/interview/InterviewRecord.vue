<template>
  <div class="interview-record">
    <ict-titlebar :right-options="rightOptions" v-el:titlebar>
      院生故事
      <div slot="right" v-touch:tap="showActionSharePanel" v-if="canShare">
        <img class="share-pic" src='../../assets/styles/image/share.png'>
      </div>
    </ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight" style="background-color: #fff">
      <div v-show="isLoadSuccess" class="content">
        <div class="title">{{interviewRecord.title}}</div>
        <div class="introduce">
          <span class="xiao-tou">小投说</span>
          <span>{{interviewRecord.introduce}}</span>
        </div>
        <div class="tip">需耗时{{interviewRecord.spendTime}}分钟 文章约{{interviewRecord.wordNum}}字</div>
        <div v-for="paragraph in interviewRecord.paragraph">
          <div class="paragraph-title">
            <span>{{paragraph.paragraph}}</span>/{{paragraph.title}}
          </div>
          <div v-for="subParagraph in paragraph.subParagraphArr">
            <div class="paragraph-content">{{{subParagraph}}}</div>
          </div>
          <img class="pic" v-bind:src="paragraph.image">
        </div>

        <page-share-panel @on-panel-tap="onActionTap"></page-share-panel>

      </div>
      <!--<div class="load-fail" v-show="!isLoadSuccess">-->
        <!--<div>加载中...</div>-->
        <!--&lt;!&ndash;<button v-touch:tap="loadInterviewRecord">请重新加载</button>&ndash;&gt;-->
      <!--</div>-->
    </scroller>
    <page-share-float :show.sync="showShareFloat"  @confirm="cancelShare" v-touch:tap="onActionTap"></page-share-float>
  </div>
</template>

<script>
  import Scroller from 'vux/scroller'
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {interviewActions} from '../../vuex/actions'
  import {interviewGetters} from '../../vuex/getters'
  import {Device, platformMap} from '../../plugin/device'
  import {MSITE_URL} from '../../frame/serverConfig'
  import mixinPageShare from '../../mixinPageShare'
  import PageSharePanel from '../../components/share/PageSharePanel.vue'
  import PageShareFloat from '../../components/share/PageShareFloat.vue'

  export default {
    mixins: [mixinPageShare],
    vuex: {
      actions: {
        loadInterviewRecord: interviewActions.loadInterviewRecord
      },
      getters: {
        interviewRecord: interviewGetters.interviewRecord
      }
    },
    data () {
      return {
        showShareFloat: false,
        scrollerHeight: '580px',
        rightOptions: {
          disabled: false
        },
        isLoadSuccess: false
      }
    },
    watch: {
      'interviewRecord' (newRecord) {
        this.shareConfig = {
          title: '院生故事',
          desc: newRecord.title,
          link: `${MSITE_URL}index.html#!/interview/interview-record/${this.interviewRecord.interviewId}`,
          imgUrl: newRecord.paragraph[0].image
        }
        this.onViewChange()
        this.setScrollerHeight()
      }
    },
    computed: {
      //只有app中才能调用插件分享
      canShare () {
        return (Device.platform === platformMap.ANDROID || Device.platform === platformMap.IOS)
      }
    },
    route: {
      data ({to: {params: {interviewId}}}) {
        return this.loadInterviewRecord(interviewId).then(
          function () {
            return {
              isLoadSuccess: true
            }
          },
          function () {
            return {
              isLoadSuccess: false
            }
          }
        )
      },
      deactivate () {
        this.shareConfig = null
        this.onViewChange()
      }
    },
    methods: {
      setScrollerHeight () {
        const me = this
        setTimeout(function () {
          me.scrollerHeight = (window.document.body.offsetHeight - me.$els.titlebar.offsetHeight) + 'px'
          me.$nextTick(() => {
            me.$refs.scroller.reset({
              top: 0
          })
        })
        }, 500)
      }
    },

    components: {
      IctTitlebar,
      Scroller,
      PageShareFloat,
      PageSharePanel
    }
  }
</script>
<style lang="less">
  .interview-record{
    .share-pic{
      width: 1.3rem;
      height: 1rem;
      margin-top: 0.65rem;
    }
    .content{
      width: 100%;
      padding: 1.25rem 1.75rem 2rem;
      box-sizing: border-box;
      background-color: #fff;
      .title{
        margin-bottom: 2.5rem;
      }
      .introduce{
        border: 2px solid #00b0f0;
        padding: 1.25rem;
        font-size: 0.7rem;
        line-height: 1.2rem;
        color: #898989;
        position: relative;
        .xiao-tou{
          position: absolute;
          top: -0.6rem;
          width: 3rem;
          line-height: 1.2rem;
          background-color: #fff;
          font-size: 0.8rem;
          font-weight: bold;
          text-align: center;
          color: #00b0f0;
        }
      }
      .tip{
        font-size: 0.7rem;
        color: #00b0f0;
        text-align: center;
        margin: 1rem 0 2.5rem 0;
      }
      .paragraph-title{
        margin-bottom: 1.25rem;
        font-size: 0.8rem;
        color: #222;
        text-align: center;
        span{
          font-size: 1.2rem;
        }
      }
      .paragraph-content{
        padding: 0 1.25rem;
        margin-bottom: 1.25rem;
        font-size: 0.7rem;
        color: #898989;
        line-height: 1.2rem;
        hl{
          font-weight: bold;
          color: #ff9800;
        }
      }
      .pic{
        padding: 0 1.25rem;
        width: 12rem;
        text-align: center;
        margin-bottom: 2.5rem;
      }
    }
    .load-fail{
      width: 100%;
      height: 623px;
      background-color: #fff;
      text-align: center;
      padding-top: 40%;
    }
  }
</style>
