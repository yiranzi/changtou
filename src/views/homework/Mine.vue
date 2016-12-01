/**
* Created by jun on 2016/12/1.
* 我的作业
*/
<template>
  <div class="my-homework">
    <ict-titlebar v-el:titlebar>我的作业</ict-titlebar>
    <!--<scroller :lock-x="true" scrollbar-y v-ref:scroller :height.sync="scrollerHeight">-->
      <!--<div class="subject-item" v-for="(subject, $index) in homeworkList">-->
        <!--<div class="subject-info" v-touch:tap="onSubjectTap(subject, $index)">-->
          <!--<p>{{subject.title}} <span>{{subjectStatus[subject.status]}}</span></p>-->
          <!--<p v-if="subject.hasChoice">课后测试进度{{subject.completeChoiceNum}}/{{subject.choiceTotal}}</p>-->
          <!--<p>{{subject.hasChoice ? '选修作业' : '课后作业'}}进度{{subject.completeEssayNum}}/{{subject.essayTotal}}</p>-->
        <!--</div>-->
        <!--<div v-show="clsList ? ((clsList.length > 0 && clsList[$index]) ? clsList[$index].isUnfold : false) : false">-->
          <!--<div class="latest-notice">-->

          <!--</div>-->

          <!--<div class="choice-item"  v-if="subject.hasChoice">-->
            <!--<p>课后测试</p>-->
          <!--<span v-for="choice in subject.choice">-->
            <!--<span v-if="choice.hasChoice" v-touch:tap="onChoiceTap(choice)">第{{chinaNum[$index]}}课</span>-->
          <!--</span>-->
          <!--</div>-->

          <!--<div class="essay-item">-->
            <!--<p>{{subject.hasChoice ? '选修作业' : '课后作业'}}</p>-->
            <!--<p v-for="essay in subject.essay">-->
              <!--<span v-if="essay.hasEssay" v-touch:tap="onEssayTap(essay)">{{essay.title}}<span>{{essayStatus[essay.status]}}</span></span>-->
            <!--</p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</scroller>-->
  </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Scroller from 'vux/scroller'
  import {myHomeworkGetters} from '../../vuex/getters'
  import {myHomeworkActions, essayActions, choiceActions} from '../../vuex/actions'
  export default {
    vuex: {
      getters: {
        myHomework: myHomeworkGetters.myHomework
      },
      actions: {
        getMyHomework: myHomeworkActions.getMyHomework,
        setEssayQuestion: essayActions.setEssay,
        getArticle: essayActions.getArticle,
        setChoiceQuestion: choiceActions.setChoice,
        getReport: choiceActions.getReport
      }
    },
    data () {
      return {
        subjectStatus: {
          'N': '在读中',
          'E': '已过期',
          'Y': '已毕业',
          'P': '暂停',
          'I': '未激活'
        },
        essayStatus: ['已提交', '', '未通过', '已通过'],
        chinaNum: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
        scrollerHeight: '0px',
        hasChoice: false,
        clsList: []
      }
    },
    computed: {
      homeworkList () {
        return this.myHomework.map(
          function (item) {
            let choice = []
            let choiceTotal = 0
            let completeChoiceNum = 0
            let essay = []
            let essayTotal = 0
            let completeEssayNum = 0
            for (let i = 0, lessonLength = item.lessons.length; i < lessonLength; i++) {
              choice.push({
                lessonId: item.lessons[i].lessonId,
                status: item.lessons[i].isChoicePassed === 'Y',
                hasChoice: item.lessons[i].hasChoice === 'Y'
              })
              essay.push({
                lessonId: item.lessons[i].lessonId,
                status: item.lessons[i].essayStatus,
                title: item.lessons[i].title,
                hasEssay: item.lessons[i].hasEssay === 'Y',
                type: item.lessons[i].type
              })
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
            item.choice = choice // 选择题
            item.essay = essay // 问答题
            item.choiceTotal = choiceTotal // 选择题总数
            item.essayTotal = essayTotal // 问答题总数
            item.completeChoiceNum = completeChoiceNum // 选择题进度
            item.completeEssayNum = completeEssayNum // 问答题进度

            // 课程是否有选择题
            let hasChoice = choice.findIndex(
              function (choiceItem) {
                if (choiceItem.hasChoice) {
                  return true
                }
              }
            )
            if (hasChoice > 0) {
              item.hasChoice = true
            }

            // 课程是否打开
            if (item.status === 'N') {
              item.isUnfold = true
            } else {
              item.isUnfold = false
            }
            return item
          }
        )
      }
    },
    watch: {

    },
    route: {
      data () {
        const me = this
        setTimeout(
          function () {
//            me.setScrollerHeight()
          }, 300
        )

        me.getMyHomework().then(
          (homeworkList) => {
            me.clsList = homeworkList.map(
              ({status}) => {
                return {isUnfold: status === 'N'}
              }
            )
          }
        ).catch(
          err => me.showAlert(err.message)
        )
      }
    },
    ready () {

    },
    methods: {
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
      /**
       * 点击课程
       */
      onSubjectTap (index, subject) {
        console.log('onSubjectTap', index)
        if (subject.status !== 'P') {
          let item = this.clsList[index]
          item.isUnfold = !item.isUnfold
          this.clsList.$set(index, item)
        }
      },
      /**
       * 选择题被点击
       **/
      onChoiceTap (lessonId) {
        const me = this
        // todo me.setChoiceQuestion(choiceQuestionArr)
        me.getReport(lessonId).then(
          report => {
            if (report.kpScore) {
              // 做过选择题
              me.$route.router.go('homework/choice/mark')
            } else {
              // 没做过
              me.showChoice = true
            }
          }
        ).catch(
            err => console.log(err.message)
        )
      },
      /**
       * 点击问答题
       * @param lessonId
      */
      onEssayTap (lessonId) {
        const me = this
        // todo me.setEssayQuestion(essayQuestion)
        me.getArticle(lessonId).then(
          evaluation => {
            if (evaluation && evaluation.status !== null) {
              switch (evaluation.status) {
                case 0://作业已提交
                  me.goEssayMark(lessonId)
                  break
                case 1://草稿已提交 写作业
                  me.goEssayAnswer(lessonId)
                  break
                case 2://已批改 未通过 查看作业
                  me.goEssayMark(lessonId)
                  break
                case 3://已批改 通过 查看作业
                  me.goEssayMark(lessonId)
                  break
                default:
                  me.goEssayMark(lessonId)
                  break
              }
            } else {
              me.goEssayAnswer(lessonId)
            }
          }
        ).catch(
          err => console.log(err.message)
        )
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
          () => me.$route.router.go('/homework/essay/answer')
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
    .subject-item{

    }
    /* 必需 */
    .expand-transition {
      transition: all 0.3s ease;
      opacity: 1;
    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .expand-enter {
      height: 0 !important;
      opacity: 0;
    }
    .expand-leave {
      height: 0 !important;
      opacity: 0;
    }
  }
</style>
