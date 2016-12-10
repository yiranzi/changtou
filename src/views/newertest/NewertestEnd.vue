<template>
  <div>
    <div class="newertest-end">
      <div class="top" v-el:titlebar>
        <div class="cancel" v-touch:tap="onCancel"></div>
      </div>
      <scroller :lock-x="true" scrollbar-y v-ref:scroller :height="scrollerHeight">
        <div class="newertest-end-content">
          <div>
            <div class="bulb-box">
              <span class="bulb-light"></span>
              <span :class='isBulb2'></span>
              <span :class='isBulb3'></span>
            </div>
          </div>
          <div class="title">理财技能等级</div>
          <div class="level">{{testReport.level}}级</div>
          <div class="conclusion-box">
            <div class="content">
              <div>在理财技能上，您还是个<span class="man-level">{{getLevel(testReport.level)}}</span></div>
              <br>
              <div>{{testReport.conclusion}}</div>
            </div>
          </div>
          <div class="subjects-box">
            <div class="subjects-title">理财进化指南</div>
            <div class="subjects" v-for="subjectArr in testReport.subjects">
              <div class="label-box">
                <span class="type">{{subjectArr.type}}</span>
                <span class="label">{{subjectArr.label}}</span>
              </div>
              <div class="recommend">{{subjectArr.recommend}}</div>
              <div class="sub-box">
                <img class="pic" v-bind:src="subjectArr.pic"  v-touch:tap="gotoSubjectDetail ">
                <div class="purchase">{{subjectArr.purchaseCount}}人学过
                  <span class="play-icon"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="try-again" v-touch:tap="tryAgain">再来一次</div>
        </div>
      </scroller>
    </div>
    <confirm :show.sync="remindLogin" title="" confirm-text="登录保存" cancel-text="不保存" @on-confirm="toSave" @on-cancel="notSave">
      <p style="text-align:center;">登录即可保存你的独家修炼秘籍哟~</p>
    </confirm>
  </div>
</template>
<style lang="less">
  .newertest-end{
    width: 100%;
    background: #413f83 ! important;
    .newertest-end-content{
      background: #413f83 ! important;
    }
    .top{
      width: 100%;
      height: 2.2rem;
      position: relative;
      .cancel:before{
        position: absolute;
        top: 0.6rem;
        right: 1.3rem;
        line-height: 1.5rem;
        font-family: 'myicon';
        content: '\e90d';
        font-size: 0.8rem;
        color: #aaa;
      }
    }
    .bulb-box{
      width: 100%;
      height: 2.2rem;
      text-align: center;
      .bulb-light{
        width: 2.1rem;
        height: 2.2rem;
        margin: 0 0.27rem;
        display: inline-block;
        background-image: url("../../assets/styles/image/newertest/end/bulbLight.png");
        background-size: 100% 100%;
      }
      .bulb{
        width: 2.1rem;
        height: 2.2rem;
        margin: 0 0.27rem;
        display: inline-block;
        background-image: url("../../assets/styles/image/newertest/end/bulbDark.png");
        background-size: 100% 100%;
      }
    }
    .title{
      width: 100%;
      margin: 0.5rem 0;
      text-align: center;
      color: #fff;
      font-size: 0.65rem;
    }
    .level{
      width: 100%;
      text-align: center;
      color: #fff;
      font-size: 0.9rem;
    }
    .conclusion-box{
      margin: 1.5rem 0.75rem 0.75rem 0.75rem;
      padding: 1.25rem 0 1rem 1rem;
      border-radius: 0.5rem;
      background: #f6d33f url("../../assets/styles/image/newertest/end/man.png") 90% 50% no-repeat;
      background-size: 10%;
      .content{
        width: 72%;
        font-size: 0.65rem;
        color: #444;
        .man-level{
          color: #007aff;
        }
      }
    }
    .subjects-box{
      margin: 0.3rem 0.75rem;
      padding: 1.25rem 1rem 0.05rem 1rem;
      border-radius: 0.5rem;
      background-color: #fff;
      .subjects-title{
        font-size: 0.8rem;
        color: #444;
        text-align: center;
      }
      .label-box{
        margin-top: 2rem;
        font-size: 0.6rem;
        color: #333;
        .type{
          padding: 0.3rem 1rem;
          background-image: url("../../assets/styles/image/newertest/end/lableLong.png");
          background-size: 100%;
        }
        .label{
          background-repeat: no-repeat;
          margin-left: 0.7rem;
          padding: 0.3rem 1rem;
          background-image: url("../../assets/styles/image/newertest/end/lable2.png");
          background-size: 100%;
        }
      }
      .recommend{
        margin-top: 0.75rem;
        font-size: 0.65rem;
        color: #444;
      }
      .sub-box{
        position: relative;
        width: 15.25rem;
        height: 6.6rem;
        margin-bottom: 2rem;
        .pic{
          width: 15.25rem;
          height: 6.6rem;
        }
        .purchase{
          width: 14.75rem;
          line-height: 1.4rem;
          position: absolute;
          bottom: 0;
          color: #fff;
          background-color: #000;
          opacity: 0.3;
          text-align: right;
          font-size: 0.6rem;
          padding-right: 0.5rem;
        }
      }
    }
    .try-again{
      width: 84%;
      height: 2.2rem;
      margin: 1.2rem auto 0;
      text-align: center;
      color: #fff;
    }
    .play-icon{

    }
    .play-icon:after{
      top: 1px;
      left: 4px;
      position: relative;
      font-family: 'myicon';
      content: '\e907';
      font-size: 0.7rem !important;
    }
  }
</style>
<script>
  import Confirm from 'vux/confirm'
  import Scroller from 'vux/scroller'
  import {newertestGetters, userGetters} from '../../vuex/getters'
  const financialLevel = new Map([[1, '理财原始人'], [2, '理财古代人'], [3, '理财现代人']])

  export default {
    vuex: {
      getters: {
        testReport: newertestGetters.newertestReport,
        isLogin: userGetters.isLogin
      }
    },
    data () {
      return {
        scrollerHeight: '560px',
        remindLogin: false
      }
    },
    watch: {
      'testReport': function () {
        const me = this
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
              top: 0
            })
          })
        }, 300)
      }
    },
    computed: {
      isBulb2: function () {
        if (this.testReport.level === 2 || this.testReport.level === 3) {
          return 'bulb-light'
        }
          return 'bulb'
      },
      isBulb3: function () {
        if (this.testReport.level === 3) {
          return 'bulb-light'
        }
          return 'bulb'
      }
    },
      ready () {
        this.scrollerHeight = (window.document.body.offsetHeight - this.$els.titlebar.offsetHeight) + 'px'
      },

      methods: {
        onCancel () {
          if (this.isLogin) {
            this.$route.router.go('/main')
          } else {
            this.remindLogin = true
          }
        },
        getLevel (level) {
          return financialLevel.get(level)
        },
        tryAgain () {
          this.$route.router.go('/newertest/question')
        },
        //去登录
        toSave () {
          this.$route.router.go('/entry')
        },
        //不登录
        notSave () {
          this.$route.router.go('/main')
        },
        /**
         *  去对应的课程页
         */
        gotoSubjectDetail  () {
          this.$route.router.go('/subject/detail/P/1/0')
        }
      },
      components: {
        Confirm,
        Scroller
      }
  }
</script>
