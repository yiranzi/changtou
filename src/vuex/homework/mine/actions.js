/**
 * Created by jun on 2016/10/26.
 * 作业模块
 */
//import {getWithinAuth} from '../../../frame/ajax'
//import {getUrl} from '../../../frame/apiConfig'
/**
 * 获取我的作业列表
 * @returns {Promise}
 */

export const getMyHomework = ({dispatch}) => {
  return new Promise(
    (resolve, reject) => {
      //getWithinAuth(
      //  {
      //    url: getUrl('homework_mine_list')
      //  }
      //).then(
      //  () => {
          let homeworkList = [
            {
              'subjectId': 4,
              'status': 'N',
              'title': '股票投资初级课',
              'lessons': [
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第零课 长投学堂引言（免费）',
                  'hasEssay': 'N',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'N',
                  'type': 'C',
                  'sequence': 16,
                  'lessonId': 16
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'Y',
                  'title': '初级第壹课 公司分析的基础 - 年报三表（上）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'F',
                  'sequence': 17,
                  'lessonId': 17
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第贰课 公司分析的基础 - 年报三表（下）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 18,
                  'lessonId': 18
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第叁课 公司盈利的源泉',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 19,
                  'lessonId': 19
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第肆课 步入量化投资（上）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 20,
                  'lessonId': 20
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第伍课 步入量化投资（下）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 21,
                  'lessonId': 21
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第陆课 有没有一劳永逸的神奇公式？',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'L',
                  'sequence': 22,
                  'lessonId': 22
                }
              ]
            },
            {
              'subjectId': 4,
              'status': 'N',
              'title': '股票投资初级课',
              'lessons': [
                {
                  'subjectId': 4,
                  'title': '初级第零课 长投学堂引言（免费）',
                  'hasEssay': 'N',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'type': 'C',
                  'sequence': 16,
                  'lessonId': 16
                },
                {
                  'subjectId': 4,
                  'title': '初级第壹课 公司分析的基础 - 年报三表（上）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'type': 'F',
                  'sequence': 17,
                  'lessonId': 17
                },
                {
                  'subjectId': 4,
                  'title': '初级第贰课 公司分析的基础 - 年报三表（下）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'type': 'N',
                  'sequence': 18,
                  'lessonId': 18
                },
                {
                  'subjectId': 4,
                  'title': '初级第叁课 公司盈利的源泉',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'type': 'N',
                  'sequence': 19,
                  'lessonId': 19
                },
                {
                  'subjectId': 4,
                  'title': '初级第肆课 步入量化投资（上）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'type': 'N',
                  'sequence': 20,
                  'lessonId': 20
                },
                {
                  'subjectId': 4,
                  'title': '初级第伍课 步入量化投资（下）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'type': 'N',
                  'sequence': 21,
                  'lessonId': 21
                },
                {
                  'subjectId': 4,
                  'title': '初级第陆课 有没有一劳永逸的神奇公式？',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'type': 'L',
                  'sequence': 22,
                  'lessonId': 22
                }
              ]
            },
            {
              'subjectId': 4,
              'status': 'P',
              'title': '股票投资初级课',
              'lessons': [
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第零课 长投学堂引言（免费）',
                  'hasEssay': 'N',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'N',
                  'type': 'C',
                  'sequence': 16,
                  'lessonId': 16
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'Y',
                  'title': '初级第壹课 公司分析的基础 - 年报三表（上）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'F',
                  'sequence': 17,
                  'lessonId': 17
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第贰课 公司分析的基础 - 年报三表（下）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 18,
                  'lessonId': 18
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第叁课 公司盈利的源泉',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 19,
                  'lessonId': 19
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第肆课 步入量化投资（上）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 20,
                  'lessonId': 20
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第伍课 步入量化投资（下）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 21,
                  'lessonId': 21
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第陆课 有没有一劳永逸的神奇公式？',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'L',
                  'sequence': 22,
                  'lessonId': 22
                }
              ]
            },
            {
              'subjectId': 4,
              'status': 'Y',
              'title': '股票投资初级课',
              'lessons': [
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第零课 长投学堂引言（免费）',
                  'hasEssay': 'N',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'N',
                  'type': 'C',
                  'sequence': 16,
                  'lessonId': 16
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'Y',
                  'title': '初级第壹课 公司分析的基础 - 年报三表（上）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'F',
                  'sequence': 17,
                  'lessonId': 17
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第贰课 公司分析的基础 - 年报三表（下）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 18,
                  'lessonId': 18
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第叁课 公司盈利的源泉',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 19,
                  'lessonId': 19
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第肆课 步入量化投资（上）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 20,
                  'lessonId': 20
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第伍课 步入量化投资（下）',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'N',
                  'sequence': 21,
                  'lessonId': 21
                },
                {
                  'subjectId': 4,
                  'isChoicePassed': 'N',
                  'title': '初级第陆课 有没有一劳永逸的神奇公式？',
                  'hasEssay': 'Y',
                  'essayType': 'N',
                  'essayStatus': -1,
                  'hasChoice': 'Y',
                  'type': 'L',
                  'sequence': 22,
                  'lessonId': 22
                }
              ]
            }
          ]
          dispatch('UPDATE_MY_HOMEWORK_LIST', homeworkList)
          resolve(homeworkList)
        //},
        //err => reject(err)
    //  )
    }
  )
}
