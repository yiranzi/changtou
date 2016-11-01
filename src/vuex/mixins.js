/**
 * Created by zl on 16/10/30.
 *
 * 全局的事件监听器
 */
import {eventMap} from '../frame/eventConfig'
import {loadAllFreeRecords, loadAllExpenseRecords} from './courseRecords/actions'

const mixin = {
  vuex: {
    actions: {
      loadAllFreeRecords,
      loadAllExpenseRecords
    }
  },

  events: {
    /**
     * app 启动的全局事件
     */
    [eventMap.APP_START]: function () {
      //
      let tasks = []
      tasks.push(this.loadAllFreeRecords)
      tasks.push(this.loadAllExpenseRecords)

      return Promise.all(tasks).then(
        () => {}
      ).catch(
        () => {}
      )
    }
  }
}

export default [mixin]
