
/**
 * Created by jun on 2016/12/14.
 */
import {eventMap} from './frame/eventConfig'
import dPlus from './statistics/dPlus'
import ictData from './statistics/ictData'
import {initConfig} from './statistics/statisticsEventsFactory'

const mixin = {
  events: {
    [eventMap.APP_START]: function () {
      dPlus.init().then(
        initConfig()
      )
    }
  }
}
