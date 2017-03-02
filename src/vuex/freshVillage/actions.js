/**
 * Created by jun on 2017/3/1
 */
import {getWithoutAuth, postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'

//新手村全部资料
const material = [
  {
    chapterNo: 1, //章节序号
    title: '', //章节标题
    story: '', // 章节故事
    task: '',  //章节任务
    questionArr: [
      {
        questionText: '',  // 题目问题
        options: [],     // 题目选项
        answer: '',     // 题目最佳答案
        feedback: '',   // 答题反馈
        extendsMaterialType: '', // 其他扩展资料类型
        proverbs: '',      // 投资箴言
        emergency: {      // 突发事件
          story: '',        // 故事
          score: ''        // 被扣掉的生命值
        },
        wisdom: {
          title: '',    //今日小智标题
          content: ''   // 今日小智内容
        }
      }
    ]
  },
  {

  }
]
/**
 * 获取吐槽内容列表
 * @param dispatch
 * @param index
 * @param size
 * @returns {Promise}
 */
export const getAdvise = ({ dispatch }, index, size) => {
  return new Promise(
    (resolve, reject) => {
      getWithoutAuth({
        url: getUrl('village_get_proposal_list').replace(':pageIndex', index).replace(':pageSize', size)
      }).then(
        function (advise) {
          dispatch('LOAD_VILLAGE_ADVISE', advise)
          resolve(advise)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

/**
 * 提交吐槽
 * @param dispatch
 * @param advise
 * @returns {Promise}
 */
export const submitAdvise = ({ dispatch }, advise) => {
  return new Promise(
    (resolve, reject) => {
      postWithinAuth({
        url: getUrl('village_submit_proposal_list'),
        data: advise
      }).then(
        function () {
          resolve()
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
