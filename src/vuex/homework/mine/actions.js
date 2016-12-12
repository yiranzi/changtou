/**
 * Created by jun on 2016/10/26.
 * 作业模块
 */
import {getWithinAuth} from '../../../frame/ajax'
import {getUrl} from '../../../frame/apiConfig'
/**
 * 获取我的作业列表
 * @returns {Promise}
 */

export const getHomeworkList = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth(
        {
          url: getUrl('homework_mine_list')
        }
      ).then(
        (homeworkList) => {
          const newHomeworkList = homeworkList.map(
            function (homeworkItem) {
              let item = Object.assign({}, homeworkItem)
              let choice = []
              let choiceTotal = 0
              let completeChoiceNum = 0
              let essay = []
              let essayTotal = 0
              let completeEssayNum = 0
              item.lessons.sort(
                function (former, latter) {
                  if (former.sequence < latter.sequence) {
                    return -1
                  } else if (former.sequence === latter.sequence) {
                    return 0
                  } else if (former.sequence > latter.sequence) {
                    return 1
                  }
                }
              )
              for (let i = 0, lessonLength = item.lessons.length; i < lessonLength; i++) {
                if (item.lessons[i].hasChoice === 'Y') {
                  choice.push({
                    lessonId: item.lessons[i].lessonId,
                    status: item.lessons[i].isChoicePassed === 'Y',
                    hasChoice: item.lessons[i].hasChoice === 'Y'
                  })
                }
                if (item.lessons[i].hasEssay === 'Y') {
                  essay.push({
                    essayType: item.lessons[i].essayType,
                    lessonId: item.lessons[i].lessonId,
                    status: item.lessons[i].essayStatus,
                    title: item.lessons[i].title,
                    hasEssay: item.lessons[i].hasEssay === 'Y',
                    type: item.lessons[i].type
                  })
                }
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
              if (choice.length > 0) {
                item.hasChoice = true
              }

              // 课程是否有问答题
              if (essay.length > 0) {
                item.hasEssay = true
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
          dispatch('UPDATE_MY_HOMEWORK_LIST', newHomeworkList)
          resolve(newHomeworkList)
        },
        err => reject(err)
      )
    }
  )
}
