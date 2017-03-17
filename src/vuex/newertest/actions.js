/**
 * Created by dongdong on 2016/10/19.
 */
import {getWithinAuth, postWithinAuth, postWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
import store from '../../vuex/store'
const user = store.state.user

const testQuestion = [
  {
    'title': '1.见到“投资理财”这4个字，你怎么看？',
    'subtitle': '每个人在心中都会有一个财富自由梦',
    'feedback': '对待投资，每个人都有不同理解无所谓对错，确定自己内心想要什么，才能在学习投资理财的道路上，事倍功半哦！',
    'index': 1,
    'options': [
      {
        'index': 1,
        'content': '财富自由啊！不然学它做什么！'
      },
      {
        'index': 2,
        'content': '攒点小钱提升工资收入'
      },
      {
        'index': 3,
        'content': '这个不是骗人的吧'
      }
    ]
  },
  {
    'title': '2.以前有系统的学习过理财投资吗?',
    'subtitle': '看几篇公号文章和几本入门书籍可不算系统学习哟。',
    'feedback': null,
    'index': 2,
    'options': [
      {
        'index': 1,
        'content': '我完全没有学过啊'
      },
      {
        'index': 2,
        'content': '零散学习过基础知识'
      },
      {
        'index': 3,
        'content': '已经是系统学习过的老司机'
      }
    ]
  },
  {
    'title': '3.有操作过哪些理财投资品种?',
    'subtitle': '现在来聊聊你的理财经验。',
    'feedback': null,
    'index': 3,
    'options': [
      {
        'index': 1,
        'content': '股票、基金或P2P'
      },
      {
        'index': 2,
        'content': '余额宝或银行理财产品'
      },
      {
        'index': 3,
        'content': '什么都没投资过'
      }
    ]
  },
  {
    'title': '4.你愿意每天花多少时间学习理财投资呢?',
    'subtitle': '来来来，诚实的告诉小投你的计划是什么。',
    'feedback': '“一万小时天才理论”虽有夸张的地方，但投入和产出这个基本成正比关系。工作再忙，也要记得在学习投资上哪怕每天1分钟也是进步。',
    'index': 4,
    'options': [
      {
        'index': 1,
        'content': '至少花1个小时'
      },
      {
        'index': 2,
        'content': '每周5小时能挤出来'
      },
      {
        'index': 3,
        'content': '一周顶多2小时不能再多了'
      }
    ]
  },
  {
    'title': '5.你知道沪深300指数及涡轮的含义吗?',
    'subtitle': '接下来这道题深入的测验一下真实的投资知识和能力。',
    'feedback': null,
    'index': 5,
    'options': [
      {
        'index': 1,
        'content': '知道'
      },
      {
        'index': 2,
        'content': '不知道'
      }
    ]
  },
  {
    'title': '6.万科是一家上市公司，它在哪个交易所上市?',
    'subtitle': '一道题不够，我们再来一道难一点的。',
    'feedback': '投资其实并不难，知识、方法都是可以学习滴！长投95%的用户曾经也是什么都不知道的小白呢！',
    'index': 6,
    'options': [
      {
        'index': 1,
        'content': '纽约证券交易所'
      },
      {
        'index': 2,
        'content': '上海证券交易所'
      },
      {
        'index': 3,
        'content': '深圳证券交易所'
      }
    ]
  },
  {
    'title': '7.如果你忽然继承了一笔10万元财产那么...?',
    'subtitle': '要求你必须进行一项投资，你会怎么办？',
    'feedback': '理财就是理生活，不能盲目为了追求收益，而影响正常的生活。对风险的承担能力不同，在选择投资品种时要根据自己的情况私人订制。',
    'index': 7,
    'options': [
      {
        'index': 1,
        'content': '全部存到银行'
      },
      {
        'index': 2,
        'content': '购买风险较低的债券基金'
      },
      {
        'index': 3,
        'content': '购买风险较高的股票'
      }
    ]
  },
  {
    'title': '8.假设你投资的10万元在3个月后居然跌了30%你会怎样?',
    'subtitle': '最后一题我们玩点刺激心跳的。',
    'feedback': null,
    'index': 8,
    'options': [
      {
        'index': 1,
        'content': '不能想宝宝好心痛'
      },
      {
        'index': 2,
        'content': '会有点不爽但接受市场波动'
      },
      {
        'index': 3,
        'content': '该吃吃该喝喝心大任性'
      }
    ]
  }
]

//加载问题
export const loadQuestion = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      dispatch('NEWERTEST_UPDATE_QUESTION', testQuestion)
      resolve(testQuestion)
    }
  )
}

//上传测试报告
export const postReport = ({ dispatch }, comboId, level) => {
  const ajax = user.isLogin ? postWithinAuth : postWithoutAuth
  return new Promise(
    (resolve, reject) => {
      ajax({
        url: getUrl('newertest_report'),
        data: {
          comboId,
          level
        }
      }).then(
        function (report) {
          dispatch('NEWERTEST_UPDATE_REPORT', report)
          resolve()
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}

//获取测试结果
export const loadNewertestReport = ({ dispatch }) => {
  return new Promise(
    (resolve, reject) => {
      getWithinAuth({
        url: getUrl('newertest_report')
      }).then(
        function (newertestReport) {
          dispatch('NEWERTEST_UPDATE_REPORT', newertestReport)
          resolve(newertestReport)
        },
        function (err) {
          reject(err)
        }
      )
    }
  )
}
