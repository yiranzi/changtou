<template>
  <div class="configration">
    <ict-titlebar>消息提醒设置</ict-titlebar>
        <group class="toggleField">
          <switch title="课程提醒" :value.sync="toggleValue"></switch>
          <p class="instruction">针对课程开通、作业批改、作业被评论等信息提醒</p>
        </group>
  </div>
</template>
<style lang="less">
  .configration{
    p{
      margin: 0;
      padding: 0;
    }
    .toggleField {
      width: 100%;
      margin-top: 1rem;
      .weui_label{
        line-height: 25px;
        font-size: 0.75rem;
      }
      .weui_switch {
        width: 2.3rem;
        height: 1.25rem;
      }
      .weui_switch:before{
        width: 2.3rem;
        height: 1.25rem;
        border: 1px solid #c3c3c3;
      }
      .weui_switch:after{
        width: 1.15rem;
        height: 1.15rem;
        top: 0;
        left: 0;
        border-radius: 50%;
      }
      .weui_switch:checked{
        border-color: #00b0f0;
        background-color: #00b0f0;
      }
      .weui_cells{
        border: 1px solid #c3c3c3;
        height: 3.1rem;
        padding: 9/20rem 12/20rem;
        box-sizing: border-box;
      }
      .weui_cell{
        padding: 0;
      }
      .instruction{
        width: 93.6%;
        height: 0.8rem;
        font-size: 0.6rem;
        color: #898989;
        padding: 0;
        box-sizing: border-box;
      }
    }
  }
</style>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import Switch from 'vux/switch'
  import Group from 'vux/group'
  import {mineActions} from '../../vuex/actions'
  import {mineGetters} from '../../vuex/getters'
  export default {
    vuex: {
      getters: {
        notificationSwitch: mineGetters.notificationSwitch
      },
      actions: {
        loadNofiSwitch: mineActions.loadNofiSwitch,
        updateNofiSwitch: mineActions.updateNofiSwitch
      }
    },

    route: {
      data (transition) {
        this.loadNofiSwitch().then(
          function (status) {
            transition.next()
          },
          function () {
            transition.next()
          }
        )
      },

      watch: {
        'notificationSwitch': function (newValue, oldVlaue) {
          this.toggleValue = newValue === 'Y'
        }
      },

      deactivate () {
        this.updateNofiSwitch(this.toggleValue ? 'Y' : 'N')
      }
    },

    data () {
      return {
        toggleValue: true
      }
    },
    methods: {
      toggle () {
        //向服务器发送请求
        this.loadNofiSwitch
        this.updateNofiSwitch
      }
    },
    components: {
      IctTitlebar,
      Switch,
      Group
    }
  }
</script>
