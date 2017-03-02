/**
 * Created by jun on 2017/3/1
 */
import {getWithoutAuth, postWithinAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
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

/*
* 获取章节卡片内容
* */
export const getChapterCardInfo = ({dispatch}) => {
  let chapterCardInfo = []
  for (let i = 0; i < material.length; i++) {
    chapterCardInfo.push({chapterNo: material[i].chapterNo, title: material[i].title, cover: material[i].cover})
  }
  return chapterCardInfo
}
/*
* 获取某一章节
* */
export const getChapterContent = ({dispatch}, chapterNo) => {
  return material.find((chapter) => {
     return chapter.chapterNo === chapterNo
  })
}
/*
 * 获取对应章节故事，任务
 * */
export const getChapterStory = ({dispatch}, chapter) => {
  return {story: chapter.story, task: chapter.task}
}
/*
* 获取某一章节的某道题目
* */
export const getQuestion = ({dispatch}, questionArr, questionNo) => {
  return questionArr.find((questions) => {
     return questions.questionNo === questionNo
  })
}
/*
 * 增加资料规则：
 * 答题过程中的生命值不计入
 * questionText的前后两部分用#隔开
 * proverbs和wisdom的content  大段开始添加$#表示，结束用#$表示(后期处理时替换为<div></div>)，
 *                           小段开始用&*表示，结束*&用表示,段间无换行空格(后期处理时用<p></p>替换)
 * proverbs中的作者用@+  +@扩起来(后期处理时使用<span></span>替换)
 * expandsMaterialType 类型1:今日小智2:投资箴言,3:突发事件
 * answer A为1，B为2, C为3, D为4
 * */
/*
 * 新手村全部资料
 * */
const material = [
  {
    chapterNo: 1, //章节序号
    title: '一封陌生人的来信', //章节标题
    story: '某天小明收到一封神秘的信件，据说是从一位远方亲戚那里邮寄过来的信。先不管谁寄来的，重要的是小明马上会变成豪，一位继承了一大笔遗产的富豪。小明天天想着能有一大笔钱就好了，这下真有了一大笔钱，这该如何是好。', // 章节故事
    task: '帮助小明想想怎么安排这笔遗产',  //章节任务
    cover: '../../../static/image/freshVillage/chapter1-cover.png',  //章节图片
    questionArr: [
      {
        questionNo: 1, // 题目序号
        questionText: '天啦，有钱啦！有钱啦!#自己最想怎么花？',  // 题目问题
        options: ['带着钱一起去环游世界', '激情去股市来一发', '赶快去抢房啦', '弄去银行吃一辈子利息 '],     // 题目选项
        answer: 4,     // 题目最佳答案
        feedback: '爽，啥都不用干就有这么多钱，有钱了想怎么花就怎么花。今天花，明天花…直到花完最后一分钱，然后难道又有个某某亲戚巨额遗产等着你继承。天若果真这样，此刻起我要紧紧抱住你大腿！',   // 答题反馈
        expandsMaterialType: 1, // 其他扩展资料类型1:今日小智2:投资箴言,3:突发事件
        wisdom: {
          title: '积谷防饥',    //今日小智标题
          content: '$#&*在很久很久以前,有一个妇人,她每天煮饭的时候,总是从锅里抓一把米出来,放到一个特备的米缸中。有人讥笑过她这种行为,但她不以为意,依然故我。*&&*过了不久,发生了灾害,地里粮食严重歉收,很多人家都揭不开锅了。但这位妇人家由于有一个特备的米缸,得以熬过了饥荒。*&#$$#点评:生活中很多人头脑中没有理财的概念,认为只有富贵人家或炒股发达等赚大钱的人才谈得上理财。但真正的理财专家认为,理财是管理财产的学问,并不是富人才需要,生活中的每个人都要懂得如何分配每月的收入与支出,这样才能做到“积谷防饥”,从温饱逐渐走向小康。#$$#人们常有的一种通病,就是有钱时随意乱花,不懂得储蓄,到了急用时才发现钱到用时方恨少。' +
          '积谷防饥,意思是学习如何规划自己所赚来的钱,该用的就用,能不用的就储蓄起来,以防将来不时之需。当危机来临时,因为已做好准备,就可以安枕无忧地渡过难关。#$'   // 今日小智内容
        },
        proverbs: '',      // 投资箴言
        emergency: {      // 突发事件
          emergencyStory: '',        // 故事
          lifeScore: ''        // 增加或减少的生命值
        }
      },
      {
        questionNo: 2,
        questionText: '小明，明天上班中午饭我请你去小酒楼搓一顿。好好感谢你上次在领导面前帮我说了几句，让我免受挨骂。#上班？现在有钱了这班是上还是不上？',
        options: ['甩门而出让工作见鬼去', '班吗可以上但得挪个窝', '什么事也没发生该干嘛干嘛', '哎呦不知道嘞先躲起来再说'],
        answer: 3,
        feedback: '我上班就是为了钱，不要跟我谈理想，我的理想就是不上班。”这是朋友圈里近来刷爆了一条信息。上班一定就是为了挣钱吗？真的不是。如果是，可能是你选择了一条安逸的路。',
        expandsMaterialType: 2,
        proverbs: '&*不断学习的人现实生活中也会持续进步*&&*我不断发现，那些出人头地的人并不是最聪明的，有时甚至不是最勤奋的，可他们如同学习的机器。他们每晚上床睡觉时已经比当天起床时更聪明了些。这么做是有帮助的。当你给自己设定了长远的目标时，这种做法的帮助就特别大。*&@+查理·芒格+@',
        emergency: {
          emergencyStory: '',
          lifeScore: ''
        },
        wisdom: {
          title: '',
          content: ''
        }
      },
      {
        questionNo: 3,
        questionText: '',
        options: [],
        answer: 4,
        feedback: '',
        extendsMaterialType: '',
        proverbs: '',
        emergency: {
          emergencyStory: '',
          lifeScore: ''
        },
        wisdom: {
          title: '',
          content: ''
        }
      },
      {
        questionNo: 4,
        questionText: '小明相机又出新款了，据说比上一款性能要好的没话说。虽说咱手上的' +
        '这两款刚买不久用起来也不错。可是有新款哦，是新款哦，我打算再入手一款。#小明你怎么想，买还是不买啊？',
        options: ['买啊这是必须的', '哪个贵就买哪个好了', '手里的还能用买多了占地方', '我有钱买两台送你一台'],
        answer: 4,
        feedback: '人在江湖飘，哪能不挨刀？其中一刀，就是各种借钱。通常来说，对方要借钱，必然早就想好了借钱理由，你要做的，是根据对对方的了解，判断这个理由是否成立，并评估风险。',
        extendsMaterialType: 3,
        proverbs: '',
        emergency: {
          emergencyStory: '近来几天天气骤变，昨晚跟朋友几个出门嗨没多注意，惹上了流感今天要去看医生。共计花去100元。',
          lifeScore: '-3'
        },
        wisdom: {
          title: '',
          content: ''
        }
      }
    ]
  },
  {
    chapterNo: 2,
    title: '10万块让我如何待你',
    story: '话说距上次收到信的时间已过去两星期。按照具体继承日期再过两星期，就可以从那个远方的表舅的表叔的表的不知道什么亲戚的亲戚那里继承大笔遗产，但就在这时又来了一封信明确的告诉小明，想继承遗产必须先拿着给他的10万块钱进行投资或理财，不然不能继承这笔遗产。噢天，这下可怎么办？',
    task: '协助小明进行10万块投资理财计划',
    cover: '../../../static/image/freshVillage/chapter2-cover.png',
    questionArr: [
      {
        questionNo: 2,
        questionText: '',
        options: [],
        answer: 1,
        feedback: '',
        expandsMaterialType: 1,
        proverbs: '&*不断学习的人现实生活中也会持续进步*&&*我不断发现，那些出人头地的人并不是最聪明的，有时甚至不是最勤奋的，可他们如同学习的机器。' +
        '他们每晚上床睡觉时已经比当天起床时更聪明了些。这么做是有帮助的。当你给自己设定了长远的目标时，这种做法的帮助就特别大。*&',
        emergency: {
          emergencyStory: '',
          lifeScore: ''
        },
        wisdom: {
          title: '',
          content: ''
        }
      }
    ]
  },
  {
    chapterNo: 3,
    title: '陷阱还是馅饼',
    story: '小明兴奋得一夜没睡早早的收拾好自己，在家等待着他人生中最重要的时刻（接受并同意继承遗产）。' +
    '早上九点整对方律师如约而至，先问过小明10万元的执行情况，才正式宣布遗产的事宜----为使小明有能力更好的管理遗产，先继承90万（需达到年化15%以上），剩余部分待下一年才可完全继承，或者现在就放弃继承权。' +
    '第一次10万加第二次90万再减去各种税费共计到手90万。天啦！ 这是陷阱吗？不付出怎会有收获，小明打算接受条件。',
    task: '协助小明将到手的90万达到年化15%以上吧！',
    cover: '../../../static/image/freshVillage/chapter3-cover.png',
    questionArr: [
      {
        questionNo: 2,
        questionText: '',
        options: [],
        answer: 1,
        feedback: '',
        expandsMaterialType: 1,
        proverbs: '&*不断学习的人现实生活中也会持续进步*&&*我不断发现，那些出人头地的人并不是最聪明的，有时甚至不是最勤奋的，可他们如同学习的机器。' +
        '他们每晚上床睡觉时已经比当天起床时更聪明了些。这么做是有帮助的。当你给自己设定了长远的目标时，这种做法的帮助就特别大。*&',
        emergency: {
          emergencyStory: '',
          lifeScore: ''
        },
        wisdom: {
          title: '',
          content: ''
        }
      }
    ]
  }
]
