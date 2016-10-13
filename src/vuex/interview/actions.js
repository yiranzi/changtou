/**
 * Created by dongdong on 2016/10/11.
 */
import {getWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

//加载访谈列表
export const loadInterviewList = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('load_interview_list')
      }).then(
        function (interviewList) {
          dispatch('INTERVIEW_LOAD_INTERVIEW_LIST', interviewList)
          resolve()
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
//加载访谈内容
export const loadInterviewRecord = ({ dispatch }, interviewId) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('load_interview_record').replace(':interviewId', interviewId)
      }).then(
        function (interviewRecord) {
          let paragraphArr = interviewRecord.paragraph
          for (let i = 0; i < paragraphArr.length; i++) {
            let subParagraphArr = paragraphArr[i].content.split('_#')
            paragraphArr[i].subParagraphArr = subParagraphArr
            delete paragraphArr[i]['content']
          }
          dispatch('INTERVIEW_LOAD_INTERVIEW_RECORD', interviewRecord)
          resolve()
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
