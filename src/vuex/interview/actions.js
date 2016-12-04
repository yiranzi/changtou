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
        function (interviewRecordServer) {
          let paragraphArr = interviewRecordServer.paragraph
          const interviewRecord = paragraphArr.map(function (paragrap, index) {
            const subParagraphArr = paragrap.content.split('_#')
            let retObj = paragrap
            retObj.subParagraphArr = subParagraphArr
            delete retObj['content']
            return retObj
          })
          interviewRecordServer.paragraph = interviewRecord
          dispatch('INTERVIEW_LOAD_INTERVIEW_RECORD', interviewRecordServer)
          resolve()
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
