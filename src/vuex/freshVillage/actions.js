/**
 * Created by jun on 2017/3/1
 * 新手村
 */
import {getWithoutAuth, getWithinAuth, postWithinAuth} from '../../frame/ajax'
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

/**
 * 获取新手村答题进度
 * @param dispatch
 * @returns {Promise}
 */
export const getVillageProgress = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('village_get_answer_record')
      }).then(
        function (message) {
          console.log('getVillageProgress success message', message)
          dispatch('FRESH_VILLAGE_PROGRESS', message)
          resolve(message)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
/**
 * 提交答题记录
 * @param dispatch
 * @param chapterNo ,questionNo
 * @returns {Promise}
*/
export const updateRecord = ({ dispatch }, chapterNo, questionNo) => {
  console.log('updateRecord chapterNo, questionNo', chapterNo, questionNo)
  let message = {chapterNo, questionNo}
  dispatch('FRESH_VILLAGE_PROGRESS', message)
  return new Promise(
    (resolve, reject) => {
      postWithinAuth({
        url: getUrl('village_update_answer_record').replace(':chapterNo', chapterNo).replace(':questionNo', questionNo)
      }).then(
        function () {
          dispatch('FRESH_VILLAGE_PROGRESS', message)
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
export const getChapterIntro = ({dispatch}) => {
  let chapterCardInfo = []
  for (let i = 0; i < material.length; i++) {
    chapterCardInfo.push({chapterNo: material[i].chapterNo, title: material[i].title, cover: material[i].cover})
  }
  return chapterCardInfo
}
/*
* 获取某一章节
* */
export const getChapter = ({dispatch}, chapterNo) => {
  return material.find((chapter) => {
     return chapter.chapterNo === chapterNo
  })
}
/*
 * 获取对应章节故事，任务
 * */
export const getStory = ({dispatch}, chapter) => {
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
 * questionText的前后两部分用#隔开,若只有一部分则只在最后加#即可
 * proverbs和wisdom的content  大段开始添加$#表示，结束用#$表示(后期处理时替换为<div></div>)，
 *                           小段开始用&*表示，结束*&用表示,段间无换行空格(后期处理时用<p></p>替换)
 * proverbs中的作者用@+  +@扩起来(后期处理时使用<span></span>替换)
 * materialType 类型1:今日小智2:投资箴言,3:突发事件
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
        materialType: 1, // 其他扩展资料类型1:今日小智2:投资箴言,3:突发事件
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
        materialType: 2,
        wisdom: {
          title: '',
          content: ''
        },
        proverbs: '&*不断学习的人现实生活中也会持续进步*&&*我不断发现，那些出人头地的人并不是最聪明的，有时甚至不是最勤奋的，可他们如同学习的机器。他们每晚上床睡觉时已经比当天起床时更聪明了些。这么做是有帮助的。当你给自己设定了长远的目标时，这种做法的帮助就特别大。*&@+查理·芒格+@',
        emergency: {
          emergencyStory: '',
          lifeScore: ''
        }
      },
      {
        questionNo: 3,
        questionText: '明哥现在你有钱了而且是有那么多钱，咋用也用不完。你看看俺家里还过的这么清苦，' +
        '#明哥你人又好又讲义气帮帮俺家呗，借两个钱花花。',
        options: ['哥有的是钱给你拿去', '你清苦关我什么事', '妹子要多少啊利息按3%算', '你先给我个理财计划钱不能白花'],
        answer: 4,
        feedback: '人在江湖飘，哪能不挨刀？其中一刀，就是各种借钱。通常来说，对方要借钱，必然早就想好了借钱理由，你要做的，' +
        '是根据对对方的了解，判断这个理由是否成立，并评估风险。',
        materialType: 1,
        wisdom: {
          title: '月光先生',
          content: '$#&*有这么一位“月光先生”,他拥有某名牌高校的博士学位,就职于一家外企的中国分部,任部门经理,不算奖金,年薪30万元。他穿着名牌西装,开着奔驰车,出入高档消费场所,真可谓是风光无限,羡煞无数人。可是这位仁兄,每月的薪水都花光了' +
          ',年终不但没有积攒下一分钱,而且还欠银行贷款十万余元,是一位彻彻底底的“月光先生”。' +
          '*&#$$#&*有这么高的收入,为何也成为“月光族”呢?原来,这位先生觉得自己在大型企业工作,收入颇高,职务也不低,' +
          '自我感觉良好,俨然已是一位成功人士,成功人士就要学会享受人生,就算自己现在还不是富人,至少生活上也要看起来像一个富人。' +
          '*&&*于是,他贷款买了奔驰车,租住高级公寓,红酒只喝法国的,牛排只要里脊肉,咖啡只喝卡布其诺,吃饭只去西餐厅……这样下来,虽然他挣了不少,可是花的钱更多。*&#$'
        },
        proverbs: '',
        emergency: {
          emergencyStory: '',
          lifeScore: ''
        }
      },
      {
        questionNo: 4,
        questionText: '小明相机又出新款了，据说比上一款性能要好的没话说。虽说咱手上的' +
        '这两款刚买不久用起来也不错。可是有新款哦，是新款哦，我打算再入手一款。#小明你怎么想，买还是不买啊？',
        options: ['买啊这是必须的', '哪个贵就买哪个好了', '手里的还能用买多了占地方', '我有钱买两台送你一台'],
        answer: 3,
        feedback: '哈哈哈，这下终于体会了一把身为有钱银的乐趣。有钱，任性！闭着眼睛把新款都搬回家！但是自己真的有那么多手拿吗？',
        materialType: 2,
        wisdom: {
          title: '',
          content: ''
        },
        proverbs: '&*“不要把所有鸡蛋放在同一个篮子里”的谬论是错误的，' +
        '投资应该像马克·吐温建议的“把所有鸡蛋放在同一个篮子里，然后小心地看好它。”*& @+ 沃伦·巴菲特 +@',
        emergency: {
          emergencyStory: '',
          lifeScore: ''
        }
      },
      {
        questionNo: 5,
        questionText: '阿明你大叔他突然生病住进医院，听说还要赶紧开刀动手术。' +
        '可这开刀动手术的钱到现在还没着落，手术不能拖着，阿明帮帮你大叔吧。#小明你怎么看，钱借是不是借？',
        options: ['我有的是钱给你拿去用', '我又不会看病看病找医生啊', '钱可以借但这利息怎么个算', '我去给叔找个好大夫钱不担心'],
        answer: 4,
        feedback: '借钱那些事:借是情分,不借是本分!我们在出借钱的时候先要想清楚，这笔钱借出去对我们自己的生活有没有直接影响，有朝一日没有能力偿还这个钱，我们能不能承受得起由此带来的后果。',
        materialType: 3,
        wisdom: {
          title: '',
          content: ''
        },
        proverbs: '',
        emergency: {
          emergencyStory: '近来几天天气骤变，昨晚跟朋友几个出门嗨没多注意，惹上了流感今天要去看医生。共计花去100元。',
          lifeScore: '-3'
        }
      },
      {
        questionNo: 6,
        questionText: '走了狗屎运的小明在处理遗产时，做些什么事表明他已经具有了投资意识？',
        options: ['买套豪华别墅', '买几个位置好的商铺出租', '买一艘豪华游艇', '去香港法国意大利买买买'],
        answer: 2,
        feedback: '有了钱不仅应该考虑消费，还应该考虑投资，富人的特征是会不断给自己积累资产，只知道消费的人再多的钱也会花光的！',
        materialType: 1,
        wisdom: {
          title: '摆脱月光这个鬼',
          content: '$#月光不可怕，可怕的是一直让自己陷入这种无法自拔的状态。#$$#&*1.心态问题冲动是魔鬼！*&&*比如老王买了大金链，你一看虚荣心唰唰上头刷爆信用卡也买买买，结果人家老王依然是土豪，你买了却变成穷逼——因为你把顺序搞反了！' +
          '土豪是有钱才买了金链，而不是因为买了金链子才变成土豪的。*&&*想想自己的消费能力是否在可控范围之内，超出了范围也不会给自己带来什么额外好处，例网上一故事说那谁谁省吃俭用买了正版LV新款包，' +
          '去挤公交车一不留心别人蹭了她的包，结果反被说有钱买包还来跟着挤什么公交啊。*&#$$#&*2.观察自己的用钱习惯*&&*月底没积蓄了，想着这个月发工资一定给自己先存点，结果发了工资一溜烟先跑去买早看好的新款手机、衣服、鞋子...想好的储蓄计划早没影了。想先花后存最后就是没钱存，不妨试试先存后花' +
          '，每天为自己存10元想想一个月300元一年也有3650元，存钱之后再去付日常的花销。花钱存储两不误！*&#$$#&*3.给自己个小目标*&' +
          '&*例如很多人都有一个目标：买房。那么有了这个目标，就想想自己有什么资源可以实现这个目标。问家人亲戚朋友借，自己再存点，或者学点投资理财啥的，让自己手里的钱赚钱，比如第一年存5万，若能年化收益保持10%增长，那一年就有5.5万，第二年再赞10万的话就一共有15.5万，' +
          '继续保持10%增长，就这样利用复利的作用几年下来几十万的首付就攒够了。*&#$$#目标是你行动的驱动力，在理财中更是如此。理财的目的，除了资产增值外，在世上行走，你也多了份安心。#$'
        },
        proverbs: '',
        emergency: {
          story: '',
          score: ''
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
        questionNo: 1,
        questionText: '小明拿了钱打算执行计划，可不知道投资理财到底指什么，下面哪个理解正确？#',
        options: ['会理财的人一定都会投资', '投资就是理财没区别', '投资只是理财的一个方面理财是一个系统规划', '投资就是买卖股票 理财就买银行理财产品'],
        answer: 3,
        feedback: '从概念上说理财包含投资；投资一般都只是短期行为，它关注只是眼前的利益，因此特别重视回报，而理财则是长期行为，它看重的是稳健及长期。',
        materialType: 2,
        wisdom: {
          title: '',
          content: ''
        },
        proverbs: '&*不断学习的人现实生活中也会持续进步*&&*我不断发现，那些出人头地的人并不是最聪明的，有时甚至不是最勤奋的，可他们如同学习的机器。' +
        '他们每晚上床睡觉时已经比当天起床时更聪明了些。这么做是有帮助的。当你给自己设定了长远的目标时，这种做法的帮助就特别大。*&',
        emergency: {
          emergencyStory: '',
          lifeScore: ''
        }
      },
      {
        questionNo: 2,
        questionText: '“投资理财”这个词经常被听到哪个是正解啊#',
        options: ['投资理财就是把手中所有的钱一股脑都丢到理财产品中', '投资理财需要对投资品有一定的认识和判断力', '每个投资品都涉及到一点，那就会赚得更多', '老人家都说“股市猛于虎”，万万不能碰'],
        answer: 2,
        feedback: '理财投资不是指投资某个产品，而是财务资源的整合。它是指在金融市场上挑选不同的投资品买入，期待其帮我们赚钱的过程。在具备一定的理财基础之后才能去触碰理财产品哦',
        extendsMaterialType: 1,
        wisdom: {
          title: '夺取先机',
          content: '$#商人带两袋大蒜到某地，当地人没见过大蒜，极为喜爱，于是赠商人两袋金子。另一商人听说，便带两袋大葱去，当地人觉得大葱更美味，金子不足表达感情，于是把两袋大蒜给了他。#$' +
          '$#虽是故事，但理财往往如此，得先机者得金子，步后尘者就可能得大蒜！善于走自己的路，才可能走别人没走过的路#$'
        },
        proverbs: '',
        emergency: {
          story: '',
          score: ''
        }
      },
      {
        questionNo: 3,
        questionText: '开始要理财投资了，在买理财产品时小明需要听谁的了？#',
        options: ['父母建议', '理财网站推荐', '自己量化分析', '基友指点迷津'],
        answer: 3,
        feedback: '靠谁都不如靠自己，学好量化分析才是王道，不管是银行理财产品还是基金股票，分析起来都没有问题！',
        extendsMaterialType: 2,
        wisdom: {
          title: '',
          content: ''
        },
        proverbs: '&*最终决定投资者命运的既不是股票市场也不是那些上市公司，而是投资者自己决定了自己的命运。只要用心对股票作一点点研究，普通投资者也能成为股票投资专家，并且在选股方面的成绩能像华尔街专家一样出色。*&@+彼得·林奇+@',
        emergency: {
          story: '',
          score: ''
        }
      },
      {
        questionNo: 4,
        questionText: '利用10万块可持续加快财富自由步伐的办法是？',
        options: ['买个5万块钱的彩票祈祷中500万', '学习基金知识去买基金', '把10万块拿来都投资P2P产品', '主动要求加班坐等老板给自己加薪'],
        answer: 2,
        feedback: '财富自由，就是被动收入超过你的花销，你不需要工作就有的收入即被动收入，如出租房屋，股票红利，银行利息。也有一种说法是拥有100万美元的可投资资产就实现财富自由了哦。',
        extendsMaterialType: 3,
        wisdom: {
          title: '',
          content: ''
        },
        proverbs: '',
        emergency: {
          story: '今天提交的方案比预期的顺利，下周就开始执行新方案。真是太开心了，去街角彩票店为自己买一注彩票以示庆祝。',
          score: '+5'
        }
      },
      {
        questionNo: 5,
        questionText: '拿10万块投资到平时大多数人能接触到的投资品中哪些是不靠谱的 ',
        options: ['MMM金融社区', '民间借贷', 'P2P平台', '以上全部'],
        answer: 4,
        feedback: '这几个投资品都是高收益的产品，风险要么极高要么未知，而有些甚至让你本金都亏得一点不剩。投资需谨慎。',
        extendsMaterialType: 1,
        wisdom: {
          title: '换位思维',
          content: '$#一富豪到华尔街银行借5000元贷款，借期两周，银行贷款须有抵押，富豪用停在门口的劳斯莱斯做抵押。银行职员将他的劳斯莱斯停在地下车库里，然后借给富豪5000元，' +
          '两周后富豪来还钱，利息仅15元。银行职员发现富豪帐上有几百万，问为啥还要借钱，富豪说：“15元两周的停车场，在华尔街是永远找不到的。”#$'
        },
        proverbs: '',
        emergency: {
          story: '',
          score: ''
        }
      },
      {
        questionNo: 6,
        questionText: '市面上的理财产品多数不靠谱，那银行的定期存款又是个什么鬼？',
        options: ['银行倒闭可能性较低，所以比一般产品安全性相对较高', '定期存款的流动性比基金还差不能随时取款', '有银行在背后定存的收益率远高于股票投资', '资产稳定持续增长收益率在10%左右'],
        answer: 1,
        feedback: '定期存款的收益率只有3%左右，但是风险相对其他投资品来说更小，安全性非常高，本金一般情况下不会亏损。',
        extendsMaterialType: 2,
        wisdom: {
          title: '',
          content: ''
        },
        proverbs: '&*“你可以整天做各种投资，但除非基本面是对的，否则你不会有什么收获。如果基本面大体判断正确，好消息接连不断，你觉得这是运气吗？如果你希望成为幸运者，请做足功课。” *&@+罗杰斯+@',
        emergency: {
          story: '',
          score: ''
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
        questionNo: 1,
        questionText: '处理这烫手的90万前，先来聊聊理财产品一般都是由什么机构发行的？#',
        options: ['高利贷', '典当行', '银行及金融机构', '淘宝'],
        answer: 3,
        feedback: '只有银行及金融机构可以发行理财产品哦！虽然你在淘宝买得到，但那只是承销哦！',
        materialType: 1,
        wisdom: {
          title: '一只火鸡和一头牛',
          content: '$#一只火鸡和一头牛闲聊，火鸡说：我希望能飞到树顶，可我没有勇气。牛说：为什么不吃一点我的牛粪呢，他们很有营养。火鸡吃了一点牛粪，发现它确实给了它足够的力量飞到第一根树枝，第二天，火鸡又吃了更多的牛粪，' +
          '飞到第二根树枝，两个星期后，火鸡骄傲飞到了树顶，但不久，一个农夫看到了它，迅速的把它从树上射了下来。#$$#启示：牛屎运让你达到顶峰，但不能让你留在那里。股市中经常经历过顶的很多，特别是个股的疯狂，能逃顶的并不多。#$'
        },
        proverbs: '',
        emergency: {
          emergencyStory: '',
          lifeScore: ''
        }
      }
    ]
  }
]
