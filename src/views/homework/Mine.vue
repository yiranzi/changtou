/**
* Created by jun on 2016/12/1.
* 我的作业
*/
<template>
  <div class="my-homework">
    <ict-titlebar v-el:titlebar :right-options="rightOptions">我的作业
      <a slot="right">草稿箱</a>
    </ict-titlebar>
    <scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">
      <div>
        <div class="subject-panel" v-for="subject in homeworkList">
          <div  v-if="subject.choiceTotal || subject.essayTotal">
            <div class="subject-item" v-touch:tap="onSubjectTap($index, subject)">
              <p>{{subject.title}}
                <span class="subject-status">{{subjectStatus[subject.status]}}</span>
                <span class="subject-info">{{subjectInfo[subject.status]}}</span>
              </p>
            </div>

            <div v-show="clsList ? ((clsList.length > 0 && clsList[$index]) ? clsList[$index].isUnfold : false) : false">
              <div class="subject-progress">
                <p class="modules-title">进度</p>
                <p v-if="subject.choiceTotal">课后测试进度 <span class="curr-progress">{{subject.completeChoiceNum}}</span>/{{subject.choiceTotal}}</p>
                <p>{{subject.choiceTotal ? '选修作业' : '课后作业'}}进度 <span class="curr-progress">{{subject.completeEssayNum}}</span>/{{subject.essayTotal}}</p>
              </div>

              <div class="latest-notice">

              </div>

              <div class="choice-panel"  v-if="subject.choiceTotal">
                <p class="modules-title">课后测试</p>
                <span v-for="choice in subject.lessons">
                  <span v-if="choice.hasChoice === 'Y'" v-touch:tap="onChoiceTap(choice)"  class="choice-item">
                    <span :class="{'unavailable':!choice.available}">第{{chinaNum[$index]}}课</span>
                    <img v-if="isChoicePassed === 'Y'" class="choice-status" src="../../assets/styles/image/homework/mine/passed.png">
                  </span>
                </span>
              </div>

              <div class="essay-panel" v-if="subject.essayTotal">
                <p  class="modules-title">{{subject.hasChoice ? '选修作业' : '课后作业'}}</p>
                <div v-for="essay in subject.lessons">
                  <p v-if="essay.hasEssay === 'Y'" v-touch:tap="onEssayTap(essay)" class="essay-item">
                      <span :class="{'unavailable':!essay.available}">{{essay.title}}</span>
                    <span class="essay-status">{{essayStatus[essay.essayStatus]}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="height: 2rem"></div>
      </div>
    </scroller>
  </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import {homeworkListGetters, courseRecordsGetters} from '../../vuex/getters'
  import {homeworkListActions, essayActions, choiceActions} from '../../vuex/actions'
  export default {
    vuex: {
      getters: {
        myHomework: homeworkListGetters.homeworkList,
        expenseRecords: courseRecordsGetters.expenseRecords
      },
      actions: {
        getMyHomework: homeworkListActions.getHomeworkList,
        getArticle: essayActions.getArticle,
        getReport: choiceActions.getReport
      }
    },
    data () {
      return {
        rightOptions: { //titlebar
          callback: this.onDraftsTap,
          disabled: false
        },
        subjectStatus: {
          'N': '在读中',
          'E': '已过期',
          'Y': '已毕业',
          'P': '暂停',
          'I': '未激活'
        },
        subjectInfo: {
          'N': '',
          'E': '查看详情》',
          'Y': '查看详情》',
          'P': '暂停中..',
          'I': ''
        },
        essayStatus: {0: '已提交', 2: '未通过', 3: '已通过'},
        chinaNum: {1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九'},
        scrollerHeight: '0px',
        clsList: []
      }
    },
    computed: {
      homeworkList () {
        const me = this
        return this.myHomework.map(
          function (homeworkItem) {
            let item = Object.assign({}, homeworkItem)
            let choiceTotal = 0
            let completeChoiceNum = 0
            let essayTotal = 0
            let completeEssayNum = 0

            // 获取课程进度信息
            let subjectRecords = me.expenseRecords.find(
              function (record) {
                return record.subjectId === item.subjectId
              }
            )
            let lessonIds = subjectRecords ? subjectRecords.lessonSet.lessonIds : []

            for (let i = 0, lessonLength = item.lessons.length; i < lessonLength; i++) {
              // 作业是否可以进入
              item.lessons[i].available = item.status === 'N' && lessonIds.indexOf(item.lessons[i].lessonId) >= 0

              if (item.lessons[i].hasChoice === 'Y') {
                choiceTotal++
              }
              if (item.lessons[i].hasEssay === 'Y') {
                essayTotal++
              }
              if (item.lessons[i].isChoicePassed === 'Y') {
                completeChoiceNum++
              }
              if (item.lessons[i].essayStatus === 3) {
                completeEssayNum++
              }
            }

            item.choiceTotal = choiceTotal // 选择题总数
            item.essayTotal = essayTotal // 问答题总数
            item.completeChoiceNum = completeChoiceNum // 选择题进度
            item.completeEssayNum = completeEssayNum // 问答题进度

            return item
          }
        )
      }
    },
    route: {
      data () {
        const me = this
        setTimeout(
          function () {
            me.setScrollerHeight()
          }, 500
        )

        me.getMyHomework().then(
          (homeworkList) => {
            me.clsList = homeworkList.map(
              ({status}) => {
                return {isUnfold: status === 'N'}
              }
            )
          }
        )
      }
    },
    methods: {
      /**
       * 点击 草稿箱
       */
      onDraftsTap () {
        this.$route.router.go('/homework/drafts')
      },

      setScrollerHeight () {
        const me = this
        me.scrollerHeight = window.document.body.offsetHeight - me.$els.titlebar.offsetHeight + 'px'
        setTimeout(function () {
          me.$nextTick(() => {
            me.$refs.scroller.reset({
            top: 0
          })
        })
        }, 200)
      },

      refreshScroller () {
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.scroller._xscroll.resetSize()
          })
        }, 50)
      },

      /**
       * 点击课程
       */
      onSubjectTap (index, subject) {
        if (subject.status !== 'P') {
          let item = this.clsList[index]
          item.isUnfold = !item.isUnfold
          this.clsList.$set(index, item)
          this.refreshScroller()
        }
      },
      /**
       * 选择题被点击
       * @param choice
       **/
      onChoiceTap (choice) {
        if (choice.available) {
          const me = this
          me.getReport(choice.lessonId).then(
            report => {
              if (report.kpScore) {
                // 做过选择题
                me.$route.router.go('/homework/choice/mark')
              } else {
                // 没做过
                me.$route.router.go(`/homework/choice/answer/${choice.lessonId}`)
              }
            }
          ).catch(
            err => console.log(err.message)
          )
        }
      },
      /**
       * 点击问答题
       * @param essay
      */
      onEssayTap (essay) {
        const me = this
        if (essay.available) {
          if (essay.essayType === 'N') {
            // 简单作业
            me.getArticle(essay.lessonId).then(
              evaluation => {
                if (evaluation && evaluation.status !== null) {
                  switch (evaluation.status) {
                    case 0://作业已提交
                      me.goEssayMark(essay.lessonId)
                      break
                    case 1://草稿已提交 写作业
                      me.goEssayAnswer(essay.lessonId)
                      break
                    case 2://已批改 未通过 查看作业
                      me.goEssayMark(essay.lessonId)
                      break
                    case 3://已批改 通过 查看作业
                      me.goEssayMark(essay.lessonId)
                      break
                    default:
                      me.goEssayMark(essay.lessonId)
                      break
                  }
                } else {
                  me.goEssayAnswer(essay.lessonId)
                }
              }
            ).catch(
              err => console.log(err.message)
            )
          } else if (essay.essayType === 'Y') {
            // 复杂作业
            me.showAlert(`该课作业为复杂的图表作业。为了您更好的完成作业，真实的反映你的学习水平，请前往长投网www.ichangtou.com，完成该课作业。`)
          }
        }
      },

      goEssayMark (lessonId) {
        const me = this
        this.getArticle(lessonId).then(
          () => me.$route.router.go('/homework/essay/mark')
        ).catch(
            err => console.warn(err)
        )
      },

      goEssayAnswer (lessonId) {
        const me = this
        this.getArticle(lessonId).then(
          () => me.$route.router.go(`/homework/essay/answer/${lessonId}`)
        ).catch(
            err => console.warn(err)
        )
      }
    },
    components: {
      IctTitlebar,
      Scroller
    }
  }
</script>
<style lang="less">
  .my-homework{
    width: 100%;
    height: 100%;
    background: #fff;
    p{
      margin: 0;
    }
    .subject-panel{
      position: relative;
      .subject-item{
        height: 110/40rem;
        line-height: 110/40rem;
        margin: 40/40rem 30/40rem;
        padding: 0 30/40rem;
        background: #f0eff5;
        font-size: 30/40rem;
        color: #444;
      }
      .subject-status{
        display: inline-block;
        height: 32/40rem;
        line-height: 32/40rem;
        width: 72/40rem;
        margin-left: 20/40rem;
        border: 1px solid #00b0f0;
        text-align: center;
        font-size: 20/40rem;
        color: #00b0f0;
      }
      .subject-info{
        position: absolute;
        right: 60/40rem;
        font-size: 24/40rem;
        color: #999;
      }
    }
    .modules-title{
      position: relative;
      padding-bottom: 30/40rem;
      font-size: 28/40rem;
      color: #00b0f0;
      &:before{
        content: ' ';
        display: inline-block;
        height: 16/40rem;
        width: 16/40rem;
        position: absolute;
        z-index: 1;
        top: (28-16)/40rem;
        left: -30/40rem;
        border-radius: 50%;
        background: #00b0f0;
      }
    }
    .subject-progress:before, .choice-panel:before, .essay-panel:before {
      content: ' ';
      height: 100%;
      width: 1px;
      position: absolute;
      top: (40+28-16)/40rem;
      left: 38/40rem;
      background: #f0eff5;
    }
    .essay-panel:before {
      height: 50%;
    }
    .subject-progress, .choice-panel, .essay-panel{
      position: relative;
      padding: 20/40rem 60/40rem 30/40rem;
      box-sizing: border-box;
      font-size: 26/40rem;
      color: #aaa;
      .curr-progress{
        color: #00b0f0;
      }
    }
    .choice-panel{
      padding: 20/40rem 0 10/40rem 60/40rem;
      font-size: 0;
      .choice-item{
        position: relative;
        display: inline-block;
        width: 190/40rem;
        height: 60/40rem;
        line-height: 60/40rem;
        margin: 0 20/40rem 20/40rem 0;
        border: 1px solid #ddd;
        text-align: center;
        font-size: 26/40rem;
        color: #666;
        .unavailable{
          color: #ddd;
        }
        .choice-status{
          width: 40/40rem;
          height: 40/40rem;
          position: absolute;
          top: -1px;
          right: -1px;
        }
      }

      .choice-item:nth-of-type(3n){
        margin: 0 0 20/40rem 0;
      }


    }
    .essay-panel{
      border-bottom: 20/40rem solid #f0eff5;
      .essay-item{
        position: relative;
        line-height: 88/40rem;
        font-size: 26/40rem;
        color: #666;
        .unavailable{
          color: #ddd;
        }
        .essay-status{
          position: absolute;
          right: 0;
          color: #007aff;
        }
        &:after{
          content: ' ';
          width: 100%;
          height: 1px;
          background: #f0eff5;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
</style>
