/**
 * Created by jun on 2016/10/27.
 *
 */
<template>
    <div class="choice-mark">
      <ict-titlebar :left-options="{showBack: false}" :right-options="rightOptions">
        我的作业
        <a slot="right">完成</a>
      </ict-titlebar>
      <div>
        ?????????????
      </div>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import { choiceGetters } from '../../vuex/getters'
export default {
  vuex: {
    getters: {
      report: choiceGetters.report
    },
    actions: {

    }
  },
  data () {
    return {
      rightOptions: {
        callback: this.onFinish,
        disabled: false
      }
    }
  },
  computed: {

  },
  watch: {

  },
  route: {

  },
  ready () {

  },
  methods: {
    onFinish () {
      window.history.back(-2)
    }
  },
  components: {
    IctTitlebar
  }
}
</script>
<style lang="less">
</style>
