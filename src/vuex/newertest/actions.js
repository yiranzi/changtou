/**
 * Created by dongdong on 2016/10/19.
 */
import {getWithinAuth, getWithoutAuth, postWithinAuth, postWithoutAuth} from '../../frame/ajax'
import {getUrl} from '../../frame/apiConfig'
import store from '../../vuex/store'
const user = store.state.user

const testQuestion = [
  {
    'title': '1.你学习理财投资的目标是?',
    'subtitle': '每个人心中都有憧憬,没有目标的人就是咸鱼',
    'feedback': '学习理财最重要的就是学会制定目标。建立一个切实可行的目标，它会是你学习过程中最大的动力！',
    'index': 1,
    'options': [
      {
        'index': 1,
        'content': '实现财富自由环游世界'
      },
      {
        'index': 2,
        'content': '让家人过上更好的生活'
      },
      {
        'index': 3,
        'content': '抵御生活中各种未知风险'
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
    'feedback': '从现在开始，迈出理财第一步。不管每天能投入多少时间，行动起来的你就是最棒的',
    'index': 4,
    'options': [
      {
        'index': 1,
        'content': '半小时'
      },
      {
        'index': 2,
        'content': '1-2小时'
      },
      {
        'index': 3,
        'content': '2-4小时'
      }
    ]
  },
  {
    'title': '5.你知道沪深300指数是什么吗?',
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
    'feedback': '我就是我，颜色不一样的烟火，在投资过程中认识自己很重要！不同的风险偏好、预期收益决定了适合你的投资品种和投资策略。',
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
  return new Promise(
    (resolve, reject) => {
      const ajax = user.isLogin ? postWithinAuth : postWithoutAuth
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
      const ajax = user.isLogin ? getWithinAuth : getWithoutAuth
      ajax({
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
