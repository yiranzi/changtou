<template>
  <div>
    小投答疑自助服务
  </div>
</template>
<style>
</style>
<script>
  import {helpActions, globalActions} from '../../vuex/actions'
//  import {helpGetters} from '../../vuex/getters'
  export default {
    vuex: {
      actions: {
        loadSelfHelpList: helpActions.loadSelfHelpList,
        showAlert: globalActions.showAlert
      }
//      getters: {
//        helpList: helpGetters.helpList
//      }
    },
    data () {
      return {

      }
    },
    route: {
      data (transition) {
        this.loadSelfHelpList().then(
          function () {
            transition.next()
          },
          function (err) {
            console.log('err', err)
          }
        )
      }
    },
    components: {

    }
  }
</script>
