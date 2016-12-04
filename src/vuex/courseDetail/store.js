/**
 * Created by zl on 2016/8/27.
 * 所有课程页面
 *  expenseDetail [] 数据格式如下:
 *     teacher: "小熊之家"
       background: "长投网创始人、资深投资者。从2007年到2015年，个人美股投资累计收益263%，平均年化收益率12%；从2013年到2015年，A股投资累计收益203%，平均年化收益率32.7%。"
       acquisitions: Array[3]
         0: Object
            content: "拥有更多投资选择——期权、涡轮、分级基金等"
            pic: "http://source.ichangtou.com/file/pic/course/p/5/acquisition/1.png"
         1: Object
         2: Object
       type: "M"
       notice: Array[4]
         0: "<span>有效期：</span>30天、购买后需手动激活，激活后开启30天倒计时"
         1: "<span>作业：</span>每一课都有作业、提交作业后才能进入下一课学习"
         2: "<span>课程时长：</span>3-4小时"
         3: "<span>学习形式：</span>在线学习"
       feature: "<b>高手授课</b>——长投网创始人小熊之家、私募基金经理微光破晓、投资高手安道全共同授课。<br/><br/><b>重在实战</b>——三位老师分享多年投资实战过程中积累的经验、方法和策略，让你面对市场不再恐惧！<br/><br/><b>拓宽视野</b>——介绍基于股票的金融衍生品、不同的投资策略，打开你的投资视野，提供更多的投资选择。"
       features: Array[4]
         0: Object
             content: "三位投资高手首次共同授课"
             pic: "http://source.ichangtou.com/file/pic/course/p/5/feature/1.png"
             title: "高手授课"
         1: Object
         2: Object
         3: Object
       description: "牛市赚钱熊市亏损，等于竹篮打水一场空；只有做到牛市熊市都赚钱，这才是真正有实力的投资者。<br/><br/>所以，你需要学习这门股市实战课，因为它介绍了基于股票市场的衍生投资品、更有效的投资策略、更实用的投资技巧，为你的投资保驾护航，让你穿越牛熊都赚钱！"
       relatedMajorSubjectTitle: null
       period: 30
       pic: "http://source.ichangtou.com/file/pic/course/p/5/demonstration/demonstration.png"
       portrait: "http://source.ichangtou.com/file/pic/portrait/d9a3e3f2/1.png"
       price: 880
       relatedMajorSubjectId: 0
       similarSubjects: Array[4]
         0: Object
           pic: "http://source.ichangtou.com/file/pic/course/p/18/surface/surface.png"
           price: 1080
           promotion: null
           subjectId: 18
           title: "如虎添翼的量化实战课"
           type: "P"
         1: Object
         2: Object
         3: Object
       studentCount: 3901
       studentFeedbackUrl: "http://source.ichangtou.com/file/pic/course/p/5/feedback/feedback.png"
       subtitle: "牛市熊市都赚钱"
       title: "股票投资实战课",
 *
 */
const state = {
  freeDetailArr: [],
  expenseDetailArr: []
}

const mutations = {
  /**
   * 增加或者更新付费课程信息到列表中
   */
  DETAIL_UPDATE_FREE_SUBJECT (state, {subjectId, subject}) {
    //查找元素是否存在
    let index = findSubjectIndexInDetailArr(subjectId, state.freeDetailArr)

    if (index > 0) { // 若存在,更新
      subject['subjectId'] = subjectId
      state.freeDetailArr.$set(index, Object.assign({}, subject))
    } else { //不存在,插入
      subject['subjectId'] = subjectId
      state.freeDetailArr.push(subject)
    }
  },

  /**
   * 增加或者更新付费课程信息到列表中
   */
  DETAIL_UPDATE_EXPENSE_SUBJECT (state, {subjectId, subject}) {
    //查找元素是否存在
    const index = findSubjectIndexInDetailArr(subjectId, state.expenseDetailArr)

    if (index > -1) { // 若存在,更新
      subject['subjectId'] = subjectId
      state.expenseDetailArr.$set(index, Object.assign({}, subject))
    } else { //不存在,插入
      subject['subjectId'] = subjectId
      state.expenseDetailArr.push(subject)
    }
  },

  /**
   * 更新lessons列表
   *
   * @param lessons []
   */
  DETAIL_UPDATE_EXPENSE_LESSIONS (state, {subjectId, lessons}) {
    //查找元素是否存在
    const index = findSubjectIndexInDetailArr(subjectId, state.expenseDetailArr)

    if (index > -1) { // 若存在,更新
      state.expenseDetailArr.$set(index, Object.assign(state.expenseDetailArr[index], {lessons: lessons}))
    } else { //不存在,插入
      let subject = {subjectId, lessons: lessons}
      state.expenseDetailArr.push(subject)
    }
  }

  //TEST_SUBJECTS (state) {
  //  //state.expenseDetailArr.$set(0, Object.assign(state.expenseDetailArr[0], {teacher: 'xsxsxsx'}))
  //  state.expenseDetailArr = Object.assign({}, state.expenseDetailArr, {teacher: 'xsxsxsx', x: 2222})
  //}
}

export default {
  state,
  mutations
}

/**
 * 获取数组中特定subject的位置
 * @param subjectId
 * @param arr
 */
const findSubjectIndexInDetailArr = (subjectId, arr) => {
  return arr.findIndex((element, index, array) => {
    return element.subjectId === subjectId
  })
}
