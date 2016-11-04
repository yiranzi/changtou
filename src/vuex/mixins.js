/**
 * Created by zl on 16/10/30.
 *
 * 全局的事件监听器
 */
import {eventMap} from '../frame/eventConfig'
import {loadAllFreeRecords, loadAllExpenseRecords} from './courseRecords/actions'
import {jpushInit, setAlias, addReceiveHandler} from './jpush/actions'
import {isLogin, userId} from './user/getters'

const mixin = {
  vuex: {
    actions: {
      loadAllFreeRecords,
      loadAllExpenseRecords,
      jpushInit,
      setAlias,
      addReceiveHandler
    },
    getters: {
      isLogin,
      userId
    }
  },

  watch: {
    'isLogin': function (val) {
      if (this.isLogin) {
        this.setAlias(this.userId)
      } else {
        this.setAlias('00')
      }
    }
  },

  events: {
    /**
     * app 启动的全局事件
     */
    [eventMap.APP_START]: function () {
      console.log('APP_START')
      //接收消息
      this.addReceiveHandler(this.onReceiveNotification)

      let tasks = []
      tasks.push(this.loadAllFreeRecords)
      tasks.push(this.loadAllExpenseRecords)
      tasks.push(this.jpushInit)
      const aliasTask = Promise.resolve(this.isLogin ? this.userId : '00').then(this.setAlias)
      tasks.push(aliasTask)

      return Promise.all(tasks).then(
        () => {}
      ).catch(
        () => {}
      )
    }
  }
}

export default [mixin]
